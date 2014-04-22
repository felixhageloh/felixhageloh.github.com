---
layout: post
title: "Übersicht"
date: 2014-04-22 13:26
comments: true
categories: [release, Mac OS, NodeJS, HTML, CSS]
---

{% img center /images/ubersicht-icon@2x.png 256 256 icon%}

Earlier today I released [Übersicht](http://tracesof.net/uebersicht/), a little Mac app I originally wrote to scratch my own itch. It is essentially like [GeekTool](http://projects.tynsoe.org/en/geektool/), which lets you run system commands and display their output on your desktop. The main difference that widgets are written in HTML5, which was originally motivated by these two main reasons:

  * I can plug in a different monitor without my widgets breaking
  * I can easily write my own widgets

So in essence the app is just a large WebView that is glued to your desktop and widgets are little snippets of HTML+CSS+JS. Of course you can't run system commands from within a WebView, so the app comes with a NodeJs backend. For more details on that, you can checkout out the [slides](http://slides.com/felixhageloh/node-native) for my talk at the local Amsterdam JavaScript Meetup.

Of course, also checkout the [app itself](http://tracesof.net/uebersicht/). It is released under the GPL license and the code can be found on [GitHub](https://github.com/felixhageloh/uebersicht)!


