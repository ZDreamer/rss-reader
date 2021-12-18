import {useMemo} from "react";

export const usePosts = (posts: PostList, filter: PostFilterData): PostList => {
    return useMemo(() => {
        let sortedPosts = [...posts].sort((a, b) => {
            if (filter.orderBy == 'id') {
                return a[filter.orderBy] > b[filter.orderBy] ? 1 : 0;
            } else {
                return a[filter.orderBy].localeCompare(b[filter.orderBy]);
            }
        });

        return sortedPosts.filter(
            (post:Post) => post.title.toLocaleLowerCase().includes(filter.titleFilter.toLocaleLowerCase())
        )
    }, [posts, filter]);
}
