# 安装

Stream-rec 可以通过 Docker Compose 或者从源代码构建来安装。

## 1. Docker Compose(推荐)

### 1.1 构建 Docker compose 文件

> [!IMPORTANT]
> 请详细阅读配置文件中的注释以获取更多信息，并确保修改关键部分，如密码、路径等。

请选择在一个无中文符号路径下创建一个 `docker-compose.yml` 文件， 并将以下内容复制到文件中：

```yaml
networks:
  stream-rec:

services:
  # 后端服务
  backend:
    # 使用最新的主分支镜像
    # 如果您想使用特定版本，请更改为streamrec/stream-rec:version
    # 您可以在https://hub.docker.com/r/streamrec/stream-rec/tags中找到所有可用的版本
    # latest是最新稳定内测版本，dev 是最新开发版。
    image: streamrec/stream-rec:latest
    # 容器名称，您可以将其更改为任何您喜欢的名称
    container_name: stream-rec
    restart: unless-stopped
    #  端口映射，您可以将端口更改为任何您喜欢的端口，默认为12555
    #  请注意，如果您更改了端口，请确保在前端服务中更改相关配置。
    ports:
      - "12555:12555"
    networks:
      - stream-rec
    volumes:
      # 将主机机器路径绑定到容器路径，存储路径映射
      # 下载路径，默认为当前运行目录下的downloads文件夹
      - "./downloads:/opt/records" // [!code highlight]
      # Rclone 配置文件路径绑定
      - "./rclone:/root/.config/rclone" // [!code highlight]
    # 环境变量
    environment:
      # 时区，默认为 Europe/Paris,您可以将其更改为任何您喜欢的时区，请确保前端服务中的时区与此处一致。
      - TZ=Asia/Shanghai
      # 代理设置，如果您在中国大陆，您可能需要设置代理。
      # 不需要代理的用户请将其注释掉。 只支持http代理。
      #- HTTP_PROXY=http://192.168.110.10:7890
      # 日志级别，默认为info。调试日志对于调试非常有用，但可能非常冗长。 遇到问题时，您可以将其更改为debug。
      - LOG_LEVEL=INFO
      # 容器数据库路径
      - DB_PATH=/opt/records
      # 容器第一次初始化下载路径
      - DOWNLOAD_PATH=/opt/records
      # 初始化登录密钥，您可以将其更改为任何您喜欢的字符串, 用于登录
      # 请注意，该密钥只有第一次运行时有效，后续更改不会生效
      - LOGIN_SECRET=123 // [!code highlight]

  # 前端服务
  frontend:
    # 使用最新的主分支镜像，请确保与后端服务tag一致
    # 如果您想使用特定版本，请更改为streamrec/stream-rec-front:version
    # 您可以在https://hub.docker.com/r/streamrec/stream-rec-front/tags 中找到所有可用的版本
    # latest是最新稳定内测版本，dev 是最新开发版。
    image: streamrec/stream-rec-front:latest
    # 容器名称，您可以将其更改为任何您喜欢的名称
    container_name: stream-rec-frontend
    restart: unless-stopped
    #  端口映射，您可以将端口更改为任何您喜欢的端口，默认为15275
    ports:
      - "15275:15275"
    networks:
      - stream-rec
    depends_on:
      - backend
    # 环境变量
    environment:
      # 时区，默认为 Europe/Paris,您可以将其更改为任何您喜欢的时区。
      - TZ=Asia/Shanghai
      # 后端api url，由容器名称和端口组成。 如果您不知道自己在做什么，请不要更改它。
      - API_URL=http://backend:12555/api
      # 加密密钥，用于next-auth，您可以将其更改为任何您喜欢的字符串
      - NEXTAUTH_SECRET=6chtw8GBN3BO // [!code highlight]
      # 客户端访问url。 用于next-auth重定向登录页面。
      # 这应该使用部署服务器的前端地址。
      # 确保端口与前端端口相同。
      - NEXTAUTH_URL=http://localhost:15275/
      # WS_API_URL，客户端websocket url。 用于实时状态更新。
      # 这应该使用部署服务器的ip地址。
      # 例如，以下是使用localhost的示例，您可以将其更改为部署服务器的ip地址。
      # 例如，如果后端部署在12.12.12.12的服务器上，端口为12555，则应将其更改为 ws://12.12.12.12:12555/live/update
      - WS_API_URL=ws://localhost:12555/live/update
```

#### 1.1.1 代理设置

如果您使用代理，您可以在 `backend` 服务中设置 `HTTP_PROXY` 环境变量。

对于部署在本地机器上的代理，您可以使用以下设置：

- Windows 和 MacOS 用户：

```yaml
environment:
  - HTTP_PROXY=http://host.docker.internal:port/
```

- Linux 用户： 使用以下命令的输出来获取主机 IP 地址：

```shell
ip addr show docker0
```

然后，将 `<host_ip>` 替换为 IP 地址：

```yaml
environment:
  - HTTP_PROXY=http://<host_ip>:port/
```

### 1.2 运行 Docker compose

确保您在与 `docker-compose.yml` 文件相同的目录中，然后运行以下命令：

```shell
docker compose up -d && docker compose logs -f
```

稍等片刻，等待加载完成你就可以在 [http://localhost:15275](http://localhost:15275) 访问 Web 界面并开始配置工具（参见 [配置](Configuration)）。

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

访问 [stream-rec-frontend](https://github.com/stream-rec/stream-rec-front) 仓库并按照说明构建前端服务。

完成后可以在 [http://localhost:15275](http://localhost:15275) 访问 Web 界面并开始配置工具（参见 [配置](configuration)）。
