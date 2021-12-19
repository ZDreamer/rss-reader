import React, {ButtonHTMLAttributes} from 'react';
import classes from './MyButton.module.css';

export interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const MyButton = ({children, ...props}: MyButtonProps) : JSX.Element => {
    return (
        <button {...props} className={classes.myBtn + ' ' + (props.className || '')}>
            {children}
        </button>
    );
};

export default MyButton;
