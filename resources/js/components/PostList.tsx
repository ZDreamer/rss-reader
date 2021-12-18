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
                {posts.map((post) =>
                    <PostItem
                        key={post.id}
                        index={post.id}
                        post={post}
                        onRemovePost={onRemovePost}
                    />
                )}
        </div>
    );
};

export default PostList;
