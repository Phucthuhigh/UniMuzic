import React from "react";
import classNames from "classnames/bind";
import styles from "./AccountCard.module.scss";
import Image from "../Image";
import { formatNumber } from "../../utils/formatNumber";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const AccountCard = ({ data, disableFollow, className }) => {
    return (
        data && (
            <div className={cx("wrapper", className)}>
                <Link to={`/artist/${data.alias}`}>
                    <Image
                        className={cx("avatar")}
                        src={data.thumbnailM || data.thumbnail}
                        alt={data.name}
                    />
                </Link>
                <div className={cx("info")}>
                    <Link className={cx("name")} to={`/artist/${data.alias}`}>
                        <h3>{data.name}</h3>
                    </Link>
                    {!disableFollow && (
                        <span className={cx("follow")}>
                            {data.totalFollow
                                ? formatNumber(data.totalFollow)
                                : 0}{" "}
                            quan tâm
                        </span>
                    )}
                </div>
            </div>
        )
    );
};

export default AccountCard;
