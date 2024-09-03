# React Hooks

React Hooks は、関数コンポーネントで状態やライフサイクルを扱う方法. いくつかの組み込みのフックがあり、カスタムフックを作成することもできる.

## 全体像

| フック       | 説明                                                                                |
| ------------ | ----------------------------------------------------------------------------------- |
| `useState`   | 状態を管理する. ステートフルな関数コンポーネントを記述できる.                       |
| `useEffect`  | ライフサイクルを管理する. レンダリング時や値の変更時の処理を記述できる.             |
| `useRef`     | DOM 要素や値を参照する. JavaScript から直接 DOM を操作したい場合に使用する.         |
| `useMemo`    | 計算コストの高い値をキャッシュする. useState + useEffect.                           |
| `useContext` | コンテキストを利用する. コンテキストを使うと大域的にアクセスできる変数を記述できる. |
| `useReducer` | 複雑な状態管理を行う.                                                               |

## useState

`useState` フックは、関数コンポーネントで状態を管理するためのフック. 状態を保持するための変数と、その変数のセッターを返す.<br/>
`useState`の引数には、状態の初期値を渡す.<br/>
セッターは、新しい値を引数に取り、状態を更新する. 更新する際に以前の値にアクセスする場合は、関数を引数に取る.

```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>{count}</p>
      // setCount(count + 1) としてはいけない
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}
```

## useEffect

`useEffect` フックは、関数コンポーネントでライフサイクルを管理するためのフック. マウント時や値の変更時の処理を記述できる.<br/>
第一引数には、副作用を行う関数を渡す. 第二引数には、依存する値の配列を渡す. 依存する値が変更された場合に副作用を実行する.<br/>
クリーンアップ関数を返すことで、コンポーネントがアンマウントされた際に副作用をクリーンアップできる.<br/>
インタラクティブな画面を作りたい時や、API からデータを取得する際に使用する.

```tsx
import { useEffect, useState } from "react";

export default function Timer() {
  const [ready, setReady] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  // マウント時に実行
  useEffect(() => {
    setReady(true);

    // クリーンアップ関数
    return () => {
      setReady(false);
    };
  }, []);

  // count が変更された場合に実行
  useEffect(() => {
    console.log(count);
  }, [count]);

  return <p>{count}</p>;
}
```

## useRef

`useRef` フックは、DOM 要素や値を参照するためのフック. JavaScript から直接 DOM を操作したい場合に使用する.<br/>
要素外のクリックや Esc キーなどのイベントを監視する際に使用する.

```tsx
import { useEffect, useRef } from "react";

export default function Focus() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

## useMemo

`useMemo` フックは、計算コストの高い値をキャッシュするためのフック. `useState` + `useEffect` の組み合わせ.<br/>
一旦、`useState` + `useEffect` で実装してみて、リファクタの際に `useMemo` を使えるか検討すると楽かも.

```tsx
import { useMemo, useState } from "react";

export default function Memo() {
  const [count, setCount] = useState<number>(0);

  const double = useMemo(() => count * 2, [count]);

  return (
    <div>
      <p>{count}</p>
      <p>{double}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}
```

## useContext

`useContext` フックは、コンテキストを利用するためのフック. コンテキストを使うと大域的にアクセスできる変数を記述できる.<br/>
`Provider`の中のコンポーネントは、`useContext` フックを使ってコンテキストの値にアクセスできる.逆に言えば、`Provider`の外のコンポーネントはアクセスできない.<br/>
認証情報やドロワー、テーマなどの情報を色々な画面で共有する際に使用する.

```tsx
import { createContext, useContext } from "react";

const ThemeContext = createContext<string>("light");

export default function Theme() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeContext);

  return <p>{theme}</p>;
}
```

## useReducer

`useReducer` フックは、複雑な状態管理を行うためのフック. `useState` と同じように状態を管理できるが、複数の状態をまとめて管理できる.<br/>
`useReducer` は、状態とアクションを受け取り、新しい状態を返す関数を渡す.<br/>
よりインタラクティブな画面を作りたい時や、状態が複雑になってきた時に使用する.

```tsx
import { useReducer } from "react";

