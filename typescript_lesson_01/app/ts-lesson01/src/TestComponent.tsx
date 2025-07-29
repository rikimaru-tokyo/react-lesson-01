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