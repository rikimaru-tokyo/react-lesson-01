import { useState, type ChangeEvent, type FormEvent } from 'react'
import './App.css'


function App() {

  //型定義
  type ToDo = {
    inputValue: string;
    id: number;
    checked: boolean;
  }

  // useStateの式の中には、ToDo型の配列を持たせておく
  // 丸かっこの引数は、空の配列として宣言する
  // 「このstateでは、ToDo型のデータ配列しか使えない」という意味になる
  // 余計なデータや型が入らなくなるので安全なコードになる
  const [todos, setTodos] = useState<ToDo[]>([]);


  //テキストフィールドのHOOKを定義する
  const [inputValue, setInputValue] = useState('');

  //tsでは、関数の引数も肩を指定しなくてはならない（エラーになる）
  // よってeの型も定義する必要がある
  // VSCodeであれば、型から類推補完してくれる（要：React拡張機能）
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //これでstateで宣言した、inputValue変数がセッティングされる
    setInputValue(e.target.value);
  };

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

  };

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

  //完了未完了
  const handleChecked = (id: number, checked: boolean) => {
    /* ディープコピー(完全にコピーされた別の配列)に変えよう(ミューテートから守るため) */
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        //反転
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //削除
  const handleDelete = (id: number) => {
    //idが正しくないのは残す。正しいと消す。
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        {/* タスク設定が完了したら */}
        {/*「Encountered two children with the same key」エラーが出たので */}
        {/*　ユニーク性を確保するために、input項目各種にプレフィックスを追加 */}
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                key={'txt_'+todo.id}
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                disabled={todo.checked}
              />
              <input
                key={'chk_'+todo.id}
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              <button 
              key={'del_'+todo.id}
              onClick={() => handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default App
