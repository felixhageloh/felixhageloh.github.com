---
layout: post
title: "Text Entry Woes for Mobile Web Apps"
date: 2013-05-21 21:26
comments: true
categories: javascript, web, mobile, safari
---

Sometimes building web apps feels like trying to build a house of cards while the browser might pull away the carpet from underneath you at any moment. Text entry on mobile is one of these issues were you, as a developer, have very little control over what you want to achieve versus what the browser thinks it is best for you. 

Mobile browsers have a reason for this of course. When the mobile web came about, websites and web apps where not designed with a small screen and a software keyboard in mind. In order to still provide a decent experience when entering text, mobile browsers had to come up with some solutions. For Mobile Safari that solution was to overlay the soft keyboard on top of the page and scroll the page so that the focused text field is in center of the visible space above the keyboard.

### don't push me, 'cause … 

While this works great on normal websites, in your carefully crafted web app you might run into something like this:

{% img left /images/mobile_safari_form_good_cut.png 320 380 :)%}
{% img /images/mobile_safari_form_borked_cut.png 320 380 :(%}

This might not seem like a big deal at the first glance, but when trying to create a seamless, near-native user experience, this can ruin your day. Submit buttons and other form elements that were carefully placed to be visible and easily reachable when entering text are now scrolled halfway off the screen. In combination with the unexpected movement it really makes the app feel broken.

### <tt>window.scrollTo to the rescue</tt>

So what can we do about this. There is, to my knowledge, no clean work around. A lot of default behaviour of the browser can be tweaked using css, some kind of <tt>event.preventDefault()</tt> or by other means, but this isn't one of them. What we *can* do, however, is to reset the scroll offset using javascript (or coffeescript in this case), so something like this:

``` javascript
$(textareaEl).on('focus', function () { window.scrollTo(0, 0) });
```
This is assuming that your web app takes the whole screen space and hides the address bar. However, it doesn't quite work; the browser scrolls just slightly after the focus event fires, so the page scrolls anyway. Using a <tt>setTimeout</tt> works, but you rely on a magic number, plus it is hard to catch it exactly when it scrolls, so that there is a visible jump happening before the text field moves back in its correct position. 

### hard to catch

It turns out, that if you focus the text field programatically, there is no delay before the page scrolls, so the <tt>onfocus</tt> handler catches it just in time. 

So the final solution boils down to: 

- stop the browser from focusing the textfield when the user taps it.
- focus the text field programatically.
- scroll window back to top when the focus event fires.

I need to emphasise that this is *only* a valid solution if your are dealing with a full-on web app, which is sized to fit the screen and is not user scalable. **Double tap zoom, or pinch zoom will break** with this approach (just on the text field, not the entire site)!


### bolting the carpet to the floor

In order to stop the browser from focusing the text field we need to <tt>preventDefault</tt> on touchstart (touchend should work as well). This means we have to provide our own custom tap handler, since the default click behaviour won't get triggered. The final solution could look something like this:

``` javascript
// onClick is our custom click/tap handler
onClick(myTextarea, function () { $(myTextarea).focus() });

// scroll back to top
$(myTextarea).on('focus', function () { window.scrollTo(0, 0) })

```

The custom click handler could look something like this:

``` javascript onClick

var onClick = function(domEl, clickHandler) {
    domEl = $(domEl); // make sure we have a query object
    
    var startTime, startPos, canceled;
    
    domEl.on('touchstart', function (event) {
         // this prevents the browser from firing a click event and
         // focusing the text field
        event.preventDefault();
        
        canceled  = false;
        startTime = event.timeStamp;
        startPos  = { x: event.pageX, y: event.pageY };
    });
    
    domEl.on('touchmove', function (event) { 
        var dx = event.pageX - startPos.x, 
            dy = event.pageY - startPos.y;
        
        // cancel click if finger moved more than 40px
        var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        canceled     = canceled || distance > 40;
    });
    
    domEl.on('touchend', function (event) { 
        if(canceled) return;
        
        // don't trigger click if finger rested longer than 500ms
        if(event.timeStamp - startTime < 500) 
            clickHandler();
    })
};

```

And there you have it; the text field stays in place, solid as a rock. We've bolted the carpet to the floor and can now happily continue to build our house of cards. 

Mind you, this solution is for iOS only, so on Android or other mobile platforms/browsers it won't work and even break things. There are other solutions for these platforms, which I won't go into further detail here. 

Finally, do remember that you are breaking default browser behaviour, which exists for a reason. So know what you are doing or else you might significantly reduce the usability of your app! Having a textfield stay hidden behind the soft keyboard, or preventing other necessary user interaction is hardly ever very user friendly ;).