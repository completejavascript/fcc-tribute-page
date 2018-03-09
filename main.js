$(document).ready(function(){
  let timer;
  let menuClicked = false;

  // Open link all links in a new tab, except links with '#' in the beginning
  $("a:not([href^='#'])").attr("target", "_blank");

  // Navigation Bar Handling
  $(".my-menu").click(function(){
    menuClicked = true;
    activateMenu(this);
    $("#my-navbar").slideUp();
  });

  $("#btn-toggle").click(function(){
    $("#my-navbar").slideToggle();
  });

  // Update menu while scrolling
  $(window).scroll(function(){
    if(timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(handleScrollEvent, 100);
  });

  // Smooth scrolling
  $("a[href*='#']:not([href='#'])").click(function () {
    let target = $(this).attr("href");
    $('html,body').stop().animate({
      scrollTop: $(target).offset().top - 32 // First element's marginTop = 32px
    }, 1000);
    event.preventDefault();
  });

  function handleScrollEvent() {
    if (!menuClicked) {
      let about = $('#about');
      let career = $('#career');
      let qoute = $('#qoute');
  
      if(isInViewPort(about) && !about.hasClass("active")) {
        activateMenu($('#menu-about'));
        setHashLocation('#about');
      } 
      else if(isInViewPort(career) && !career.hasClass("active")) {
        activateMenu($('#menu-career'));
        setHashLocation('#career');
      } 
      else if(isInViewPort(qoute) && !qoute.hasClass("active")) {
        activateMenu($('#menu-qoute'));
        setHashLocation('#qoute');
      }
    } else {
      menuClicked = false;
    }
  }

  function setHashLocation(id) {  
    var scrollmem = $('html,body').scrollTop();
    window.location.hash = id;
    $('html,body').scrollTop(scrollmem);
  }

  function activateMenu(menuItem){
    $(menuItem).parent().children().removeClass("active");
    $(menuItem).addClass("active");
  }

  function isInViewPort(element){
    let elementTop = $(element).offset().top;
    let elementBottom = elementTop + $(element).outerHeight();
    let viewPortTop = $(window).scrollTop();
    let viewPortBottom = viewPortTop + $(window).height();

    return elementBottom > viewPortTop && elementTop < viewPortBottom;
  }
});
