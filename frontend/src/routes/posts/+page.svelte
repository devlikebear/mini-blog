<script>
    import { onMount } from 'svelte';
    import { fetchPosts, deletePost } from '$lib/api/posts';
    import { userStore } from '$lib/stores';

    let posts = [];
    let user = null;

    onMount(async () => {
        try {
            const fetchedPosts = await fetchPosts();
            posts = fetchedPosts;
        } catch (error) {
            console.error(error);
        }
    });

    userStore.subscribe(value => {
        user = value;
    });

    const handleDelete = async (id) => {
        if (!user) {
            alert('You must be logged in to delete a post.');
            return;
        }
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(id, user.token);
                posts = posts.filter(post => post.id !== id);
            } catch (error) {
                console.error('Failed to delete post:', error);
                alert('Failed to delete post.');
            }
        }
    };
</script>

<main>
    <h1 class="text-4xl font-bold mb-6 text-center">Blog Posts</h1>
    <div class="text-center mb-4">
        <a href="/posts/new" class="bg-button-bg-color hover:bg-button-hover-bg-color text-button-text-color font-semibold py-2 px-4 rounded">Create New Post</a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#if posts.length > 0}
            {#each posts as post (post.id)}
                <div class="card">
                    <a href={`/posts/${post.id}`} class="block mb-2 text-2xl font-semibold text-primary-color hover:text-button-hover-bg-color">{post.title}</a>
                    <p class="text-text-color whitespace-pre-line mb-4">{post.content}</p>
                    <div class="flex space-x-2">
                        <a href={`/posts/${post.id}/edit`} class="bg-button-bg-color hover:bg-button-hover-bg-color text-button-text-color px-4 py-2 rounded">Edit</a>
                        <button on:click={() => handleDelete(post.id)} class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                    </div>
                </div>
            {/each}
        {:else}
            <p class="text-center text-gray-600">No posts available.</p>
        {/if}
    </div>
</main>
