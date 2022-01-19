import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API_old/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostPage = (): JSX.Element => {
    const params = useParams();

    const [post, setPost] = useState<Post>();
    const [postComments, setPostComments] = useState<PostComments>();

    const [fetchPost, isPostLoading, postLoadError] = useFetching(async (id) => {
        const response = await PostService.get(id);

        setPost(response.data);
    });

    const [fetchComments, areCommentsLoading, commentsLoadError] = useFetching(async (id) => {
        const response = await PostService.getComments(id);

        setPostComments(response.data);
    });

    useEffect(() => {
        fetchPost(params.id);
        fetchComments(params.id);
    }, []);

    if (!params.id) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Пост не найдены!
            </h1>
        );
    }

    if (postLoadError || commentsLoadError) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Произошла ошибка {postLoadError || commentsLoadError}
            </h1>
        );
    }

    return (
        <div>
            {(isPostLoading || !post) ?
                <Loader/>
            :
                <div>
                    <h1>{post.id}: {post.title}</h1>

                    {post.body}
                </div>
            }

            <h1>Комментарии</h1>

            {(areCommentsLoading || !postComments) ?
                <Loader/>
            :
                <div>
                    {postComments.map((comment) =>
                        <div style={{marginTop: '15px'}} key={comment.id}>
                            <h3>[{comment.email}]: {comment.name}</h3>
                            {comment.body}
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostPage;
