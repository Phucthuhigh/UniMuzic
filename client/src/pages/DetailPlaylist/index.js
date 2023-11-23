import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailPlaylist } from "../../services/getDetailPlaylist";
import Spinner from "../../components/Spinner";
import classNames from "classnames/bind";
import styles from "./DetailPlaylist.module.scss";

const cx = classNames.bind(styles);

const DetailPlaylist = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [detailPlaylist, setDetailPlaylist] = useState(null);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading || !detailPlaylist ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            <div className={cx("cover-image")}>
                <img
                    src={detailPlaylist.thumbnail}
                    alt={detailPlaylist.title}
                />
            </div>
        </div>
    );
};

export default DetailPlaylist;
