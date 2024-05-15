<script>
    import { onMount } from 'svelte';
    import { fetchPosts } from '$lib/api/posts';

    let posts = [];

    onMount(async () => {
        try {
            posts = await fetchPosts();
        } catch (error) {
            console.error(error);
        }
    });
</script>

<main class="p-4">
    <h1 class="text-2xl font-bold mb-4">Blog Posts</h1>
    <a href="/posts/new" class="bg-green-500 text-white px-4 py-2 rounded">Create New Post</a>
    <div class="mt-4">
        {#if posts.length > 0}
            <ul class="space-y-4">
                {#each posts as post (post.id)}
                    <li class="p-4 bg-white shadow rounded">
                        <a href={`/posts/${post.id}`} class="text-xl font-bold">{post.title}</a>
                        <p class="text-gray-600">{post.content}</p>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>No posts available.</p>
        {/if}
    </div>
</main>
