---
title: I Made This Game Sixteen Years Ago
date: 2026-07-12
excerpt: My brother's first game made me rethink the Pong I coded in 2009, and everything that has changed in how we develop with AI.
---

My younger brother's [recent game release](https://maxyull.github.io/black-desert-idle/) made me think back to my first video game.

Not really its gameplay or graphics.

More the way he built it.

My brother has never been a developer. Yet he started directly with a real HTML game in the browser, built with Claude Code.

His first version works.

It also fits into a single 10,000-line HTML file.

And in a way, it makes sense. He asks the AI to make a game, so it makes a game. It doesn't necessarily stop halfway through to explain that he should separate responsibilities, create several files, add tests, and think about the person or agent who will look at his code next.

The result comes before the structure.

## My First Pong

I spent a good part of my childhood playing video games. They occupied a huge place in my life until I was sixteen or seventeen. Pokémon, Wario Land, Kirby, to name just a few!

When I started programming, I wanted to make games.

My first was [Pong](https://arthurlacoste.github.io/pong-x/). Well, my version of Pong.

That was in 2009.

I am both proud and slightly ashamed when I reread the code. Proud because I managed to build something that worked. Ashamed because I spent a rather absurd number of nights on a few lines of JavaScript, with redundant calculations, fragile collisions, and an organization that looked more like an archaeological dig than a software project.

But I remember exactly where I wrote that code.

I was in my student room, in the first year of my computer science degree, convinced that I could change the world by building tools.

Spoiler: that isn't exactly what happened.

Sixteen years later, I asked myself a fairly simple question: how long would it take me to remake Pong today?

A few minutes.

Maybe even less if I don't count the time spent hesitating over the prompt.

[Play Pong 2026](https://arthurlacoste.github.io/pong-2026/)

<iframe
  class="embedded-game"
  src="https://arthurlacoste.github.io/pong-2026/"
  title="Pong 2026"
  width="100%"
  height="600"
  loading="lazy"
  allowfullscreen>
</iframe>

The new version works better. It uses JavaScript functions that didn't exist, or that I didn't know at the time. The calculations are simpler. The collisions are less shaky.

But that is barely what impresses me anymore.

## AI No Longer Just Gives Answers

Not so long ago, even with help from AI, a complex bug could take me a week.

The model suggested a fix. I changed the file. I ran the tests. I copied the error. I went back to the chat. Then we started again.

The AI did the thinking.

I ran the loop.

With harnesses, in 2026, the difference doesn't just come from smarter models. It mostly comes from what they can do around the model.

Read the repository. Run a command. Modify several files. Open the browser. See what breaks. Read the logs. Roll back. Try something else.

An agent can stay inside the problem.

It can be wrong twenty times in a day without asking me to act as the courier between the terminal, the browser, and the conversation.

AI hasn't eliminated bugs.

It has mostly compressed the time between two attempts.

That is how a task that could take a week can sometimes fit into a day.

There is another change I find almost as important: exploring a codebase.

Before, when we arrived on a project we didn't know well, especially one with spaghetti code, we spent a lot of time investigating. Following imports. Searching for function calls. Understanding where data enters, where it leaves, and why a change in one corner breaks something at the other end.

Today, we can ask an AI which files are involved in a feature, where a value is calculated, what triggers a behavior, or which tests cover part of the project.

In a few minutes, it produces a first map.

The investigation hasn't completely disappeared, but it has become much shorter.

## Code Comes Before Structure

My brother's game also shows the limits of this acceleration.

His first version works, but it fits into a single 10,000-line HTML file. For a human, that is already not very pleasant. It isn't ideal for another agent either: it has to find the game logic, interface, and data in the middle of one enormous block.

A harness is everything around the model that enables it to work: access to the repository, terminal, tests, browser, and project rules.

But even with a good harness, you still have to prepare the ground. Short files, a README, a few conventions, and tests let the next agent quickly understand the project and verify that it isn't breaking anything.

Before, we often learned this structure by slowly writing a lot of code.

Today, we can produce 10,000 lines before even knowing why they should be split up.

That is also what I liked about this story. My brother loves video games. I spend far too much time thinking about agentic development. His project gave us a reason to sit down together, talk about what we are passionate about, and discuss how to make his game easier to evolve.

What if I remade another game too?
