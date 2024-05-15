<script>
    import { userStore } from '$lib/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let user = null;

    // 사용자 상태 구독
    userStore.subscribe(value => {
        user = value;
    });

    // 세션에서 사용자 정보 가져오기
    onMount(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            userStore.set(storedUser);
        } else {
            goto('/login'); // 로그인되지 않은 경우 로그인 페이지로 이동
        }
    });
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100">
    {#if user}
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div class="flex flex-col items-center space-y-4">
                <img src={user.avatarUrl} alt="User Avatar" class="w-24 h-24 rounded-full border-2 border-gray-300">
                <h1 class="text-2xl font-bold">{user.name}</h1>
                <p class="text-gray-600"><strong>Email:</strong> {user.email}</p>
                <p class="text-gray-600"><strong>Username:</strong> {user.username}</p>
                <p class="text-gray-600"><strong>Created:</strong> {new Date(user.created).toLocaleDateString()}</p>
                <p class="text-gray-600"><strong>Last Updated:</strong> {new Date(user.updated).toLocaleDateString()}</p>
            </div>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</main>
