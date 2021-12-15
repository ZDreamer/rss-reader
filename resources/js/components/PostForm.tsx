import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

export type PostFormProps = {
    onAddNewPost(post: PostData): void
}

const PostForm = ({onAddNewPost}: PostFormProps) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = function (e) {
        e.preventDefault();

        onAddNewPost({...post, id: Date.now()});

        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text" placeholder="Название поста"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text" placeholder="Описание поста"
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;
