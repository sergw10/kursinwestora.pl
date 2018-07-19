$(function() {

	// Burger menu open
  $('.burger-menu__wrap').click(function() {
  	$(this).toggleClass('js_open');
  	$('.header-menu').toggleClass('js_show');
  });
  
  if ( $('html').width() >= 976 ) {

		// Hover event in main menu
		$('.header-submenu__item, .header-menu__item').hover(function() {
			$(this).addClass('js_hover');
		}, function() {
			$(this).removeClass('js_hover');
		});
  }

  if ( $('html').width() <= 975 ) {

  	// Click on arrow in main menu (mobile version)
  	$('.header-menu__item-arrow').click(function() {
  		$(this).toggleClass('js_rotate');
  		$(this).parent().find('.header-submenu__wrap').toggleClass('js_show');
  		$(this).parent().find('.header-menu__link').toggleClass('js_blue_background')
  	});
  }
	
});