<script>
    import { login } from '$lib/api/auth';
    import { userStore } from '$lib/stores';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let message = '';

    const handleSubmit = async () => {
        try {
            const user = await login(email, password);
            sessionStorage.setItem('user', JSON.stringify(user)); // 세션에 사용자 정보 저장
            userStore.set(user); // 사용자 상태 업데이트
            goto('/'); // 로그인 성공 후 홈으로 이동
        } catch (error) {
            message = 'Login failed: ' + error.message;
        }
    };
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 class="text-2xl font-bold text-center">Login</h1>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
                <label class="block mb-1">Email:</label>
                <input type="email" bind:value={email} required class="w-full p-2 border rounded" />
            </div>
            <div>
                <label class="block mb-1">Password:</label>
                <input type="password" bind:value={password} required class="w-full p-2 border rounded" />
            </div>
            <button type="submit" class="w-full p-2 text-white bg-blue-600 rounded">Login</button>
        </form>
        <p class="text-center text-red-500">{message}</p>
    </div>
</main>
