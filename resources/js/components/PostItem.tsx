import React from 'react';
import MyButton from "./UI/button/MyButton";

export type PostItemProps = {
    index: number
    post: PostData,
    onRemovePost(PostData): any
}

const PostItem = ({index, post, onRemovePost}: PostItemProps) => {
    return (
        <div className="post">
            <div className="post__content">
                <strong>{index}. {post.title}</strong>
                <div>{post.body}</div>
            </div>
            <div className="post__buttons">
                <MyButton
                    onClick={() => onRemovePost(post)}
                >Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
