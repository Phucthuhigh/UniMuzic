import React, { useState } from "react";
import styles from "./NewRelease.module.scss";
import classNames from "classnames/bind";
import SongItem from "../../../../components/SongItem";
import Button from "../../../../components/Button";
import Songs from "../../../../components/Songs";

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
            <Songs list={data[type]} itemWidth={380} />
        </div>
    );
};

export default NewRelease;
