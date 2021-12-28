import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import classes from './MyInput.module.css';

export interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {

}

const MyInput = ({onChange, className, ...props}: MyInputProps) => {
    return (
        <input
            className={classes.myInput + ' ' + (className || '')}
            onChange={e => onChange ? onChange(e) : () => {}}
            {...props}
        />
    );
};

export default MyInput;
