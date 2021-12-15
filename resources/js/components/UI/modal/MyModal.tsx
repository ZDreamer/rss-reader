import React, {PropsWithChildren} from 'react';
import classes from './MyModal.module.css';

type MyModalProps = {
    visible: Boolean,
    setVisible(Boolean): void
};

const MyModal = ({children, visible, setVisible}: PropsWithChildren<MyModalProps>) => {
    const onBackgroundClick = function (e) {
        setVisible(false)
    }

    const rootClasses = [classes.myModal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={onBackgroundClick}
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
