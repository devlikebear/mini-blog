<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let user = null;

    // 세션에서 사용자 정보 가져오기
    onMount(() => {
        user = JSON.parse(sessionStorage.getItem('user'));
    });

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        user = null;
        goto('/login');
    };
</script>

<header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="text-2xl font-bold">My Blog</div>
    <nav class="flex items-center space-x-4">
        {#if user}
            <img src={user.avatarUrl} alt="User Avatar" class="w-8 h-8 rounded-full">
            <button on:click={handleLogout} class="bg-red-500 px-3 py-1 rounded">Logout</button>
        {:else}
            <a href="/login" class="bg-blue-500 px-3 py-1 rounded">Login</a>
            <a href="/register" class="bg-green-500 px-3 py-1 rounded">Register</a>
        {/if}
    </nav>
</header>

<style>
    nav a {
        text-decoration: none;
        color: white;
    }

    nav a:hover {
        text-decoration: underline;
    }
</style>
