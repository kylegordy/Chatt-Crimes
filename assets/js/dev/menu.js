$(document).ready(function(){

  // toggle menu
  $("#menu").click(function(){
    $("html").toggleClass("active-sidebar");
  });

  // toggle selected menu item
  $('.map-wraper nav a').click(function(){
    $('nav a').removeClass("selected");
    $(this).addClass("selected");
  });

});