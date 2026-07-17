---
title: "Introduction to YAML"
layout: rivers
---

# Introduction to YAML

YAML is a human-friendly data serialization language. It is mostly used for configuration files, but it can represent the same basic structures as JSON: mappings, sequences, and scalar values.

This page is a condensed and refreshed version of my older [Introduction to YAML](https://github.com/arthurlacoste/Introduction-To-YAML) guide. It targets YAML 1.2 and the current 1.2.2 specification revision.

<div class="yaml-course" data-yaml-course>
  <section class="course-dashboard" aria-label="YAML course progress">
    <div class="course-dashboard__top"><div><strong data-score>0.0 / 10</strong><span class="course-level" data-level>🥔 Potato Parser</span></div><span data-progress-text>0/30 questions</span></div>
    <progress data-course-progress value="0" max="30">0%</progress>
    <div class="course-dashboard__stats"><span data-streak>🔥 0 streak</span><span data-stars>☆☆☆☆☆☆☆☆☆☆ 0/10 perfect chapters</span><label class="timer-switch"><input type="checkbox" data-timer-toggle> Timer</label><span data-timer>Timer off</span></div>
    <div class="course-actions"><button class="course-button" type="button" data-retry-wrong hidden>Retry wrong answers</button><button class="course-button" type="button" data-reset-course>Reset course</button></div>
  </section>
</div>

## The essentials

A YAML file is plain Unicode text. Use UTF-8. Use spaces for indentation, never tabs. The amount of indentation is flexible, but every item at the same level must align.

Comments start with `#` unless the character is inside a quoted string.

```yaml
# This line is ignored
debug: false # This part is ignored too
name: '#not-a-comment'
```

YAML is sensitive to whitespace. Two spaces per level is a common convention because it stays readable without making deeply nested files too wide.

<section class="yaml-quiz" data-quiz="1">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · The essentials</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c1q1" data-explanation="Tabs cannot be used for indentation. Consistent spaces define structure.">
    <legend>1. What indentation should YAML use?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Tabs only</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Consistent spaces</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Any mixture of tabs and spaces</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c1q2" data-explanation="A hash inside a quoted string is data, not a comment.">
    <legend>2. When does # start a comment?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Always</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Only at the beginning of a file</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="true">Outside quoted scalar content</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c1q3" data-explanation="UTF-8 is the interoperable default for YAML text.">
    <legend>3. Which encoding is the practical default?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">UTF-8</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">ASCII only</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Latin-1</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Mappings

Mappings associate keys with values. They are comparable to objects in JSON, dictionaries in Python, or associative arrays in PHP.

```yaml
project: arthak.fr
public: true
port: 8080
```

Nested mappings are created with indentation:

```yaml
server:
  host: 127.0.0.1
  port: 8080
  tls:
    enabled: false
```

A compact flow style also exists:

```yaml
server: { host: 127.0.0.1, port: 8080 }
```

Use the block style for most configuration. Flow style is useful for short values that naturally belong on one line.

<section class="yaml-quiz" data-quiz="2">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Mappings</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c2q1" data-explanation="Mappings associate unique keys with values.">
    <legend>1. What is a YAML mapping closest to?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">An ordered queue</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">A key-value object</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">A binary stream</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c2q2" data-explanation="A colon followed by separation whitespace associates the key and value.">
    <legend>2. Which mapping entry is correctly written?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">port=8080</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">port: 8080</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">port -> 8080</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c2q3" data-explanation="Indented keys belong to the parent mapping node.">
    <legend>3. What does indentation create here: server then host below it?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">A nested mapping</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">A comment block</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">A second document</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Sequences

Sequences are ordered lists. Each item starts with a dash followed by a space.

```yaml
languages:
  - French
  - English
  - YAML
```

A sequence can contain mappings:

```yaml
services:
  - name: website
    port: 8080
  - name: api
    port: 3000
```

It can also use the compact flow syntax:

```yaml
languages: [French, English, YAML]
```

<section class="yaml-quiz" data-quiz="3">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Sequences</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c3q1" data-explanation="Block sequence entries use a dash followed by separation whitespace.">
    <legend>1. How does a block sequence item begin?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">With a dash and a space</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">With a colon</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">With an ampersand</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c3q2" data-explanation="YAML collections can be nested freely.">
    <legend>2. Can a sequence contain mappings?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">No</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Only in JSON</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="true">Yes</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c3q3" data-explanation="Square brackets represent a flow-style sequence.">
    <legend>3. Which is flow sequence syntax?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">{a, b, c}</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">[a, b, c]</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">(a, b, c)</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Scalars and quoting

A scalar is a single value: a string, number, boolean, null, date-like value, or another value recognized by the parser.

```yaml
name: Arthak
age: 37
enabled: true
empty: null
```

Quote strings when their intended type could be ambiguous or when they contain syntax-significant characters.

```yaml
version: '1.0'
answer: 'true'
channel: '#general'
time: '12:30'
```

Single quotes preserve most characters literally. To include a single quote, double it:

```yaml
message: 'It''s valid YAML'
```

Double quotes support escape sequences such as `\n`, `\t`, and Unicode escapes.

```yaml
message: "First line\nSecond line"
```

### YAML 1.1 versus 1.2

Older YAML 1.1 parsers may interpret values such as `yes`, `no`, `on`, and `off` as booleans. YAML 1.2 limits booleans in its core schema to `true` and `false`.

For portable configuration, use `true` and `false`, and quote words that must remain strings.

```yaml
legacy_answer: 'yes'
modern_answer: true
```

<section class="yaml-quiz" data-quiz="4">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Scalars and quoting</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c4q1" data-explanation="Quoting prevents implicit resolution as a boolean.">
    <legend>1. Why quote a value such as true?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">To force it to remain a string</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">To turn it into a number</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">To create an anchor</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c4q2" data-explanation="YAML single-quoted scalars represent one quote by writing two quotes.">
    <legend>2. How do you include a single quote inside a single-quoted scalar?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Escape it with a backslash</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Double the single quote</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">It is impossible</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c4q3" data-explanation="The YAML 1.2 core schema uses true and false.">
    <legend>3. Which values are portable YAML 1.2 booleans?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">yes and no</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">on and off</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="true">true and false</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Multiline strings

Use `|` when line breaks are meaningful:

```yaml
description: |
  First line.
  Second line.
```

Use `>` when wrapped lines should become a single paragraph:

```yaml
description: >
  This text is written across several lines
  but is normally loaded as one paragraph.
```

Chomping indicators control trailing line breaks:

```yaml
keep_all: |+
  Text

strip_all: |-
  Text
```

`+` keeps trailing newlines. `-` removes them. Without an indicator, YAML keeps one final newline.

<section class="yaml-quiz" data-quiz="5">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Multiline strings</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c5q1" data-explanation="Literal block scalars preserve line breaks.">
    <legend>1. What does the | block scalar preserve?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Line breaks</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Only spaces</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Comments</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c5q2" data-explanation="Folded block scalars turn most line breaks into spaces.">
    <legend>2. What does > normally do?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Encrypts the value</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Folds lines into a paragraph</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Creates a tag</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c5q3" data-explanation="The strip chomping indicator removes trailing line breaks.">
    <legend>3. What does the - chomping indicator do?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Removes trailing line breaks</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Adds indentation</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Starts a list</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Multiple documents

A YAML stream can contain several documents. Three dashes start a new document. Three dots can explicitly end one.

```yaml
---
name: first
---
name: second
...
```

Many tools expect exactly one document per file, so only use streams when the consuming application documents support for them.

<section class="yaml-quiz" data-quiz="6">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Multiple documents</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c6q1" data-explanation="Three dashes are the document start marker.">
    <legend>1. Which marker starts a document?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">---</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">+++</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">***</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c6q2" data-explanation="Three dots are the document end marker.">
    <legend>2. Which marker explicitly ends a document?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">:::</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">...</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">///</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c6q3" data-explanation="Many applications expect exactly one document per file.">
    <legend>3. Should every YAML consumer be assumed to accept streams?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Yes</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">No</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Only browsers</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Anchors, aliases, and merge keys

Anchors mark reusable nodes with `&`. Aliases reference them with `*`.

```yaml
defaults: &defaults
  retries: 3
  timeout: 10

production:
  settings: *defaults
```

The merge key syntax is widely implemented and commonly used to extend mappings:

```yaml
defaults: &defaults
  retries: 3
  timeout: 10

production:
  <<: *defaults
  timeout: 30
```

Anchors and aliases are part of YAML. The `<<` merge key comes from a YAML 1.1 language-independent type and is not defined by the YAML 1.2 core specification. Parser support varies. Prefer explicit configuration when interoperability matters.

<section class="yaml-quiz" data-quiz="7">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Anchors, aliases, and merge keys</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c7q1" data-explanation="An ampersand introduces an anchor name.">
    <legend>1. Which symbol defines an anchor?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">&</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">*</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">!</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c7q2" data-explanation="An asterisk introduces an alias.">
    <legend>2. Which symbol references an anchor?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">#</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">*</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">%</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c7q3" data-explanation="Merge keys are widely supported but are not part of the YAML 1.2 core specification.">
    <legend>3. Is << guaranteed by the YAML 1.2 core specification?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Yes</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">No</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Only for strings</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Tags and explicit types

Tags identify the type of a node. Standard tags begin with `!!`.

```yaml
integer: 123
string: !!str 123
float: !!float 123
```

Applications can define custom tags:

```yaml
release: !version 2.4.0
```

Custom tags are application-specific. A generic YAML parser may preserve or reject them without knowing how to construct the target object.

<section class="yaml-quiz" data-quiz="8">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Tags and explicit types</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c8q1" data-explanation="The standard string tag requests string construction.">
    <legend>1. What does !!str request?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">A string type</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">A stream</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">A sequence</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c8q2" data-explanation="Single-exclamation tags are usually local, application-specific tags.">
    <legend>2. What does !version represent?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">A comment</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">An application-specific tag</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">A document end</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c8q3" data-explanation="A generic parser may preserve, reject, or leave custom tags unresolved.">
    <legend>3. Must every parser understand custom tags?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Yes</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">No</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Only in YAML 1.1</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Variables do not exist in YAML

YAML has no native variable or interpolation system.


This syntax is only meaningful if the application loading the file implements it:

```yaml
home: ${HOME}
```

Environment variables, templates, includes, and expressions belong to tools built around YAML, not to YAML itself. Docker Compose, GitHub Actions, Ansible, Helm, and other systems each add their own semantics.

Do not assume a feature supported by one YAML-based tool exists in another.

<section class="yaml-quiz" data-quiz="9">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Variables do not exist in YAML</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c9q1" data-explanation="Interpolation belongs to the application loading YAML.">
    <legend>1. Does YAML itself interpolate ${HOME}?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Yes</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">No</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Only on Linux</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c9q2" data-explanation="GitHub Actions adds its own expression language.">
    <legend>2. Who defines expressions in GitHub Actions YAML?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">The YAML specification</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">GitHub Actions</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">The browser</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c9q3" data-explanation="Each tool adds different semantics around the YAML data model.">
    <legend>3. Can template behavior be assumed across YAML tools?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Yes</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">No</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Only with anchors</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Common mistakes

### Tabs

Tabs are not valid indentation. Configure the editor to insert spaces.

### Missing space after a colon

```yaml
# Wrong or interpreted unexpectedly
port:8080

# Correct
port: 8080
```

### Accidental comments

```yaml
# The value becomes "dark"
theme: dark # experimental

# The hash is part of the value
channel: '#design'
```

### Duplicate keys

```yaml
port: 8080
port: 3000
```

Mapping keys must be unique. Some parsers reject duplicates; others silently keep one value. Treat duplicates as errors.

### Trusting implicit types

Quote identifiers, versions, dates, and values with leading zeroes when they must remain strings.

```yaml
postal_code: '01230'
release: '2026-07-17'
version: '1.20'
```

### Parsing untrusted YAML unsafely

Some libraries can construct application objects from tags. When loading untrusted content, use the parser's safe-loading mode and disable arbitrary object construction.

<section class="yaml-quiz" data-quiz="10">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Complete the previous chapter quiz to unlock this one.</div>
  <h3>Chapter quiz · Common mistakes</h3>
  <p class="quiz-intro">Choose one answer for each question. Feedback is immediate.</p>
  <fieldset class="quiz-question" data-question="c10q1" data-explanation="Parser behavior varies, so duplicates are unsafe and should be rejected.">
    <legend>1. What should duplicate mapping keys be treated as?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">A safe override</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">An error</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">A list</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c10q2" data-explanation="Quoting prevents unwanted numeric interpretation.">
    <legend>2. How should an identifier 01230 be preserved?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Quote it</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Add a tab</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Prefix it with #</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c10q3" data-explanation="Safe loading prevents dangerous application object construction from tags.">
    <legend>3. How should untrusted YAML be loaded?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">With arbitrary object construction</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Using safe-loading features</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">As executable code</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Validate against the real consumer

A file can be valid YAML and still be invalid for the application using it.

Validation has three layers:

1. **Syntax:** can a YAML parser read it?
2. **Schema:** does it contain the expected keys and value types?
3. **Application:** does the target tool accept the available options and semantics?

Use the same parser and version in development, tests, and production. Add schema validation when configuration becomes important enough to break deployments.

## YAML or something else?

Use YAML when humans regularly edit structured configuration and comments are useful.

Use JSON when strict interoperability, a smaller syntax, or direct browser tooling matters most.

Use TOML for relatively shallow configuration where explicit types and predictable parsing are priorities.

Use a programming language when the configuration needs complex conditions, loops, imports, or reusable logic. Recreating a language inside YAML usually makes the system harder to understand.

## Practical checklist

- Save as UTF-8.
- Indent with spaces only.
- Keep indentation consistent.
- Prefer block mappings and sequences.
- Quote ambiguous strings.
- Use `true`, `false`, and `null` for portable core values.
- Avoid duplicate keys.
- Do not expect variables or templates from YAML itself.
- Check anchor, merge-key, and tag support in the target parser.
- Validate syntax, schema, and application behavior.
- Use safe loading for untrusted input.

<section class="course-result" data-final-result hidden>
  <span class="course-result__icon" data-result-icon>🏁</span>
  <h2 data-result-title>Course complete</h2>
  <p class="course-result__score"><span data-result-score>0.0</span> / 10</p>
  <p data-result-detail></p>
  <div class="course-actions"><button class="course-button" type="button" data-share-score>Share score</button></div>
  <section class="leaderboard-submit" data-leaderboard-submit>
    <h3>Join the leaderboard</h3>
    <p>Pick a public name. Only your best result is kept for this browser.</p>
    <form data-score-form>
      <label for="yaml-player-name">Leaderboard name</label>
      <div class="leaderboard-submit__row">
        <input id="yaml-player-name" name="playerName" maxlength="24" autocomplete="nickname" required data-player-name>
        <button class="course-button" type="submit" data-submit-score>Submit score</button>
      </div>
      <div class="turnstile-box"><div class="cf-turnstile" data-sitekey="0x4AAAAAAD4HkbtTwFl2eb_E" data-theme="auto"></div></div>
      <p class="leaderboard-status" data-leaderboard-status aria-live="polite"></p>
    </form>
  </section>
  <section class="leaderboard" data-leaderboard>
    <div class="leaderboard__heading">
      <h3>Leaderboard</h3>
      <select data-leaderboard-period aria-label="Leaderboard period">
        <option value="all">All time</option>
        <option value="month">This month</option>
        <option value="week">This week</option>
        <option value="today">Today</option>
      </select>
    </div>
    <ol data-leaderboard-list><li>Loading…</li></ol>
  </section>
</section>

## Sources and further reading

- [YAML 1.2.2 specification](https://yaml.org/spec/1.2.2/)
- [YAML resources index](https://yaml.org/spec/1.2.2/ext/resources/)
- [YAML Test Suite](https://github.com/yaml/yaml-test-suite)
- [Original Introduction to YAML repository](https://github.com/arthurlacoste/Introduction-To-YAML)
- [YAML organization on GitHub](https://github.com/yaml)
