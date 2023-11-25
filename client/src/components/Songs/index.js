import React from "react";
import classNames from "classnames/bind";
import styles from "./Songs.module.scss";
import SongItem from "../SongItem";

const cx = classNames.bind(styles);

const Songs = ({ list, title, itemWidth }) => {
    return (
        list && (
            <div className={cx("special-song")}>
                {title && <h1 className={cx("title")}>{title}</h1>}
                <div className={cx("special-song-wrapper")}>
                    {list.map((item) => (
                        <div
                            className={cx("special-song-item")}
                            key={item.encodeId}
                            style={{ width: `${itemWidth}px` }}>
                            <SongItem
                                className={cx("item")}
                                data={item}
                                playlist={list}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default Songs;
