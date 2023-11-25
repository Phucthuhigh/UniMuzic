import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import Image from "../Image";
import styles from "./AccountItem.module.scss";
import images from "../../assets/images";
import { formatNumber } from "../../utils/formatNumber";

const cx = classNames.bind(styles);

function AccountItem({ data, disableFollow }) {
    return (
        data && (
            <Link to={`/artist/${data.alias}`} className={cx("wrapper")}>
                <Image
                    className={cx("avatar")}
                    src={data.thumbnailM || data.thumbnail || images.noImage}
                    alt={data.name}
                />
                <div className={cx("info")}>
                    <h4 className={cx("name")}>
                        <span>{data.name}</span>
                    </h4>
                    {!disableFollow && (
                        <span className={cx("follow")}>
                            {data.totalFollow
                                ? formatNumber(data.totalFollow)
                                : 0}{" "}
                            Follows
                        </span>
                    )}
                </div>
            </Link>
        )
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
