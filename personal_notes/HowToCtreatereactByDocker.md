# 【React】Dockerを使って開発環境の環境構築をする

https://www.youtube.com/watch?v=jUO1QjRpaD0

https://engr-sng.com/blog/react14


●　フォルダ構成

```sh
├── app
│   ├── README.md
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   └── tsconfig.json
├── docker
│   └── Dockerfile
└── docker-compose.yaml

```


## Dockerfile

1. https://hub.docker.com/
1. `node`で検索 - `Docker Official Images`内にある`node`に入る
1. `tags`内で、`lts`で検索（Long-Term Supportの略）
1.  `lts-alpine3.22`を使う
1. 
 
```Dockerfile
FROM node:lts-alpine3.22

WORKDIR /var/www/html

RUN npm install -gh create-react-app

```


## docker-compose.yml

```yaml
version: '3'

services:
  app:
    build: 
      context: . #rootをどこにするか
      dockerfile: ./docker/Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./app:var/www/html/app
    environment:
      - CHOKIDAR_USEPOLLING=true #Reactのファイルを更新したときに常に監視状態にする
    tty: true        
    stdin_open: true
    command: sh -c 'cd app && npm winstart'

```

- tty
    - 仮想端末を配置するコマンド
    - docker run -it {container_name}の -i にあたる設定
    - シェルスクリプトの実行や対話型のCLIツールを使う場合、ttyを有効にすると端末が割り当てられるため、正常に動作するようになる。
    - 有効にすると、コンテナが実行されている間、常に仮想ターミナルがアタッチされる


- stdin_open
    - 標準入力（stdin）をオープン状態する。
    - これにより、ユーザーが標準入力を通じてコンテナに対話的に入力を送ることが可能になる
    - コンテナに接続してコマンドを入力したい場合や、対話的なシェルを利用する場合に有効

(参考)　docker-composeのtty, stdin_open

https://qiita.com/s_i_engineer/items/9299e64062d5ba059d40






## ビルド
```sh

cd ./react-docker
docker-compose build --no-cache

# これは、Yamlの記法ミス「-」の直後には半角スペースが必要
ERROR: The Compose file './docker-compose.yml' is invalid because:
services.php.volumes contains an invalid type, it should be an array

#build成功したら、下記コマンドでReactプロジェクトを構築
docker-compose run --rm app sh -c 'npx create-react-app app --template typescript'

```

## Win限定　ホットリロードの設定

●　`app/package.json`

`winstart`という起動コマンドを追記する。

```json

  "scripts": {
    "start": "react-scripts start",
    "winstart": "CHOKIDAR_USEPOLLING=true react-scripts start",    
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

```


変更後、docker-compose.ymlで、コマンド起動を変える

```yaml

# before
    command: sh -c 'cd app && npm start'

# after
    command: sh -c 'cd app && npm winstart'

```





## 補足：

WindowsのWSL2上のDockerでup時に`ContainerConfig`のエラーが出た。

https://owlcamp.jp/docker-compose-up-containerconfig-error-wsl2-windows/


