import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Image from "../Image";
import styles from "./SongItem.module.scss";
import { LOCAL_STORAGE_CURRENT_MUSIC } from "../../utils/constants";
import Badge from "../Badge";
import { useContext } from "react";
import { SongContext } from "../../contexts";

const cx = classNames.bind(styles);

function SongItem({ data, className }) {
    const { updateCurrentMusic } = useContext(SongContext);

    const handlePlayMusic = async () => {
        if (data.streamingStatus === 1) await updateCurrentMusic(data.encodeId);
    };

    return (
        <div className={cx("wrapper", className)} onClick={handlePlayMusic}>
            <Image
                className={cx("thumb")}
                src={data.thumbnailM}
                alt={data.thumbnailM}
            />
            <div className={cx("info")}>
                <h4 className={cx("title")}>
                    <span>{data.title}</span>
                    {data.streamingStatus !== 1 && (
                        <Badge
                            title="VIP"
                            style={{
                                backgroundColor: "#e5ac1a",
                                marginLeft: 8,
                            }}
                        />
                    )}
                </h4>
                <span className={cx("author")}>{data.artistsNames}</span>
            </div>
        </div>
    );
}

SongItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SongItem;
