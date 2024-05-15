import { handle } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
    const session = event.request.headers.get('cookie');
    event.locals.user = session ? JSON.parse(session) : null;

    // 모든 페이지에서 세션 확인
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%user%', JSON.stringify(event.locals.user))
    });

    return response;
};
