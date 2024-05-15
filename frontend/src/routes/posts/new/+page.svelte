<script>
    import { createPost } from '$lib/api/posts';
    import { userStore } from '$lib/stores';
    import { goto } from '$app/navigation';

    let title = '';
    let content = '';
    let user = null;
    let message = '';

    userStore.subscribe(value => {
        user = value;
    });

    const handleSubmit = async () => {
        if (!user) {
            message = 'You must be logged in to create a post.';
            return;
        }

        try {
            await createPost({ title, content, authorId: user.id }, user.token);
            goto('/posts');
        } catch (error) {
            message = 'Failed to create post: ' + error.message;
        }
    };

    const handleCancel = () => {
        history.back();
    };
</script>

<main>
    <h1 class="text-4xl font-bold mb-6 text-center">Create New Post</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4 max-w-2xl mx-auto">
        <div>
            <label class="block mb-1">Title:</label>
            <input type="text" bind:value={title} required class="w-full p-2 border rounded bg-white text-primary-color" />
        </div>
        <div>
            <label class="block mb-1">Content:</label>
            <textarea bind:value={content} required class="w-full p-2 border rounded bg-white text-primary-color"></textarea>
        </div>
        <div class="flex space-x-2 justify-center">
            <button type="submit" class="bg-button-bg-color hover:bg-button-hover-bg-color text-button-text-color px-4 py-2 rounded">Create Post</button>
            <button type="button" on:click={handleCancel} class="bg-gray-500 hover:bg-gray-600 text-button-text-color px-4 py-2 rounded">Cancel</button>
        </div>
        <p class="text-red-500 text-center">{message}</p>
    </form>
</main>
