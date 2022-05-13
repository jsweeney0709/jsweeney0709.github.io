exports.init = function () {

  $( ".advert__close" ).click(function(e) {
    e.preventDefault();
    $('#homepage__advert').hide();
    $('#mobile__advert').hide();
    $('#test__main--header').css('top', '0');
    $('#test__main--header').css('position', 'sticky');
    //$('.advert__top--drop').css('top', '0');
    $('.advert__margin--drop').css('margin-top', '0');
    console.log("Working?");

  });
}