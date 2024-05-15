# PocketBase와 SvelteKit을 사용한 미니 블로그

## 프로젝트 구조

프로젝트는 크게 두 부분으로 나뉩니다: 백엔드(PocketBase)와 프론트엔드(SvelteKit). 주요 파일과 폴더는 다음과 같습니다:

1. **백엔드 (PocketBase)**

- main.go: PocketBase 서버를 설정하는 파일입니다.
- go.mod, go.sum: Go 모듈과 종속성을 관리하는 파일입니다.
- Makefile: 빌드 및 실행 명령을 정의하는 파일입니다.

2. **프론트엔드 (SvelteKit)**

- svelte.config.js: SvelteKit의 설정 파일입니다.
- vite.config.js: Vite 빌드 도구의 설정 파일입니다.
- package.json: 프로젝트의 종속성과 스크립트를 정의하는 파일입니다.
- src: Svelte 구성 요소와 라우트를 포함하는 폴더입니다.

## 백엔드 설정 (PocketBase)

### main.go

이 파일은 PocketBase 서버를 설정하고 실행하는 역할을 합니다. 주요 코드 부분을 살펴보겠습니다:

```go
package main

import (
    "log"
    "net/http"
    "github.com/pocketbase/pocketbase"
)

func main() {
    app := pocketbase.New()

    // 정적 파일 제공을 위한 라우트 설정
    app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
        e.Router.GET("/*", http.FileServer(http.Dir("frontend/dist")).ServeHTTP)
        return nil
    })

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}
```

위 코드는 PocketBase 인스턴스를 생성하고, 정적 파일을 제공하기 위해 라우트를 설정합니다. 그런 다음 서버를 시작합니다.

## 프론트엔드 설정 (SvelteKit)

### svelte.config.js

이 파일은 SvelteKit의 설정을 정의합니다:

```js
import adapter from '@sveltejs/adapter-static';

export default {
    kit: {
        adapter: adapter({
            // 기본 설정
        })
    }
};
```
### vite.config.js

Vite의 설정 파일로, 주로 빌드와 관련된 옵션을 정의합니다:

```js
import { sveltekit } from '@sveltejs/kit/vite';

export default {
    plugins: [sveltekit()]
};
```

### package.json

프로젝트의 종속성과 스크립트를 정의합니다:

```json
{
    "name": "sveltekit-pocketbase",
    "version": "1.0.0",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "@sveltejs/kit": "next",
        "pocketbase": "^0.7.0",
        "svelte": "^3.42.0"
    }
}
```

## 예제 Svelte 페이지

`src/routes/+page.svelte` 파일을 생성하여 간단한 블로그 페이지를 만듭니다:

```js
<script>
    import { onMount } from 'svelte';
    let posts = [];

    onMount(async () => {
        const res = await fetch('/api/collections/posts/records');
        posts = await res.json();
    });
</script>

<main>
    <h1>My Blog</h1>
    <ul>
        {#each posts as post}
            <li>{post.title}</li>
        {/each}
    </ul>
</main>
```

이 코드는 페이지가 로드될 때 PocketBase API를 호출하여 게시물 목록을 가져오고 이를 화면에 표시합니다.

## 프로젝트 빌드 및 실행

1. 개발:
```bash
make dev
```
2. 빌드:
```bash
make build
```
3. 실행:
```bash
make start
```
