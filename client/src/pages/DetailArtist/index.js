import classNames from "classnames/bind";
import React, { useState, useContext, useEffect } from "react";
import styles from "./DetailArtist.module.scss";
import Image from "../../components/Image";
import { useParams } from "react-router-dom";
import { SongContext } from "../../contexts";
import { getDetailArtist } from "../../services/getDetailArtist";
import Spinner from "../../components/Spinner";
import { formatNumber } from "../../utils/formatNumber";
import SongItem from "../../components/SongItem";
import Playlists from "../../components/Playlists";
import { FaPlay } from "react-icons/fa";
import AccountCard from "../../components/AccountCard";
import Songs from "../../components/Songs";
import Artists from "../../components/Artists";

const cx = classNames.bind(styles);

const DetailArtist = () => {
    const { name } = useParams();

    const [loading, setLoading] = useState(false);
    const [detailArtist, setDetailArtist] = useState(null);

    const { updateCurrentMusic } = useContext(SongContext);

    const handlePlayFirstMusic = async () => {
        if (detailArtist) {
            const playlist = detailArtist.sections.find(
                (item) => item.sectionType === "song"
            ).items;
            const firstIndexSong = playlist.findIndex(
                (song) => song.streamingStatus === 1
            );
            await updateCurrentMusic(playlist[firstIndexSong], playlist);
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await getDetailArtist(name);
            if (result.success) {
                setDetailArtist(result.items);
            }

            setLoading(false);
        };
        fetchApi();
    }, [name]);

    return loading || !detailArtist ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            <div
                className={cx("artist-banner")}
                style={{ backgroundImage: `url(${detailArtist.cover})` }}>
                <div className={cx("artist-item")}>
                    <Image
                        src={detailArtist.thumbnailM}
                        className={cx("avatar")}
                    />
                    <div className={cx("info")}>
                        <div className={cx("top")}>
                            <h1 className={cx("name")}>{detailArtist.name}</h1>
                            <div
                                className={cx("btn-play")}
                                onClick={handlePlayFirstMusic}>
                                <FaPlay />
                            </div>
                        </div>
                        <div className={cx("bottom")}>
                            <span className={cx("follow")}>
                                {detailArtist.follow
                                    ? formatNumber(detailArtist.follow)
                                    : 0}{" "}
                                người quan tâm
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("content")}>
                {detailArtist.sections.find(
                    (item) => item.sectionType === "song"
                ) && (
                    <Songs
                        list={
                            detailArtist.sections.find(
                                (item) => item.sectionType === "song"
                            ).items
                        }
                        title={"Bài hát nổi bật"}
                        itemWidth={392}
                    />
                )}
                {detailArtist.sections.filter(
                    (item) => item.sectionType === "playlist"
                ) &&
                    detailArtist.sections
                        .filter((item) => item.sectionType === "playlist")
                        .map((item, index) => (
                            <Playlists
                                key={index}
                                list={item.items}
                                title={item.title}
                            />
                        ))}
                {detailArtist.sections.find(
                    (item) => item.sectionType === "artist"
                ) && (
                    <Artists
                        list={detailArtist.sections
                            .find((item) => item.sectionType === "artist")
                            .items.slice(0, 5)}
                        title={"Có thể bạn quan tâm"}
                    />
                )}
            </div>
        </div>
    );
};

export default DetailArtist;
