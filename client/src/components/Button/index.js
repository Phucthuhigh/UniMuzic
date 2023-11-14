import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Button = ({
    to,
    href,
    primary,
    rounded,
    outline,
    text,
    disabled,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) => {
    let Comp = "button";
    const props = {
        ...passProps,
    };

    if (!disabled) {
        props.onClick = onClick;
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }

    const classes = cx("btn", {
        [className]: className,
        primary,
        rounded,
        outline,
        text,
        disabled,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
            <span className={cx("title")}>{children}</span>
            {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
        </Comp>
    );
};

export default Button;
