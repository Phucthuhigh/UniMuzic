import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import Image from "../Image";
import styles from "./AccountItem.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={data.link} className={cx("wrapper")}>
            <Image
                className={cx("avatar")}
                src={data.avatar || images.noImage}
                alt={data.name}
            />
            <div className={cx("info")}>
                <h4 className={cx("name")}>
                    <span>{data.name}</span>
                </h4>
                <span className={cx("username")}>{data.follow} Follows</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;