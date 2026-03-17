---
origin: installed
category: dev
url: https://go.dev/
description: Open source programming language by Google
use_state: active
rating: 4
os: Windows
sidebar_custom_props:
    image: /images/go.png
---

# Go

**[Go](https://go.dev/)** (Golang) is an open source programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. It's statically typed and compiled, with built-in concurrency primitives, garbage collection, and a focus on simplicity and readability. Go compiles fast, runs fast, and deploys as a single binary with no dependencies.

## Why Go

- **Simplicity**: Small language spec, easy to learn, one way to do things
- **Fast compilation**: Near-instant builds even for large projects
- **Built-in concurrency**: Goroutines and channels as first-class citizens
- **Single binary deployment**: No runtime dependencies, easy to distribute
- **Strong standard library**: HTTP server, JSON, crypto, testing — all built in
- **Cross-compilation**: Build for any OS/arch from any machine

## Installation (Windows)

### Using Scoop

```powershell
scoop install go
```

Verify:
```powershell
go version
```

### Environment

Go uses a workspace model:
- `GOPATH`: Where dependencies live (default `%USERPROFILE%\go`)
- `GOROOT`: Go installation directory
- Binaries from `go install` go to `$GOPATH/bin`

```powershell
go env GOPATH
go env GOROOT
```

## Hello World

```powershell
mkdir hello && cd hello
go mod init hello
```

```go
// main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

```powershell
go run .
```

## Core concepts

### Variables and types

```go
// Short declaration (type inferred)
name := "Go"
count := 42
pi := 3.14

// Explicit declaration
var active bool = true
var items []string

// Constants
const maxRetries = 3
```

### Functions

```go
func add(a, b int) int {
    return a + b
}

// Multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 3)
if err != nil {
    log.Fatal(err)
}
```

### Structs and methods

```go
type User struct {
    Name  string
    Email string
    Age   int
}

func (u User) Greet() string {
    return fmt.Sprintf("Hello, I'm %s!", u.Name)
}

// Pointer receiver for mutation
func (u *User) SetAge(age int) {
    u.Age = age
}
```

### Interfaces

Interfaces are satisfied implicitly — no `implements` keyword:

```go
type Writer interface {
    Write(data []byte) (int, error)
}

// Any type with a Write method satisfies Writer
type FileLogger struct{ path string }

func (f FileLogger) Write(data []byte) (int, error) {
    return os.WriteFile(f.path, data, 0644), nil
}
```

### Error handling

Go uses explicit error returns instead of exceptions:

```go
file, err := os.Open("data.txt")
if err != nil {
    return fmt.Errorf("failed to open file: %w", err)
}
defer file.Close()
```

### Goroutines and channels

```go
// Launch a goroutine
go func() {
    fmt.Println("running concurrently")
}()

// Channels for communication
ch := make(chan string)

go func() {
    ch <- "hello from goroutine"
}()

msg := <-ch
fmt.Println(msg)
```

### Slices and maps

```go
// Slices (dynamic arrays)
nums := []int{1, 2, 3}
nums = append(nums, 4, 5)

// Maps
scores := map[string]int{
    "alice": 95,
    "bob":   87,
}
scores["charlie"] = 92
```

## Go commands

```powershell
go run .              # Build and run
go build              # Compile binary
go test ./...         # Run all tests
go mod init <name>    # Initialize module
go mod tidy           # Clean up dependencies
go get <package>      # Add dependency
go install <pkg>@v    # Install a binary
go fmt ./...          # Format all code
go vet ./...          # Static analysis
```

## Common patterns

### HTTP server

```go
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello!")
})
log.Fatal(http.ListenAndServe(":8080", nil))
```

### JSON

```go
type Config struct {
    Port    int    `json:"port"`
    Host    string `json:"host"`
}

data, _ := json.Marshal(Config{Port: 8080, Host: "localhost"})
```

### Reading a file

```go
content, err := os.ReadFile("file.txt")
```

## When to use Go

**Good fit:**
- Backend services and APIs
- CLI tools
- DevOps tooling (Docker, Kubernetes, Terraform are written in Go)
- Microservices
- Concurrent/networked applications

**Consider alternatives when:**
- GUI applications (use [Rust](/docs/dev/code/languages/rust)/[Tauri](/docs/dev/code/frameworks/tauri))
- Data science/ML (use [Python](/docs/dev/code/languages/python))
- Frontend web (use [TypeScript](/docs/dev/code/languages/typescript))
- Systems programming requiring no GC (use [Rust](/docs/dev/code/languages/rust))
