import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import { Slider } from "./components";
import { getHome } from "../../services/homeServices";
import Spinner from "../../components/Spinner";
import NewRelease from "./components/NewRelease";
import Playlists from "../../components/Playlists";

const cx = classNames.bind(styles);

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [home, setHome] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await getHome();
            if (result.success) {
                setHome(result.items);
            }

            setLoading(false);
        };
        fetchApi();
    }, []);

    return loading || !home ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            <Slider slides={home[0][0].items} />
            <NewRelease title={home[2][0].title} data={home[2][0].items} />
            {home[1].map((item, index) => (
                <Playlists key={index} title={item.title} list={item.items} />
            ))}
        </div>
    );
};

export default Home;
