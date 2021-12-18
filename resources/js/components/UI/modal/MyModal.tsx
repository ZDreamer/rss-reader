import React, {PropsWithChildren} from 'react';
import classes from './MyModal.module.css';

type MyModalProps = {
    visible: boolean,
    setVisible(visible: boolean): void
};

const MyModal = ({children, visible, setVisible}: PropsWithChildren<MyModalProps>) => {
    const rootClasses = [classes.myModal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={() => {setVisible(false)}}
        >
            <div
                className={classes.myModalContent}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default MyModal;