type State = {
  count: number;
};

type Action = {
  type: "increment" | "decrement";
};

const initialState: State = {
  count: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Reducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}
```

## カスタムフック

カスタムフックは、フックを使ってロジックを共有するための方法. フックを使ってロジックを共有することで、コードの再利用性を高めることができる. カスタムフックは、`use` で始まる名前をつけることが推奨されている.<br/>
よくやるのは`useContext` + `useReducer` を組み合わせ.

```tsx
import { createContext, useContext, useReducer } from "react";

type State = {
  count: number;
};

type Action = {
  type: "increment" | "decrement";
};

const initialState: State = {
  count: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const CounterContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function useCounter() {
  return useContext(CounterContext);
}
```

---

## 演習 React Hooks を使って電卓を実装してみる

### 準備

ディレクトリの作成.

```bash
$ mkdir -p src/app/calculator/components
```

以下のファイルを作成.

```tsx
// src/app/calculator/components/button.tsx
"use client";

export default function CircleButton({
  value,
  onClick,
}: {
  value: number | string;
  onClick: () => void;
}) {
  return (
    <button
      className="
        w-16 h-16
        bg-gray-200
        hover:bg-gray-300
        rounded-full
        focus:bg-orange-500
        focus:text-white
      "
      onClick={onClick}
    >
      {value}
    </button>
  );
}
```

```tsx
// src/app/calculator/page.tsx
"use client";

import { useMemo, useState } from "react";
import CircleButton from "./components/button";

type Operator = "+" | "-" | "x" | "/" | "=";

export default function Calculator() {
  const onNumberClick = (value: string) => {};

  const onOperatorClick = (value: Operator) => {};

  const onClearClick = () => {};

  return (
    <>
      <div className="flex justify-center">
        <div className="block p-10 space-y-10 text-3xl text-gray-700 font-bold">
          <h1 className="text-center">電卓</h1>
          <h3 className="text-center">現在の値</h3>
          <div className="grid grid-cols-4 gap-5">
            <CircleButton value={7} onClick={() => onNumberClick("7")} />
            <CircleButton value={8} onClick={() => onNumberClick("8")} />
            <CircleButton value={9} onClick={() => onNumberClick("9")} />
            <CircleButton value="/" onClick={() => onOperatorClick("/")} />
            <CircleButton value={4} onClick={() => onNumberClick("4")} />
            <CircleButton value={5} onClick={() => onNumberClick("5")} />
            <CircleButton value={6} onClick={() => onNumberClick("6")} />
            <CircleButton value="x" onClick={() => onOperatorClick("x")} />
            <CircleButton value={1} onClick={() => onNumberClick("1")} />
            <CircleButton value={2} onClick={() => onNumberClick("2")} />
            <CircleButton value={3} onClick={() => onNumberClick("3")} />
            <CircleButton value="-" onClick={() => onOperatorClick("-")} />
            <CircleButton value={0} onClick={() => onNumberClick("0")} />
            <CircleButton value="." onClick={() => onNumberClick(".")} />
            <CircleButton value="=" onClick={() => onOperatorClick("=")} />
            <CircleButton value="+" onClick={() => onOperatorClick("+")} />
            <CircleButton value="C" onClick={onClearClick} />
          </div>
        </div>
      </div>
      <p className="text-center text-xl text-gray-700">計算式を表示</p>
    </>
  );
}
```

表示してみる.

```bash
$ npm run dev
```

以下にアクセス.

[http://localhost:3000/calculator](http://localhost:3000/calculator)

### ２桁以上の数値を入力できるようにする

`useState` を使って、入力された数値を保持できるようにする.

```tsx
// src/app/calculator/page.tsx
import { useState } from "react";

// 省略

export default function Calculator() {
  // 入力を文字の配列で保持
  const [buffer, setBuffer] = useState<string[]>([]);

  // 省略

  const onNumberClick = (value: string) => {
    setBuffer((prev) => [...prev, value]);
  };

  // 省略

  const onClearClick = () => {
    setBuffer([]);
  };

  return (
    <>
      {/* 省略 */}
      <h3 className="text-center">{buffer}</h3>
      {/* 省略 */}
    </>
  );
}
```

`useEffect` を使って、`buffer` の値を結合して数値に変換する.

```tsx
// src/app/calculator/page.tsx
import { useEffect, useState } from "react";

// 省略

export default function Calculator() {
  // 省略

  const [operand, setOperand] = useState<number | undefined>(undefined);

  useEffect(() => {
    const value = parseFloat(buffer.join(""));
    setOperand(value || undefined);
  }, [buffer]);

  return (
    <>
      {/* 省略 */}
      <h3 className="text-center">{operand}</h3>
      {/* 省略 */}
    </>
  );
}
```

`useMemo`を使って、リファクタする.

```tsx
// src/app/calculator/page.tsx
import { useMemo, useState } from "react";

// 省略

export default function Calculator() {
  // 省略

  const operand = useMemo(
    () => parseFloat(buffer.join("")) || undefined,
    [buffer]
  );
}
```

以下にアクセスして動作確認.

[http://localhost:3000/calculator](http://localhost:3000/calculator)

### 計算式を保持できるようにする

計算式を保持する際に以下の点に注意する.

- 数字と演算子を交互に保持する.
- 演算子が連続で押された場合は、最後の演算子を上書きする.
- (余裕があれば) `=` の連続入力を実装する.

```tsx
// src/app/calculator/page.tsx

// 省略

export default function Calculator() {
  // 計算式を配列で保持
  const [formula, setFormula] = useState<(number | Operator)[]>([]);

  // 省略

  const onOperatorClick = (value: Operator) => {
    // 数字と演算子を交互に保持
    if (operand) setFormula((prev) => [...prev, operand, value]);
    // 演算子が連続で押された場合は、最後の演算子を上書き
    else if (formula.length) {
      setFormula((prev) => prev.slice(0, -1).concat(value));
    }
    setBuffer([]);
  };

  const onClearClick = () => {
    setBuffer([]);
    setFormula([]);
  };

  return (
    <>
      {/* 省略 */}
      <p className="text-center text-xl text-gray-700">{formula.join(" ")}</p>
    </>
  );
}
```

以下にアクセスして動作確認.

[http://localhost:3000/calculator](http://localhost:3000/calculator)

### 計算式を計算する

電卓の計算ロジックを考えると以下になる.

1. 最初の 3 つの値を計算する
2. その結果を先頭に追加する
3. 1. 2. を繰り返し、式の配列が 3 より小さくなるまで続ける

```tsx
// src/app/calculator/page.tsx

// 省略

export default function Calculator() {
  // 省略
  const calculated = useMemo(() => {
    if (!formula.length) return 0;
    // 計算式を消さないようにシャローコピーする
    const copied = [...formula];
    while (copied.length > 3) {
      const [num1, operator, num2] = copied.splice(0, 3);
      if (typeof num1 !== "number" || typeof num2 !== "number") break;
      if (operator === "+") copied.unshift(num1 + num2);
      else if (operator === "-") copied.unshift(num1 - num2);
      else if (operator === "x") copied.unshift(num1 * num2);
      else if (operator === "/") copied.unshift(num1 / num2);
    }
    return copied[0];
  }, [formula]);

  return (
    <>
      {/* 省略 */}
      <h3 className="text-center">{operand ? operand : calculated}</h3>
      {/* 省略 */}
    </>
  );
}
```

以下にアクセスして動作確認.

[http://localhost:3000/calculator](http://localhost:3000/calculator)
