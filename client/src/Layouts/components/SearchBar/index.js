import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.scss";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import HeadlessTippy from "@tippyjs/react/headless";
import PopperWrapper from "../../../components/Popper";
import AccountItem from "../../../components/AccountItem";
import SongItem from "../../../components/SongItem";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDebounce } from "../../../hooks";
import * as searchServices from "../../../services/searchServices";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const SearchBar = () => {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState({});
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(input, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult({});
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);
            setSearchResult(result || {});

            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setInput("");
        setSearchResult({});
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) setInput(searchValue);
    };

    const navigate = useNavigate();

    const inputRef = useRef();
    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && Object.keys(searchResult).length > 0}
                render={(attrs) => (
                    <div
                        className={cx("search-result")}
                        tabIndex="-1"
                        {...attrs}>
                        <PopperWrapper>
                            <div className={cx("songs")}>
                                <h4 className={cx("search-title")}>Bài hát</h4>
                                {searchResult.songs &&
                                    searchResult.songs
                                        .slice(0, 5)
                                        .map((song) => (
                                            <SongItem
                                                key={song.encodeId}
                                                data={song}
                                                playlist={searchResult.songs}
                                            />
                                        ))}
                            </div>
                            <div className={cx("accounts")}>
                                <h4 className={cx("search-title")}>Nghệ sĩ</h4>
                                {searchResult.artists &&
                                    searchResult.artists
                                        .slice(0, 3)
                                        .map((artist) => (
                                            <AccountItem
                                                key={artist.id}
                                                data={artist}
                                            />
                                        ))}
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}>
                <div className={cx("search")}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search"
                        spellCheck={false}
                        value={input}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                navigate(`/search?q=${input}`);
                        }}
                    />
                    {!!input && !loading && (
                        <button
                            className={cx("clear-btn")}
                            onClick={handleClear}>
                            <SmallCloseIcon />
                        </button>
                    )}
                    {loading && (
                        <div className={cx("loading")}>
                            <AiOutlineLoading3Quarters />
                        </div>
                    )}
                    <button
                        className={cx("search-btn")}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            navigate(`/search?q=${input}`);
                        }}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default SearchBar;
