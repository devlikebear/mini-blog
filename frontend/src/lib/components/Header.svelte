<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { userStore } from '$lib/stores';
    import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

    export let toggleTheme;
    export let handleLogout;

    let user = null;
    let themeIcon = faMoon;

    userStore.subscribe(value => {
        user = value;
    });

    onMount(() => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            themeIcon = faSun;
        } else {
            themeIcon = faMoon;
        }
    });

    const handleToggleTheme = () => {
        toggleTheme();
        $: themeIcon = (document.documentElement.getAttribute('data-theme') === 'dark') ? faSun : faMoon;
        
        // if (document.documentElement.getAttribute('data-theme') === 'dark') {
        //     themeIcon = faSun;
        // } else {
        //     themeIcon = faMoon;
        // }
    };
</script>

<header class="bg-primary-color text-white p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
        <h1 class="text-2xl font-bold cursor-pointer" on:click={() => goto('/')}>My Blog</h1>
        <a href="/posts" class="hover:text-button-hover-bg-color">Posts</a>
    </div>
    <div class="flex items-center space-x-4">
        {#if user}
            <button on:click={handleLogout} class="text-button-text-color px-4 py-2 rounded">Logout</button>
            <a href="/profile">
                <img src={user.avatarUrl} alt="User Avatar" class="w-8 h-8 rounded-full">
            </a>
        {:else}
            <a href="/login" class="text-button-text-color px-4 py-2 rounded">Login</a>
            <a href="/register" class="text-button-text-color px-4 py-2 rounded">Register</a>
        {/if}
        <button on:click={handleToggleTheme} class="text-button-text-color px-4 py-2 rounded">
            <FontAwesomeIcon icon={themeIcon} />
        </button>
    </div>
</header>

<style>
    header {
        background-color: var(-background-color);
        color: var(--text-color);
    }
   

    a {
        color: var(--text-color);
    }

    a:hover {
        color: var(--button-hover-bg-color);
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }
</style>
