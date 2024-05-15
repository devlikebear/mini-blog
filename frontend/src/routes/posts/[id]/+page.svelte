<script>
    export let data;
    $: ({ post } = data)
</script>

<main class="p-4">
    {#if post}
        <h1 class="text-2xl font-bold mb-4">{post.title}</h1>
        <p class="text-gray-600 mb-4">{post.content}</p>
        <a href={`/posts/${post.id}/edit`} class="bg-yellow-500 text-white px-4 py-2 rounded">Edit Post</a>
    {:else}
        <p>Loading2...</p>
    {/if}
</main>
