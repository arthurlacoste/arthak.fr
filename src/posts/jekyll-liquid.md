---
author: art
date: 2017-06-02
updated: 2026-07-12
layout: post
slug: jekyll-liquid
title: "Liquid: When a Constraint Becomes a Language"
archive: true
categories:
  - Development
tags:
  - Jekyll
  - Liquid
  - GitHub Pages
  - constraints
---

When I build a "static" site with Jekyll on GitHub Pages, I always end up wanting to do something that wasn't planned. Initially, everything is fine: a few Markdown files, layouts, YAML data, and a repository that turns into a static site for free. Thanks, Microsoft.

Then comes the little extra feature.

Jekyll normally allows you to write plugins in Ruby. That's its full power. But GitHub Pages generates sites in a secure mode. Plugins are -for the most part- not allowed.

Today, it works with GitHub Actions, but I'm not sure it really existed at the time.

In the toolbox, there was only one treasure: Liquid.

Liquid allows you to display variables, iterate over lists, set conditions, and transform values with filters. It's not really a complete programming language. It's missing a lot of things, sometimes intentionally, sometimes just to make us lose half a day on a loop that could have taken three lines elsewhere.

But there is enough.

And if we know how to be patient, we can make a kind of plugin without a plugin.

It's not always very pretty. Some workarounds look like an IKEA cabinet that has undergone 3 moves, with three different screws, a cardboard shim, and the hope that no one will look closely. But it works. The site remains static, the repository remains compatible with GitHub Pages, and I don't need to leave the expected environment.

What is quite funny is that Liquid doesn't come from Jekyll. Shopify (this e-commerce giant) creates it in Ruby and has used it in production since 2006 as the engine for its themes. It allows stores to display their products, their collections, their prices, and their content without giving theme creators free access to the code running behind the platform.

The problem is very similar to that of GitHub Pages. Shopify wants to let thousands of people customize their stores, but obviously doesn't want to let them run anything on its servers. Liquid thus becomes this intermediate layer: flexible enough to build very different interfaces, but limited enough to remain controllable.

And that's probably where Liquid truly democratizes itself. Not just as a small template engine used in a blog generator, but as the tool that runs an immense amount of online stores. The same principle is used to generate a static article page in Jekyll or a dynamic product listing in Shopify: data on one side, a template on the other, and a layer of logic between the two.

Liquid is frustrating precisely because it doesn't try to do everything. It doesn't give access to the machine. It gives enough room to modify the result without being able to dismantle the whole system.

Looking back, it's a mechanism that I often find in my projects. A platform imposes a limit, so I start by looking for what it still allows. Then I push that little opening until it becomes almost a complete feature.

It is not necessarily the best way to develop. Sometimes you would simply have to choose another tool.

But there is something very satisfying about taking a constraint seriously, and then discovering that it still leaves enough room to build something else.