---
layout: post
title: "Background Filters for Übersicht"
date: 2014-08-25 18:09
comments: true
categories:
---

Today I want to reveal a 'hidden' feature of Übersicht that has been available since version 0.2. The reason for this secrecy is that it is in an early beta state and still somewhat cumbersome to use. However, the release of Mac OS X Yosemite is nigh and this will probably be a welcome addition to match the visual appearance of it. So I thought, better to get some people using it and get some feedback.

The hidden feature I am talking about is background filters. OS X Yosemite is full of them - most commonly blur filters. What they allow you to do is having beautiful translucent effects without sacrificing usability. Without filters, other content shining through translucent elements offers too many distractions. However, with the right filters you don't so much see other content, but rather get the impression that the UI reacts to surrounding colors ever so slightly.

### get your blur on

So how would one recreate Yosemite's filters in Übersicht? Of course [CSS3 filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) have been available for use since the first release. The problem with CSS3 filters is that they can only be applied to a DOM element and not what's *behind* a DOM element. To make matters worse, usually what's behind Übersicht widgets is the desktop wallpaper, which is not even part of the same App, let alone the Übersicht DOM.

To work around this issue, I've created a way to choose a dedicated DOM element and make it display a slice of the desktop wallpaper. The slice is chosen so that it exactly matches what would normally behind said DOM element. To understand what I mean, lets dive straight into an example.

### setting up


{% img left /images/uebersicht-filters/no-blur.png 360 225 %}

The image to the left shows a simple widget with a translucent background and no filters applied. It has only a single DOM element that shows the widget content.
In order to get this widget ready for background filters we first need to create a more complex DOM structure:

``` coffeescript
render: (output) -> """
  <canvas class='bg-slice'></canvas>
  <div class='content'>#{output}</div>
"""
```

We've now created a `canvas` element which will later draw the wallpaper slice, and a content element which will hold the widget content and sits in front of the canvas element. Of course we need some CSS to make this work, which comes down to:

``` css
.content
  background: rgba(#fff, 0.5)

.bg-slice
  position: absolute
  top: 0
  left: 0
  width: 0
  height: 0
  -webkit-filter: blur(10px)
```

This applies the background color to the content element and makes the canvas span the entire widget, sitting behind the content. Note that using `width` and `height` is important or otherwise the canvas will have a default size 300xsomething pixels.

This code will make the widget look identical to the previous code: The canvas element is completely transparent so there is nothing to see and nothing to apply the blur filter to.

### drawing the background slice

{% img right /images/uebersicht-filters/blur.png 360 225 %}

To make the canvas draw a slice of the wallpaper we can use the the new `uebersicht.makeBgSlice` method. It expects a canvas element as an argument and will measure the elements size, ask the App for a wallpaper slice of that size and finally draw the slice. For it to be able to measure the canvas size, it needs to be called after rendering has happened. For this we can use the new `afterRender` property, which - as the name suggests - gets invoked after `render`. This gives us following code:
<br/>
<br/>

``` coffeescript
afterRender: (domEl) ->
  uebersicht.makeBgSlice(el) for el in $(domEl).find '.bg-slice'
```

The result can be seen to the right. It looks pretty much what we are looking for, but keen observers will note that the background looks less blurred and more transparent towards the edges. This is a common problem with blur filters (for reasons I will not go into detail here) and corresponds to the blur radius we chose - 10px in this case.

### the final 10px

To get this just right we need to compensate for the 10px blur radius by growing the canvas element
10px in every direction. Luckily we have Stylus to aid us here; we can make the blur radius a variable and add it to the canvas size. The code and result are shown below:


{% img left /images/uebersicht-filters/final.png 360 225 %}


``` css
bg-blur = 10px

.bg-slice
  position: absolute
  top: -(bg-blur)
  left: -(bg-blur)
  width: 100% + 2*bg-blur
  height: 100% + 2*bg-blur
  -webkit-filter: blur(bg-blur)
```

<br/>
<br/>

This looks very much what we are looking for already and this approach lets us easily play with different blur radii. Of course there are many other CSS3 filters available, so feel free to experiment!

The final, complete widget is [available here](https://gist.github.com/felixhageloh/4c54a2a69b5a08b9f644).


### caveats

As you have probably noticed by now, getting this to work is a somewhat tedious process which could probably be streamlined. Some other issues remain, that might be harder to fix, though. You will notice a delay when switching to a desktop with a different wallpaper until all your filters display the new wallpaper image. Also you will notice a spike in CPU usage while the App processes the new wallpaper.

For these reasons, please be careful when using this feature and expect some changes in the future. In the meantime, happy styling and experimenting!
