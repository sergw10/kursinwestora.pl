$(function() {

	// Burger menu open
  $('.burger-menu__wrap').click(function() {
  	$(this).toggleClass('js_open');
  	$('.header-menu').toggleClass('js_show');
  });
  
  var header_desctop_event = function () {
	  $('.header-menu__item').removeClass('js_hover');
	  $('.header-menu__item-arrow').click(function(e) {
	  	e.preventDefault();
	  });
		// Hover event in main menu
	  if ( $('html').width() >= 976 ) {
			$('.header-submenu__item, .header-menu__item').hover(function() {
				$(this).addClass('js_hover');
			}, function() {
				$(this).removeClass('js_hover');
			});
	  }
	}
	header_desctop_event();

  var header_mobile_event = function () {
		$('.header-submenu__item, .header-menu__item').hover(function(e) {
	  	e.preventDefault();
	  });
	  // Click on arrow in main menu (mobile version)
	  if ( $('html').width() <= 975 ) {
	  	$('.header-menu__item-arrow').click(function() {
	  		$(this).toggleClass('js_rotate');
	  		$(this).parent().find('.header-submenu__wrap').toggleClass('js_show');
	  		$(this).parent().find('.header-menu__link').toggleClass('js_blue_background')
	  	});
	  }
	}
	header_mobile_event();

	// $(window).on("orientationchange",function(){
	$(window).resize(function(){
		if (window.matchMedia("(orientation: portrait)").matches) {
			header_mobile_event();
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
			header_desctop_event();
    }
  });
	
});