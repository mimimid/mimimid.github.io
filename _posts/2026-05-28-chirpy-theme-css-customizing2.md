---
title: "블로그 만들기 3 - CSS 커스터마이징 (1)"
date: 2026-05-28 16:00:00 +0900
categories: [ Blog, GitHub Blog ]
tags: [github-pages, jekyll, chirpy, scss, css, font]
render_with_liquid: false
---

이전 글에서 GitHub Pages 블로그에 `Chirpy` 테마를 적용했다.

기존에 사용하던 `jekyll-theme-minimal`보다 훨씬 개발 블로그다운 구조가 잡혔고, 카테고리, 태그, 목차, 검색 같은 기능도 생겼다.

그런데 테마를 적용하고 나니 또 욕심이 생겼다.

기본 디자인도 나쁘지는 않았지만, 내 블로그 느낌으로 조금 더 다듬고 싶었다.

특히 아래 부분들이 조금 아쉬웠다.

* 기본 글꼴이 내 취향과 조금 달랐다.
* 코드블럭이 개발일지 느낌과 잘 맞지 않았다.
* 에러 로그와 일반 코드가 똑같이 보여서 구분이 잘 안 됐다.
* CSS가 한 파일에 계속 쌓이면 나중에 관리하기 힘들 것 같았다.

그래서 이번에는 Chirpy 테마 위에 내가 원하는 스타일을 조금씩 덮어씌워보기로 했다.

한 번에 완벽하게 만들 생각은 없고, 일단 보기 싫은 부분부터 하나씩 잡아가기로 했다.

## SCSS 커스터마이징 시작

처음에는 SCSS를 따로 써본 적이 없어서 조금 부담스러웠다.

CSS는 계속 사용해왔지만, SCSS는 뭔가 별도로 컴파일해야 할 것 같고 설정도 복잡할 것 같았다.

