$(function() {

	$('.header-submenu__item, .header-menu__item').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});

	// Burger menu open
  $('.burger-menu__wrap').click(function() {
  	$(this).toggleClass('open');
  });
	
});