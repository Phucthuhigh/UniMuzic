import React, { useState } from "react";
import styles from "./NewRelease.module.scss";
import classNames from "classnames/bind";
import SongItem from "../../../../components/SongItem";
import Button from "../../../../components/Button";

const cx = classNames.bind(styles);

const NewRelease = ({ title, data }) => {
    const tabs = [
        { title: "Tất cả", id: "all" },
        { title: "Việt Nam", id: "vPop" },
        { title: "Nước ngoài", id: "others" },
    ];
    const [type, setType] = useState("all");

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>{title}</h1>
            <div className={cx("tabs")}>
                {tabs.map((tab, index) => (
                    <Button
                        key={index}
                        rounded
                        outline={type !== tab.id}
                        primary={type === tab.id}
                        onClick={() => setType(tab.id)}>
                        {tab.title}
                    </Button>
                ))}
            </div>
            <div className={cx("list")}>
                {data[type].slice(0, 12).map((item) => (
                    <div className={cx("item")} key={item.encodeId}>
                        <SongItem
                            className={cx("song-item-card")}
                            data={item}
                            playlist={data[type]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewRelease;
