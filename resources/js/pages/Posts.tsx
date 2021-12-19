import React, {useEffect, useRef, useState} from 'react';
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
import Loader from "../components/UI/Loader/Loader";
import useObserver from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


export default function Posts(): React.ReactElement {
    const [posts, setPosts] = useState<PostList>([]);

    const [filter, setFilter] = useState<PostFilterData>({
        orderBy: 'id',
        titleFilter: ''
    });

    const sortedAndSearchedPosts = usePosts(posts, filter);

    const [addFormVisible, setAddFormVisible] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageFilter, setOnPageFilter] = useState<PageFilter>({page: 1, onPage: 10});
    const listEndAnchor = useRef<HTMLDivElement | null>(null);
    const lastUsedPageFilter = useRef<PageFilter>(pageFilter);
    const [fetchPosts, arePostsLoading, postLoadError] = useFetching(async () => {
        const response = await PostService.getPage(pageFilter);

        if (pageFilter.onPage == lastUsedPageFilter.current.onPage) {
            setPosts([...posts, ...response.data]);
        } else {
            setPosts(response.data);
        }

        lastUsedPageFilter.current = pageFilter;

        setTotalCount(response.headers['x-total-count']);
    });

    useEffect(() => {
        fetchPosts();
    }, [pageFilter.page, pageFilter.onPage]);

    const onAddNewPost = (post: Post) => {
        setPosts([...posts, post]);
        setAddFormVisible(false);
    }

    const onRemovePost = (post: Post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const onChangeOnPage = (value: string) => {
        setOnPageFilter({
            page: 1,
            onPage: parseInt(value)
        });
    }

    useObserver<HTMLDivElement>(
        listEndAnchor,
        arePostsLoading,
        pageFilter.page * pageFilter.onPage < totalCount && pageFilter.onPage != -1,
        () => {
            setOnPageFilter({...pageFilter, page: pageFilter.page + 1});
        }
    );

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

            <MySelect
                value={pageFilter.onPage.toString()}
                onChange={onChangeOnPage}
                options={[
                    {value: '5', title: '5'},
                    {value: '10', title: '10'},
                    {value: '25', title: '25'},
                    {value: '-1', title: 'Показать всё'}
                ]}
            />

            <PostList
                posts={sortedAndSearchedPosts}
                arePostsLoading={arePostsLoading}
                postLoadError={postLoadError}
                onRemovePost={onRemovePost}
                title="Посты про JS!!!"
            />

            { arePostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Loader/>
                </div>
            }

            <div ref={listEndAnchor} style={{background: 'red'}}>&nbsp;</div>

            <Paginator
                pageFilter={pageFilter}
                setOnPageFilter={setOnPageFilter}
                totalCount={totalCount}
            />
        </div>
    );
}
