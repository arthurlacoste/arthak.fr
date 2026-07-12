---

author: art
date: 2006-04-16
updated: 2026-07-12
layout: post
slug: wake-up-neo-matrix
title: Wake up, Neo
archive: true
categories:
- Journey
- Development
tags:
- linux
- bash
- matrix
- learning
---

![Matrix Wake up](https://archives.irz.fr/wp-content/uploads/2010/02/matrix-wake-up.jpg)


When I was a kid, I was trying to understand hacking in all its forms.

Back then, the forums mixed technical curiosity, idiotic challenges, well-made tutorials, and frankly dubious practices.

There were disclaimers to explain the rules of each team, methods to attack an email inbox, trojans to install on friends' computers, and a lot of noise around all of this.

It wasn't always very clever.

But it's also how I learned some of the basics of computing.

By tinkering.

By breaking things.

By trying to understand why they broke.

And a very good example is the famous "Wake up, Neo" from *The Matrix*.

The idea was simple: to reproduce that cult scene in a terminal where the screen wakes up by itself and slowly displays:

> Wake up, Neo
> The Matrix has you
> Follow the white rabbit
> Knock, knock, Neo

An image speaks better:

![Animation Wake up Neo](https://archives.irz.fr/wp-content/uploads/2009/02/wakeup.gif)

One morning, while I was working on a Debian server with PuTTY, I wanted to revive that old idea.

The main goal was to create a small animated effect. Erase the screen, write each phrase character by character, wait a moment, and then move to the next.

Nothing very useful.

So obviously indispensable.

## Current version of the script

The original script mixed `sh` and Bash, and some characters were broken by the WordPress import.

Here is a working version:

```bash
#!/usr/bin/env bash

type_slowly() {
  local text="$1"
  local pause_after="$2"
  local pause_clear="$3"
  local i

  printf '\n'

  for ((i = 0; i < ${#text}; i++)); do
    printf '%s' "${text:i:1}"
    sleep 0.1
  done

  sleep "$pause_after"
  clear
  sleep "$pause_clear"
}

matrix() {
  clear
  type_slowly "Wake up, Neo..." 2 1
  type_slowly "The Matrix has you" 3 1
  type_slowly "Follow the white rabbit." 2 2
  type_slowly "Knock, knock, Neo." 4 3
}

matrix
```

Save it to a file:

```bash
wake-up-neo.sh
```

Make it executable:

```bash
chmod +x wake-up-neo.sh
```

Then run it:

```bash
./wake-up-neo.sh
```

The script works with Bash on Linux and macOS.

## What I keep from that old text

What interests me today is not really the script.

It's the method.

Seeing something in a movie.

Wondering how to reproduce it.

Searching.

Testing.

Writing a few lines.

And learning along the way.

Many of my projects started like this.

Not with a grand plan.

Just with an idea that was a bit useless that absolutely had to work.