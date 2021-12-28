import React, {useMemo} from 'react';
import MyButton from "../buttonOld/MyButton";
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

    return (
        <div className={classes.paginator}>
            {pageList.map(page =>
                <MyButton
                    onClick={e => {
                        let page = parseInt((e.target as HTMLElement).dataset.page || "1");
                        setOnPageFilter({...pageFilter, page: page});
                    }}
                    className={classes.paginatorPage + ((page == pageFilter.page) ? (' ' + classes.active): '')}
                    key={page}
                    data-page={page}
                >{page}</MyButton>
            )}
        </div>
    );
};

export default Paginator;
