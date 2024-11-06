---
outline: deep
---

# 介绍

[![赞助](https://img.shields.io/badge/赞助-爱发电-ff69b4)](https://afdian.com/a/streamrec)

Stream-rec 是一个自动录制各种直播平台的工具。

基于 [Kotlin](https://kotlinlang.org/), [Kotlin 协程](https://github.com/Kotlin/kotlinx.coroutines) 和 [Ktor](https://ktor.io/)

> [!TIP]
> 本项目来源于我个人对一个能够自动录制直播,弹幕并支持分段上传到云存储的工具的需求。

## 功能列表

- 自动录播，可配置录制质量，路径，格式，并发量，分段录制（时间或文件大小），分段上传，根据直播标题和开始时间自动命名文件。
- 自动弹幕录制（XML 格式），可使用 [DanmakuFactory](https://github.com/hihkm/DanmakuFactory) 进行弹幕转换，或配合[AList](https://alist.nn.ci/zh/)来实现弹幕自动挂载。
- 使用 [SQLite](https://www.sqlite.org/index.html) 持久化存储录播和上传信息
- 支持 [Rclone](https://rclone.org/) 上传到云存储
- 使用 Web 界面进行配置
- 支持 Docker
- 支持 FLV AVC 修复

## 截图

![login.png](zh/login.png)
![dashboard.png](zh/dashboard.png)
![streamers.png](zh/streamers.png)

## 联系

[![QQ交流群](https://img.shields.io/badge/QQ交流群-EB1923?logo=tencent-qq&logoColor=white)](https://qm.qq.com/q/qAbmjCuTug)

如果您有任何问题或反馈，请随时通过 [GitHub Issues](https://github.com/stream-rec/stream-rec/issues).
