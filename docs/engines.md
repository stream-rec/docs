# Engines

Downloaders are the core of the application. They are responsible for downloading the video stream from the source. The application supports three downloaders: `Kotlin`, `FFMPEG`, and `Streamlink`. Each downloader has its own features and limitations.

The `FFMPEG` downloader is the default downloader and is the most stable and reliable. It is written in C and is capable of downloading FLV and HLS streams. It is the most efficient downloader in terms of CPU and memory usage. However, it does not support multithreading for HLS downloads.

> [!NOTE]
> The `FFMPEG` shipped with the docker image is a [modified version](https://github.com/yt-dlp/FFmpeg-Builds/) that supports Chinese non-standard HEVC containers. The original `FFMPEG` can be found [here](https://ffmpeg.org/download.html).

## 1. Engines Feature List

|         Feature          |                Kotlin                 |                 FFMPEG                  |               STREAMLINK                |
| :----------------------: | :-----------------------------------: | :-------------------------------------: | :-------------------------------------: |
|       FLV Download       |                  ✅                   |                   ✅                    |                   ❌                    |
|       HLS Download       |        ✅ <br/>(Multithreaded)        |                   ✅                    |         ✅ <br/>(Multithreaded)         |
| Recording Duration Stats | ✅ <br/>(Raw data mode not supported) |                   ✅                    |                   ✅                    |
|  Download Bitrate Stats  |                  ✅                   | ✅ <br/>(-f segmentation not supported) | ✅ <br/>(-f segmentation not supported) |
|    Size Segmentation     | ✅ <br/>(Raw data mode not supported) | ✅ <br/>(-f segmentation not supported) |                   ✅                    |
|  Duration Segmentation   | ✅ <br/>(Raw data mode not supported) |                   ✅                    |                   ✅                    |
|     Download Format      |           FLV, M3U8,TS, M4S           |         Supports other formats          |         Supports other formats          |
|      FLV AVC Repair      |                  ✅                   |                   ❌                    |                   ❌                    |
|        CPU Usage         |     Medium <br/>(Repair enabled)      |                   Low                   |                   Low                   |
|       Memory Usage       |     Medium <br/>(Repair enabled)      |                   Low                   |                 Medium                  |

## 2. FLV AVC Repair Feature List

|                          Feature                           | Engine Action   |
| :--------------------------------------------------------: | --------------- |
|                      Timestamp Jumps                       | Fix using delta |
|    Video Header Changes (Resolution, Other Parameters)     | Split file      |
|                    Audio Header Changes                    | Split file      |
| AMF Metadata Injection (lastheadertimestamp, keyframes...) | Inject          |
|                Duplicate TAG (experimental)                | Ignore          |
