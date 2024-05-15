const baseUrl = '/api';

export async function fetchPosts() {
    const response = await fetch(`${baseUrl}/collections/posts/records`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return data.items; // data.items 반환
}

export async function fetchPost(id) {
    const response = await fetch(`${baseUrl}/collections/posts/records/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }

    const data = await response.json();
    return data;
}

export async function createPost(data, token) {
    const response = await fetch(`${baseUrl}/collections/posts/records`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    return response.json();
}

export async function updatePost(id, data, token) {
    const response = await fetch(`${baseUrl}/collections/posts/records/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update post');
    }

    return response.json();
}

export async function deletePost(id, token) {
    const response = await fetch(`${baseUrl}/collections/posts/records/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete post');
    }

    return response.json();
}
