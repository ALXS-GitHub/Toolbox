---
origin: web
category: ai
url: https://chat.deepseek.com/
description: Open-source AI models with frontier performance at fraction of cost
use_state: active
sidebar_custom_props:
    image: /images/deepseek.png
---

# DeepSeek

**[DeepSeek](https://chat.deepseek.com/)** is a Chinese AI lab founded in July 2023 in Hangzhou that stunned the industry by training frontier-class models for a fraction of the cost of Western competitors. When DeepSeek-V3 was revealed to have been trained for roughly $6 million, compared to the $100 million or more typically spent by labs like OpenAI and Google, it forced a fundamental reassessment of how much compute is truly needed to build powerful AI. On January 27, 2025, DeepSeek became the #1 free app on the US iOS App Store, a landmark moment for an open-source Chinese AI company.

## The open-source disruptor

DeepSeek's core philosophy is radical openness. Every model is released under the MIT License, meaning anyone can use, modify, and commercially deploy them without restriction. This stands in stark contrast to the closed-model approach of OpenAI and Anthropic, and even to the more restrictive licenses used by Meta's Llama. For organizations that need to self-host AI for privacy, compliance, or cost reasons, DeepSeek models are among the most capable options available.

## Models

### DeepSeek-V3.2

The flagship general-purpose model. At 685 billion parameters with a 128K token context window, V3.2 competes with the best proprietary models on coding, math, and multilingual tasks. Despite its size, the Mixture-of-Experts architecture keeps inference efficient. V3.2 is particularly strong at code generation and technical reasoning.

### DeepSeek-R1

A reasoning-focused model comparable to OpenAI's o1 series. R1 works through problems step by step, showing its chain of thought before arriving at an answer. It excels on math competition problems, formal logic, and complex multi-step tasks where deliberate reasoning outperforms pattern matching.

### DeepSeek-V4

Announced for February 2026, V4 is expected to push the efficiency frontier further. Details are still emerging, but the trajectory suggests continued improvements in capability per dollar spent.

## Why the cost matters

DeepSeek's training efficiency is not just a business story. It demonstrated that clever engineering, including innovations in training data curation, architecture design, and hardware utilization, can substitute for brute-force compute. This has implications for the entire field: smaller labs and researchers can now build competitive models, reducing the concentration of AI capability in a handful of well-funded companies.

## Self-hosting

Because all models are MIT-licensed, you can run DeepSeek locally or on your own infrastructure. The community has built quantized versions that run on consumer GPUs, and cloud providers offer DeepSeek endpoints. For teams handling sensitive data who cannot send queries to external APIs, this is a significant advantage.

## Using DeepSeek

The simplest way to try DeepSeek is through [chat.deepseek.com](https://chat.deepseek.com/), which provides a free web interface similar to ChatGPT. The API is also available at competitive pricing for developers. Additionally, DeepSeek models are available through third-party platforms and can be run locally via tools like Ollama or vLLM.

## Considerations

- **Availability**: The web service has experienced capacity issues during peak demand
- **Chinese origin**: Some organizations have policies around using Chinese-developed AI; evaluate your own requirements
- **Censorship**: The hosted version applies content filters aligned with Chinese regulations; self-hosted versions do not have these restrictions
- **Ecosystem**: Fewer integrations and plugins compared to ChatGPT or Claude

## Summary

DeepSeek proved that frontier AI does not require frontier budgets. Its open-source MIT-licensed models offer competitive performance for code, reasoning, and general tasks, with the added flexibility of self-hosting. The V3.2 and R1 models are serious tools for anyone who values openness, cost efficiency, or data sovereignty.
