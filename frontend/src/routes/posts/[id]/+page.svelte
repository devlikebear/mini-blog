<script>
    export let data;
    $: ({ post } = data);

    const handleBack = () => {
        history.back();
    };
</script>

<main>
    {#if post}
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-4xl font-bold mb-4 text-center">{post.title}</h1>
            <p class="text-gray-600 whitespace-pre-line mb-4">{post.content}</p>
            <div class="flex space-x-2 justify-center">
                <a href={`/posts/${post.id}/edit`} class="bg-button-bg-color hover:bg-button-hover-bg-color text-button-text-color px-4 py-2 rounded">Edit Post</a>
                <button on:click={handleBack} class="bg-gray-500 hover:bg-gray-600 text-button-text-color px-4 py-2 rounded">Back</button>
            </div>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</main>
