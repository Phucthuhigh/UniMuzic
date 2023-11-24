import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import styles from "./Slider.module.scss";
import classNames from "classnames/bind";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import PropStyles from "prop-types";
import { getSong } from "../../../../services/getSongServices";
import { SongContext } from "../../../../contexts";

const cx = classNames.bind(styles);

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const Slider = ({ slides }) => {
    const { updateCurrentMusic } = useContext(SongContext);

    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = wrap(0, slides ? slides.length : 0, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        const id = setTimeout(() => {
            paginate(1);
        }, 3000);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, direction]);

    const handlePlayMusic = async () => {
        const data = await getSong(slides[imageIndex].encodeId);
        if (data.infoSong.streamingStatus === 1) {
            await updateCurrentMusic(data.infoSong, [data.infoSong]);
        }
    };

    let Comp;
    const props = { style: { cursor: "pointer" } };
    // Bài hát
    if (slides[imageIndex].type === 1) {
        Comp = "div";
        props.onClick = handlePlayMusic;
    }
    // Playlist
    else {
        Comp = Link;
        props.to = `/playlist/${slides[imageIndex].encodeId}`;
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("slider")}>
                <Comp {...props}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={page}
                            src={slides[imageIndex].banner}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                },
                                opacity: { duration: 0.2 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                        />
                    </AnimatePresence>
                </Comp>
                <div className={cx("buttons")}>
                    <div className={cx("prev")} onClick={() => paginate(-1)}>
                        <GrLinkPrevious />
                    </div>
                    <div className={cx("next")} onClick={() => paginate(1)}>
                        <GrLinkNext />
                    </div>
                </div>
            </div>
        </div>
    );
};

Slider.propTypes = {
    slides: PropStyles.array.isRequired,
};

export default Slider;
