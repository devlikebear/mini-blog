<script>
    import { register } from '$lib/api';
    import { goto } from '$app/navigation';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let message = '';

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            message = 'Passwords do not match!';
            return;
        }
        
        try {
            const user = await register(email, password);
            sessionStorage.setItem('user', JSON.stringify(user)); // 세션에 사용자 정보 저장
            goto('/'); // 회원가입 성공 후 홈으로 이동
        } catch (error) {
            message = 'Registration failed: ' + error.message;
        }
    };
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 class="text-2xl font-bold text-center">Register</h1>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
                <label class="block mb-1">Email:</label>
                <input type="email" bind:value={email} required class="w-full p-2 border rounded" />
            </div>
            <div>
                <label class="block mb-1">Password:</label>
                <input type="password" bind:value={password} required class="w-full p-2 border rounded" />
            </div>
            <div>
                <label class="block mb-1">Confirm Password:</label>
                <input type="password" bind:value={confirmPassword} required class="w-full p-2 border rounded" />
            </div>
            <button type="submit" class="w-full p-2 text-white bg-blue-600 rounded">Register</button>
        </form>
        <p class="text-center text-red-500">{message}</p>
    </div>
</main>
