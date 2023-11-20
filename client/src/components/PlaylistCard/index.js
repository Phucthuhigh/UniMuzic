import classNames from "classnames/bind";
import React from "react";
import styles from "./PlaylistCard.module.scss";
import { MdFavoriteBorder } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PlaylistCard = ({ title, sortDescription, thumbnailM, link }) => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("image")}>
                <Link to={link}>
                    <div className={cx("play-actions")}>
                        <div className={cx("follow")}>
                            <MdFavoriteBorder />
                        </div>
                        <div className={cx("play")}>
                            <IoPlayCircleOutline />
                        </div>
                    </div>
                    <img className={cx("thumb")} src={thumbnailM} alt={title} />
                </Link>
            </div>
            <div className={cx("content")}>
                <Link to={link}>
                    <h4 className={cx("title")}>{title}</h4>
                </Link>
                <p className={cx("description")}>{sortDescription}</p>
            </div>
        </div>
    );
};

export default PlaylistCard;
