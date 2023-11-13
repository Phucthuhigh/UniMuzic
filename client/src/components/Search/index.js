import classNames from "classnames/bind";
import React from "react";
import styles from "./Search.module.scss";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";

const cx = classNames.bind(styles);

const SearchBtn = () => {
    return (
        <div className={cx("search")}>
            <input type="text" placeholder="Search" spellCheck={false} />
            <button className={cx("clear-btn")}>
                <SmallCloseIcon />
            </button>
            <button className={cx("search-btn")}>
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchBtn;
