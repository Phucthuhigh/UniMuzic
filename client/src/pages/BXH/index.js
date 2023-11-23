import React, { useEffect, useState } from "react";
import { getBXH } from "../../services/BXHServices";
import classNames from "classnames/bind";
import styles from "./BXH.module.scss";
import SongItem from "../../components/SongItem";
import Spinner from "../../components/Spinner";

const cx = classNames.bind(styles);

const BXH = () => {
    const [loading, setLoading] = useState(false);
    const [BXH, setBXH] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await getBXH();
            if (result.success) {
                setBXH(result.items);
            }

            setLoading(false);
        };
        fetchApi();
    }, []);

    return loading || !BXH ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            {BXH.RTChart.items.map((item) => (
                <SongItem
                    key={item.encodeId}
                    data={item}
                    duration={item.duration}
                    playlist={BXH.RTChart.items}
                />
            ))}
        </div>
    );
};

export default BXH;
