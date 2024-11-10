# Installation

Two methods are available to install the tool:

## 1. Docker Compose (Recommended)

### 1.1 Configuring the docker-compose.yml file

> [!IMPORTANT]
> Please read the comments in the configuration file for more information and make sure to modify crucial parts like passwords, paths, etc.

Create a `docker-compose.yml` which contains the following content:

```yaml
networks:
  stream-rec:

services:
  # Backend service
  backend:
    #   Uses the latest main branch image
    image: streamrec/stream-rec:latest
    #    container name, you can change it to any name you like
    container_name: stream-rec
    restart: unless-stopped
    #    port mapping, you can change the port to any port you like
    ports:
      - "12555:12555"
    networks:
      - stream-rec
    volumes:
      # Host machine path binding to container path, storage path mapping
      - "./downloads:/opt/records" // [!code highlight]
      # Rclone configuration file path binding
      - "./rclone:/root/.config/rclone" // [!code highlight]
    environment:
      # Timezone, by default is Europe/Paris.
      - TZ=Europe/Paris
      # Proxy settings, if you are in mainland China, you may need to set up a proxy.
      # Comment it out if you don't need a proxy. Only http proxy is supported.
      #- HTTP_PROXY=http://192.168.110.10:7890
      # Log level, by default is info. `DEBUG` logs are useful for debugging, but they can be very verbose.
      - LOG_LEVEL=INFO
      # CONTAINER database path
      - DB_PATH=/opt/records
      # CONTAINER download path for the first initialization
      - DOWNLOAD_PATH=/opt/records
      # FIRST USE LOGIN secret, YOU CAN CHANGE IT TO ANY STRING YOU LIKE
      - LOGIN_SECRET=123 // [!code highlight]
  # Frontend service
  frontend:
    #   Uses the latest main branch image
    image: streamrec/stream-rec-front:latest
    container_name: stream-rec-frontend
    restart: unless-stopped
    #   port mapping, you can change the port to any port you like
    ports:
      - "15275:15275"
    networks:
      - stream-rec
    depends_on:
      - backend
    environment:
      #    timezone, by default is Europe/Paris.
      - TZ=Europe/Paris
      # Backend api url, made up of the container name and port.
      # DO NOT CHANGE IT if you don't know what you are doing.
      # Make sure the port is the same as the backend port. // [!code warning]
      - API_URL=http://backend:12555/api
      # Secret for next-auth, YOU CAN CHANGE IT TO ANY STRING YOU LIKE
      - NEXTAUTH_SECRET=6chtw8GBN3BO // [!code highlight]
      # CLIENT url, used by next-auth to redirect to login page.
      # Should be the address which the user types in the browser to access the frontend.
      # Make sure the port is the same as the frontend port. // [!code warning]
      - NEXTAUTH_URL=http://localhost:15275/
      # WS_API_URL, CLIENT websocket url. Used for live status updates.
      # This should use the ip address of the deployed server.
      # Below is an example of using localhost, you can change it to the ip address of the deployed server.
      # For example, if backend is deployed on the server ip address 12.12.12.12, with port 12555, then you should change it to ws://12.12.12.12:12555/live/update
      - WS_API_URL=ws://localhost:12555/live/update
```

#### 1.1.1 Proxy settings

If you are using a proxy, you can set the `HTTP_PROXY` environment variable in the `backend` service.

For proxies deployed on the local machine, you can use the following settings:

- Windows and MacOS users:

```yaml
environment:
  - HTTP_PROXY=http://host.docker.internal:port/
```

- Linux users:
  Use the output of the following command to get the host IP address:

```shell
ip addr show docker0
```

Then, replace `<host_ip>` with the IP address:

```yaml
environment:
  - HTTP_PROXY=http://<host_ip>:port/
```

### 1.2 Running the Docker compose

Make sure you are in the same directory as the `docker-compose.yml` file, then run the following command:

```shell
docker compose up -d && docker compose logs -f
```

Now, you are all set! You can access the web interface at [http://localhost:15275](http://localhost:15275) and start configuring the tool (see [Configuration](configuration)).

> [!TIP]
> You can detach from the logs by pressing `Ctrl + C`. And you can reattach to the logs by running `docker compose logs -f`.
> To stop the containers, run `docker compose down`.

## 2. Building from source

### 2.1 Prerequisites

- Internet access, obviously 😂
- [Git](https://git-scm.com/downloads) (Used to get the version information by the backend)
- A java development kit (JDK) (version 21 or
  later), [Amazon Corretto 21](https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/downloads-list.html) is recommended.
- [FFmpeg](https://ffmpeg.org/download.html) (Make sure it's in your `PATH`). No longer required if you are using the `kotlin` engine.
- [FFprobe](https://ffmpeg.org/download.html) (Make sure it's in your `PATH`). Required if `Exit on download error` option is enabled.
- [Streamlink](https://streamlink.github.io/install.html) (optional, for recording streams, make sure it's in your `PATH`)
- [Rclone](https://rclone.org/downloads/) (optional, for uploading to cloud storage, make sure it's in your `PATH`)
- ~~[Sqlite3](https://www.sqlite.org/download.html) (for storing stream, upload information, make sure it's in your `PATH`)~~

### 2.2 Building the backend

To build the project, first clone the repository and navigate to the root directory of the project.

```shell
git clone https://github.com/stream-rec/stream-rec.git
cd stream-rec
```

Then, build the project using the following command:

```shell
./gradlew stream-rec:build -x test
```

The built fat jar file `stream-rec.jar` will be located in the `stream-rec/build/libs` directory.

### 2.2.1 Running the jar file

To run the jar file with default configuration, use the following command:

```shell
java -jar stream-rec/build/libs/stream-rec.jar
```

Several environment variables can be set to configure the tool:

- `DB_PATH`: Path to the SQLite database folder. (default: `./db`)
- `JWT_SECRET`: Secret key for JWT token generation.
- `LOG_LEVEL`: Log level (default: `info`).
- `LOGIN_SECRET`: Login password for the web interface (default: `stream-rec`, if not set).

For example:

```shell
java -DDB_PATH=/path/to/your/db -DLOG_LEVEL=DEBUG -DJWT_SECRET=SECRET -DLOGIN_SECRET=123 -jar stream-rec/build/libs/stream-rec.jar
```

> [!IMPORTANT]
>
> - Please set the `LOGIN_SECRET` environment variable to a secure password. This password is used to log in to the web interface.
> - This password cannot be changed after the first run.

### 2.3 Building the frontend

Frontend is used to configure the tool, it's a simple web interface built with React.

Navigate to [frontend](https://github.com/stream-rec/stream-rec-frontend) repository and follow the build instructions.

After that, you can start configuring the tool by accessing the web interface at [http://localhost:15275](http://localhost:15275). Take a look at the [Configuration](configuration) page for more information.
