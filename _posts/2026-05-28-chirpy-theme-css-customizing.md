---
title: "블로그 만들기 2 - Chirpy 테마 적용하기"
date: 2026-05-28 14:30:00 +0900
categories: [ Blog, GitHub Blog ]
tags: [github-pages, jekyll, chirpy, ruby, troubleshooting]
---

## 시작하기 전에

먼저 시작할 때 나는 `jekyll-theme-minimal` 테마를 적용했었다.

글을 작성하고 보니 개발일지 블로그라기보다는 `GitHub README` 문서 같은 느낌이 강했다.

깔끔하긴 했지만, 글을 계속 쌓아가기에는 조금 아쉬워 기왕이면 이쁜 블로그가 좋으니까 ^o^

개발일지 블로그라면 글 목록, 카테고리, 태그, 검색, 목차, 코드블럭 같은 요소가 어느 정도는 잡혀 있어야 나중에 다시 찾아보기 편할 것 같았다.

그래서 이번에는 기술 블로그에 많이 쓰이는 `Chirpy` 테마로 갈아엎어보기로 했다.

아직 글이 하나밖에 없을 때 바꾸는 게 그나마 덜 귀찮으니 빠르게 바꾸자!!!

## Chirpy Starter 가져오기

Chirpy는 단순히 `_config.yml`에서 테마 이름만 바꾸는 방식으로 끝나는 테마는 아니었다.

Starter 구조에 필요한 파일들이 따로 있어서, 기존 저장소 안에 `chirpy-starter`를 임시로 clone했다.

```terminal
git clone https://github.com/cotes2020/chirpy-starter.git chirpy-temp
```

이 명령어를 실행하니 현재 저장소 안에 `chirpy-temp` 폴더가 생성됐다.

```directory
mimimid.github.io/
├─ chirpy-temp/
├─ _posts/
├─ assets/
└─ ...
```

여기서 중요한 점은 `chirpy-temp`는 임시 복사용 폴더라는 것이다.

이 폴더 안에도 `.git`이 있기 때문에, 이 상태에서 바로 `git add .`를 하면 중첩 Git 저장소처럼 잡힐 수 있다.

그래서 `chirpy-temp`는 필요한 파일만 복사한 뒤 삭제하는 방식으로 진행했다.

## 기존 포스트와 이미지 백업

테마를 갈아엎기 전에 기존에 작성한 포스트와 이미지를 먼저 백업했다.

```terminal
mkdir _backup
xcopy _posts _backup\_posts /E /I
xcopy assets\images _backup\images /E /I
```

백업 결과는 아래처럼 확인했다.

```directory 
_backup/
├─ _posts/
│  └─ 2026-05-28-github-pages-jekyll-blog-setup.md
└─ images/
   └─ 2026-05-28/
      ├─ project-structure.png
      └─ start_blog.png
```

테마를 바꾸는 작업은 생각보다 파일을 많이 건드리게 된다.

그래서 이 단계에서는 귀찮아도 백업을 먼저 해두는 게 맞다.

개발하면서 `괜찮겠지` 하고 그냥 진행했다가 괜찮지 않았던 적이 많기 때문이다.. _ㅠㅠ_

## 기존 Jekyll 파일 정리

기존에 사용하던 `jekyll-theme-minimal` 관련 파일들을 정리하고, Chirpy Starter 파일을 루트에 복사했다.

이때 절대 삭제하면 안 되는 것은 `.git` 폴더다.

>삭제하면 안 되는 것: .git

반대로 기존 테마에서 사용하던 `_config.yml`, `Gemfile`, `index.markdown`, `about.markdown`, `_site`, `assets` 등은 Chirpy 구조로 다시 구성하기 위해 정리했다.

이후 `chirpy-temp` 안의 파일들을 현재 저장소 루트로 복사했다.

복사 후 프로젝트 구조는 대략 아래처럼 바뀌었다.

```directory
mimimid.github.io/
├─ .github/
├─ _data/
├─ _plugins/
├─ _tabs/
├─ assets/
├─ tools/
├─ _posts/
├─ _config.yml
├─ Gemfile
└─ index.html
```

여기까지 오면 기존 minimal 테마 구조에서 Chirpy Starter 구조로 바뀐 상태다.

## 기존 포스트와 이미지 복원

백업해둔 포스트와 이미지를 다시 복원했다.

```terminal
xcopy _backup\_posts _posts /E /I
xcopy _backup\images assets\images /E /I
```

복원 후 `_posts` 폴더를 확인하니 기존 글이 다시 들어와 있었다.

```directory
_posts/
├─ .placeholder
└─ 2026-05-28-github-pages-jekyll-blog-setup.md
```

이미지도 정상적으로 복원됐다.

```directory
assets/images/2026-05-28/
├─ project-structure.png
└─ start_blog.png
```

`.placeholder` 파일은 Chirpy Starter에서 빈 폴더 유지를 위해 들어간 파일이라, 실제 포스트가 있다면 삭제해도 된다.

## Ruby 버전 문제

Chirpy 구조를 적용한 뒤 의존성을 설치하려고 했다.

```terminal
bundle install
```

그런데 바로 Ruby 버전 문제로 실패했다.

```terminal
Because jekyll-theme-chirpy >= 7.1.0 depends on Ruby ~> 3.1
  and Gemfile depends on jekyll-theme-chirpy ~> 7.5,
  Ruby ~> 3.1 is required.
So, because current Ruby version is = 4.0.5,
  version solving has failed.
```
{: .error-log}

아앗.. 그냥 Ruby 버전 확인 안하고 상단에 최신 버전을 깔았더니<br>
Chirpy 7.5 기준으로는 Ruby 4.x가 아니라 Ruby 3.x 계열이 필요했다. _(나 진짜 일 두번 하는거 참 좋아해 ㅎ)_

