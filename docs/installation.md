# Installation

Two methods are available to install the tool:

## 1. Docker Compose (Recommended)

### 1.1 Configuring the docker-compose.yml file

> [!IMPORTANT]
> Please read the comments in the configuration file for more information and make sure to modify crucial parts like passwords, paths, etc.

Create a `docker-compose.yml` which contains the following content:

<<< @/docker-compose.yml

#### Backend environment variables

| Environment   | Description                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| LOG_LEVEL     | Determines the verbosity of logging output for the backend. Common levels include debug, info, warn, and error, which control the detail and amount of log information generated.                            |
| HTTP_PROXY    | Specifies the URL of the proxy server that the application should use for outgoing HTTP requests. This can be used to route requests through a specific network path or to bypass network restrictions.      |
| DB_PATH       | Indicates the file system path to the database file or directory, which is used during the initialization of the database connection. Should be a folder of container path.                                  |
| DOWNLOAD_PATH | Specifies the directory path where downloaded streams or files are saved. This path is set during the application's initialization process. Should be a folder of container path.                            |
| LOGIN_SECRET  | A temporary password or secret used for the initial login or setup of a user account during the application's initialization phase. This option has no effect after the initialization for security reasons. |
| PGID          | Group ID                                                                                                                                                                                                     |
| PUID          | User ID                                                                                                                                                                                                      |

#### Proxy settings

If you are using a proxy, you can set the `HTTP_PROXY` environment variable in the `backend` service.

For proxies deployed on the local machine, you can use the following settings:

- Windows and MacOS users:

```yaml
environment:
  - HTTP_PROXY=http://host.docker.internal:<port>/
```

- Linux users:
  Use the output of the following command to get the host IP address:

```shell
ip addr show docker0
```

Then, replace `<host_ip>` with the IP address and `<port>` with the port number.

```yaml
environment:
  - HTTP_PROXY=http://<host_ip>:port/
```

#### Frontend environment variables

| Environment          | Description                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| NEXTAUTH_URL         | Specifies the base URL of the application, typically the root URL of the deployed site, used for authentication callbacks and redirects. |
| NEXT_PUBLIC_BASE_URL | Defines the public base URL of the application, used as the base path for frontend and API requests.                                     |
| NEXTAUTH_SECRET      | A secret key used to encrypt sessions and authentication tokens, ensuring user data security.                                            |
| API_URL              | The backend connection URL, used to connect to and access the backend service.                                                           |
| WS_API_URL           | The backend websocket connection URL, used to retrieve real time event updates.                                                          |

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
