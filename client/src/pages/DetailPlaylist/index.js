import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getDetailPlaylist } from "../../services/getDetailPlaylist";
import Spinner from "../../components/Spinner";
import classNames from "classnames/bind";
import styles from "./DetailPlaylist.module.scss";
import { formatDay } from "../../utils/formatDay";
import { Link } from "react-router-dom";
import SongItem from "../../components/SongItem";
import Button from "../../components/Button";
import { SongContext } from "../../contexts";
import { formatNumber } from "../../utils/formatNumber";

const cx = classNames.bind(styles);

const DetailPlaylist = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [detailPlaylist, setDetailPlaylist] = useState(null);

    const { updateCurrentMusic } = useContext(SongContext);

    const handlePlayFirstMusic = async () => {
        if (detailPlaylist) {
            const firstIndexSong = detailPlaylist.song.items.findIndex(
                (song) => song.streamingStatus === 1
            );
            await updateCurrentMusic(
                detailPlaylist.song.items[firstIndexSong],
                detailPlaylist.song.items
            );
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await getDetailPlaylist(id);
            if (result.success) {
                setDetailPlaylist(result.items);
            }

            setLoading(false);
        };
        fetchApi();
    }, [id]);

    return loading || !detailPlaylist ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            <div className={cx("about-playlist")}>
                <div className={cx("cover-image")}>
                    <img
                        src={detailPlaylist.thumbnailM}
                        alt={detailPlaylist.title}
                    />
                </div>
                <div className={cx("info")}>
                    <h2 className={cx("title")}>{detailPlaylist.title}</h2>
                    <div className={cx("last-update")}>
                        <span>
                            Cập nhật:{" "}
                            {formatDay(detailPlaylist.contentLastUpdate * 1000)}
                        </span>
                    </div>
                    <div className={cx("artists")}>
                        {detailPlaylist.artists &&
                            detailPlaylist.artists.map((artist, index) => {
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
                    <span className={cx("like")}>
                        {formatNumber(detailPlaylist.like)} người yêu thích
                    </span>
                </div>

                <div className={cx("btn")}>
                    <Button
                        outline
                        rounded
                        className={cx("btn-play")}
                        onClick={handlePlayFirstMusic}>
                        Play
                    </Button>
                </div>
            </div>
            <div className={cx("playlist")}>
                {detailPlaylist.song.items &&
                    detailPlaylist.song.items.map((item) => {
                        return (
                            <SongItem
                                key={item.encodeId}
                                data={item}
                                duration={item.duration}
                                playlist={detailPlaylist.song.items}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default DetailPlaylist;
