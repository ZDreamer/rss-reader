import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";

export type PostItemProps = {
    index: number
    post: Post,
    onRemovePost(post: Post): any
}

const PostItem = ({index, post, onRemovePost}: PostItemProps) => {
    let navigate = useNavigate();

    const onOpenPost = (post: Post): void => {
        navigate(`/posts/${post.id}`);
    }

    return (
        <div className="post">
            <div className="post__content">
                <strong>{index}. {post.title}</strong>
                <div>{post.body}</div>
            </div>
            <div className="post__buttons">
                <MyButton onClick={() => onOpenPost(post)}>Открыть</MyButton>
                <MyButton onClick={() => onRemovePost(post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
