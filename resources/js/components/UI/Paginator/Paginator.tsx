import React, {useState, useMemo} from 'react';
import MyButton from "../button/MyButton";
import classes from "./Paginator.module.css";

export type PaginatorProps = {
    pageFilter: PageFilter
    setOnPageFilter(pageFilter: PageFilter): void,
    totalCount: number
}

const Paginator = ({pageFilter, setOnPageFilter, totalCount}: PaginatorProps): JSX.Element => {
    const pageList:Page[] = useMemo((): Page[] => {
        const pageCount = Math.ceil(totalCount / pageFilter.onPage);

        const pageList:Page[] = [];
        for (let i = 1; i <= pageCount; i++) {
            pageList.push(i);
        }

        return pageList;
    }, [pageFilter, totalCount]);

    const onPageSelect = (e): void => {
        setOnPageFilter({...pageFilter, page: e.target.dataset.page});
    };

    return (
        <div className={classes.paginator}>
            {pageList.map(page =>
                <MyButton
                    onClick={onPageSelect}
                    className={classes.paginatorPage + ((page == pageFilter.page) ? (' ' + classes.active): '')}
                    key={page}
                    data-page={page}
                >{page}</MyButton>
            )}
        </div>
    );
};

export default Paginator;
