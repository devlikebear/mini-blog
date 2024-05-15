import { fetchPost } from '$lib/api/posts';

export async function load({ params }) {
    const post = await fetchPost(params.id);
    return {
            post
    };
}
