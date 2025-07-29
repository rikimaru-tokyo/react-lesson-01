# Todoリストを作りながらTypescriptとReactを触ってみよう ~Typescript入門~

https://www.youtube.com/watch?v=ANcopd8Bmao


------
------
------

<br>


## プロジェクト作成

※動画は3年前に配信開始したもので、`create-react-app`を利用した構築になっているので、`vite`での構築をオレオレで始める。


```sh
/var/www/html/app # npm create vite@latest
Need to install the following packages:
create-vite@7.0.3
Ok to proceed? (y)
> npx
> create-vite
│
◇  Project name:
│  todolist-youtube
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript + SWC
│
◇  Scaffolding project in /var/www/html/app/todolist-youtube...
│
└  Done. Now run:

  cd todolist-youtube
  npm install
  npm run dev

npm notice
npm notice New major version of npm available! 10.9.2 -> 11.4.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.4.2
npm notice To update run: npm install -g npm@11.4.2
npm notice
/var/www/html/app #

# !!! WSL環境なので`vite.config.js`に下記3行を加えるのを忘れないように

  //追加コード
  server: {
    host: true, // true に設定すると、LAN やパブリックアドレスを含むすべてのアドレスをリッスン
    port: 5173, // 開発サーバーが使用するポート番号
  },

```

（補足）Jestとは

→　TypeScriptによる、テストフレームワーク


https://typescriptbook.jp/tutorials/jest


## 生成されたソースの整理


### App.tsx

- ロゴは消しておく
- カウンター周りのコードも消しておく
- 冒頭のimportはコメントアウトしておく


### CSSの適用

動画でリンクされたGithubからCSSを転用。ちょっと不安なので、既存ソースはすべてコメントアウトしよう。

https://github.com/Shin-sibainu/todolist-react-typescript/blob/main/src/

App.cssは、`inputText`～`todoList`だけをもっていけばよさそう。（センタリングしてくれない）

※　重要　：　今回の開発ターゲットはApp.tsx中心



## コーディング-1

### App.tsx


```javascript

function App() {
  return (
    <>
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={()=>{}}>
          <input type='text' onChange={()=>{}} className="inputText" />
          <input type='submit' value="作成" className='submitButton'/>
        </form>
      </div>
    </>
  )
}
```

## コーディング-2 型定義

- まずテキストボックスの文字列(`string`)が必要
- 各タスクを識別するためのID(`number`)
- 「完了・未完了」のフラグ(`bool`)

TypeScriptの強みは`型定義による、エラー出力できること。`


→　Appメソッド内の冒頭で、下記コードで型定義する。

```javascript

  //型定義
  type ToDo = {
    inputValue: string;
    id: number;
    chacked: boolean;
  }

```


## コーディング-3 stateを持たせよう


```javascript

import { useState } from 'react'

// {{中略}}

  // useStateの式の中には、ToDo型の配列を持たせておく
  // 丸かっこの引数は、空の配列として宣言する
  // 「このstateでは、ToDo型のデータ配列しか使えない」という意味になる
  // 余計なデータや型が入らなくなるので安全なコードになる
  const [todos, setTodos] = useState<ToDo[]>([]);


  //テキストフィールドのHOOKを定義する
  const [inputValue, setInputValue] = useState('');

```

## コーディング-4 フォームに吹き込む


### テキストボックス

```HTML

    <!-- e変数はイベントを指す -->
    <input type='text' onChange={(e)=>{handleChange(e)}} className="inputText" />

```


```javascript

  //tsでは、関数の引数も肩を指定しなくてはならない（エラーになる）
  // よってeの型も定義する必要がある
  // VSCodeであれば、型から類推補完してくれる（要：React拡張機能）
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //これでstateで宣言した、inputValue変数がセッティングされる
    setInputValue(e.target.value);
  }

```


### Submitボタン

```HTML

    <!-- e変数はイベントを指す -->
    <form onSubmit={(e)=>{handleSubmit(e)}}>

```

```javascript

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //リロードしないように
    e.preventDefault();

    //新しいToDoを作成
    const newToDo: ToDo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    //ts独自のspread構文
    //todos配列に、ToDo型1件`newToDo`をpushする
    setTodos([newToDo, ...todos]);

    //submitした後は、テキストを空にしておく
    setInputValue('');

    console.log(todos);

  }

```


### ToDo配列を整理して出力

JavaScript機能を実装したいので、JSX記法で書く。

```HTML

        </form>
        <ul>
          {todos.map((todo) => (
            <li>
              {todo.inputValue}
            </li>
            )
          )}
        </ul>

```

【ここで`Warning`】

`li`タグごとに、Keyを割り当てなくてはならないという警告文

```sh
Each child in a list should have a unique "key" prop.
```

対応策

```HTML
    <li key={todo.id}>
      {todo.inputValue}
    </li>
```



### 編集を実装する


```javascript


        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type='text' 
                     onChange={(e)=>{handleEdit(todo.id, e.target.value)}} 
                     className="inputText"
                     value={todo.inputValue}
                     />
            </li>
            )
          )}
        </ul>

```


```javascript

  //どのタスクIDで編集が必要なのかを識別する必要がある
  const handleEdit = (id: number, val: string) => {
        // この時点だとvoid型になってしまう
        const newToDos = todos.map((todo)=>{
          if(todo.id = id) {
            todo.inputValue = val;
          }
          // ToDo型を返してあげる
          return todo;
        })
        setTodos(newToDos);
  };


```

# 最終形態サンプルはこちら

https://github.com/Shin-sibainu/todolist-react-typescript


Reactのバージョン違いなのか、配列をディープコピーしないと失敗しやすいとのこと。

キーの重複が発生しチェックボックスの誤動作が起きる。


```sh
Encountered two children with the same key,
```

- （原因と対処方法）
    - React.jsで"Warning: Encountered two children with the same key"エラーが表示されたときの解決方法
        - https://www.resumy.ai/tech-posts/a1b027b0-0244-4d2b-89b2-5843f1919b7d
    - 【TypeScript】"同じkeyがありますよ"エラーの解消
        - https://qiita.com/yoshiwo/items/2d73f10fd1011b3a6b8a

<br>

------
------
------

<br>
