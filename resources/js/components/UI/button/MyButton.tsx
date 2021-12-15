import React, {PropsWithChildren} from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}: PropsWithChildren<any>) => {
    return (
        <button {...props} className={classes.myBtn + ' ' + (props.className || '')}>
            {children}
        </button>
    );
};

export default MyButton;