결국 `Ruby+Devkit 3.4.9-1 (x64)`를 다시 설치했다.

설치 과정에서 MSYS2 설치 화면이 나왔고, 기본값으로 진행했다.

```terminal
1 - MSYS2 base installation
2 - MSYS2 system update (optional)
3 - MSYS2 and MINGW development toolchain
```

설치가 끝난 뒤에는 IntelliJ를 완전히 종료했다가 다시 실행했다.

Windows에서 Ruby 같은 개발 도구를 새로 설치하면, IDE가 변경된 환경변수를 바로 못 잡는 경우가 있다.

역시 안 되면 일단 재시작이다.

개발자의 전통 민간요법인데, 생각보다 자주 맞는다.

## Ruby 버전 확인 후 다시 실행

Ruby 3.x가 제대로 잡혔는지 확인했다.

```powershell
ruby -v
where.exe ruby
```

Ruby 3.4.x 경로가 잡힌 것을 확인한 뒤 다시 의존성을 설치했다.

```powershell
bundle install
```

이번에는 Chirpy 관련 gem들이 정상적으로 설치됐다.

그다음 로컬 서버를 실행했다.

```powershell
bundle exec jekyll serve
```

정상적으로 실행되면 아래 주소에서 확인할 수 있다.

```text
http://localhost:4000
```

## `_config.yml` 기본 설정 수정

Chirpy Starter를 적용하면 `_config.yml`에 기본값이 들어 있다.

예를 들면 이런 값들이다.

```yml
title: Chirpy
tagline: A text-focused Jekyll theme
github:
  username: github_username
twitter:
  username: twitter_username
social:
  name: your_full_name
  email: example@domain.com
```

이 값들을 그대로 두면 실제 블로그에 기본 문구나 잘못된 링크가 노출될 수 있다.

그래서 내 블로그 정보에 맞게 수정했다.

```yml
lang: ko-KR

timezone: Asia/Seoul

title: "Ming's Dev Log"

tagline: 개발하면서 만난 오류와 해결 과정을 기록합니다.

description: >-
  Java, Spring Boot, 웹 애플리케이션 개발, 인프라 운영 과정에서 겪은 문제와 해결 과정을 기록하는 개발일지입니다.

url: "https://mimimid.github.io"

github:
  username: mimimid

twitter:
  username:

social:
  name: Minjee Kim
  email:
  fediverse_handle:
  links:
    - https://github.com/mimimid
```

`email`은 굳이 공개 블로그에 노출할 필요가 없어서 비워두었다.

`twitter`도 사용하지 않기 때문에 비워두었다.

## 포스트 front matter 수정

기존 Jekyll 테마에서는 포스트 상단에 `layout: default`를 넣어두었다.

하지만 Chirpy에서는 `_config.yml`의 `defaults`에서 포스트 layout을 이미 `post`로 지정하고 있었다.

그래서 기존 포스트의 front matter를 Chirpy 방식에 맞게 수정했다.

```markdown
---
title: "블로그 만들기 1 - GitHub Pages와 Jekyll"
date: 2026-05-28 09:40:00 +0900
categories: [Blog, Github Blog]
tags: [github-pages, jekyll]
---
```

기존에 있던 아래 설정은 제거했다.

```markdown
layout: default
```

Chirpy에서는 `categories`와 `tags`를 잘 작성해두면 글이 쌓였을 때 분류하기 좋다.

개발일지는 결국 미래의 내가 다시 보려고 쓰는 것이기 때문에, 처음부터 카테고리와 태그를 어느 정도 정리해두는 게 좋을 것 같다.

## 로컬 실행 확인

설정 수정 후 다시 로컬 서버를 실행했다.

```terminal
bundle exec jekyll serve
```

브라우저에서 아래 주소로 접속했다.

```terminal
http://localhost:4000
```

![Chirpy 첫 화면](/assets/images/2026-05-28/chirpy_start_home.png)

기존 `jekyll-theme-minimal` 화면과 다르게, Chirpy의 사이드바와 포스트 목록 구조가 적용된 것을 확인했다.

근데 한글명이 별로 안 이쁜거 같아서 다시 `_config.yml`에서 `lang: ko-KR`을 `lang: en`으로 변경해줬다!

>변경 후

![Chirpy 첫 화면](/assets/images/2026-05-28/chirpy_start_blog1.png)

>개발일지 블로그로 쓸 기본 구조는 훨씬 좋아진 거 같네! css 커스텀은 차차 하는거로..

## 정리

이번 작업에서는 기존 `jekyll-theme-minimal` 테마에서 `Chirpy` 테마로 변경했다.

정리하면 다음과 같다.

* Chirpy Starter를 임시 폴더에 clone
* 기존 포스트와 이미지 백업
* 기존 Jekyll 테마 파일 정리
* Chirpy Starter 구조 복사
* 기존 포스트와 이미지 복원
* Ruby 4.x와 Chirpy 호환 문제 확인
* Ruby+Devkit 3.4.9 설치
* `bundle install` 재실행
* `_config.yml` 기본 정보 수정
* 기존 포스트 front matter를 Chirpy 방식으로 수정
* 로컬 서버에서 Chirpy 테마 적용 확인

처음에는 단순히 테마만 바꾸면 될 줄 알았는데, 생각보다 구조 변경이 많았다. (테마를 처음부터 Chirpy로 했다면,,)

그래도 이번에 Chirpy 구조로 바꿔두니 개발일지 블로그로 운영하기에는 훨씬 좋아 보인다.

다음에는 글꼴, 본문 스타일, 코드블럭, 에러 로그 코드블럭 같은 CSS를 하나씩 다듬어볼 예정이다.
