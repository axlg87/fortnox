import React, { ReactNode } from "react";
import classNames from "classnames";
import './Card.scss';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export default function Card({ children, className }: CardProps) {
    const classes = classNames("card", className);

    return (
        <div className={classes}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}