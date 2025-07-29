# DockerでReact＋Vite構築

- 背景
    - create-react-appは、現在では非推奨になった（メンテナーが長年不在になった）
    - React界隈やVue界隈でもViteの導入例が著しく増えた


---


## Viteとは？

- Vite公式マニュアル「はじめに」
    - https://ja.vite.dev/guide/
- Viteとは？フロントエンド開発を爆速化するビルドツール
    - https://qiita.com/tomada/items/91c489e41a20a2fd11ea
- 【React】CRAとVite比較まとめ【初学者】
    - https://qiita.com/rummy_p/items/35ac70fbbe854749a195



---

## Dockerで構築 (WSL2-ubuntuで、起動実績あり)
- Vite + React + TypeScript 環境を Docker で構築する方法
    - https://dtnavi.tcdigital.jp/dev_blog/devtool/vite-react-typescript-%e7%92%b0%e5%a2%83%e3%82%92-docker-%e3%81%a7%e6%a7%8b%e7%af%89%e3%81%99%e3%82%8b%e6%96%b9%e6%b3%95/
- 補足：WSL2 で Vite を使う場合は、WSL2のファイルシステム側で作業すべし
    - https://laboradian.com/use-wsl2-file-system-for-vite/


### DockerFile
```Dockerfile

# ベースイメージの指定 
FROM node:lts-alpine3.20 

#作業ディレクトリ 
WORKDIR /var/www/html/app

```

### docker-compose.yml

```yaml
services:
  app:
    build:
      context: .
      dockerfile: ./Dockerfile
    #どのディレクトリのdockerfileからimageをビルドするかを指定
    container_name: vite-container # コンテナ名を明示的に指定する
    ports:
      - 5173:5173
    volumes:
      - ./app/:/var/www/html/app
    # ホストマシンの(./app)をコンテナ内のディレクトリ（/var/www/html/app） にマウント
    environment:
      - WATCHPACK_POLLING=true #ホットリロードできるように
    tty: true #コンテナを起動させ続ける

```



### vite.config.ts (`npm run dev`する前に)

```javascript

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

//追加コード
  server: {
    host: true, // true に設定すると、LAN やパブリックアドレスを含むすべてのアドレスをリッスン
    port: 5173, // 開発サーバーが使用するポート番号
  },
});

```

### 実行ステップ

1. `docker compose up -d コマンドを実行`
1. `docker exec -it vite-container sh` # コマンドでコンテナの仮想環境にアクセス
1. `npm create vite@latest` # npmでvite最新版をインストール
1. `Ok to Proceed?(y)：y`
1. `Project name ：`        # 任意（defalutでも可）
1. `Select a framework:React`
1. `select a variant：`     # TypeScript( + SWCの方が高速にビルドしてくれる)
1. `cd {プロジェクト名}`
1. `npm install`
1. `npm run dev`   # 毎回これでサーバーを立ち上げること








## Dockerでビルドしたときにどうしてもroot権限になってしまう問題


- Docker の Rootlessモードを試してみた
    - https://qiita.com/yasthon/items/26f943bd5f1b8fab87e0

https://muryoimpl.com/blog/2020-03-12/rootless-docker-in-archlinux/


https://pc.atsuhiro-me.net/entry/2022/03/20/163744


```sh
rikimaru  ~  ♥ 01:30  curl -fsSL https://get.docker.com/rootless | sh
# Installing stable version 28.3.1
# Executing docker rootless install script, commit: fb10f07
# Missing system requirements. Please run following commands to
# install the requirements and run this installer again.
# Alternatively iptables checks can be disabled with SKIP_IPTABLES=1

cat <<EOF | sudo sh -x
apt-get -y install uidmap
EOF
```

- Vite + React + TypeScript 環境を Docker で構築する方法
    - https://dtnavi.tcdigital.jp/dev_blog/devtool/vite-react-typescript-%e7%92%b0%e5%a2%83%e3%82%92-docker-%e3%81%a7%e6%a7%8b%e7%af%89%e3%81%99%e3%82%8b%e6%96%b9%e6%b3%95/


> [!WARNING]
> // Viteのバージョン確認
> npm list -g vite




