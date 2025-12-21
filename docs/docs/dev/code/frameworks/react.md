---
origin: installed
category: dev
url: https://react.dev/
description: JavaScript library for building user interfaces
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/react.png
---

# React

**[React](https://react.dev/)** is a JavaScript library for building user interfaces, created and maintained by Meta. It uses a component-based architecture where you build encapsulated pieces of UI that manage their own state, then compose them into complex applications. React's declarative approach makes code predictable and easier to debug.

## Core concepts

### Components
Everything in React is a component—reusable, self-contained pieces of UI. Components can be functions that return JSX (a syntax extension that looks like HTML):

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

### JSX
JSX lets you write HTML-like syntax in JavaScript. It gets compiled to regular JavaScript function calls:

```jsx
const element = <div className="container">Content</div>;
// Compiles to: React.createElement('div', {className: 'container'}, 'Content')
```

### State and props
- **Props**: Data passed from parent to child components (read-only)
- **State**: Data managed within a component that can change over time

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Hooks
Hooks let you use state and other React features in function components:

| Hook | Purpose |
|------|---------|
| `useState` | Manage local state |
| `useEffect` | Side effects (data fetching, subscriptions) |
| `useContext` | Access context without prop drilling |
| `useRef` | Persist values across renders without triggering re-render |
| `useMemo` | Memoize expensive calculations |
| `useCallback` | Memoize functions |

## Setting up a project

React requires [Node.js](/docs/dev/code/frameworks/node). The recommended way to start a new project is with [Vite](/docs/dev/code/frameworks/vite):

```powershell
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

For TypeScript:
```powershell
npm create vite@latest my-app -- --template react-ts
```

## Project structure

A typical React project:
```
my-app/
├── src/
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components (if using routing)
│   ├── App.jsx         # Root component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── package.json
└── vite.config.js
```

## Common patterns

### Conditional rendering
```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
{items.length > 0 && <ItemList items={items} />}
```

### Lists
```jsx
{users.map(user => <UserCard key={user.id} user={user} />)}
```

### Event handling
```jsx
<button onClick={(e) => handleClick(e)}>Click me</button>
<input onChange={(e) => setQuery(e.target.value)} />
```

### Fetching data
```jsx
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []);
```

## React 19 features

React 19 (stable since December 2024) introduced significant improvements:

- **React Compiler**: Automatically memoizes components—fewer manual `useMemo`/`useCallback` calls needed
- **Server Components**: Render components on the server, reducing client JavaScript
- **Actions**: Handle form submissions and mutations with `useActionState` and `useOptimistic`
- **Activity component** (19.2): Control visibility of UI sections for pre-rendering and state preservation

## Ecosystem

| Category | Popular choices |
|----------|-----------------|
| Routing | React Router, TanStack Router |
| State management | Zustand, Jotai, Redux Toolkit |
| Data fetching | TanStack Query, SWR |
| Forms | React Hook Form, Formik |
| UI components | [shadcn/ui](/docs/dev/code/frameworks/shadcn), Radix, Headless UI |
| Frameworks | Next.js, Remix |

## When to use React

**Good fit:**
- Single-page applications (SPAs)
- Complex UIs with lots of interactive elements
- Projects needing a large ecosystem and community
- Teams already familiar with JavaScript/TypeScript

**Consider alternatives when:**
- Simple static sites (use plain HTML or a static site generator)
- SEO-critical content sites without server rendering capabilities
- Very small projects where a framework is overkill

## Summary

React provides a component-based architecture for building user interfaces. Its declarative approach, hooks system, and massive ecosystem make it a solid choice for web applications of any size. Start new projects with Vite for fast development, and leverage the React 19 compiler for automatic performance optimizations.
