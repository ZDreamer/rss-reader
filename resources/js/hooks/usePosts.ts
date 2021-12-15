import {useMemo} from "react";

export const usePosts = (posts: PostDataList, filter: PostFilterData): PostDataList => {
    return useMemo(() => {
        let sortedPosts = [...posts].sort((a, b) => {
            if (filter.orderBy == 'id') {
                return a[filter.orderBy]> b[filter.orderBy];
            } else {
                return a[filter.orderBy].localeCompare(b[filter.orderBy]);
            }
        });

        return sortedPosts.filter(
            (post:PostData) => post.title.toLocaleLowerCase().includes(filter.titleFilter.toLocaleLowerCase())
        )
    }, [posts, filter]);
}
