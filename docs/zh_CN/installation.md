# 安装

Stream-rec 可以通过 Docker Compose 或者从源代码构建来安装。

## 1. Docker Compose(推荐)

### 1.1 构建 Docker compose 文件

> [!IMPORTANT]
> 请详细阅读配置文件中的注释以获取更多信息，并确保修改关键部分，如密码、路径等。

请选择在一个无中文符号路径下创建一个 `docker-compose.yml` 文件， 并将以下内容复制到文件中：

<<< @/zh_CN/docker-compose.yml{highlightLines}

#### 后端环境变量

| 环境变量      | 描述                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------- |
| LOG_LEVEL     | 设置后端日志输出的详细程度。常见级别包括 debug、info、warn 和 error，用于控制生成的日志信息。  |
| HTTP_PROXY    | 指定应用程序用于传出 HTTP 请求的代理服务器 URL。可用于通过特定网络路径路由请求或绕过网络限制。 |
| DB_PATH       | 指定数据库文件或目录的文件系统路径，用于数据库连接的初始化。应该是容器内的文件夹路径。         |
| DOWNLOAD_PATH | 指定下载的流媒体或文件保存的目录路径。在应用程序初始化过程中设置。应该是容器内的文件夹路径。   |
| LOGIN_SECRET  | 用于应用程序初始化阶段的初始登录或用户账户设置的临时密码。出于安全考虑，初始化后此选项无效。   |


#### 1.1.1 代理设置

如果您使用代理，您可以在 `backend` 服务中设置 `HTTP_PROXY` 环境变量。

对于部署在本地机器上的代理，您可以使用以下设置：

- Windows 和 MacOS 用户：

```yaml
environment:
  - HTTP_PROXY=http://host.docker.internal:<port>/
```

- Linux 用户： 使用以下命令的输出来获取主机 IP 地址：

```shell
ip addr show docker0
```

然后，将 `<host_ip>` 替换为 IP 地址，将 `<port>` 替换为端口号。

```yaml
environment:
  - HTTP_PROXY=http://<host_ip>:port/
```

#### 前端环境变量

| 环境变量             | 描述                                                                       |
| -------------------- | -------------------------------------------------------------------------- |
| NEXTAUTH_URL         | 指定应用程序的基础 URL，通常是部署站点的根 URL，用于身份验证回调和重定向。 |
| NEXT_PUBLIC_BASE_URL | 定义应用程序的公共基础 URL，用作前端和 API 请求的基本路径。                |
| NEXTAUTH_SECRET      | 用于加密会话和身份验证令牌的密钥，确保用户数据安全。                       |
| API_URL              | 后端连接 URL，用于连接和访问后端服务。                                     |
| WS_API_URL           | 后端 websocket 连接 URL，用于获取实时事件更新。                            |


### 1.2 运行 Docker compose

确保您在与 `docker-compose.yml` 文件相同的目录中，然后运行以下命令：

```shell
docker compose up -d && docker compose logs -f
```

稍等片刻，等待加载完成你就可以在 [http://localhost:15275](http://localhost:15275) 访问 Web 界面并开始配置工具（参见 [配置](configuration)）。

> [!TIP]
> 您可以通过按 `Ctrl + C` 来退出日志。您可以通过运行 `docker compose logs -f` 来重新连接到日志。
> 如果您想停止服务，可以运行 `docker compose down`。

## 2. 从源码构建

### 2.1 环境要求

- 有魔法的网络（虽然但是，你都能上 GitHub 了，应该没问题）
- [Git](https://git-scm.com/downloads) (用于克隆仓库、后端获取服务器版本)
- Java 开发环境 (JDK) (版本 21 或更高),
  推荐使用 [Amazon Corretto 21](https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/downloads-list.html)。
- [FFmpeg](https://ffmpeg.org/download.html) (确保它在你的系统变量 `PATH` 中)。 如果使用`kotlin` 引擎则不需要。
- [FFprobe](https://ffmpeg.org/download.html) (确保它在你的系统变量 `PATH` 中)。 开启`下载错误时退出`功能需要。
- [Streamlink](https://streamlink.github.io/install.html) (可选，用于录制，确保它在你的系统变量 `PATH` 中)
- [Rclone](https://rclone.org/downloads/) (可选，用于上传到云存储，确保它在你的系统变量 `PATH` 中)
- ~~[Sqlite3](https://www.sqlite.org/download.html) (用于存储录播和上传信息，确保它在你的系统变量 `PATH` 中)~~

### 2.2 构建后端服务

首先，克隆仓库并进入项目的根目录。

```shell
git clone https://github.com/stream-rec/stream-rec.git
cd stream-rec
```

然后，使用以下命令构建项目：

```shell
./gradlew stream-rec:build -x test
```

构建的 fat jar 文件 `stream-rec.jar` 将位于 `stream-rec/build/libs` 目录中。

### 2.2.1 运行 jar 文件

使用以下命令运行默认配置 jar 文件：

```shell
java -jar stream-rec/build/libs/stream-rec.jar
```

可配置的环境变量如下：

- `DB_PATH`: 数据库文件路径 (默认: `./db`).
- `JWT_SECRET`: JWT 令牌生成的密钥.
- `LOG_LEVEL`: 日志级别 (默认: `info`).
- `LOGIN_SECRET`: Web 界面的登录密码 (默认: `stream-rec`)，只有在第一次运行时有效，后续修改不会生效。

例如：

```shell
java -DDB_PATH=/path/to/your/db -DLOG_LEVEL=DEBUG -DJWT_SECRET=SECRET -DLOGIN_SECRET=123 -jar stream-rec/build/libs/stream-rec.jar
```

> [!IMPORTANT]
>
> - 建议将 `LOGIN_SECRET` 环境变量设置为安全密码。该密码用于登录 Web 界面。
>   该密码只有在第一次运行时有效，后续修改不会生效。

### 2.3 构建前端服务

访问 [stream-rec-frontend](https://github.com/stream-rec/stream-rec-frontend) 仓库并按照说明构建前端服务。

完成后可以在 [http://localhost:15275](http://localhost:15275) 访问 Web 界面并开始配置工具（参见 [配置](configuration)）。
