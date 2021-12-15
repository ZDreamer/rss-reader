import React, {useEffect, useState} from 'react';
import '../../css/App.css';
import PostList from "./../components/PostList";
import PostForm from "./../components/PostForm";
import PostFilter from "./../components/PostFilter";
import MyModal from "./../components/UI/modal/MyModal";
import MyButton from "./../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Paginator from "./../components/UI/Paginator/Paginator";

export default function Posts() {
    const [posts, setPosts] = useState<PostDataList>([]);

    const [filter, setFilter] = useState<PostFilterData>({
        orderBy: 'id',
        titleFilter: ''
    });

    const sortedAndSearchedPosts = usePosts(posts, filter);

    const [addFormVisible, setAddFormVisible] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageFilter, setOnPageFilter] = useState<PageFilter>({page: 1, onPage: 10});

    const [fetchPosts, arePostsLoading, postLoadError] = useFetching(async () => {
        const response = await PostService.getPage(pageFilter);
        setPosts(response.data);
        setTotalCount(response.headers['x-total-count']);
    });

    const onAddNewPost = (post: PostData) => {
        setPosts([...posts, post]);
        setAddFormVisible(false);
    }

    const onRemovePost = (post: PostData) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    useEffect(() => {
        fetchPosts();
    }, [pageFilter]);

    return (
        <div className="App">
            <MyButton
                style={{marginTop: '10px'}}
                onClick={() => setAddFormVisible(true)}
            >Добавить пост</MyButton>

            <MyModal visible={addFormVisible} setVisible={setAddFormVisible}>
                <PostForm
                    onAddNewPost={onAddNewPost}
                />
            </MyModal>

            <hr style={{ margin: '15px 0'}}/>

            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <PostList
                posts={sortedAndSearchedPosts}
                arePostsLoading={arePostsLoading}
                postLoadError={postLoadError}
                onRemovePost={onRemovePost}
                title="Посты про JS!!!"
            />

            <Paginator
                pageFilter={pageFilter}
                setOnPageFilter={setOnPageFilter}
                totalCount={totalCount}
            />
        </div>
    );
}
