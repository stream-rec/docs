# 更新日志

本文件记录了 StreamRec 的更新历史。

## 0.7.2

- 构建(deps): 更新依赖
- 增加(斗鱼): 支持火山 CDN
- 增加: 新下载引擎，支持 flv avc 修复
- 增加(后端): 配置版本 API
- 增加(后端): 管理主播激活状态的 API
- 增加(streamlink): 支持 ttvlol 插件
- 增加(抖音): 添加多个 websocket 域名
- 文档: 添加爱发电链接
- 重构(ffmpeg): 使用 ffprobe 检测分辨率变化（实验性）
- 增加: 支持定时任务下载
- 添加: 下载引擎功能对比文档
- 修复: 部分主播未成功下播

**Full Changelog**: https://github.com/stream-rec/stream-rec/compare/v0.7.1...v0.7.2

## 0.7.1

- 构建(deps): 更新依赖
- 重构(用户): 优化重置密码流程
- 增加(数据库): 使用 bcrypt 加密用户密码
- 添加(抖音): 支持双屏直播
- 修复(FFMPEG): 自动删除`core`文件
- 添加(后处理): 添加复制后处理
- 修复(pandatv): 修复录制
- 重构(虎牙弹幕): 优化弹幕注册流程，使用官方流程

**Full Changelog**: https://github.com/hua0512/stream-rec/compare/v0.7.0...v0.7.1

## 0.7.0

- 构建(Dockerfile): 更改为使用`amazoncorretto:21-al2023-headless`作为运行时镜像
- 构建(Dockerfile): 支持 arm64 架构
- 重构(http): 更改为使用 OkHttp 引擎
- 修复(下载): 取消正在下载的任务后，无法再次启用下载
- 修复(弹幕): 替换弹幕发送者的名称为 xml 友好的字符串
- 修复(弹幕): 分段结束前写入缓冲区
- 修复(抖音): 支持'\_' 直播间
- 增加(前/后端): 支持批量删除录播和上传日记

**Full Changelog**: https://github.com/hua0512/stream-rec/compare/v0.6.9...v0.7.0

## 0.6.9

- 重构(弹幕): 使用 bilibili 弹幕格式
- 增加: 虎牙平台添加 cookies 验证
- 移除: 移除过时的 sqlDelight 依赖和迁移

**Full Changelog**: https://github.com/hua0512/stream-rec/compare/v0.6.8...v0.6.9

## 0.6.8

- 修复: 斗音弹幕请求缺少签名参数

## 0.6.7

- 修复(下载): 回退到使用同步处理，解决部分下载问题
- 增加: 虎牙平台移动 API 支持高于 10000 码率的 hack
- 添加: 前后端支持上传失败文件重试
- 修复: 前端侧边栏行为异常

## 0.6.6

- 增加: FFMPEG 无损分段 -f segment（实验性）
- 增加: FFMPEG 下载错误时退出（实验性）
- 增加: 平台轮询检查间隔参数 （实验性）
- 增加: 虎牙平台强制原画（实验性）
- 增加: 虎牙平台使用移动 API 获取直播间信息
- 增加: Twitch 平台跳过广告（实验性）
- 增加: 代理设置（HTTP_PROXY 环境变量，不支持 SOCKS 代理）
- 优化: 弹幕将一次性写入 20 条，减少 IO 写入次数
- 优化: 使用 Jetpack Room 替换原有 SQLDelight
- 修复: 虎牙直播跳过 HDR 选项
- 修复: 斗鱼直播间画质选择
- 修复: Twitch 直播间 Auth Token 未设置的问题
- 修复: 第一次分段后，有概率无法继续下载弹幕的问题

- 调整: 禁用主播录制后将执行回调
