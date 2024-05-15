<script>
    import { userStore } from '$lib/stores';
    import { onMount } from 'svelte';

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
        }
    });
</script>

<main class="p-4">
    {#if user}
        <h1 class="text-2xl font-bold">Welcome, {user.record.name}!</h1>
        <p>This is your personalized homepage.</p>
    {:else}
        <h1 class="text-2xl font-bold">Welcome to My Blog!</h1>
        <p>Please log in to see your personalized content.</p>
    {/if}
</main>
