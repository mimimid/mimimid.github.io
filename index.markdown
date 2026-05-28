---
layout: default
title: Home
---

# 김민지의 개발일지

Java, Spring Boot, 웹 애플리케이션 개발과 인프라 운영 경험을 기록합니다.

개발하면서 겪은 오류, 설정 과정, 문제 해결 흐름을 잊지 않기 위해 정리하는 공간입니다.

## 기록 주제

* Java / Spring Boot
* Thymeleaf / JPA / QueryDSL
* MariaDB
* Docker / NAS / 배포 환경
* GitHub Pages / Jekyll
* 개발 중 발생한 오류와 해결 과정

## 최근 개발일지

{% for post in site.posts %}

* [{{ post.title }}]({{ post.url | relative_url }}) <small>{{ post.date | date: "%Y-%m-%d" }}</small>
  {% endfor %}
