import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../api/posts";
import AddPost from "../components/AddPost";
import { useNavigate } from "react-router-dom";

const PostLists = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, error, data: posts } = useQuery({
        queryKey: ['lokesh'],
        queryFn: fetchPosts,
    });
    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lokesh'] });
        }
    });

    const handleDelete = (id) => {
        deletePostMutation.mutate(id)
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Add New Post</h1>
            <AddPost />
            {posts.map(post => (
                <div key={post.id} style={{ background: '#777' }}>
                    <h4 style={{ cursor: "pointer" }} onClick={() => navigate(`post/${post.id}`)}>{post.title}</h4>
                    <button onClick={() => navigate(`post/${post.id}/edit`)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))
            }
        </div>
    );
}

export default PostLists;
