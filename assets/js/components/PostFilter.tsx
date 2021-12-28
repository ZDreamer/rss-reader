import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

type PostFilterProps = {
    filter:PostFilterData,
    setFilter(filter:PostFilterData):void
}

const PostFilter = ({filter, setFilter}:PostFilterProps) => {
    return (
        <form>
            <input/>
            <MyInput
                value={filter.titleFilter}
                onChange={e => setFilter({...filter, titleFilter: e.target.value})}
            />

            <MySelect
                value={filter.orderBy}
                onChange={(value:PostFilterDataOrderBy) => setFilter({...filter, orderBy: value})}
                options={[
                    {value: 'id', title: 'По номеру'},
                    {value: 'title', title: 'По названию'},
                    {value: 'body', title: 'По описанию'}
                ]}
            />
        </form>
    );
};

export default PostFilter;
