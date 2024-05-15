<script>
    export let data;
    $: ({ post } = data);

    const handleBack = () => {
        history.back(); // 뒤로 가기
    };
</script>

<main class="p-4">
    {#if post}
        <h1 class="text-2xl font-bold mb-4">{post.title}</h1>
        <p class="text-gray-600 whitespace-pre-line mb-4">{post.content}</p>
        <div class="flex space-x-2">
            <a href={`/posts/${post.id}/edit`} class="bg-yellow-500 text-white px-4 py-2 rounded">Edit Post</a>
            <button on:click={handleBack} class="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</main>
