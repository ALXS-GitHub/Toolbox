---
origin: installed
category: dev
url: https://en.cppreference.com/w/c
description: Low-level systems programming language
use_state: active
rating: 4
sidebar_custom_props:
    image: /images/c.png
---

# C

**C** is a general-purpose, low-level programming language developed in 1972 at Bell Labs. It provides direct access to memory and hardware, making it the foundation for operating systems, embedded systems, and performance-critical applications. C remains one of the most widely used languages, powering Linux, Windows kernels, databases, and countless embedded devices.

## Why C matters

- **Performance**: Compiles to efficient machine code with minimal runtime overhead
- **Portability**: Runs on virtually any platform with a C compiler
- **Control**: Direct memory manipulation via pointers
- **Foundation**: Many languages (C++, Rust, Go) draw syntax and concepts from C
- **Ubiquity**: Essential for systems programming, embedded development, and understanding how computers work

## Installation (Windows)

C requires a compiler. The main options on Windows:

### Option 1: MSYS2 + GCC (Recommended)

1. Download and install [MSYS2](https://www.msys2.org/)
2. Open MSYS2 terminal and install the toolchain:

```bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
```

3. Add to PATH: `C:\msys64\ucrt64\bin`
4. Verify:

```powershell
gcc --version
```

### Option 2: Visual Studio (MSVC)

1. Download [Visual Studio Community](https://visualstudio.microsoft.com/)
2. During installation, select "Desktop development with C++"
3. Use the Developer Command Prompt or Developer PowerShell

### Option 3: WinLibs (Standalone)

1. Download from [winlibs.com](https://winlibs.com/)
2. Extract to a folder (e.g., `C:\mingw64`)
3. Add `C:\mingw64\bin` to PATH

## Hello World

```c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
```

Compile and run:
```powershell
gcc hello.c -o hello.exe
./hello
```

## Core concepts

### Variables and types

```c
int count = 42;           // Integer
float price = 19.99f;     // Single precision float
double pi = 3.14159265;   // Double precision float
char letter = 'A';        // Single character
char name[] = "Alice";    // String (null-terminated char array)
```

### Pointers

Pointers store memory addresses—central to C programming:

```c
int value = 10;
int *ptr = &value;    // ptr holds the address of value
printf("%d\n", *ptr); // Dereference: prints 10
*ptr = 20;            // Modify value through pointer
```

### Arrays

```c
int numbers[5] = {1, 2, 3, 4, 5};
printf("%d\n", numbers[0]);  // Access first element

// Arrays decay to pointers
int *p = numbers;
printf("%d\n", *(p + 2));    // Access third element
```

### Functions

```c
int add(int a, int b) {
    return a + b;
}

// Passing by pointer (to modify original)
void increment(int *value) {
    (*value)++;
}
```

### Structs

```c
struct Point {
    int x;
    int y;
};

struct Point p = {10, 20};
printf("x: %d, y: %d\n", p.x, p.y);
```

### Memory management

```c
#include <stdlib.h>

int *arr = malloc(10 * sizeof(int));  // Allocate
if (arr == NULL) { /* handle error */ }

// Use the memory...
arr[0] = 42;

free(arr);  // Always free when done
arr = NULL; // Avoid dangling pointer
```

## Compilation process

```
Source (.c) → Preprocessor → Compiler → Assembler → Linker → Executable
```

Common GCC flags:
```powershell
gcc -Wall -Wextra -std=c23 -O2 main.c -o main.exe
```

| Flag | Purpose |
|------|---------|
| `-Wall` | Enable common warnings |
| `-Wextra` | Additional warnings |
| `-std=c23` | Use C23 standard |
| `-O2` | Optimization level 2 |
| `-g` | Include debug symbols |
| `-c` | Compile only (no linking) |

## C23 standard

C23 (ISO/IEC 9899:2024) is the current standard, finalized October 2024. Key additions:

- **`#embed`**: Include binary files directly in source
- **`auto` type inference**: Like C++, but only for object definitions
- **`nullptr`**: Proper null pointer constant
- **`true`/`false` keywords**: Boolean literals without `<stdbool.h>`
- **`_BitInt(N)`**: Arbitrary-width integers
- **Binary literals**: `0b10101010`
- **Digit separators**: `int x = 1'000'000;`
- **`[[attributes]]`**: `[[deprecated]]`, `[[nodiscard]]`, `[[maybe_unused]]`

Compiler support: GCC 15 has near-complete C23 support; Clang 18+ supports most features with `-std=c23`.

## Common patterns

### Reading a file

```c
FILE *file = fopen("data.txt", "r");
if (file == NULL) {
    perror("Error opening file");
    return 1;
}

char buffer[256];
while (fgets(buffer, sizeof(buffer), file)) {
    printf("%s", buffer);
}

fclose(file);
```

### Command line arguments

```c
int main(int argc, char *argv[]) {
    for (int i = 0; i < argc; i++) {
        printf("arg[%d]: %s\n", i, argv[i]);
    }
    return 0;
}
```

## When to use C

**Good fit:**
- Operating systems and kernels
- Embedded systems and microcontrollers
- Performance-critical code (game engines, databases)
- Libraries that need to interface with many languages
- Learning how computers actually work

**Consider alternatives when:**
- Memory safety is critical (consider [Rust](/docs/dev/code/languages/rust))
- Rapid development matters more than performance
- You need built-in data structures (consider [C++](/docs/dev/code/languages/cpp))

## Summary

C is a low-level language that provides direct hardware access and produces highly efficient code. Install a compiler via MSYS2 (GCC), Visual Studio (MSVC), or WinLibs, then compile with `gcc`. The language requires manual memory management and careful pointer handling, but rewards you with performance and control. C23 brings modern conveniences like type inference and better literals while maintaining backward compatibility.
