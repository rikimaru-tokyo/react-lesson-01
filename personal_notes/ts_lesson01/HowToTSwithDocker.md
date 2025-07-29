# Node(typescript) + docker 環境構築メモ

https://zenn.dev/gakin/scraps/4cc16e7761d1ef


---

# 必要ファイル作成 ~ 必要パッケージinstall


```Dockerfile
FROM node:12-alpine3.12

WORKDIR /app
```


```yml

# docker-compose.yml
services:
  node-dev:
    build: 
      context: .
      dockerfile: Dockerfile
    tty: true
    volumes:
      - .:/app
```


---


# コンテナ起動&コンテナ内で必要パッケージを追加

```bash
# コンテナ起動
docker-compose up -d --build
# コンテナ内に入る
docker-compose exec node-dev sh

# コンテナ内で必要パッケージを追加
npm init -y
npm install typescript ts-node ts-node-dev

# tsconfig.jsonファイルを作成
npx tsc --init

```


---


# Dockerfile修正 ~ コード実行

```bash
mkdir src && touch src/app.ts
```


## app.ts

```typescript
console.log("Hello, world!")
```


## package.json内のscriptを追加
```json
{
  // .....
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx ts-node-dev --respawn src/app.ts"
  },
  // ......
}
```


---



# Dockerfileを修正

```Dockerfile

FROM node:12-alpine3.12

WORKDIR /app

COPY package*.json ./
RUN npm install

CMD npm run dev

```


コンテナ環境を再起動(再ビルド)


```bash
docker-compose up -d --build
```


# コンテナ環境のログを確認

```bash
docker-compose logs -f
```


以下のように hello worldが表示されていたら成功。


```bash
node-dev_1  |
node-dev_1  | > app@1.0.0 dev /app
node-dev_1  | > npx ts-node-dev --respawn src/app.ts
node-dev_1  |
node-dev_1  | [INFO] 15:29:47 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.4)
node-dev_1  | Hello, world!
```




