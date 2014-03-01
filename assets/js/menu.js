$('body').addClass("active-sidebar");

var showMenu = function() {
  $('body').toggleClass("active-sidebar"); 
}

jQuery(document).ready(function($) {
  // Toggle for nav menu
  $('.menu').click(function(e) {
    e.preventDefault();
    showMenu();             
  });            
});