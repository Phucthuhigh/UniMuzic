import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Image from "../Image";
import styles from "./SongItem.module.scss";
import Badge from "../Badge";
import { useContext } from "react";
import { SongContext } from "../../contexts";
import { formatTime } from "../../utils/formatTime";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SongItem({ data, duration, playlist = [], className }) {
    const { updateCurrentMusic } = useContext(SongContext);

    const handlePlayMusic = async () => {
        if (data.streamingStatus === 1)
            await updateCurrentMusic(data, playlist);
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
                    <span className={cx("title-text")}>{data.title}</span>
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
                <div className={cx("author")}>
                    {data.artists &&
                        data.artists.map((artist, index) => {
                            return (
                                <div
                                    key={artist.id}
                                    style={{ display: "inline-block" }}>
                                    {index === 0 ? <></> : <span>, </span>}
                                    <Link to={`/artist/${artist.alias}`}>
                                        {artist.name}
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
            {duration && (
                <span className={cx("duration")}>{formatTime(duration)}</span>
            )}
        </div>
    );
}

SongItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SongItem;
