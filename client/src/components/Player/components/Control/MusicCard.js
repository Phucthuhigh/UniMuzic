import React from "react";
import SongItem from "../../../SongItem";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";

const cx = classNames.bind(styles);

const MusicCard = ({ data }) => {
    return (
        <div className={cx("music-card")}>
            <SongItem data={data} />
        </div>
    );
};

export default MusicCard;
