import classNames from "classnames/bind";
import React from "react";
import styles from "./PlaylistCard.module.scss";
import { MdFavoriteBorder } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PlaylistCard = ({ title, sortDescription, thumbnailM, encodeId }) => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("image")}>
                <div className={cx("play-actions")}>
                    <Link to={`/playlist/${encodeId}`}>
                        <div className={cx("overlay")}></div>
                    </Link>
                    <div className={cx("follow")}>
                        <MdFavoriteBorder />
                    </div>
                    <Link to={`/playlist/${encodeId}`}>
                        <div className={cx("play")}>
                            <IoPlayCircleOutline />
                        </div>
                    </Link>
                </div>
                <img className={cx("thumb")} src={thumbnailM} alt={title} />
            </div>
            <div className={cx("content")}>
                <Link to={`/playlist/${encodeId}`}>
                    <h4 className={cx("title")}>{title}</h4>
                </Link>
                <p className={cx("description")}>{sortDescription}</p>
            </div>
        </div>
    );
};

export default PlaylistCard;
