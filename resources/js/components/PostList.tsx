import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Loader from "./UI/Loader/Loader";

export type PostListProps = {
    title: string
    posts: Array<any>,
    arePostsLoading: boolean,
    postLoadError: string,
    onRemovePost(post: PostData): any
}

const PostList = ({posts, title, onRemovePost, arePostsLoading, postLoadError}: PostListProps) => {
    if (arePostsLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                <Loader/>
            </div>

        );
    }

    if (postLoadError) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Произошла ошибка {postLoadError}
            </h1>
        );
    }

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        );
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
                <TransitionGroup>
                    {posts.map((post) =>
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames="post"
                        >
                            <PostItem
                                index={post.id}
                                post={post}
                                onRemovePost={onRemovePost}
                            />
                        </CSSTransition>
                    )}
                </TransitionGroup>
        </div>
    );
};

export default PostList;
