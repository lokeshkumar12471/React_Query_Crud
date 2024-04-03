import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPost, updatePost } from "../api/posts";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

const EditPost = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, error, data: post } = useQuery({
        queryKey: ['lokesh', id],
        queryFn: () => fetchPost(id),
    });

    const updatedPostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lokesh'] });
            navigate("/")
        }
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleSubmit = (updatedPost) => {
        console.log(updatedPost);
        updatedPostMutation.mutate({ id, ...updatedPost });
    }
    return (
        <div>
            <PostForm onSubmit={handleSubmit} initialValue={post} />
        </div>
    );
}

export default EditPost;
