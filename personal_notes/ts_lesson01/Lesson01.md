<!-- omit in toc -->
# Udemy - 最速で学ぶTypeScript

https://www.udemy.com/course/typescript-react-frontend/learn/lecture/20732876

---
<!-- omit in toc -->
# 環境について

Udemyのコースでは、ローカルにNodeとReactをインストールするというシナリオになってる。

時間節約のために、[Vite環境で構築した、Reactプロジェクト「ts_lesson01」](../ts_lesson01/)の環境で進めていくことにする。


<!-- omit in toc -->
# 目次

- [TypeScriptの必要性](#typescriptの必要性)
- [TypeScriptのデータ型](#typescriptのデータ型)
  - [const, letによる宣言](#const-letによる宣言)
  - [型推論](#型推論)
  - [明示的な型宣言(アノーテーション)](#明示的な型宣言アノーテーション)
  - [number型](#number型)
  - [boolean型](#boolean型)
  - [配列型 (型が統一)](#配列型-型が統一)
  - [配列型 (型が混在)](#配列型-型が混在)
  - [オブジェクト型](#オブジェクト型)
  - [関数型](#関数型)
- [Intersection Types](#intersection-types)
- [Union Types](#union-types)
- [Literal Types](#literal-types)
- [typeof](#typeof)
- [keyof](#keyof)
  - [typeofとkeyofの兼用](#typeofとkeyofの兼用)
- [enum (※注意：現在非推奨)](#enum-注意現在非推奨)
- [型の互換性](#型の互換性)
- [ジェネリクス](#ジェネリクス)
  - [メリット](#メリット)
  - [デフォルト設定](#デフォルト設定)
  - [extendsによる制限](#extendsによる制限)
  - [関数のジェネリックス](#関数のジェネリックス)
  - [props](#props)
- [JSON型推論](#json型推論)
- [React Hooks Props](#react-hooks-props)
  - [1. ReactのAppコンポを下記のように書き換える](#1-reactのappコンポを下記のように書き換える)
  - [2. カスタムコンポーネントを作成](#2-カスタムコンポーネントを作成)
- [React Hooks useState](#react-hooks-usestate)
- [Event Handler型データの扱い](#event-handler型データの扱い)
- [TODO - 1 : interfaceとtypeの違い](#todo---1--interfaceとtypeの違い)
- [TODO - 2 React Hooksとは　？](#todo---2-react-hooksとは)
- [TypeScriptの列挙型 (※現在非推奨)](#typescriptの列挙型-現在非推奨)
  - [enum が推奨されない理由](#enum-が推奨されない理由)
  - [最新バージョンで使ったらエラーになる](#最新バージョンで使ったらエラーになる)



---


# TypeScriptの必要性

- TypeScriptはJavaScriptにコンパイルされる
- コンパイル時に静的解析(型の整合性チェック)
    - 従来のJavaScriptは型定義がなかった(any型)
    - 安全なソフトウェアというのは型に厳密である必要があある
      - 組み込み型などの製品に出すソフトウェアは安全性が求められている
    - 型に厳密なのは品質に直結してくる
- ドキュメント(誰でも理解しやすいコード)


```typescript

// 引数x,yに型宣言して、関数の戻り値も型定義する
const add = (x: number, y: number) : number => {
    return x + y;
}

```

![](./images/introduction01.png)

---

# TypeScriptのデータ型

## const, letによる宣言

`const` は、`リテラル型`として宣言される


```js

const name="hello";   //もう決まった値 & 再代入ができない
let nameChangable = "Hello";   //再代入可能
nameChangable = "Hello!!"

```

## 型推論

```js
let userName = "Taro";
// ↑　TSでは、自動的に【String】として推論される
```


## 明示的な型宣言(アノーテーション)

```ts
let userName: string = "Taro";
```

## number型

```ts
let num: number = 2;
```


## boolean型

```ts
let bool: boolean = true;
```


## 配列型 (型が統一)

```ts
let array1: boolean[] = [true,false,true]
let array2: number[] = [1,10,100]
```

## 配列型 (型が混在)

```ts
let array1: (number|string)[] = [1,2,"hello"]
```

## オブジェクト型

```js
interface NAME {
  firstName: string;
  lastName: string;
}

let name: NAME = {
  firstName: "Name1",   // interfaceで宣言した通り、string以外は代入できない
  lastName: "Name2",    // また、オブジェクト中の変数は、欠けることなく必ず使う
};
```

```js
interface NAME {
  firstName: string;
  lastName?: string;   //変数名末尾に？をつける
}

let name: NAME = {
  firstName: "Name1",   //?付きの宣言をした場合は、未定義でも許される 
};
```

```js
interface NAME {
  firstName: string;
  lastName: string | null;   //Nullも許容する場合
}

let name: NAME = {
  firstName: "Name1",
  lastName: null,
};
```


## 関数型

```ts
// 引数すべて、戻り値も型宣言しておく
const func1 = (x:number, y:number): number  => {
  return x + y;
}

```

---

# Intersection Types

文字通り`複数のtypeを結合する型`となる

```js
type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  username: string;
  password: string;
};


type USER = PROFILE & LOGIN;

const userA: USER = {
  age: 123,
  city: "Tokyo",
  username: "Taro",
  password: "foobar",
};

```


---

# Union Types

「｜」(OR)で複数の型に宣言する


```js
let value: boolean|number;
value = true;     // OK
value = 10;       // OK
value = "Hello";  // NG

let arrayUni: (string|number)[];
arrayUni = [1, 2, "Hello"];   // OK
arrayUni = [1, 2, true];      // NG
```

---

# Literal Types

代入できる値を制限するケースに使う

```js

let company: "Facebook" | "Google" | "Amazon";
company='Google';    // OK 
company='Apple';     // NG 

let memory: 256 | 512;
memory = 256;    // OK 
memory = 128;    // NG 

```

---

# typeof

宣言済変数の型を取得

```js

let msg: string = "Hello";
let msg2: typeof msg;     // string型を継承している
msg2 = "Hello!!";   // OK
msg2 = 123;         // NG


let animal = { cat : "Tama" };
let newAnimal: typeof animal = { cat : "Mike" };

// newAnimalの型は。元のanimalの型を継承して
// newAnimal = { cat : string }となる
```

---

# keyof

JSONオブジェクトを掘り下げる際に、typeofやkeyofが有益になる。

```js
type KEYS = {
  primary: string;
  secondary: string;
};

let key: keyof KEYS;
// let key: "primary" | "secondary" と同じ意味になる
// tyoe key = "primary" | "secondary" と同じ意味になる

key = "primary";    // OK
key = "qrimary";    // NG
```

## typeofとkeyofの兼用

```js
const SPORTS = {
  soccer: "SCR",
  baseball: "BAS",
};

let keySports: keyof typeof SPORTS;
// let keySports: "soccer" | "baseball" と同じ意味になる

```

---

# enum (※注意：現在非推奨)

> [!WARNING]
> [cf. TypeScriptの列挙型 (※現在非推奨)](#TypeScriptの列挙型 (※現在非推奨))

---

# 型の互換性

```js
// OKパターン
const comp1 = "test";
let comp2: string = comp1;

//NGパターン
let comp3: string = "test";
let comp4: "test" = comp3;

// 関数についても互換性に注意する
let func1 = (x: number) => {}
let func2 = (x: string) => {}

func1 = func2;    //エラー
func2 = func1;    //エラー
```

---

# ジェネリクス

- 【TypeScript】Generics(ジェネリックス)を理解する
  - https://qiita.com/k-penguin-sato/items/9baa959e8919157afcd4
- ジェネリクス (generics)
  - https://typescriptbook.jp/reference/generics

> [!TIP]
> Genericsは抽象的な型引数を使用して、実際に利用されるまで型が確定しないクラス・関数・インターフェイスを実現する為に使用されます。


```js
//このタイミングでは、Tは抽象的な型になったままである
interface GEN<T>{
  item: T;
}

//このタイミングでは、Tもitemもstringになっている
const gen: GEN<string> = {item:"hello"};
//このタイミングでは、Tもitemもnumberになっている
const genN: GEN<number> = {item:123};

// NGパターン
const gen1: GEN = {items:"hello"};
// NGパターン
const genN: GEN<number> = {item:"123"};

```


## メリット

- 型の安全性を保ちながら柔軟性を向上。
- コードの重複を減らし、保守性を向上。


## デフォルト設定


```js
interface GEN<T=string>{
  item: T;
}

//エラーにならなくなる
const gen1: GEN = {items:"hello"};


```

## extendsによる制限

```js
interface GEN2<T extends string | number>{
  item: T;
}

// OKパターン
const gen2: GEN2<string> = {item:"hello"};
const gen3: GEN2<number> = {item: 123};
// NGパターン
const gen4: GEN2<boolean> = {item: true};
```

## 関数のジェネリックス

```js

//ここでのpropsは予約語ではないので、argでもxでもよい
function funcGen<T>(props: T){
  return {items: props};
}

const gen = funcGen<string>("hoge");

//<>で明示せずとも、型推論してくれる
const gen2 = funcGen("hoge");

//null型も引数にすることができる
const gen3 = funcGen<string|null>("hoge");

//----- extendsによる限定
function funcGenEx<T extends string|null>(props: T){
  return {value: props};
}

// OKパターン
const gen4 = funcGenEx("String");
// NGパターン
const gen5 = funcGenEx(123);

```


## props

```js
interface Props {
  price: number;
}

function funcProps<T extends Props>(arg: T){
    return {value: arg.price};
}

const gen = funcProps({price:123});

// ## アロー関数表記
const genArrow = <T extends Props>(arg:T) => {
  return {value: arg.price}
}


```

---

# JSON型推論

```js

// 外部からJSONを読み込む
import Data from './data.json'

// usersの中にJSONデータが格納される
type users = typeof Data;

```

---

# React Hooks Props

## 1. ReactのAppコンポを下記のように書き換える

```js
function App() {
  //中略
}

// ▼▼-----書き換え-----▼▼ 
// FC = FunctionalComponent 
// Appコンポは元来React.FC型になる
const App: React.FC = () => {
  //中略
}

```


## 2. カスタムコンポーネントを作成

VSCodeで「ra」をタイピングすると、自動生成のためのひな形「rafce」が生成される。（※注：公式拡張機能が必要）


●　ひな形

```js
import React from 'react'

const TestComponent = () => {
  return (
    <div>TestComponent</div>
  )
}

export default TestComponent
```


●　実装 (TestComponent.tsx)

```js
import React from 'react'

interface Props{
    text: string;
}

const TestComponent:React.FC<Props> = (props) => {
  return (
    <div>
        <h1>TestComponent</h1>
        <div>{ props.text }</div>
    </div>
  )
}

export default TestComponent
```


●　実装 (Apptsx)


```js

import TestComponent from './TestComponent'

const App: React.FC = () => {
  return (
    <>
      <div className="card">
        <TestComponent text="Hello from App"/>
      </div>
    </>
  )
}

export default App

```

---

# React Hooks useState

useStateはReact Hooksの基本機能となる

Functional Componentの中でもStateを保持できる。

●　TestComponent.tsx実装

```js
import React, { useState } from 'react'

interface Props{
    text: string;
}

const TestComponent:React.FC<Props> = (props) => {

    // count：変数、setCount:stateお更新すするための関数名、useState(初期値)
    // useStateの初期値にnumberを指定することで、countとsetCount戻り値が自動的にnumberに割り当てられる
    const [count, setCount] = useState(0);

  return (
    <div>
        <h1>TestComponent</h1>
        <div>{ props.text }</div>
        <h1>Count : { count }</h1>
    </div>
  )
}

export default TestComponent

```

では、useStateでnumberでもnullでも「入ると想定する場合はどうなるか？


```js
   const [count, setCount] = useState<number | null>(0);
```



useStateでオブジェクトを扱いたい場合はどうするか？

```js
interface UserData {
    id: number;
    name: string;
}

const [user, setUser] = useState<UserData>({id:123, name:"Test"});

```
---

# Event Handler型データの扱い

- 【React×TypeScript】イベントハンドラの型
  - https://qiita.com/y-suzu/items/9e9a243aaded5952834a

```js

import React, { useState } from 'react'

const TestComponent:React.FC = () => {

    const [inputData, setInputData] = useState("");

    // eventハンドラの型に困った場合は、VSCodeの拡張機能で、onChangeの記述をホバリングして知ることができる
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputData(e.target.value);
    }

    return (
      <div>
          <h1>TestComponent</h1>
          <input type='text' value={inputData} onChange={handleInputChange} />
          <h1>{inputData}</h1>

      </div>
    )
}

export default TestComponent


```







---







---



# TODO - 1 : interfaceとtypeの違い

https://typescriptbook.jp/reference/object-oriented/interface/interface-vs-type-alias

https://zenn.dev/hsato_workman/articles/b9ff07e7619877




---


# TODO - 2 React Hooksとは　？

【完全版】初心者のためのReact Hooks入門 - 世界一わかりやすい解説

https://note.com/yuuki_kawabata/n/n419bff1aedf2


https://zenn.dev/hideaki_0108/articles/314f9e25544173


---


# TypeScriptの列挙型 (※現在非推奨)

https://qiita.com/k8o/items/51cafbf7bda527a9d5bf

https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums

> [!CAUTION]
> TSの2025年現在は非推奨機能となる。
> 

- 【TypeScript】enum を使わないほうがよい理由と代替手段
  - https://qiita.com/purojyu/items/d2f2d24dbdc3facf2012
- 列挙型(enum)の問題点と代替手段
  - https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums

## enum が推奨されない理由

- 余計なJavaScriptコードが生成され、コードサイズが増える
- JavaScriptの標準的なオブジェクトと異なる動作をする
- const enum には環境依存の制約がある
- 型安全ではない（不正な値をセットできる）
- as const や ユニオン型 の方がシンプルで型安全

## 最新バージョンで使ったらエラーになる

> [!WARNING]
> This syntax is not allowed when 'erasableSyntaxOnly' is enabled

