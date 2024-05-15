<script>
    export let data;
    $: ({ post } = data);

    import { updatePost } from '$lib/api/posts';
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

    // post가 처음 로드될 때 초기 값 설정
    $: if (post && !title && !content) {
        title = post.title;
        content = post.content;
    }

    const handleSubmit = async () => {
        if (!user) {
            message = 'You must be logged in to edit a post.';
            return;
        }

        try {
            await updatePost(post.id, { title, content }, user.token);
            goto(`/posts/${post.id}`); // 게시물 상세 페이지로 이동
        } catch (error) {
            message = 'Failed to update post: ' + error.message;
        }
    };

    const handleCancel = () => {
        history.back(); // 뒤로 가기
    };
</script>

<main class="p-4">
    {#if post}
        <h1 class="text-2xl font-bold mb-4">Edit Post</h1>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
                <label class="block mb-1">Title:</label>
                <input type="text" bind:value={title} required class="w-full p-2 border rounded" />
            </div>
            <div>
                <label class="block mb-1">Content:</label>
                <textarea bind:value={content} required class="w-full p-2 border rounded"></textarea>
            </div>
            <div class="flex space-x-2">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
                <button type="button" on:click={handleCancel} class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
            <p class="text-red-500">{message}</p>
        </form>
    {:else}
        <p>Loading...</p>
    {/if}
</main>
