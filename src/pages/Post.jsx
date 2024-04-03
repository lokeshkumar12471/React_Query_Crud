import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../api/posts";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, error, data: post } = useQuery({
        queryKey: ['lokesh', id],
        queryFn: () => fetchPost(id),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <button onClick={() => navigate('/')}>Back to list posts</button>
            <h1> {post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}

export default Post;
