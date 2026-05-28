---
title: "블로그 만들기 1 - GitHub Pages와 Jekyll"
date: 2026-05-28 09:40:00 +0900
categories: [Blog, Github Blog]
tags: [github-pages, jekyll, troubleshooting]
---

## 시작하게 된 이유

이직 준비를 하면서 개발 과정을 따로 기록해둘 공간이 있으면 좋겠다고 생각했다.

지금까지는 개발하다가 오류가 나면 해결하고 넘어가는 경우가 많았는데, 나중에 다시 비슷한 문제가 생기면 분명히 해결했던 문제인데도 어떤 식으로 처리했는지 잘 기억이 안 나는 경우가 있었다.

분명 내가 해결한 건 맞는데, 미래의 내가 현재의 나를 전혀 믿지 못하는 상황이 생긴다.

그래서 이번에는 공부한 내용만 정리하는 블로그가 아니라, 실제로 개발하면서 겪은 오류나 설정 과정, 해결 흐름까지 같이 남기는 개발일지 블로그를 만들어보기로 했다.

처음부터 거창하게 만들 생각은 없다.
일단 하나씩 차근차근 해보자.

블로그도 만들고, 기록도 하고, 나중에 이직할 때 “저 이런 것도 해봤습니다”라고 조용히 보여줄 수 있으면 좋겠다.

## 개발 환경

| 항목         | 내용                |
|------------|-------------------|
| OS         | Windows           |
| IDE        | IntelliJ IDEA     |
| 정적 사이트 생성기 | Jekyll            |
| 패키지 관리     | RubyGems, Bundler |
| 배포 환경      | GitHub Pages      |
| 저장소        | mimimid.github.io |

## Jekyll 설치

GitHub Pages 블로그를 만들기 위해 먼저 Jekyll과 Bundler를 설치했다.

```terminal
gem install jekyll bundler
```

설치가 끝난 뒤 Jekyll이 제대로 설치됐는지 확인했다.

```terminal
jekyll -v
```

정상적으로 아래처럼 버전이 출력됐다.

```terminal
jekyll 4.4.1
```

여기까지는 크게 막히는 부분 없이 진행됐다.

이때까지만 해도 순조로웠다.
물론 개발은 항상 이럴 때 방심하면 안 된다.

## 기존 GitHub 저장소에서 Jekyll 생성하기

현재 GitHub Pages용 저장소는 이미 만들어져 있는 상태였다.

```terminal
C:\study\mimimid.github.io
```

이 폴더 안에서 Jekyll 사이트를 생성하려고 했더니 아래와 같은 오류가 발생했다.

```terminal
jekyll new ./
```

```terminal
Conflict: C:/study/mimimid.github.io exists and is not empty.
Ensure C:/study/mimimid.github.io is empty or else try again with `--force` to proceed and overwrite any files.
```
{: .error-log}

로그를 보니 저장소 폴더가 비어 있지 않다고 한다.
이미 파일이 있는 폴더라서 Jekyll이 새 사이트 생성을 막은 것이다.

Jekyll 입장에서는 남의 집에 갑자기 들어가서 가구 배치를 새로 할 수는 없었던 것 같다.

현재 저장소에는 중요한 작업 파일이 거의 없고 `README.md` 정도만 있었기 때문에, 이번에는 `--force` 옵션을 사용해서 진행했다.

```terminal
jekyll new . --force
```

다행히 README.md 정도만 있었기 때문에 큰 문제는 없었다.

다만 이 옵션은 기존 파일을 덮어쓸 수 있으니 조심해야 한다.
이번에는 괜찮았지만, 기존에 작성해둔 파일이 많은 프로젝트였다면 바로 `--force`를 쓰기보다는 임시 폴더에서 Jekyll 사이트를 만든 뒤 필요한 파일만 복사하는 방식이 더 안전했을 것 같다.

한 줄 정리하면, `--force`는 편하지만 약간 힘이 세다.
잘못 쓰면 내 파일도 같이 힘으로 밀어버릴 수 있다.

## IntelliJ 터미널에서 bundle 명령어가 안 잡힌 문제

Jekyll을 설치한 뒤 로컬 서버를 실행하려고 했다.

```terminal
bundle exec jekyll serve
```

그런데 CMD에서는 정상적으로 실행되는데, IntelliJ 터미널에서는 아래 오류가 발생했다.

```terminal
bundle : 'bundle' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다.
```

처음에는 Bundler 설치가 잘못된 줄 알았다.
그런데 CMD에서는 정상적으로 실행됐기 때문에 Ruby나 Bundler 설치 자체의 문제는 아니라고 봤다.

생각해보니 IntelliJ를 켜둔 상태에서 PowerShell로 Ruby와 Jekyll을 설치했기 때문에, 변경된 환경변수가 IntelliJ 터미널에는 아직 적용되지 않았던 것 같다.

그래서 IntelliJ를 완전히 종료한 뒤 다시 실행했다.

그랬더니 IntelliJ 터미널에서도 정상적으로 실행됐다.

