(function () {
  var markCurrentNav = function () {
    var path = window.location.pathname.replace(/\/$/, '');

    if(path.length == 0) path = '/';

    var current = $(".main-navigation a[href='"+path+"']");
    current.parent().addClass('current');
  };

  $(markCurrentNav);
}());