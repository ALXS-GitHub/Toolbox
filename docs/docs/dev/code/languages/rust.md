---
origin: installed
category: dev
url: https://www.rust-lang.org/
description: Memory-safe systems programming language
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/rust.png
---

# Rust

**[Rust](https://www.rust-lang.org/)** is a systems programming language focused on safety, speed, and concurrency. It guarantees memory safety without a garbage collector through its ownership system—eliminating entire classes of bugs at compile time. Rust combines low-level control with high-level ergonomics, making it suitable for operating systems, game engines, web browsers, and WebAssembly.

## Why Rust

- **Memory safety**: No null pointers, dangling references, or data races
- **Zero-cost abstractions**: High-level features compile to efficient code
- **Fearless concurrency**: The type system prevents data races
- **No garbage collector**: Predictable performance
- **Modern tooling**: Cargo package manager, built-in testing, excellent docs
- **Growing ecosystem**: Web ([Axum](https://github.com/tokio-rs/axum), Actix), desktop ([Tauri](/docs/dev/code/frameworks/tauri)), CLI tools

## Installation (Windows)

### Using rustup (Recommended)

Download and run [rustup-init.exe](https://rustup.rs/):

```powershell
# Or via winget
winget install Rustlang.Rustup
```

During installation, select the default MSVC toolchain. This requires Visual Studio C++ Build Tools (see [C installation](/docs/dev/code/languages/c)).

Verify:
```powershell
rustc --version
cargo --version
```

### Update and manage toolchains

```powershell
rustup update              # Update to latest
rustup default stable      # Use stable channel
rustup default nightly     # Use nightly (for cutting-edge features)
```

## Hello World

Create a new project:
```powershell
cargo new hello
cd hello
```

This creates:
```
hello/
├── Cargo.toml    # Project manifest
└── src/
    └── main.rs   # Entry point
```

```rust
// src/main.rs
fn main() {
    println!("Hello, World!");
}
```

Build and run:
```powershell
cargo run
```

## Core concepts

### Variables and mutability

Variables are immutable by default:

```rust
let x = 5;           // Immutable
let mut y = 10;      // Mutable
y += 1;              // OK
// x += 1;           // Error!

const MAX_SIZE: u32 = 100;  // Compile-time constant
```

### Types

```rust
// Integers
let a: i32 = -42;      // Signed 32-bit
let b: u64 = 1000;     // Unsigned 64-bit
let c: isize = 0;      // Pointer-sized

// Floats
let pi: f64 = 3.14159;

// Boolean and char
let flag: bool = true;
let letter: char = 'A';

// Compound types
let tuple: (i32, f64, char) = (42, 3.14, 'x');
let array: [i32; 5] = [1, 2, 3, 4, 5];
```

### Ownership

Rust's key innovation—each value has exactly one owner:

```rust
let s1 = String::from("hello");
let s2 = s1;        // s1 is moved to s2
// println!("{}", s1);  // Error: s1 no longer valid

let s3 = s2.clone();  // Deep copy
println!("{} {}", s2, s3);  // Both valid
```

### Borrowing

References let you use values without taking ownership:

```rust
fn calculate_length(s: &String) -> usize {  // Immutable borrow
    s.len()
}

fn append_world(s: &mut String) {  // Mutable borrow
    s.push_str(", world!");
}

let mut text = String::from("hello");
let len = calculate_length(&text);
append_world(&mut text);
```

Rules:
- Many immutable references OR one mutable reference
- References must always be valid (no dangling)

### Structs and enums

```rust
struct User {
    name: String,
    age: u32,
    active: bool,
}

impl User {
    fn new(name: String, age: u32) -> Self {
        Self { name, age, active: true }
    }

    fn greet(&self) -> String {
        format!("Hello, I'm {}!", self.name)
    }
}

enum Status {
    Active,
    Inactive,
    Pending { reason: String },
}
```

### Pattern matching

```rust
let number = 13;

match number {
    1 => println!("One"),
    2..=12 => println!("Small"),
    13 => println!("Lucky!"),
    _ => println!("Other"),
}

// With enums
match status {
    Status::Active => handle_active(),
    Status::Pending { reason } => println!("Pending: {}", reason),
    _ => (),
}

// if let for single patterns
if let Some(value) = optional {
    println!("Got: {}", value);
}
```

### Error handling

Rust uses `Result<T, E>` instead of exceptions:

```rust
use std::fs::File;
use std::io::Read;

fn read_file(path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(path)?;  // ? propagates errors
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

// Using it
match read_file("data.txt") {
    Ok(content) => println!("{}", content),
    Err(e) => eprintln!("Error: {}", e),
}
```

### Traits

Like interfaces, but more powerful:

```rust
trait Drawable {
    fn draw(&self);
    fn area(&self) -> f64;
}

struct Circle { radius: f64 }

impl Drawable for Circle {
    fn draw(&self) { println!("Drawing circle"); }
    fn area(&self) -> f64 { 3.14159 * self.radius * self.radius }
}
```

## Cargo commands

```powershell
cargo new project      # Create new project
cargo build            # Build (debug)
cargo build --release  # Build (optimized)
cargo run              # Build and run
cargo test             # Run tests
cargo check            # Type-check without building
cargo doc --open       # Generate and open docs
cargo add serde        # Add dependency
cargo update           # Update dependencies
```

## Rust 2024 Edition

Rust 1.85 (February 2025) introduced the Rust 2024 edition:

- **Rust-version aware resolver**: Cargo considers `rust-version` for dependencies
- **Stricter unsafe handling**: `extern` blocks must be marked `unsafe`
- **Unsafe attributes**: `#[export_name]`, `#[no_mangle]` require `unsafe`
- **Pattern matching changes**: Stricter rules for `ref`/`mut` capture
- **Style editions**: Control rustfmt formatting independently

Migrate with:
```powershell
cargo fix --edition
```

## Common patterns

### Reading a file

```rust
let content = std::fs::read_to_string("file.txt")?;
```

### Iterators

```rust
let numbers = vec![1, 2, 3, 4, 5];

let doubled: Vec<i32> = numbers.iter()
    .map(|x| x * 2)
    .filter(|x| *x > 4)
    .collect();
```

### Command line args

```rust
let args: Vec<String> = std::env::args().collect();
```

Or use `clap` crate for complex CLIs.

## When to use Rust

**Good fit:**
- Systems programming (OS kernels, drivers)
- Performance-critical applications
- WebAssembly
- CLI tools
- When you need memory safety without GC
- Concurrent/parallel programming

**Consider alternatives when:**
- Rapid prototyping (use [Python](/docs/dev/code/languages/python))
- Simple scripts
- Teams unfamiliar with ownership concepts
- Compile times are a major concern

## Summary

Rust provides memory safety without garbage collection through ownership and borrowing. Install via rustup, create projects with `cargo new`, and use `cargo run` to build and execute. The ownership system prevents common bugs at compile time. Rust 2024 edition brings stricter safety defaults. The language excels for systems programming, WebAssembly, and any project where performance and reliability matter.
