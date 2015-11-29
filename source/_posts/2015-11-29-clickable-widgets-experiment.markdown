---
layout: post
title: "Clickable Widgets Experiment"
date: 2015-11-29 13:58
comments: true
categories:
---

If you have followed the developments of Übersicht, you will be aware of the 0.6 release which attempted to make Widgets clickable by default. In the new 0.7 release I'm reverting to using a shortcut key again and I thought I'd share what lead to this.

### Clickable Widgets

I thought I found a great solution that would make widgets act more like Desktop icons, which means that they could be clicked on and interacted with at any time. I stumbled across the solution while working on something else, so it was not a planned feature, but the solution seemed very simple and even removed code. So it looked like a win win situation and a low hanging fruit to be released with other fixes.

It turns out that, not only did I overlook some obvious defects, but also the Übersicht widget community has been insanely creative, creating widgets and use cases that I had not imagined ever! After releasing v0.6 the bug reports start trickling in. Initially they all seemed like easy bugs to fix, but as more and more use cases started coming to light, it became apparent that not all would be supportable with this approach. What as even worse, some bugs started popping up that were very hard to reproduce and only surfaced after Übersicht was running for a while.

### Reverting to Interaction Shortcuts

I learned a lot about the innards of OS X while working on this and many times I came very close to making clickable widgets work. It is one of these things that either has to work flawlessly or else it becomes very annoying very fast. In the end there was always those last 2% missing or one mysterious bug that would surface every once in a while (but often enough to be an issue) would remain.

Always clickable widgets was not necessarily something that people have asked for, nor did the previous solution of using a shortcut key seem to have big drawbacks for most people. Also, my spare time to work on Übersicht is limited and fixing this feature started to look like a massive time sink. Time which I could use to develop other great features, which actually have been requested but the community, instead.

### What's Next

Taken all into consideration, it was an easy decision to revert to using shortcut keys for now. Version 0.7, which has been released today, reverts to the old - pre v0.6 - behavior. I hope to be releasing other great features in the future and maybe I will pick this one up again at some point. In the meantime I'm curious to see what other great widgets you guys come up with. The enthusiasm and creativity that this simple little App inspires is awesome to see and a great motivator for me to keep working on it!

Thank you!
