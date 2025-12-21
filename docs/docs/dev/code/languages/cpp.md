---
origin: installed
category: dev
url: https://isocpp.org/
description: High-performance language with zero-cost abstractions
use_state: active
rating: 4
sidebar_custom_props:
    image: /images/cpp.png
---

# C++

**[C++](https://isocpp.org/)** is a general-purpose programming language that extends [C](/docs/dev/code/languages/c) with object-oriented features, templates, and a rich standard library. It provides zero-cost abstractions—high-level constructs that compile to efficient machine code. C++ powers game engines, browsers, databases, operating systems, and performance-critical applications.

## Why C++

- **Performance**: Zero-overhead abstractions, direct hardware access
- **Control**: Manual memory management when needed, RAII for automatic cleanup
- **Rich standard library**: Containers, algorithms, threading, filesystem, networking
- **Paradigm flexibility**: Procedural, object-oriented, generic, and functional styles
- **Industry standard**: Unreal Engine, Chrome, LLVM, databases, embedded systems

## Installation (Windows)

C++ uses the same compilers as C. Main options:

### Option 1: MSYS2 + GCC

```bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
```

Add `C:\msys64\ucrt64\bin` to PATH, then verify:
```powershell
g++ --version
```

### Option 2: Visual Studio (MSVC)

Download [Visual Studio Community](https://visualstudio.microsoft.com/), select "Desktop development with C++". Use Developer Command Prompt or the IDE.

### Option 3: Clang

Via MSYS2:
```bash
pacman -S mingw-w64-ucrt-x86_64-clang
```

Or download [LLVM](https://releases.llvm.org/) directly.

## Hello World

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

Compile and run:
```powershell
g++ -std=c++23 hello.cpp -o hello.exe
./hello
```

## Core concepts

### Classes and objects

```cpp
class Rectangle {
private:
    double width, height;

public:
    Rectangle(double w, double h) : width(w), height(h) {}

    double area() const { return width * height; }
};

Rectangle rect(5.0, 3.0);
std::cout << rect.area() << std::endl;  // 15
```

### RAII (Resource Acquisition Is Initialization)

Resources are tied to object lifetime—no manual cleanup:

```cpp
void process_file() {
    std::ifstream file("data.txt");  // Opens file
    // Use file...
}  // File automatically closed when 'file' goes out of scope
```

### Smart pointers

Modern C++ avoids raw `new`/`delete`:

```cpp
#include <memory>

auto ptr = std::make_unique<int>(42);      // Unique ownership
auto shared = std::make_shared<int>(100);  // Shared ownership
// Memory freed automatically when pointers go out of scope
```

### Containers

```cpp
#include <vector>
#include <map>
#include <string>

std::vector<int> numbers = {1, 2, 3, 4, 5};
numbers.push_back(6);

std::map<std::string, int> ages;
ages["Alice"] = 30;
ages["Bob"] = 25;
```

### Algorithms

```cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {3, 1, 4, 1, 5, 9};
std::sort(v.begin(), v.end());
auto it = std::find(v.begin(), v.end(), 5);
int sum = std::accumulate(v.begin(), v.end(), 0);
```

### Templates

Write generic code that works with any type:

```cpp
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

max(3, 5);        // int
max(3.14, 2.71);  // double
```

### Lambda expressions

```cpp
auto add = [](int a, int b) { return a + b; };
std::cout << add(2, 3) << std::endl;

// Capture variables
int multiplier = 10;
auto times = [multiplier](int x) { return x * multiplier; };
```

## Modern C++ standards

### C++23 (Current)

- **`import std;`**: Import the entire standard library as a module
- **`std::print`/`std::println`**: Type-safe printing (like Python's print)
- **`std::expected`**: Error handling without exceptions
- **`std::flat_map`**: Cache-friendly associative container
- **`std::mdspan`**: Multidimensional array views
- **Deducing this**: Simplifies CRTP and mixin patterns
- **Multidimensional `operator[]`**: `matrix[i, j]` syntax

```cpp
import std;

int main() {
    std::println("Hello, {}!", "C++23");
}
```

### C++26 (Upcoming, ~2026)

Major features in development:
- **Reflection**: Compile-time introspection of types
- **Contracts**: Pre/post conditions and assertions
- **`std::execution`**: Standard parallel/async execution

## Compilation

```powershell
g++ -std=c++23 -Wall -Wextra -O2 main.cpp -o main.exe
```

| Flag | Purpose |
|------|---------|
| `-std=c++23` | Use C++23 standard |
| `-Wall -Wextra` | Enable warnings |
| `-O2` | Optimization level 2 |
| `-g` | Debug symbols |
| `-fsanitize=address` | Address sanitizer (debug) |

## Build systems

For projects with multiple files, use a build system:

### CMake (most common)

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.20)
project(MyApp)

set(CMAKE_CXX_STANDARD 23)
add_executable(myapp main.cpp utils.cpp)
```

```powershell
cmake -B build
cmake --build build
```

### Alternatives
- **Meson**: Fast, Python-based
- **xmake**: Lua-based, simpler syntax
- **Bazel**: Google's build system, good for large projects

## When to use C++

**Good fit:**
- Game engines and graphics applications
- High-frequency trading and financial systems
- Browsers, databases, compilers
- Embedded systems requiring OOP
- When you need both performance and abstractions

**Consider alternatives when:**
- Memory safety is paramount (consider [Rust](/docs/dev/code/languages/rust))
- Rapid development matters more than performance
- You don't need low-level control

## Summary

C++ combines low-level control with high-level abstractions. Install via MSYS2 (GCC/Clang) or Visual Studio (MSVC), compile with `g++ -std=c++23`. Use smart pointers, containers, and algorithms from the standard library. Modern C++ (C++17/20/23) significantly improves safety and ergonomics while maintaining performance. C++26 will bring reflection and contracts.
