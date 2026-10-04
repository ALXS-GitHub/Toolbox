---
sidebar_position: 11
description: Advent of Code every December, and a particle simulator to learn OpenGL.
status: occasional
kind: project
stack: [Rust, C++, OpenGL]
image: adventofcode.svg
---

# Challenges and experiments

Some projects serve no purpose other than learning: a puzzle to solve every day of December, or a technique you want
to understand by programming it. Both repositories on this page are public.

## Advent of Code

[Advent of Code](https://adventofcode.com) offers a puzzle a day every December, in two parts.
[My repository](https://github.com/ALXS-GitHub/Advent-Of-Code) gathers my solutions, almost all in
[Rust](/tools/dev/languages/rust): the 2015, 2016, 2017, 2024 and 2025 editions are complete, 2023 was done in
[C++](/tools/dev/languages/cpp), and a few other years are started.

Each day is a small Rust project generated from a template: each part runs separately with its run time, tests check
the puzzle's example, and benchmarks measure the solutions. Timings are reported in each year's README.

I set myself a rule about AI, written at the top of the repository: assistants may help with technique (a syntax, an
error, a language feature), **never with the logic** or the algorithm. No code completion while I write a solution:
the solving must stay mine, otherwise the exercise loses its point.

## Particles Simulator

![The simulator: thousands of spheres in a container, rendered with OpenGL.](/images/projects/particles-simulator.jpg)

[Particles Simulator](https://github.com/ALXS-GitHub/Particles-Simulator) was born to learn OpenGL and physics
simulation. Thousands of spheres fall and collide in a cube or a sphere; you can add more, pull them to the centre,
grab them with the mouse, and build "molecules": groups of particles linked by constraints, such as a hanging rope.

The physics uses **Verlet integration**: velocity is derived from the previous position, which makes constraints easy
to enforce, with several sub-steps per frame for stability. To avoid testing every pair of particles, a **spatial
grid** puts each particle in a cell and only compares neighbouring cells, in parallel with OpenMP. For rendering, each
particle is a single point that the *geometry shader* turns into a sphere on screen. The project is in C++17; a Rust
port was started.

The simulator has been on hold since September 2024.
