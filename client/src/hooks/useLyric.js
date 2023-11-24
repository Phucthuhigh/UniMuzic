import { useEffect, useState } from "react";
import { getLyric } from "../services/getLyric";

const useLyric = (songId) => {
    const [lyr, setLyr] = useState();

    useEffect(() => {
        (async () => {
            if (songId !== null && songId !== "") {
                const dataLyric = await getLyric(songId);

                if (dataLyric.success) {
                    let customLyr = [];

                    dataLyric.items.data.sentences &&
                        dataLyric.items.data.sentences.forEach((e) => {
                            let lineLyric = "";
                            let sTime = 0;
                            let eTime = 0;

                            e.words.forEach((element, index) => {
                                if (index === 0) {
                                    sTime = element.startTime;
                                }
                                if (index === e.words.length - 1) {
                                    eTime = element.endTime;
                                }
                                lineLyric = lineLyric + element.data + " ";
                            });
                            customLyr.push({
                                startTime: sTime,
                                endTime: eTime,
                                data: lineLyric,
                            });
                        });

                    setLyr(customLyr);
                }
            }
        })();
    }, [songId]);

    return lyr;
};

export default useLyric;
