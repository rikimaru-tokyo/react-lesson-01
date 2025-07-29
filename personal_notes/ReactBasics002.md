<!-- omit in toc -->
# KENのモダンWeb開発ラボ - React入門シリーズ

https://www.youtube.com/playlist?list=PLL8RZJqj2LQcQ1k_BJvZf1CXdhVinMZeL


<!-- omit in toc -->
# 目次

- [Reactとは?](#reactとは)
  - [コンポーネント?](#コンポーネント)
  - [JSX](#jsx)
  - [コンポーネントを詳しく](#コンポーネントを詳しく)
- [Viteによるローカル環境構築](#viteによるローカル環境構築)
  - [Viteプロジェクトルート直下のindex.html](#viteプロジェクトルート直下のindexhtml)
- [props](#props)


# Reactとは?

- Reactは、コンポーネントを使ってユーザーインターフェイスを構築するのに役立つライブラリ
- 小さなコンポーネントを組み合わせて、大規模なアプリケーションまで作れる
- React本家サイト　　https://ja.react.dev



## コンポーネント?

- コンポーネントは、HTMLとロジックを再利用可能な関数に統合する
- CodeSandbox  ブラウザでReactが試せるサイト
  - https://codesandbox.io/p/sandbox/react-new



## JSX

- JSXはJavaScriptの構文拡張
- HTMLのようなマークアップを、JavaScriptの中に直接書くことができる
- ただし、JSXはそのままでは「正式な」JavaScriptではないため、トランスパイル(変換)が必要
    - トランスパイルは通常はBabelで実行される


## コンポーネントを詳しく

- App()コンポーネントはトップレベルのコンポーネント
- コンポーネントとは、`関数`である
  - return すべきものはJSX、TSXである
  - 自分自身をHTMLにレンダリングする方法を「知っている」関数


```jsx

// 自分で作ったコンポーネント
function Hoge(){
  return <p> HELLO !! </p>;
}

//呼び出すときは
<Hoge />

```

##　さいころコンポーネントを作ってみる

〇　Sai.tsx

```tsx
export default function Sai(){
    //Math.random()」は0〜1未満（1は入らない）までの小数による乱数を生成する
    const roll =  Math.floor(Math.random()*6)+1;
    return <h1>{ roll }</h1>
}
```

〇　App.tsx


```jsx
import Sai from './Sai.tsx'

{/* 中略 */}
<div>
    <Sai />
</div>
```

--- 

# Viteによるローカル環境構築

https://www.youtube.com/watch?v=UCXgv_JmrKk&list=PLL8RZJqj2LQcQ1k_BJvZf1CXdhVinMZeL&index=3

- create-react-appは、React専用のビルドやセットアップのツール。
  - create-react-appは、現在では非推奨になった（メンテナーが長年不在になった）
  - React界隈やVue界隈でもViteの導入例が著しく増えた
- Viteは、小～中規模向け。
  - ほかにもプロダクションレベルで`Next.js`, `Remix`, `Gatsby`などがある

## Viteプロジェクトルート直下のindex.html

- `<div id="root"></div>`の中に、Reactのコンテンツが入っている
- `<script type="module" src="/src/main.tsx">`が最上のエントリーポイント
- React外のHTMLを書き出す場合は、index.htmlの内容を変更することで実現


●　main.tsxの中身（あまり内容を変更することはない）

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---


# props


- Propsは、コンポーネントに渡せる引数のようなもの。
- Propsを使うことで、設定可能なコンポーネントを作成できる。

```tsx
<Greeter name="Bill" />
<Greeter name="Ted" />
```




