import classNames from "classnames/bind";
import React, { useState, useContext, useEffect } from "react";
import styles from "./DetailArtist.module.scss";
import Image from "../../components/Image";
import { useParams } from "react-router-dom";
import { SongContext } from "../../contexts";
import { getDetailArtist } from "../../services/getDetailArtist";
import Spinner from "../../components/Spinner";

const cx = classNames.bind(styles);

const DetailArtist = () => {
    const { name } = useParams();

    const [loading, setLoading] = useState(false);
    const [detailArtist, setDetailArtist] = useState(null);

    const { updateCurrentMusic } = useContext(SongContext);

    const handlePlayFirstMusic = async () => {
        if (detailArtist) {
            const firstIndexSong = detailArtist.song.items.findIndex(
                (song) => song.streamingStatus === 1
            );
            await updateCurrentMusic(
                detailArtist.song.items[firstIndexSong],
                detailArtist.song.items
            );
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(detailArtist);

    return loading || !detailArtist ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            <div className={cx("artist-banner")}>
                <div className="artist-background"></div>
                <Image src={detailArtist.thumbnailM} />
            </div>
        </div>
    );
};

export default DetailArtist;
