import React, { useEffect, useState } from "react";
import styles from "./Top100.module.scss";
import classNames from "classnames/bind";
import { getTop100 } from "../../services/Top100Services";
import Spinner from "../../components/Spinner";
import Playlists from "../../components/Playlists";

const cx = classNames.bind(styles);

const Top100 = () => {
    const [loading, setLoading] = useState(false);
    const [Top100, setTop100] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await getTop100();
            if (result.success) {
                setTop100(result.items);
            }

            setLoading(false);
        };
        fetchApi();
    }, []);

    return loading || !Top100 ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            {Top100.map((item, index) => (
                <Playlists key={index} title={item.title} list={item.items} />
            ))}
        </div>
    );
};

export default Top100;
