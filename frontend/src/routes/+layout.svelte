<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { userStore } from '$lib/stores';
    import '../app.css'; // app.css import
    import '../theme.css'; // theme.css import
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let theme = 'light';
    let user = null;

    onMount(() => {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            theme = savedTheme;
            document.documentElement.setAttribute('data-theme', theme);
        }

        // Check for logged in user
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            userStore.set(storedUser);
        }
    });

    userStore.subscribe(value => {
        user = value;
    });

    const toggleTheme = () => {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        userStore.set(null); // 사용자 상태 업데이트
        goto('/login');
    };
</script>

<Header {toggleTheme} {handleLogout} />

<main class="container mx-auto p-4">
    <slot />
</main>

<Footer />
