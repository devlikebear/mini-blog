const baseUrl = '/api';
const defaultAvatarUrl = 'https://ui-avatars.com/api/?name=User&background=random';

export async function register(email, password) {
    const response = await fetch(`${baseUrl}/collections/users/records`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            passwordConfirm: password // PocketBase requires confirmation
        })
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return response.json();
}

export async function login(email, password) {
    const response = await fetch(`${baseUrl}/collections/users/auth-with-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identity: email,
            password: password
        })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const user = await response.json();
    // 아바타 URL 설정
    user.avatarUrl = user.avatar 
        ? `${baseUrl}/files/${user.collectionId}/${user.id}/${user.avatar}` 
        : defaultAvatarUrl; // 기본 아바타 이미지 사용
    return user;
}
