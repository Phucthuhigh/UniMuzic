import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import Image from "../Image";
import styles from "./AccountItem.module.scss";
import images from "../../assets/images";
import { formatNumber } from "../../utils/formatNumber";

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/artist/${data.alias}`} className={cx("wrapper")}>
            <Image
                className={cx("avatar")}
                src={data.thumbnailM || images.noImage}
                alt={data.name}
            />
            <div className={cx("info")}>
                <h4 className={cx("name")}>
                    <span>{data.name}</span>
                </h4>
                {data.totalFollow && (
                    <span className={cx("follow")}>
                        {formatNumber(data.totalFollow)} Follows
                    </span>
                )}
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