그런데 찾아보니 [Jekyll](https://jekyllrb.com/docs/assets/)에서 Sass/SCSS 파일을 처리할 수 있고, `_sass` 폴더를 기본 Sass partial 경로로 사용한다고 설명하고 있었다.

또 [Chirpy](https://chirpy.cotes.page/posts/getting-started/#customizing-the-stylesheet)에서도 스타일을 커스터마이징하려면 `assets/css/jekyll-theme-chirpy.scss` 파일을 같은 경로에 두고, 파일 끝에 커스텀 스타일을 추가하면 된다고 안내하고 있었다.

즉, Jekyll/Chirpy 구조에서는 SCSS를 내가 직접 CSS로 변환하지 않아도 된다.

`bundle exec jekyll serve`를 실행하면 Jekyll이 빌드 과정에서 SCSS를 처리해준다.

그래서 IntelliJ에서 별도로 File Watcher를 설정하거나, `node-sass` 같은 걸 설치할 필요는 없었다.

처음에는 프로젝트의 `assets` 폴더 안에 `css` 폴더가 없었다.

```directory
assets/
├─ images/
└─ lib/
```

그래서 먼저 `assets/css` 폴더를 만들었다.

```terminal
mkdir assets\css
```

그다음 Chirpy 테마 gem 안에 있는 기본 SCSS 파일을 현재 프로젝트로 복사했다.

먼저 설치된 `jekyll-theme-chirpy` gem의 실제 경로를 확인했다.

```terminal
$chirpyPath = bundle info jekyll-theme-chirpy --path
C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/jekyll-theme-chirpy-7.5.0
```
내 경우 `C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/jekyll-theme-chirpy-7.5.0` 경로에 있다고 뜸.

그리고 그 안에 있는 `jekyll-theme-chirpy.scss` 파일을 현재 프로젝트의 `assets/css` 폴더로 복사했다.

```terminal
Copy-Item "$chirpyPath\assets\css\jekyll-theme-chirpy.scss" "assets\css\jekyll-theme-chirpy.scss" -Force
```

이렇게 해서 디자인 수정용 파일을 아래 경로에 만들었다.

```directory
assets/css/jekyll-theme-chirpy.scss
```

정리하면, 새 SCSS 파일을 처음부터 직접 작성한 것이 아니라 Chirpy 테마 gem 안에 있던 기본 SCSS 진입 파일을 같은 경로로 복사한 뒤, 그 아래에 커스텀 스타일을 추가하는 방식으로 진행했다.

이 방식이 좋은 이유는 Chirpy 기본 스타일은 그대로 유지하면서, 내가 필요한 스타일만 덮어쓸 수 있기 때문이다.


처음 파일 내용은 대략 이런 구조였다.

```scss
---
---

/* prettier-ignore */
@use 'main
{%- if jekyll.environment == 'production' -%}
.bundle
{%- endif -%}
';

/* append your custom style below */
```

처음 봤을 때는 이게 SCSS가 맞나 싶었다.

특히 `{%- if jekyll.environment == 'production' -%}` 같은 문법 때문에 IntelliJ에서 빨간 줄도 표시됐다.

그냥 무시해도 되는 건지, 나중에 빌드 오류가 날 수 있는 건지 조금 찝찝해서 찾아봤다.

먼저 [Jekyll의 Front Matter 문서](https://jekyllrb.com/docs/front-matter/)를 보면, 파일 상단에 `---`로 감싼 front matter가 있으면 Jekyll이 해당 파일을 처리 대상으로 인식한다고 되어 있었다.
두 번째로 [Jekyll의 Rendering Process 문서](https://jekyllrb.com/docs/rendering-process/)를 보면, Jekyll은 렌더링 과정에서 Liquid 표현식을 먼저 해석하고, 그 다음 converter 단계에서 Markdown은 HTML로, Sass/SCSS는 CSS로 변환한다고 설명하고 있었다.

아마 이 파일은 순수 SCSS만 있는 파일이 아니라 Jekyll이 먼저 Liquid 문법을 처리한 뒤 SCSS로 변환하는 파일이지 않을까??

IntelliJ 입장에서는 `{%- if ... -%}` 같은 Liquid 문법을 SCSS 문법으로 오해해서 빨간 줄을 표시할 수 있다고 생각하는 중..

먼저 빌드를 시도해봄

```terminal
bundle exec jekyll serve
```

빌드는 성공!

물론 개발이라는 게 지금 된다고 나중에 오류가 없다는 보장은 없지만...
그래도 최소한 이 빨간 줄은 “진짜 SCSS 문법 오류”라기보다는 IntelliJ가 Jekyll/Liquid 전처리 구조를 제대로 해석하지 못해서 생긴 표시라고 일단 판단함

걱정은 했지만, 이번에는 내가 틀린 게 아니라 IDE가 조금 덜 이해한 걸로 하자. (제발!!!!)

그래서 이 기본 코드는 건드리지 않고, `/* append your custom style below */` 아래에만 내가 작성한 CSS를 추가하기로 했다.

## 글꼴 변경

블로그 기본 글꼴은 [Pretendard](https://github.com/orioncactus/pretendard)로 설정했다.<br>
Pretendard가 깔끔하고 읽기 좋아서 무난한 선택이라고 생각했다.

코드블럭 안의 글꼴은 [D2Coding](https://github.com/naver/d2codingfont)으로 설정했다.*(아기자기하고 깔끔하고 귀여운 코딩 폰트 ㅎㅎ)*

글꼴 파일을 직접 저장소에 넣어서 관리하는 방법도 있지만, 이번에는 간단하게 CDN 방식으로 진행하기로 했다.

지금은 블로그 초기 설정 단계라서 글꼴 파일까지 직접 관리하기보다는, CDN으로 빠르게 적용하고 나중에 필요하면 로컬 파일 방식으로 바꾸는 게 낫다고 판단했다.

물론 CDN 방식은 외부 주소에 의존한다는 단점이 있긴 하다.
그래도 지금 단계에서는 설정이 간단하고, 저장소에 글꼴 파일을 따로 넣지 않아도 된다는 점이 더 편했다.

SCSS 파일에 기본으로 있던 코드 아래에 CDN을 추가했다.

```scss
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");

@import url("https://cdn.jsdelivr.net/gh/wan2land/d2coding/d2coding-full.css");
```

전체 기본 글자 크기는 `13px`로 잡았다.

```scss
body {
  font-size: 13px;
}
```

이렇게 해두면 `1em = 13px` 기준으로 계산할 수 있다.

공식문서 찾아볼 시간!! **`em`과 `rem`의 차이점이란??** <br>
[MDN 문서](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units)를 보니 `rem`은 root element의 font-size를 기준으로 하고, `em`은 현재 요소나 부모 요소의 글자 크기 영향을 받는다고 설명되어 있음


* 전체 기준 크기: `rem`
* 부모 글자 크기에 맞춰야 하는 요소: `em`

`px`로 글씨 크기를 설정하면 웹 페이지마다 조금씩 크기가 달라질 수 있기 때문에 em으로 크기를 통일화 시켜줄거다!


```scss
body {
  font-family:
    "Pretendard Variable",
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    sans-serif;
  font-size: 13px;
  line-height: 1.75;
}
```

요렇게

적용하고 로컬서버에서 확인해보니

![2026-06-01 175704.png](/assets/images/2026-06-01/2026-06-01%20175704.png)

아.. 사이드바도 같은 body에 있어서 글씨가 작아짐..ㅠㅠ<br>
처음부터 내가 만든 사이트라면 하나씩 스타일 지정하고 정리해줄텐데 이미 있는 스타일 수정해야하니까 최대한 덜 수정하기 위해서 `body`가 아닌 본문에서만 13px로 적용해야겠다.

```scss
/* 본문 전체 */
#main-wrapper {
  font-size: 13px;
  line-height: 1.8;
}

/* 게시글/페이지 본문 */
.content {
  font-size: 1em;
  line-height: 1.8;
  letter-spacing: -0.01em;
}
```

이렇게 적용해보고 다시 사이트를 확인하니
![2026-06-01 175704.png](/assets/images/2026-06-01/2026-06-01%20180143.png)

본문만 글씨가 정리됌!!!



깔끔쓰.


## 본문 영역 확인

처음에는 다른 Jekyll 테마처럼 게시글 본문 클래스가 `.post-content`일 거라고 생각했다.

그래서 처음에는 이런 식으로 스타일을 작성했다.

```scss
.post-content p {
  line-height: 1.8;
}
```

그런데 적용이 안 됐다.

개발자도구로 확인해보니 Chirpy에서는 게시글 본문이 `.content` 클래스로 잡혀 있었다.

```html
<div class="content">
  ...
</div>
```

그래서 본문 스타일은 `.post-content`가 아니라 `.content` 기준으로 수정했다.

```scss
.content {
  font-size: 1rem;
  line-height: 1.8;
  letter-spacing: -0.01em;
}

.content p {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.1rem;
}
```

CSS를 작성할 때는 역시 실제 HTML 구조를 먼저 확인하자~~~
