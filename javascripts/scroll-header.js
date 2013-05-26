(function () {
  var makeHeaderScrollable = function () {
    var navElement = $("body > nav"),
        navOffset  = navElement.offset().top,
        isFixed    = false;

    var resize = function () {
      releaseHeader();
      navOffset = navElement.offset().top;
      checkHeader();
    };

    var fixHeader = function() {
      if(isFixed) return;
      navElement.css({
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        width: '100%'
      })
      isFixed = true;
    };

    var releaseHeader = function () {
      if(!isFixed) return;
      navElement.css({position: '', top: '', width: ''});
      isFixed = false;
    };

    var checkHeader = function () {
      if(window.scrollY >= navOffset)
        fixHeader()
      else
        releaseHeader()
    };

    $(window).on('scroll', function () { setTimeout(checkHeader) });
    $(window).on('resize', function() { setTimeout(resize) });
  };

  $(makeHeaderScrollable);
}());