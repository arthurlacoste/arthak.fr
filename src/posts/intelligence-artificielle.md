---
author: art
comments: true
date: 2009-02-03 06:00:47+00:00
layout: post
link: https://archives.irz.fr/intelligence-artificielle/
slug: intelligence-artificielle
title: Thoughts on an Artificial Intelligence Program (#1)
emoji: 🧠
wordpress_id: 1438447744
categories:
- Software
tags:
- AI
---
Needless to say, this idea had been on my mind for a long time. It was probably because I wanted the skills required to develop artificial intelligence software that I specialized in software development, although choosing a BTS in Information Management may not have been the wisest path after all.

As Wikipedia tells us, artificial intelligence covers a lot of things: robotics, character recognition, voice interface, automatic translation... I know what I want to do: a command-line program, which will have, on the one hand, a machine learning algorithm, and on the other, be capable of executing actions and communicating in natural language, getting as close as possible to strong artificial intelligence, where the program could go as far as "feeling the impression of a real self-awareness", "true feelings" (whatever one can put behind those words), and "an understanding of its own reasoning".

I can already picture my program, which I will call Eva, and its capabilities. On any computer, it would be installed with a Linux distribution (like Debian). The idea is to provide an interface resembling a text conversation between the user and Eva.

The application areas are as follows:



	
  * Adaptation of Unix "commands" into French ("install bzip2" instead of "# apt-get install bzip2")

	
  * Discussion and self-awareness

	
  * Connecting Eva as an msn/skype/facebook chat client (with a "conversation goal", for example, obtaining one or more pieces of information)

	
  * Having a style in its writing

	
  * Talking about a subject ("Tell me about the origins of chess" would discuss chess, but only its history)

	
  * An interface for other applications and modules written for Eva.

	
  * The ability to write algorithms (type scripts, basic C files)

	
  * A personality (choices, questions, impatience?)

	
  * A learning module (continuously on the internet)

	  * The ability to question itself (recompile?)


It will be important to be able to answer this type of question:

	
  * "Can we eat tomorrow with a friend who passed away last year and why?"

	  * "What does the brother of my father represent to me?"

	  * "X weighs 50 kg, Y weighs 70 kg, Z weighs 60 kg. Who is the heaviest?"



Using a MySQL database containing French words, it would be able to detect spelling mistakes. I would be inclined to develop the software with Qt in C++, but Qt is mainly geared toward graphical applications, so it may not be suitable. I need to investigate further.

That is the rough outline. As you can see, it is not a small project. I will start with a "simple" information retrieval module. Like making a sentence to say the weather.
