<script>
    import { createPost } from '$lib/api/posts';
    import { userStore } from '$lib/stores';
    import { goto } from '$app/navigation';

    let title = '';
    let content = '';
    let user = null;
    let message = '';

    // 사용자 상태 구독
    userStore.subscribe(value => {
        user = value;
    });

    const handleSubmit = async () => {
        if (!user) {
            message = 'You must be logged in to create a post.';
            return;
        }

        try {
            await createPost({ title, content, authorId: user.id }, user.token); // authorId 추가
            goto('/posts'); // 게시물 목록 페이지로 이동
        } catch (error) {
            message = 'Failed to create post: ' + error.message;
        }
    };
</script>

<main class="p-4">
    <h1 class="text-2xl font-bold mb-4">Create New Post</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
            <label class="block mb-1">Title:</label>
            <input type="text" bind:value={title} required class="w-full p-2 border rounded" />
        </div>
        <div>
            <label class="block mb-1">Content:</label>
            <textarea bind:value={content} required class="w-full p-2 border rounded"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Create Post</button>
        <p class="text-red-500">{message}</p>
    </form>
</main>
