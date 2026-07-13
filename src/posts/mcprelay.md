---
title: "I bypassed ChatGPT to code forever for $20/month"
date: 2026-07-08
emoji: 🤖
excerpt: I built a local MCP gateway to connect ChatGPT in the browser to my computer and keep working when dedicated coding tools hit their limits.
slug: mcprelay
categories:
- Development
- Artificial intelligence
tags:
- MCP
- ChatGPT
- Codex
- open source
---

I already pay twenty dollars a month for ChatGPT.

So before subscribing to something else, buying credits, or trying the latest trendy tool, I like to see how far I can push what I already have.

The problem is that Codex eventually hits its limits. I run into the five-hour cap far too often, not to mention the weekly limit.

I tried local models. On my Mac, with Ollama, I ran `qwen3.5:35b-a3b-coding-nvfp4`. When token influencers explain that local inference is totally practical, my MacBook Pro M2 Max with 64 GB of memory does not look very happy. And not just because it is summer.

I also tested OpenCode with Big Pickle, which is apparently a real model name, along with [0xzr/freellmpool](https://github.com/0xzr/freellmpool) and [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi), which aggregate free offers from several providers.

But in the end, the best easily available model is often still the one I am already paying for inside ChatGPT.

The problem is that it cannot really touch my machine.

So I built [MCPRelay](https://github.com/arthurlacoste/MCPRelay).

It is a local MCP gateway. It allows ChatGPT to run commands, read files, take screenshots, control a browser, and use several tools on my computer.

MCPRelay does not give me unlimited tokens. It mostly lets me make better use of what I already pay for instead of immediately adding another bill.

[View MCPRelay on GitHub](https://github.com/arthurlacoste/MCPRelay)
