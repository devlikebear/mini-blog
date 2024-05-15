<script>
    import { onMount } from 'svelte';
    import { fetchPosts, deletePost } from '$lib/api/posts';
    import { userStore } from '$lib/stores';
    import { goto } from '$app/navigation';

    let posts = [];
    let user = null;

    onMount(async () => {
        try {
            const fetchedPosts = await fetchPosts();
            console.log(fetchedPosts); // 데이터가 올바르게 출력되는지 확인
            posts = fetchedPosts; // posts 변수에 할당
        } catch (error) {
            console.error(error);
        }
    });

    // 사용자 상태 구독
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
                posts = posts.filter(post => post.id !== id); // 포스트 목록 갱신
            } catch (error) {
                console.error('Failed to delete post:', error);
                alert('Failed to delete post.');
            }
        }
    };
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
                        <p class="text-gray-600 whitespace-pre-line mb-2">{post.content}</p>
                        <div class="flex space-x-2">
                            <a href={`/posts/${post.id}/edit`} class="bg-yellow-500 text-white px-4 py-2 rounded">Edit</a>
                            <button on:click={() => handleDelete(post.id)} class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                        </div>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>No posts available.</p>
        {/if}
    </div>
</main>
