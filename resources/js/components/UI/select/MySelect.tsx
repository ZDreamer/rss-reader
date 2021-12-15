import React from 'react';

type MySelectPropsOption = {
    value: string,
    title: string
}

export type MySelectProps = {
    options: Array<MySelectPropsOption>,
    value: string,
    onChange?(value: any): void
}

const MySelect = ({
    options,
    onChange,
    value
}: MySelectProps) => {
    return (
        <select
            value={value}
            onChange={e => onChange ? onChange(e.target.value) : () => {}}
        >
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.title}
                </option>
            )}
        </select>
    );
};

export default MySelect;
