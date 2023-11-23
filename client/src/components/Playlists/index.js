import React from "react";
import PlaylistCard from "../PlaylistCard";
import classNames from "classnames/bind";
import styles from "./Playlists.module.scss";

const cx = classNames.bind(styles);

const Playlists = ({ list, title }) => {
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>{title}</h1>
            <div className={cx("list")}>
                {list.map((item) => (
                    <PlaylistCard key={item.encodeId} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Playlists;
