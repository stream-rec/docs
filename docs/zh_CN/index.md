---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Stream-rec"
  text: "全自动录播工具"
  tagline: "多平台流媒体录制"
  image:
    src: /stream-rec.svg
    width: 200
    height: 200
    alt: Stream-rec logo
  actions:
    - theme: brand
      text: 开始使用
      link: /zh_CN/what-is-stream-rec
    - theme: alt
      text: 开发者文档
      link: /zh_CN/api-guide

features:
  - title: 多平台支持
    details: 支持 虎牙、斗鱼、抖音、Twitch等多个平台
  - title: 前后端分离
    details: 前端使用 React + Nextjs, 后端使用 Kotlin + Ktor
  - title: 定时录制
    details: 允许用户设置录制时间段，减少平台API调用次数，提高录制效率
  - title: 容器化部署
    details: Stream-rec 首推 Docker 部署，方便快捷。
---
