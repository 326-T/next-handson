# React Function Component

UI を構成する要素を関数コンポーネントとして定義する.<br/>
2 パターンの書き方がある. eslint や airbnb のルールによっては関数の書き方が推奨されている.

- [eslint] (https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md)
- [airbnb] (https://airbnb.io/javascript/react/)

1. 関数
   ```tsx
   export default function Hello({ name }: { name: string }) {
     return <h1>Hello, {name}!</h1>;
   }
   ```
2. アロー関数
   ```tsx
   const Hello = ({ name }: { name: string }) => <h1>Hello, {name}!</h1>;
   export default Hello;
   ```

どちらも`props`を受け取って`html`を返す関数となっている.<br/>
`props`の型は`{ name }: { name: string }`という形で定義する.

## React FC を書いてみる

```bash
$ mkdir -p src/app/hello/fc/components
```

```tsx
// src/app/hello/fc/components/Title.tsx
export default function Title({ title }: { title: string }) {
  return <h1 className="text-2xl text-blue-700">{title}</h1>;
}
```

```tsx
// src/app/hello/fc/components/discription.tsx
export default function Discription() {
  return (
    <p className="text-blue-400">
      Function component is a simple way to create a reusable component in
      React.
    </p>
  );
}
```

```tsx
// src/app/hello/fc/page.tsx
import Discription from "./components/discription";
import Title from "./components/title";

export default function FunctionComponent() {
  return (
    <>
      <Title title="React Function Component" />
      <Discription />
    </>
  );
}
```

アクセスして確認する.<br/>
[http://localhost:3000/hello/fc](http://localhost:3000/hello/fc)

---

## 単方向バインディング

React は単方向バインディングを採用している.<br/>
親コンポーネントから子コンポーネントに`props`を渡すことができるが、子コンポーネントから親コンポーネントに`props`を渡すことはできない.<br/>
そのため親コンポーネントでの値の変化は子コンポーネントに反映されるが、子コンポーネントでの値の変化は親コンポーネントには反映されない.<br/>
子コンポーネントから親コンポーネントの値を変化させたい場合は、親コンポーネントから値の Setter を`props`として渡す必要がある.
