---
title: How I Made My $20 ChatGPT Plan More Useful with a Local MCP Gateway
date: 2026-07-08
excerpt: I built a local MCP gateway to connect regular ChatGPT in the browser to my own computer and keep working when dedicated coding tools hit their limits.
---

I built this because I kept running into a very boring modern problem.

I would be coding, using Codex or some other AI dev tool, and then the limit would arrive.

Not dramatically. No explosion. Just that quiet little wall where the product basically says: okay, you had enough help for today.

Which is fair, I guess. Servers cost money. GPUs are not powered by friendship. I get it.

But my project is still open. My terminal is still there. My browser is still logged in. The bug is still sitting in the corner, looking at me like a wet cat.

So I wanted a fallback.

Not a fake “autonomous AI employee” thing. Not a startup-flavored agent platform with a pricing page and a glowing cube.

Just a dumb useful bridge between regular ChatGPT in the browser and my actual computer.

That became [MCPRelay](https://github.com/arthurlacoste/MCPRelay).

It is a free and open-source local MCP gateway. You run it on your machine, expose it to an MCP client, and suddenly ChatGPT can do real local stuff instead of just politely suggesting commands that you then copy-paste like a tired intern.

It can run shell commands.

It can inspect files.

It can take screenshots.

It can use browser automation.

It can click, type, scroll, move the mouse.

It can share local files through temporary public links.

It has OAuth support.

It logs conversations and tool calls.

Basically, it lets regular ChatGPT become a control surface for your computer.

And yes, the fun version is: YOLO mode.

Sometimes I do not want a careful back-and-forth where the assistant says “you can run this command” and then I run it, paste the output, wait, run another command, paste again, and slowly become a USB cable with depression.

Sometimes I want to say: check the repo, run the tests, inspect the error, open the browser, look at the page, try the fix, tell me what happened.

Not forever. Not unsafely. Not with access to my bank account and childhood memories.

Just on my own machine, for my own dev workflow, with tools I can see and control.

There is something weirdly practical about using the normal ChatGPT web app this way.

Because when Codex tokens are gone, or when I am not in the right environment, or when I just want to continue from the browser, I still have a working assistant. The model is already there. The conversation is already there. I just needed a way to connect it to the machine.

That was the missing bit.

A local bridge.

ChatGPT on one side.

My computer on the other.

Less ceremony in the middle.

The browser part matters a lot too. A surprising amount of dev work is not just “read this file”. It is a local app running in Chrome. A dashboard. A logged-in session. A weird UI state. A settings panel. A page that only breaks after you click the third stupid button.

Trying to describe that in text is horrible.

It is like explaining a tattoo stencil over the phone.

“Yes, the line is wrong, but not that line, the other line, the one near the thing.”

No.

Take a screenshot. Click the button. Read what changed. Continue.

That is the kind of workflow I wanted.

Not perfect. Just less stupid.

I also added small browser helpers for ChatGPT itself. Auto-send prompts from URL parameters. Auto-open the latest conversation. Auto-approve MCP action cards. These are tiny features, but tiny repeated clicks are how software slowly eats your soul. So I automated them.

And yes, I tried other routes before landing here.

I tried local models. I ran `qwen3.5:35b-a3b-coding-nvfp4` on Ollama. Respectfully: you are too dumb, bro. I mean that with love. Big model name, but just stop breaking my projects please.

I tried OpenCode with Big Pickle, which is apparently a real model name (I know it's an alias). Seriously, we need to talk about naming in this ecosystem. Someone somewhere looked at “Big Pickle” and said yes, ship it. Incredible field. No notes. Many notes.

I also played with [0xzr/freellmpool](https://github.com/0xzr/freellmpool), which is actually a clever idea: gather free tiers from a bunch of providers and route through them. Very hacker. Very raccoon with API keys. I respect it.

But after all that, I still mostly rely on a $20 ChatGPT plan.

And honestly, that is fine.

The problem is not only “which model is smartest”.

The problem is workflow.

If the assistant cannot touch my machine, I am still the bridge. I am still the one copying logs, pasting files, describing browser state, running commands, approving things, moving tiny pieces of context around like a sad warehouse worker for tokens.

So `MCPRelay` is my way of making that $20 plan more useful.

Not infinite.

Not magic.

Just more connected.

The project is intentionally not polished like a SaaS landing page.

It is a local tool. It has that slightly dangerous garage feeling. Some parts are clean. Some parts are duct tape. But it is useful duct tape, and honestly half the internet is load-bearing duct tape anyway.

The important part: it is free and open source.

No subscription wall.

No “contact sales”.

No “agent credits”.

No magical promise that your repo will become sentient and ship features while you sleep.

Just a local MCP gateway you can run, modify, break, fix, fork, and use however you want.

I think this kind of thing is going to become more common.

Not because everyone wants a giant autonomous agent. I actually think most people do not want that. They want something more boring and more useful.

They want the assistant to be able to touch the computer.

Run the command.

See the screen.

Open the file.

Click the thing.

Report back.

The future is maybe not one big agent doing everything.

Maybe it is a bunch of small bridges between the chat window and the messy reality of your machine.

That is what `MCPRelay` is for me.

A bridge.

A slightly reckless one.

A “fine, just do it, but please don’t burn the house down” bridge.

And honestly, that is the exact energy I wanted.

Curious if other people are building similar local MCP setups, especially around regular ChatGPT in the browser. Because the moment you stop treating the chat as a text box and start treating it as a remote control for your own machine, the whole workflow feels different.

[https://github.com/arthurlacoste/MCPRelay](https://github.com/arthurlacoste/MCPRelay)