---
layout: post
title: "Übersicht 0.2"
date: 2014-07-03 10:04
comments: true
categories:
---

A new version of Übersicht has been released today, which brings a much requested feature: screen control. For those of you with multiple monitors, you can now select which monitor Übersicht runs on.

{% img left /images/uebersicht-screen-control.png %}

It should also remember which monitor(s) you used last and use it again whenever it is available. Note that it doesn't remember the exact monitor, but rather which port the monitor was connected to. So if you connect a different monitor to the same port, it should use that one.

The screen-shot to the left also shows another new feature: manual refresh. You can now force your widgets to refresh manually, which is handy when you just woke your machine from sleep and don't want to wait for your widgets to update.

Finally, there also have been improvements to error reporting to aid you in writing your own widgets. CoffeeSCript and Stylus compile errors were previously only logged to the system log, but now they will appear in the developer console as well.

This is the first release that has seen some community involvement and I'd like to thank every one who helped out! Special thanks go to [Guillaume Boudreau](https://github.com/gboudreau) and [Siemen Sikkema](https://github.com/siemensikkema).
