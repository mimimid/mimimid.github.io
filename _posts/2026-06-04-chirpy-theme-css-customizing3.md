---
title: "블로그 만들기 4 - CSS 커스터마이징 (2)"
date: 2026-06-05 11:40:00 +0900
categories: [ Blog, GitHub Blog ]
tags: [ github-pages, jekyll, chirpy, scss, css, Rouge ]
render_with_liquid: false
---

[//]: # (<nav class="post-toc-simple" aria-label="게시글 목차">)

[//]: # (  <div class="post-toc-simple__header">)

[//]: # (    <span class="post-toc-simple__eyebrow">이번 글의 흐름</span>)

[//]: # (    <h2>코드블럭 커스터마이징 정리</h2>)

[//]: # (    <p>)

[//]: # (      Rouge로 코드 하이라이팅을 정리하고, SCSS로 코드블럭 외형을 따로 다듬었다.)

[//]: # (    </p>)

[//]: # (  </div>)

[//]: # ()
[//]: # (  <div class="post-toc-simple__grid">)

[//]: # (    <div class="post-toc-simple__section">)

[//]: # (      <a class="post-toc-simple__main" href="#코드블럭-커스터마이징-구조-나누기">)

[//]: # (        <span>00</span>)

[//]: # (        구조 나누기)

[//]: # (      </a>)

[//]: # (      <p>하이라이팅과 외형 스타일 파일을 분리했다.</p>)

[//]: # (    </div>)

[//]: # ()
[//]: # (    <div class="post-toc-simple__section">)

[//]: # (      <a class="post-toc-simple__main" href="#1-rouge-코드">)

[//]: # (        <span>01</span>)

[//]: # (        Rouge 코드)

[//]: # (      </a>)

[//]: # (      <p>문법 하이라이팅 테마와 token 색상을 정리했다.</p>)

[//]: # ()
[//]: # (      <ul>)

[//]: # (        <li><a href="#코드블럭-디자인-방향-정하기">코드블럭 디자인 방향 정하기</a></li>)

[//]: # (        <li><a href="#rouge-테마-선택하고-파일-생성하기">Rouge 테마 선택하고 파일 생성하기</a></li>)

[//]: # (        <li><a href="#선택자-명시도-문제-해결하기">선택자 명시도 문제 해결하기</a></li>)

[//]: # (        <li><a href="#rouge-token-색상-보정하기">Rouge Token 색상 보정하기</a></li>)

[//]: # (      </ul>)

[//]: # (    </div>)

[//]: # ()
[//]: # (    <div class="post-toc-simple__section">)

[//]: # (      <a class="post-toc-simple__main" href="#2-코드블럭-외형-커스터마이징하기">)

[//]: # (        <span>02</span>)

[//]: # (        코드블럭 외형)

[//]: # (      </a>)

[//]: # (      <p>박스, 헤더, Terminal, 에러 로그 스타일을 정리했다.</p>)

[//]: # ()
[//]: # (      <ul>)

[//]: # (        <li><a href="#코드블럭-박스-외형-정리하기">코드블럭 박스 외형 정리하기</a></li>)

[//]: # (        <li><a href="#코드블럭-헤더-구조-정리하기">코드블럭 헤더 구조 정리하기</a></li>)

[//]: # (        <li><a href="#terminal-코드블럭-색상-통일하기">Terminal 코드블럭 색상 통일하기</a></li>)

[//]: # (        <li><a href="#에러-로그-코드블럭-정리하기">에러 로그 코드블럭 정리하기</a></li>)

[//]: # (      </ul>)

[//]: # (    </div>)

[//]: # ()
[//]: # (    <div class="post-toc-simple__section">)

[//]: # (      <a class="post-toc-simple__main" href="#정리">)

[//]: # (        <span>03</span>)

[//]: # (        정리)

[//]: # (      </a>)

[//]: # (      <p>이번 코드블럭 커스터마이징 작업을 정리했다.</p>)

[//]: # (    </div>)

[//]: # (  </div>)

[//]: # (</nav>)

## 코드블럭 커스터마이징 구조 나누기

이번에는 코드블럭 스타일을 커스텀해볼 거다.

처음에는 모든 커스텀 CSS를 `assets/css/jekyll-theme-chirpy.scss` 파일에 전부 작성했다.

그런데 폰트, 본문, 이미지, 코드블럭 스타일이 계속 늘어나면서 파일이 점점 지저분해졌다.

특히 코드블럭은 일반 코드, 인라인 코드, 터미널 코드, 에러 로그까지 따로 스타일을 잡아야 해서 분리하는 게 낫다고 판단했다.

그래서 프로젝트 루트에 `_sass` 폴더를 만들고, 코드블럭 관련 SCSS 파일을 따로 만들었다.

```directory
_sass/
└─ custom/
   ├─ _code-block.scss → 코드블럭 박스, 헤더, 둥근 모서리, 터미널, 에러 로그 스타일
   └─ _rouge-theme.scss → 코드 문법 하이라이팅 색상
```

처음에는 코드블럭 스타일을 `_code-block.scss` 하나에서 모두 처리하려고 했다.

그런데 문법 하이라이팅 색상까지 직접 하나하나 지정하다 보니 코드가 점점 복잡해졌다.

그래서 역할을 나눴다.

```text
_code-block.scss
→ 코드블럭 박스, 헤더, 둥근 모서리, 터미널, 에러 로그 스타일

_rouge-theme.scss
→ 코드 문법 하이라이팅 색상
```

그리고 `assets/css/jekyll-theme-chirpy.scss`에서 아래처럼 불러왔다.

```scss
@import "custom/font";
@import "custom/rouge-theme";
@import "custom/code-block";
```

`_rouge-theme.scss`를 먼저 불러오고, 그다음 `_code-block.scss`를 불러오도록 했다.

문법 하이라이팅 색상은 Rouge 테마가 담당하고, 코드블럭의 외형은 내가 작성한 코드에서 덮어쓰는 방식으로 잡았다.

파일 실제 이름은 `_code-block.scss`, `_rouge-theme.scss`지만, import 할 때는 `_`와 `.scss`를 빼고 작성한다.

## 1. Rouge 코드

### 코드블럭 디자인 방향 정하기

어떤 식으로 할까 하다가, 인터넷을 찾아보니 Carbon 사이트에서 코드박스 디자인을 미리 볼 수 있었다.

[Carbon](https://carbon.now.sh){: target="_blank"}

![Carbon 스타일 예시](/assets/images/2026-06-01/carbon_style.png)

저기서 여러 디자인을 선택할 수 있는데, 나는 Solarized Dark 느낌으로 최대한 비슷하게 커스텀해볼 거다.

상단에는 Mac 창 느낌의 점 3개가 있고, 코드 영역은 어두운 배경으로 정리된 다크 테마 느낌이다.

단, Chirpy의 코드블럭 HTML 구조와 Carbon의 구조는 다르다.

Carbon은 코드 이미지를 예쁘게 만드는 별도 서비스이기 때문에, Carbon의 소스 코드를 그대로 가져와서 적용하는 방식은 맞지 않았다.

> Carbon 스타일을 그대로 복사하는 것 X
> Carbon 느낌을 Chirpy 구조에 맞게 구현하는 것 O

### Rouge 테마 선택하고 파일 생성하기

제일 먼저 코드블럭 문법 하이라이팅에 사용할 CSS를 가져왔다.

Ruby 환경의 코드 하이라이터인 Rouge에서 제공하는 스타일을 적용해보기로 했다.

먼저 사용 가능한 Rouge 테마를 확인했다.

```terminal
rougify help style
```

내 경우 아래처럼 사용 가능한 테마들이 나열되었다.

```terminal
available themes:
  base16, base16.dark, base16.light, base16.monokai, base16.monokai.dark, base16.monokai.light, base16.solarized, base16.solarized.dark, base16.solarized.light, bw, colorful, github, github.dark, github.light, gruvbox, gruvbox.dark, gruvbox.light, igorpro, magritte, molokai, monokai, monokai.sublime, pastie, thankful_eyes, tulip
```

[Rouge Theme Preview](https://spsarolkar.github.io/rouge-theme-preview/){: target="_blank"}에서 테마별 느낌을 미리 확인할 수 있었다.

Carbon에서 봤던 Solarized Dark 느낌과 맞추기 위해 `base16.solarized.dark`를 선택했다.

그러면 해당 스타일을 아까 만들어둔 `_rouge-theme.scss`로 가져오면 된다.

처음에는 아래처럼 scope를 `.content .highlight`로 잡았다.

```terminal
rougify style base16.solarized.dark --scope ".content .highlight" | Set-Content -Path "_sass/custom/_rouge-theme.scss" -Encoding utf8
```

여기서 `Set-Content -Encoding utf8`을 사용한 이유는 인코딩 문제 때문이다.

처음에는 `>` 리다이렉션으로 파일을 만들었는데, Windows PowerShell에서 생성된 파일 인코딩 때문에 Jekyll 빌드 중 `Invalid UTF-8` 오류가 발생했다.

그래서 `Set-Content -Encoding utf8`로 저장하도록 바꿨다.

그런데 로컬 서버에서 확인해보니 일부 스타일이 적용되지 않았다.

### 선택자 명시도 문제 해결하기

개발자도구로 확인해보니 Chirpy 기본 CSS가 아래처럼 적용되고 있었다.

> Chirpy 테마

```scss
html[data-mode=light] .highlight .nc {
  color: #953800;
}
```

* `html`: 태그 선택자
* `[data-mode=light]`: 속성 선택자
* `.highlight`: 클래스 선택자
* `.nc`: 클래스 선택자

반면 내가 가져온 Rouge 테마는 아래처럼 생성되어 있었다.

> Rouge 테마

```scss
.content .highlight .nc {
  color: #ffa657;
}
```

* `.content`: 클래스 선택자
* `.highlight`: 클래스 선택자
* `.nc`: 클래스 선택자

처음에는 왜 내 CSS가 적용되지 않는지 이해가 잘 안 됐다.

확인해보니 CSS에서는 같은 요소에 여러 스타일이 적용될 경우 **명시도(specificity)**가 더 높은 선택자가 우선 적용된다.

명시도는 보통 아래처럼 계산한다.

```text
ID 선택자 개수, class/attribute 선택자 개수, tag 선택자 개수
```

Chirpy 선택자를 계산하면 아래처럼 된다.

| 부분                  | 종류      | 어느 칸에 더해지는가        |
|---------------------|---------|--------------------|
| `html`              | 태그 선택자  | tag +1             |
| `[data-mode=light]` | 속성 선택자  | class/attribute +1 |
| `.highlight`        | 클래스 선택자 | class/attribute +1 |
| `.nc`               | 클래스 선택자 | class/attribute +1 |

그래서 Chirpy 선택자의 명시도는 아래와 같다.

```text
ID: 0
class/attribute: 3
tag: 1

→ 0, 3, 1
```

내가 처음 가져온 Rouge 선택자는 아래처럼 계산된다.

| 부분           | 종류      | 어느 칸에 더해지는가        |
|--------------|---------|--------------------|
| `.content`   | 클래스 선택자 | class/attribute +1 |
| `.highlight` | 클래스 선택자 | class/attribute +1 |
| `.nc`        | 클래스 선택자 | class/attribute +1 |

그래서 Rouge 선택자의 명시도는 아래와 같다.

```text
ID: 0
class/attribute: 3
tag: 0

→ 0, 3, 0
```

두 선택자는 class/attribute 개수가 3개로 같지만, Chirpy 선택자에는 `html` 태그 선택자가 하나 더 있었다.

그래서 Chirpy 기본 CSS가 우선 적용되고 있었던 것이다.

그렇다면 내가 가져오는 Rouge 스타일의 선택자를 Chirpy 기본 선택자와 같거나 더 높은 우선순위로 만들면 된다.

그래서 scope에 `html`을 추가했다.

```terminal
rougify style base16.solarized.dark --scope "html .content .highlight" | Set-Content -Path "_sass/custom/_rouge-theme.scss" -Encoding utf8
```

이렇게 생성하면 아래처럼 선택자가 만들어진다.

```scss
html .content .highlight .nc {
  color: . . .;
}
```

이 선택자는 명시도가 아래처럼 계산된다.

```text
ID: 0
class/attribute: 3
tag: 1

→ 0, 3, 1
```

Chirpy 기본 선택자와 명시도가 같아졌다.

명시도가 같을 때는 나중에 로드된 CSS가 우선 적용된다.

내 경우 `jekyll-theme-chirpy.scss`에서 Chirpy 기본 스타일을 먼저 불러오고, 그 뒤에 `custom/rouge-theme`를 불러오기 때문에 내가 가져온 Rouge 스타일이 정상적으로
적용됐다.

역시 CSS는 선택자 싸움이었다.

### Rouge Token 색상 보정하기

이제 적용된 스타일을 개발자도구로 확인하면서 수정할 시간이다.

개발자도구로 보면 코드블럭 안의 코드들이 자동으로 여러 class를 부여받고 있었다.

예를 들면 `nl`, `s`, `sc`, `nc`, `nt`, `se` 같은 class들이 있었다.

이 class들이 무엇을 의미하는지 먼저 확인했다.

[Rouge 토큰 리스트](https://github.com/rouge-ruby/rouge/wiki/List-of-tokens){: target="_blank"}에 각 token class가 어떤 의미인지 정리되어
있었다.

해당 목록을 보면서 어떤 코드가 이상하게 보이는지 확인했다.

SCSS 코드에서 `position`, `overflow`, `border` 같은 CSS 속성명이 어두운 파란 계열로 표시되어 잘 보이지 않았다.

```scss
html .content .highlight .nc {
  color: . . .; // color 속성이 어두워서 잘 보이지 않았다
}
```

개발자도구로 확인해보니 CSS 속성명은 아래처럼 렌더링되고 있었다.

```html
<span class="nl">position</span>
```

`nl` class를 Rouge 토큰 리스트에서 찾아보니 `Name.Label`이었다.

처음 가져온 `_rouge-theme.scss`에는 `.nl`에 대한 색상 지정이 없거나, 현재 코드블럭 배경과 잘 맞지 않는 색상으로 보였다.

그래서 `.nl`은 일반 코드 글자색과 동일하게 보이도록 `inherit`으로 지정했다.

```scss
html .content .highlight .nl {
  color: inherit;
}
```

이런 식으로 다른 토큰들도 개발자도구와 Rouge 토큰 리스트를 같이 보면서 조정했다.

특히 아래 같은 SCSS 선택자는 클래스 선택자와 요소 선택자가 한눈에 구분되어야 한다.

```scss
.content div[class^="language-"],
.content div[class*=" language-"] {
  ...
}
```

여기서 `.content`는 클래스 선택자이고, `div`는 타입 선택자 또는 요소 선택자다.

처음 적용된 색상에서는 둘이 비슷하게 보여서 어떤 게 클래스 선택자이고 어떤 게 요소 선택자인지 구분이 잘 안 됐다.

개발자도구로 확인해보니 `.content`는 아래처럼 `nc` class로 렌더링되고 있었다.

```html
<span class="nc">.content</span>
```

그리고 `div`는 아래처럼 `nt` class로 렌더링되고 있었다.

```html
<span class="nt">div</span>
```

그래서 클래스 선택자와 HTML 태그 선택자가 구분되도록 색상을 따로 조정했다.

```scss
html .content .highlight .nc {
  color: #a8db75;
}

html .content .highlight .nt {
  color: #fd6187;
}
```

직접 색상을 전부 만든 건 아니고, Rouge 테마를 기본으로 가져온 뒤 가독성이 떨어지는 token만 보정하는 방식으로 진행했다.

이 방식이 제일 적당한 것 같다.

처음에는 코드블럭 색상을 직접 하나하나 커스텀하려고 했는데, 그렇게 하니 너무 화려하고 유지보수도 어려웠다.

결국 기본 테마를 가져오고, 실제 화면에서 불편한 부분만 수정하는 게 더 나았다.

## 2. 코드블럭 외형 커스터마이징하기

### 코드블럭 박스 외형 정리하기

앞서 코드블럭의 highlight 색상을 수정했다면, 이제는 그걸 감싸는 코드블럭 외형을 정리할 차례다.

처음에는 코드블럭 배경색도 `$code-bg` 변수로 직접 지정했었다.

```scss
$code-bg: #0f172a;
```

그런데 Rouge 테마를 가져오니 `_rouge-theme.scss` 안에 이미 코드 영역 배경색이 들어 있었다.

그래서 배경색을 또 따로 지정할 필요가 없어졌다.

`$code-bg`는 삭제하고, 코드블럭 헤더 배경색만 따로 변수로 관리했다.

```scss
$code-header-bg: #2d2a2e;
$code-border: rgba(148, 163, 184, 0.22);
$code-text: #93a1a1;
$code-muted: #64748b;
$code-lang: #cbd5e1;

$error-text: #e44e4e;
$error-muted: #fca5a5;
```

코드블럭 전체 박스는 기존 스타일을 유지하되, `border-radius`만 조금 줄였다.

처음에는 `1.15rem`으로 설정했는데, 실제 화면에서 보니 너무 둥글게 느껴졌다.

그래서 `1rem`으로 조정했다.

```scss
.content div[class^="language-"],
.content div[class*=" language-"] {
  position: relative;
  overflow: hidden;
  margin-top: 1.3rem;
  margin-bottom: 1.9rem;
  border: 1px solid $code-border;
  border-radius: 1rem;
  box-shadow: 0 0.8rem 2rem rgba(15, 23, 42, 0.14),
  0 0.15rem 0.45rem rgba(15, 23, 42, 0.08);
}
```

코드블럭 배경은 Rouge 테마에서 가져온 색상을 그대로 사용하고, 내가 직접 지정한 부분은 헤더와 박스 외형 정도로 줄였다.

이전보다 관리하기도 쉽고, 색상도 훨씬 안정적으로 보였다.

### 코드블럭 헤더 구조 정리하기

코드블럭 상단에는 Mac 창처럼 점 3개를 넣고 싶었다.

처음에는 `::before`로 점 3개를 넣었는데 문제가 생겼다.

`SCSS`, `Terminal` 같은 언어명이 왼쪽 점 3개와 겹쳐 보였다.

문제는 Chirpy 기본 구조에서 언어명도 헤더 왼쪽에 있고, 내가 추가한 점 3개도 왼쪽에 있었기 때문이다.

그래서 헤더 구조를 이렇게 나누었다.

```text
왼쪽: Mac 점 3개
가운데: 언어명
오른쪽: 복사 버튼
```

언어명은 가운데 정렬로 고정했다.

```scss
.content div[class^="language-"] .code-header span,
.content div[class*=" language-"] .code-header span {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100% - 8rem);
  overflow: hidden;
  color: $code-lang;
  font-size: 0.86rem;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

이렇게 하니 헤더가 훨씬 안정적으로 보였다.

왼쪽, 가운데, 오른쪽 역할이 정리되니 코드블럭이 이제 좀 사람처럼 보이기 시작했다.

### Terminal 코드블럭 색상 통일하기

터미널 명령어는 `terminal` 코드블럭으로 작성하고 싶었다.

마크다운에서는 아래처럼 작성했다.

````markdown
```terminal
Copy-Item "$chirpyPath\assets\css\jekyll-theme-chirpy.scss" "assets\css\jekyll-theme-chirpy.scss" -Force
```
````

그런데 실제 화면에서는 문자열 안의 특정 부분만 다른 색으로 보였다.

예를 들면 경로 안의 백슬래시가 들어간 부분이 다른 색으로 표시됐다.

개발자도구로 확인해보니 해당 부분은 아래처럼 렌더링되고 있었다.

```html
<span class="se">\a</span>
```

Rouge token 목록을 확인해보니 `se`는 `Literal.String.Escape`였다.

즉, 문자열 안의 escape sequence를 의미하는 토큰이었다.

내가 작성한 명령어는 Windows 경로라서 아래처럼 백슬래시를 사용했다.

```terminal
Copy-Item "$chirpyPath\assets\css\jekyll-theme-chirpy.scss" "assets\css\jekyll-theme-chirpy.scss" -Force
```

그런데 Rouge 입장에서는 문자열 안의 `\a`, `\c` 같은 부분을 escape sequence처럼 인식한 것 같았다.

정확히 말하면 내가 의도한 건 폴더 경로였지만, 하이라이터는 문자열 안의 백슬래시 조합을 특수 시퀀스로 본 것이다.

이걸 Rouge Lexer 레벨에서 고치려면 일이 커진다.

그렇다고 `.se` 색상을 전체적으로 바꾸면 다른 언어 코드블럭에서도 escape sequence 색상이 같이 바뀐다.

그러면 오히려 하이라이팅 가독성이 떨어질 수 있다.

그래서 `terminal` 코드블럭에서만 syntax highlighting을 최소화하고, 글자색을 통일하기로 했다.

```scss
.content .language-terminal .highlight code,
.content .language-terminal .highlight pre,
.content .language-terminal .highlight code span {
  color: $code-text !important;
  background: transparent !important;
}
```

터미널 명령어는 문법 색상보다 명령어 자체를 읽는 게 더 중요하다고 생각했다.

그래서 terminal 코드블럭은 단일 색상에 가깝게 보이도록 정리했다.

### 에러 로그 코드블럭 정리하기

일반 코드와 에러 로그가 똑같이 보이면 글을 읽을 때 구분이 잘 안 됐다.

그래서 에러 로그에는 별도 클래스를 붙이기로 했다.

마크다운에서는 코드블럭 아래에 클래스를 추가했다.

```markdown
{: .error-log}
```

실제 HTML은 대략 아래처럼 생성됐다.

```html

<div class="language-text error-log highlighter-rouge">
  ...
</div>
```

처음에는 에러 로그 박스 전체를 붉은 계열로 따로 꾸미려고 했다.

그런데 Rouge 테마와 코드블럭 외형을 정리하고 나니, 에러 로그는 너무 과하게 꾸미지 않아도 될 것 같았다.

그래서 현재는 긴 문장 줄바꿈과 글자색 정도만 별도로 처리했다.

```scss
.content div[class^="language-"].error-log .rouge-code pre,
.content div[class*=" language-"].error-log .rouge-code pre,
.content div[class^="language-"].error-log .rouge-code code,
.content div[class*=" language-"].error-log .rouge-code code {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
}
```

에러 로그는 일반 코드와 다르게 긴 문장이 한 줄로 이어지는 경우가 많다.

일반 코드는 가로 스크롤이 있는 게 맞지만, 에러 로그는 줄바꿈이 되는 게 더 읽기 편했다.

그래서 에러 로그에만 줄바꿈 처리를 따로 적용했다.

글자색도 에러 로그답게 붉은 계열로만 정리했다.

```scss
.content div[class^="language-"].error-log code,
.content div[class*=" language-"].error-log code,
.content div[class^="language-"].error-log pre,
.content div[class*=" language-"].error-log pre {
  color: $error-text;
}
```

이렇게 하니 명령어, 일반 코드, 에러 로그가 각각 다르게 보였다.

코드블럭을 화려하게 꾸미는 것보다, 각 코드블럭의 목적에 맞게 구분하는 게 더 중요하다고 느꼈다.

## 정리

이번 작업에서는 Chirpy 코드블럭 스타일을 내 블로그에 맞게 다시 정리했다.

정리하면 다음과 같다.

* 코드블럭 스타일을 `_code-block.scss`로 분리
* Rouge 문법 하이라이팅 색상을 `_rouge-theme.scss`로 분리
* `rougify style` 명령어로 `base16.solarized.dark` 테마 적용
* PowerShell 인코딩 문제를 피하기 위해 `Set-Content -Encoding utf8` 사용
* Chirpy 기본 CSS보다 우선 적용되도록 `--scope "html .content .highlight"`로 지정
* CSS 선택자 명시도 문제 확인
* 개발자도구로 Rouge token class를 확인하면서 일부 색상 보정
* `.nl`, `.nc`, `.nt` 등 코드 가독성에 영향을 주는 token 색상 조정
* 코드블럭 외형은 `_code-block.scss`에서 관리
* 코드블럭 헤더를 Mac 창 형태로 정리
* `terminal` 코드블럭은 syntax highlighting을 최소화
* `.error-log` 클래스는 긴 에러 로그 줄바꿈과 글자색만 별도 처리

처음에는 코드블럭 색상을 직접 하나씩 정하려고 했다.

그런데 그렇게 하니 색상이 너무 튀고 유지보수도 어려웠다.

결국 Rouge 테마를 기본으로 가져오고, 실제 화면에서 가독성이 떨어지는 token만 개발자도구로 확인해 보정하는 방식이 가장 적당했다.

코드블럭은 예쁘게 꾸미는 것도 중요하지만, 결국 읽기 편해야 한다.

이번 작업을 하면서 CSS 선택자 명시도, Rouge token class, Chirpy 코드블럭 구조를 조금 더 이해하게 됐다.

역시 CSS는 조금만 손대려 해도 생각보다 깊어진다.
