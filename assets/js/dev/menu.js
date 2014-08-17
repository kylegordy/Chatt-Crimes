$(document).ready(function(){

  // toggle menu
  $("#menu").click(function(){
    $("html").toggleClass("active-sidebar");
  });

  // add selected class to menu link
  $('.map-wraper nav a:not(#myLocation)').click(function(){
    $('nav a').removeClass("selected");
    $(this).addClass("selected");
  });

});