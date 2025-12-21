---
origin: installed
category: dev
url: https://www.typescriptlang.org/
description: JavaScript with static type checking
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/typescript.png
---

# TypeScript

**[TypeScript](https://www.typescriptlang.org/)** is a strongly-typed superset of [JavaScript](/docs/dev/code/languages/javascript) developed by Microsoft. It adds optional static types, interfaces, and modern features that compile down to plain JavaScript. TypeScript catches errors at compile time, improves IDE support, and makes large codebases more maintainable.

## Why TypeScript

- **Catch errors early**: Type errors found at compile time, not runtime
- **Better tooling**: Autocomplete, refactoring, inline documentation
- **Self-documenting**: Types serve as documentation
- **Gradual adoption**: Add types incrementally to existing JS
- **Industry standard**: Used by most major frontend frameworks and projects

## Installation

TypeScript requires [Node.js](/docs/dev/code/frameworks/node).

```powershell
npm install -g typescript
```

Verify:
```powershell
tsc --version
```

For projects, install locally:
```powershell
npm install -D typescript
npx tsc --init  # Creates tsconfig.json
```

## Hello World

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

Compile and run:
```powershell
tsc hello.ts      # Produces hello.js
node hello.js
```

Or use a runtime that executes TypeScript directly:
```powershell
npx tsx hello.ts  # tsx = TypeScript eXecute
deno run hello.ts
bun hello.ts
```

## Core concepts

### Basic types

```typescript
let name: string = "Alice";
let age: number = 30;
let active: boolean = true;
let items: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 42];
let anything: any = "escape hatch";  // Avoid when possible
let unknown: unknown = getValue();   // Safer than any
```

### Type inference

TypeScript infers types when obvious:

```typescript
let count = 0;           // Inferred as number
const name = "Alice";    // Inferred as literal "Alice"
let items = [1, 2, 3];   // Inferred as number[]
```

### Interfaces and types

```typescript
// Interface
interface User {
  id: number;
  name: string;
  email?: string;  // Optional
  readonly createdAt: Date;  // Immutable
}

// Type alias
type ID = string | number;
type Point = { x: number; y: number };

// Both work similarly, interfaces can be extended
interface Admin extends User {
  permissions: string[];
}
```

### Union and intersection types

```typescript
// Union: one of these types
type Status = "pending" | "approved" | "rejected";
type StringOrNumber = string | number;

// Intersection: combine types
type Employee = Person & { employeeId: string };
```

### Generics

Write reusable, type-safe code:

```typescript
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // Explicit
identity(42);               // Inferred as number

// Generic interface
interface Response<T> {
  data: T;
  status: number;
}

const userResponse: Response<User> = { data: user, status: 200 };
```

### Functions

```typescript
// Parameter and return types
function add(a: number, b: number): number {
  return a + b;
}

// Optional and default parameters
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// Function types
type MathOp = (a: number, b: number) => number;
const multiply: MathOp = (a, b) => a * b;
```

### Type guards

Narrow types at runtime:

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();  // TypeScript knows it's string
  }
  return value * 2;  // TypeScript knows it's number
}

// Custom type guard
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null && "id" in obj;
}
```

### Utility types

Built-in type transformations:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

Partial<User>       // All properties optional
Required<User>      // All properties required
Readonly<User>      // All properties readonly
Pick<User, "id" | "name">  // Only selected properties
Omit<User, "email">        // Exclude properties
Record<string, User>       // Object with string keys, User values
```

## Configuration

`tsconfig.json` controls compiler behavior:

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

Key options:
| Option | Purpose |
|--------|---------|
| `strict` | Enable all strict type checks |
| `target` | JavaScript version output |
| `module` | Module system (ESNext, CommonJS) |
| `outDir` | Output directory |
| `noEmit` | Type-check only, don't emit JS |

## TypeScript 5.8+ features

### Recent additions

- **`--erasableSyntaxOnly`** (5.8): For runtimes that strip types (Node 23.6+)
- **`--libReplacement`** (5.8): Control lib package lookup
- **Return type narrowing** (5.8): Better inference in conditionals
- **ES2024 target** (5.7): `SharedArrayBuffer`, `Object.groupBy`
- **Improved uninitialized variable checks** (5.7): Catches more bugs

### Coming in TypeScript 7.0

A native port written in Go/Rust for dramatically faster compilation:
- ~10x faster builds
- Parallel multi-threaded compilation
- Lower memory usage
- TypeScript 6.0 will be a transition release

## Project setup with Vite

```powershell
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

## When to use TypeScript

**Good fit:**
- Any JavaScript project larger than a few files
- Teams with multiple developers
- Long-lived codebases
- Library/framework development
- When you want better IDE support

**Consider plain JavaScript when:**
- Quick scripts or prototypes
- Very small projects
- Learning JavaScript fundamentals

## Summary

TypeScript adds static types to JavaScript, catching errors at compile time and improving tooling. Install with npm, configure via `tsconfig.json`, and compile with `tsc` or use a runtime like `tsx`, Deno, or Bun. Use interfaces for object shapes, generics for reusable code, and utility types for transformations. TypeScript 7.0 will bring native-speed compilation.
