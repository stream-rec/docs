---
outline: deep
---

# What is Stream-rec?

Stream-rec is an automatic stream recording tool for various streaming services.

It's powered by [Kotlin](https://kotlinlang.org/), [Ktor](https://ktor.io/), and [ffmpeg](https://ffmpeg.org/).

> [!TIP]
> This project is the result of my personal need for a tool that can automatically record live streams and upload them to cloud storage, as well as my learning of Kotlin Coroutines, Flow, Ktor, DAO, the repository pattern, and other technologies.

## Features

- Automatically records streams with customizable quality and format settings.
- Automatically names files using the stream title and start time.
- Ability to record Danmu (bullet comments) automatically.
- Stores stream and upload information persistently using SQLite.
- Integrates with [Rclone](https://rclone.org/) for cloud storage uploads.
- Configurable through a web interface.
- Supports Docker.
- Includes FLV AVC fix support.

## Screenshots

![login.png](/en/login.png)
![dashboard.png](/en/dashboard.png)
![streamers.png](/en/streamers.png)

## Contact

If you have any questions or feedback, feel free to reach out via [GitHub Issues](https://github.com/stream-rec/stream-rec/issues).
