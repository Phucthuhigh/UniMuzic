import React from "react";
import classNames from "classnames/bind";
import styles from "./Artists.module.scss";
import AccountCard from "../AccountCard";

const cx = classNames.bind(styles);

const Artists = ({ list, title }) => {
    return (
        list && (
            <div className={cx("more-artist")}>
                {title && <h1 className={cx("title")}>{title}</h1>}
                <div className={cx("list")}>
                    {list.map((item) => (
                        <AccountCard
                            key={item.id}
                            className={cx("item")}
                            data={item}
                        />
                    ))}
                </div>
            </div>
        )
    );
};

export default Artists;
