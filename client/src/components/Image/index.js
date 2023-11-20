import PropTypes from "prop-types";
import { forwardRef } from "react";
import classNames from "classnames";
import images from "../../assets/images";
import styles from "./Image.module.scss";

const Image = forwardRef(
    ({ src, alt, className, fallback = images.noImage, ...props }, ref) => {
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={src || fallback}
                alt={alt}
                {...props}
            />
        );
    }
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
