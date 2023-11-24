import React from "react";
import classNames from "classnames/bind";
import styles from "./Lyric.module.scss";
import Image from "../../../Image";
import { useLyric } from "../../../../hooks";

const cx = classNames.bind(styles);

const Lyric = ({ isLyric, info, currentTime }) => {
    const lyric = useLyric(info.encodeId);

    return (
        <div className={cx("wrapper", { [styles.active]: isLyric })}>
            <div className={cx("container")}>
                <Image
                    className={cx("image-song")}
                    src={info.thumbnailM}
                    alt={info.title}
                />
                <div className={cx("lyrics")}>
                    {lyric &&
                        lyric.map((item, index) => {
                            if (
                                item.startTime <= currentTime * 1000 &&
                                currentTime * 1000 <= item.endTime
                            ) {
                                document
                                    .getElementById(`line-${index}`)
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                    });
                            }
                            return (
                                <div
                                    id={`line-${index}`}
                                    key={index}
                                    className={cx("line")}>
                                    <span
                                        className={cx("line-text", {
                                            [styles.active]:
                                                item.startTime <=
                                                    currentTime * 1000 &&
                                                currentTime * 1000 <=
                                                    item.endTime,
                                        })}>
                                        {item.data}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Lyric;
