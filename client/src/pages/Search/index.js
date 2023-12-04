import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useSearchParams } from "react-router-dom";
import * as searchServices from "../../services/searchServices";
import Spinner from "../../components/Spinner";
import Playlists from "../../components/Playlists";
import Songs from "../../components/Songs";
import Artists from "../../components/Artists";
import SongItem from "../../components/SongItem";
import AccountCard from "../../components/AccountCard";
import PlaylistCard from "../../components/PlaylistCard";

const cx = classNames.bind(styles);

const Search = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState({});

    useEffect(() => {
        (async () => {
            setLoading(true);

            const result = await searchServices.search(searchParams.get("q"));
            setSearchResult(result || {});

            setLoading(false);
        })();
    }, [searchParams]);

    console.log(searchResult.top);

    return loading || Object.keys(searchResult).length === 0 ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            <div className={cx("special")}>
                <h1 className={cx("title")}>Nổi bật</h1>
                <div className={cx("content")}>
                    {searchResult.top &&
                        (searchResult.top.objectType === "song" ? (
                            <SongItem data={searchResult.top} />
                        ) : searchResult.top.objectType === "artist" ? (
                            <AccountCard
                                data={searchResult.top}
                                disableFollow
                            />
                        ) : (
                            <PlaylistCard data={searchResult.top} />
                        ))}
                </div>
            </div>
            <Songs
                list={searchResult.songs}
                title={"Bài hát"}
                itemWidth={380}
            />
            <Playlists list={searchResult.playlists} title={"Playlist"} />
            <Artists list={searchResult.artists} title={"Nghệ sĩ"} />
        </div>
    );
};

export default Search;