```terminal
bundle exec jekyll serve
```

역시 안 되면 일단 재시작부터 해보자.
개발자의 전통 민간요법이지만, 생각보다 자주 맞는다.

Windows에서 개발 도구를 새로 설치한 뒤에는 IDE를 재시작해야 환경변수가 제대로 반영될 수 있다는 점을 다시 확인했다.

## Jekyll 테마 적용

처음 생성된 Jekyll 사이트는 기본 테마인 `minima`를 사용하고 있었다.

처음부터 디자인을 많이 건드리기는 부담스러워서, 일단 단순한 형태의 `jekyll-theme-minimal` 테마를 적용해보기로 했다.

`_config.yml`에서 테마 설정을 아래처럼 변경했다.

```yml
theme: jekyll-theme-minimal
```

테마를 변경한 뒤 아래와 같은 경고가 발생했다.

```terminal
Build Warning: Layout 'page' requested in 404.html does not exist.
Build Warning: Layout 'page' requested in about.markdown does not exist.
Build Warning: Layout 'home' requested in index.markdown does not exist.
```

처음에는 테마 적용이 잘못된 건가 싶었다.
“아니 방금 바꿨는데 벌써요?” 싶은 순간이었다.

다시 로그를 보니 원인은 layout 차이였다.

기존 `minima` 테마에서는 `home`, `page` layout을 제공했지만, `jekyll-theme-minimal`에서는 해당 layout이 없었다.

그래서 각 파일의 layout을 `default`로 변경했다.

```yml
layout: default
```

수정한 파일은 다음과 같다.

| 파일             | 기존 layout | 변경 layout |
| -------------- | --------- | --------- |
| index.markdown | home      | default   |
| about.markdown | page      | default   |
| 404.html       | page      | default   |

이렇게 수정하니 layout 관련 경고는 사라졌다.

다행히 큰 문제는 아니었고, 테마마다 제공하는 layout 이름이 다를 수 있다는 것을 알게 됐다.

## 현재 프로젝트 구조

현재 프로젝트 구조는 다음과 같다.

![IntelliJ 프로젝트 폴더 구조](/assets/images/2026-05-28/project-structure.png)

여기서 하나 헷갈리면 안 되는 부분은 `_site` 폴더다.

처음에는 이 안의 파일도 직접 수정해야 하나 싶었는데, `_site`는 Jekyll이 빌드하면서 자동으로 만들어주는 결과물이었다.

즉, 여기는 내가 손으로 꾸미는 공간이 아니라 Jekyll이 결과물을 뽑아내는 공간이다.
괜히 여기 들어가서 열심히 수정하면, 다음 빌드 때 Jekyll이 깔끔하게 다시 덮어써줄 수 있다.

고마운데 안 고마운 상황이다.

글은 `_posts` 폴더에 작성하고, 이미지는 루트 기준 `assets/images` 폴더에 넣어야 한다.

정리하면 다음과 같다.

| 폴더 / 파일          | 역할                        |
| ---------------- | ------------------------- |
| `_posts`         | 개발일지 글 작성 위치              |
| `assets/images`  | 글에 사용할 이미지 저장 위치          |
| `_config.yml`    | 사이트 전체 설정                 |
| `index.markdown` | 메인 페이지                    |
| `_site`          | Jekyll 빌드 결과물, 직접 수정하지 않음 |

## 로컬 서버 실행

최종적으로 아래 명령어로 Jekyll 로컬 서버를 실행했다.

```terminal
bundle exec jekyll serve
```

정상적으로 실행되면 아래와 같은 로그가 출력된다.

```terminal
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
```

브라우저에서 아래 주소로 접속하면 로컬 블로그를 확인할 수 있다.

```terminal
http://localhost:4000
```

이 화면이 뜨면 일단 성공이다.
아직 예쁜 블로그는 아니지만, 중요한 건 일단 돌아간다는 것이다.

개발에서 “일단 돌아간다”는 생각보다 큰 성과다.

## 블로그 첫 화면

임시로 만든 블로그 첫 화면은 다음과 같다.

![Jekyll 블로그 첫 화면](/assets/images/2026-05-28/start_blog.png)

아직 디자인도 단순하고 글 목록도 직접 잡아줘야 하지만, 일단 개발일지를 작성할 수 있는 기본 틀은 만들어졌다.

이번 작업을 하면서 Jekyll 블로그가 대략 어떤 구조로 돌아가는지 알게 됐다.<br>
특히 `_config.yml`, `_posts`, `assets`, `_site`의 역할을 구분하는 게 중요했다.

정리하자면 오늘의 결론은 이렇다.

* Jekyll은 Markdown 파일을 HTML로 변환해준다.
* `_site`는 직접 수정하지 않는다.
* IntelliJ 터미널이 명령어를 못 찾으면 일단 재시작을 해보자.
* 개발 블로그 만들기도 생각보다 개발이다.

다음에는 메인 화면에서 작성한 포스트 목록이 보이도록 수정하고, 개발일지 글을 조금 더 보기 좋게 정리해볼 예정이다.
