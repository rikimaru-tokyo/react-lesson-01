# Docker image(イメージ)の違い:alpine,bullseye, buster, slim, stretch, jessie, slim-buster, windowsservercore, latestどれを選ぶべきか？


# 参考資料

https://prograshi.com/platform/docker/docker-image-tags-difference/

---



|タグ|内容|OS|
|---|---|---|
|latest|最新のフルパッケージ。| - |	
|slim|使用頻度の低いツールやライブラリを除外した最小パッケージ。	| - |
|alpine|シンプル軽量なAlpine Linuxベースで構築された超軽量イメージ。| AlpineLinux |
|bullseye|Debian11で構築されたイメージ。|Debian(v11)|
|bullseye-slim|Debian11で構築されたイメージ。使用頻度の低いツールを除外した最小パッケージ。|Debian(v11)|
|buster|Debian10で構築されたイメージ。|Debian(v10)|
|buster-slim|Debian10で構築されたイメージ。使用頻度の低いツールを除外した最小パッケージ。|Debian(v10)|
|stretch|Debian9で構築されたイメージ。|Debian(v9)|
|stretch-slim|Debian9で構築されたイメージ。使用頻度の低いツールを除外した最小パッケージ。|Debian(v9)|
|jessie|Debian8で構築されたイメージ。|Debian(v8)|
|jessie-slim|Debian8で構築されたイメージ。使用頻度の低いツールを除外した最小パッケージ。	|Debian(v8)|
|windowsservercore|Windows用サーバー系OSで構築したイメージ。	|Windows|
