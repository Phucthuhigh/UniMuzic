import classNames from "classnames/bind";
import React, { useRef, useState } from "react";
import styles from "./Search.module.scss";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";

const cx = classNames.bind(styles);

const SearchBtn = () => {
    const [input, setInput] = useState("");
    const inputRef = useRef();
    return (
        <div className={cx("search")}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                spellCheck={false}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            {input !== "" && (
                <button
                    className={cx("clear-btn")}
                    onClick={() => {
                        setInput("");
                        inputRef.current.focus();
                    }}>
                    <SmallCloseIcon />
                </button>
            )}
            <button className={cx("search-btn")}>
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchBtn;
