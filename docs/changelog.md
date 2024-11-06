# Changelog

In this file you can see the changes between each version of the project.

## 0.7.2

- build(deps): dependencies updates
- feat(douyu-extractor): support huo3 CDN by @hua0512 in https://github.com/stream-rec/stream-rec/pull/162
- feat: flv avc/hls parser by @hua0512 in https://github.com/stream-rec/stream-rec/pull/159
- feat(server): config version api by @hua0512 in https://github.com/stream-rec/stream-rec/pull/165
- feat(server): add an api to manage streamer's activation state by @hua0512 in https://github.com/stream-rec/stream-rec/pull/166
- feat(streamlink-engine): add support for ttvlol plugin by @hua0512 in https://github.com/stream-rec/stream-rec/pull/167
- feat(douyin-danmu): add multiple websocket domains by @hua0512 in https://github.com/stream-rec/stream-rec/pull/168
- docs: add buy me a coffee by @hua0512 in https://github.com/stream-rec/stream-rec/pull/170
- docs: add afdian by @hua0512 in https://github.com/stream-rec/stream-rec/pull/171
- refactor(ffmpeg-engine): use ffprobe to detect resolution changes by @hua0512 in https://github.com/stream-rec/stream-rec/pull/180
- feat: add support for timer task downloads by @hua0512 in https://github.com/stream-rec/stream-rec/pull/185
- chore: prepare to bump to `0.7.2` ver by @hua0512 in https://github.com/stream-rec/stream-rec/pull/20

**Full Changelog**: https://github.com/stream-rec/stream-rec/compare/v0.7.1...v0.7.2

## 0.7.1

- build(deps): dependencies updates
- feat(db): hash user password with md5 by @hua0512 in https://github.com/hua0512/stream-rec/pull/123
- refactor(huya-danmu): use reversed-engineered danmu registration workflow by @hua0512 in https://github.com/hua0512/stream-rec/pull/127
- feat(douyin-extractor): add support for double screen streams by @hua0512 in https://github.com/hua0512/stream-rec/pull/128
- ci(docker): merge and enhance Docker workflows by @hua0512 in https://github.com/hua0512/stream-rec/pull/130
- feat(user): enhance user management and password recovery by @hua0512 in https://github.com/hua0512/stream-rec/pull/129
- fix(ffmpeg): move deletion of `core` file to proper location by @hua0512 in https://github.com/hua0512/stream-rec/pull/142
- feat(ActionService): add copy action by @hua0512 in https://github.com/hua0512/stream-rec/pull/143
- fix(pandatv-extractor): missing origin header by @hua0512 in https://github.com/hua0512/stream-rec/pull/144

**Full Changelog**: https://github.com/hua0512/stream-rec/compare/v0.7.0...v0.7.1

## 0.7.0

- build(deps): dependencies updates
- build(Dockerfile): change to use `amazoncorretto:21-al2023-headless` as runtime image by @hua0512 in https://github.com/hua0512/stream-rec/pull/94
- chore(http): change to use OkHttp engine instead by @hua0512 in https://github.com/hua0512/stream-rec/pull/96
- refactor(download): manage exceptions properly by @hua0512 in https://github.com/hua0512/stream-rec/pull/97
- fix(download): suspend for streamer's cancel action by @hua0512 in https://github.com/hua0512/stream-rec/pull/100
- fix(danmu): extract xml-friendly string replacement into separat… by @hua0512 in https://github.com/hua0512/stream-rec/pull/102
- build: support arm64 architecture by @hua0512 in https://github.com/hua0512/stream-rec/pull/107
- refactor(danmu): buffered write by @hua0512 in https://github.com/hua0512/stream-rec/pull/109
- refactor(code): change Douyin 'roomId' to 'webRid' by @hua0512 in https://github.com/hua0512/stream-rec/pull/110
- feat(backend): implement batch delete for stream and upload data by @hua0512 in https://github.com/hua0512/stream-rec/pull/111

**Full Changelog**: https://github.com/hua0512/stream-rec/compare/v0.6.9...v0.7.0

## 0.6.9

- refactor(danmu): use bilibili danmu format by @hua0512 in https://github.com/hua0512/stream-rec/pull/92
- feat(huya-extractor): add cookies validation
- chore(database): remove deprecated sqlDelight dependencies and migration

**Full Changelog**: https://github.com/hua0512/stream-rec/compare/v0.6.8...v0.6.9

## 0.6.8

- fix(douyin-danmu) : include signature parameter in request

## 0.6.7

- refactor(download): fallback to use synchronized handling
- feat(huya): add a hack for mobile API to use bitrates higher than 10000
- feat(upload): add support for retrying upload of failed files
- frontend: fix sidebar misbehavior

## 0.6.6

- Feat: add FFMPEG lossless segmentation -f segment (experimental)
- Feat: add FFMPEG exit on download error flag (experimental)
- Feat: add platform's fetch interval parameter (experimental)
- Feat: add Huya platform force original stream flag (experimental)
- Feat: add Huya platform use mobile API to fetch live room info
- Feat: add Twitch platform skips ads (experimental)
- Feat: add Twitch streamlink skip-ads parameter (experimental)
- Feat: add proxy settings (HTTP_PROXY environment variable, SOCKS proxy not supported)
- Optimize: Danmu will write 20 at a time to reduce IO write times
- Optimize: Replace SQLDelight with Jetpack Room
- Fix: skip Huya live HDR streams as unsupported
- Fix: Douyu quality selection
- Fix: Twitch Auth Token not set
- Fix: After the first segmentation, there is a probability that the Danmu cannot continue to be downloaded
- Adjust: after disabling streamer recording, post callbacks will be executed
