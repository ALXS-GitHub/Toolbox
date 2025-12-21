---
origin: installed
category: dev
url: https://developer.mozilla.org/en-US/docs/Web/JavaScript
description: The language of the web
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/javascript.png
---

# JavaScript

**JavaScript** is the programming language of the web. It runs in every browser, enabling interactive websites, web applications, and increasingly powers servers ([Node.js](/docs/dev/code/frameworks/node), [Deno](/docs/dev/code/frameworks/deno), [Bun](/docs/dev/code/frameworks/bun)), desktop apps, and mobile apps. Originally created in 10 days in 1995, it has evolved into a mature, versatile language standardized as ECMAScript.

## Why JavaScript

- **Universal**: Runs in every browser without installation
- **Full-stack**: Frontend and backend with the same language
- **Massive ecosystem**: npm has millions of packages
- **Event-driven**: Built for asynchronous, non-blocking operations
- **Evolving rapidly**: Yearly ECMAScript updates add modern features

## Getting started

JavaScript runs directly in browsers. No installation needed for client-side code.

For server-side or tooling, install a runtime:
- **[Node.js](/docs/dev/code/frameworks/node)**: The established runtime
- **[Deno](/docs/dev/code/frameworks/deno)**: Secure by default, TypeScript native
- **[Bun](/docs/dev/code/frameworks/bun)**: Fast all-in-one runtime

```powershell
scoop install nodejs-lts   # Node.js
scoop install deno         # Deno
scoop install bun          # Bun
```

## Hello World

In browser (HTML file):
```html
<script>
  console.log("Hello, World!");
</script>
```

In Node.js:
```javascript
// hello.js
console.log("Hello, World!");
```

```powershell
node hello.js
```

## Core concepts

### Variables

```javascript
let count = 0;        // Mutable, block-scoped
const PI = 3.14159;   // Immutable binding
var legacy = "old";   // Function-scoped (avoid in modern code)
```

### Data types

```javascript
// Primitives
const str = "hello";
const num = 42;
const big = 9007199254740991n;  // BigInt
const bool = true;
const undef = undefined;
const nul = null;
const sym = Symbol("id");

// Objects
const arr = [1, 2, 3];
const obj = { name: "Alice", age: 30 };
const fn = () => "I'm a function";
```

### Functions

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function
const greet = (name) => `Hello, ${name}!`;

// Default parameters
const greet = (name = "World") => `Hello, ${name}!`;

// Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
```

### Objects and destructuring

```javascript
const user = { name: "Alice", age: 30, city: "Paris" };

// Destructuring
const { name, age } = user;

// Spread
const updated = { ...user, age: 31 };

// Shorthand properties
const name = "Bob";
const person = { name, age: 25 };  // { name: "Bob", age: 25 }
```

### Arrays

```javascript
const arr = [1, 2, 3, 4, 5];

arr.map(x => x * 2);           // [2, 4, 6, 8, 10]
arr.filter(x => x > 2);        // [3, 4, 5]
arr.reduce((sum, x) => sum + x, 0);  // 15
arr.find(x => x > 3);          // 4
arr.includes(3);               // true

// Destructuring
const [first, second, ...rest] = arr;
```

### Classes

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}
```

### Async/await

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

// Multiple concurrent requests
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
]);
```

### Modules

```javascript
// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { add } from "./math.js";
```

## ES2025 features

ECMAScript 2025 (approved June 2025) brings:

- **Import attributes**: `import data from './config.json' with { type: 'json' };`
- **Iterator helpers**: `.map()`, `.filter()`, `.take()`, `.drop()` on iterators
- **Set methods**: `union()`, `intersection()`, `difference()`, `symmetricDifference()`
- **Promise.try()**: Synchronous-when-possible promise wrapper
- **Float16Array**: Half-precision floats for ML and GPU work
- **RegExp.escape()**: Safely escape regex special characters
- **Duplicate named capture groups**: Same name in alternation branches

```javascript
// Iterator helpers
const nums = [1, 2, 3, 4, 5].values();
const doubled = nums.map(x => x * 2).take(3).toArray();  // [2, 4, 6]

// Set methods
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);
a.intersection(b);  // Set {2, 3}
a.union(b);         // Set {1, 2, 3, 4}
```

## Common patterns

### Event handling (browser)

```javascript
document.querySelector("button").addEventListener("click", (e) => {
  console.log("Clicked!", e.target);
});
```

### Fetch API

```javascript
const response = await fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" }),
});
const result = await response.json();
```

### Local storage (browser)

```javascript
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));
const user = JSON.parse(localStorage.getItem("user"));
```

## Tooling

| Tool | Purpose |
|------|---------|
| npm/pnpm/yarn | Package managers |
| [Vite](/docs/dev/code/frameworks/vite) | Fast dev server and bundler |
| ESLint | Linting |
| Prettier | Code formatting |
| Vitest/Jest | Testing |

## When to use JavaScript

**Good fit:**
- Web frontend (it's the only option)
- Full-stack web development
- Cross-platform desktop ([Electron](/docs/dev/code/frameworks/tauri), Tauri)
- Serverless functions
- Quick scripts and prototypes

**Consider alternatives when:**
- You need static typing (use [TypeScript](/docs/dev/code/languages/typescript))
- CPU-intensive computation (consider [Rust](/docs/dev/code/languages/rust), C++)
- Type safety is critical for a large codebase

## Summary

JavaScript is the universal language of the web, running in browsers and on servers. Modern JS (ES2020+) includes `async/await`, modules, classes, and destructuring. ES2025 adds iterator helpers, set methods, and import attributes. For larger projects, consider [TypeScript](/docs/dev/code/languages/typescript) for static typing. Use [Vite](/docs/dev/code/frameworks/vite) for modern development workflows.
