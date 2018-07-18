// Load fonts after document load.
try {
	document.addEventListener("DOMContentLoaded", function() { // prevent a Flash Of Unstyled Text (FOUT)
		document.querySelector('head').innerHTML += "<link href='https://fonts.googleapis.com/css?family=Roboto:200,300,300i,400,400i,500,600,700&amp;subset=latin-ext' rel='stylesheet' type='text/css'>";
		document.body.classList.add('loaded');
	});
} catch (e) { }


function show_form_response(response, form) { // Function which show response popup.
    response = JSON.parse(response);
    $.jGrowl(
        response.message_text, {
            header: response.message_header,
            theme: 'response-popup-'+response.status,
            //sticky: true,
            life: 15000
        }
    );
}

function isElementInViewport (el) { // Function for checking is element is visible in viewport.
    if (typeof jQuery === "function" && el instanceof jQuery) { //special bonus for those using jQuery
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function startCounter() { // Function for vivsibility element in viewport and starting countdown.
    if(isElementInViewport($('.num-counter')) === true) {
        $('.num-counter:not(.counted)').each(
            function () {
                $(this).prop('Counter', $(this).text()).animate({
                    Counter: $(this).attr('data-count-to')
                }, {
                    duration: 5000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    },
                    complete: function() {
                        $(this).addClass('counted');
                    }
                });
            }
        );
    }
}

var getUrlParameter = function getUrlParameter(sParam) { // Function for getting get-parameters.
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function createCookie(name,value,days) { // Function for setting variable in cookies.
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) { // Function for getting variable in cookies.
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) { // Function for deleting variable in cookies.
    createCookie(name,"",-1);
}

function getWidth() {
    // Get display width crossbrowser.
	var myWidth = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
	}
	return myWidth;
}

function adaptative_columns (screenWidth) {
    // Adaptive columns for glossary.
	if($('.gl-inner').length) {
		$('.gl-inner').uncolumnize();
	}
	// Breckpoint Desktop.
	if (screenWidth > '1380') {
		$('.gl-inner').columnize({
			columns: 4,
			buildOnce: false,
			lastNeverTallest: true
		});
	}
	// Breckpoint tablet.
	if ((screenWidth < '1380') && (screenWidth > '991') ) {
		$('.gl-inner').columnize({
			columns: 3,
			buildOnce: false,
			lastNeverTallest: true
		});
	}
	// Breckpoint tablet.
	if ((screenWidth < '992') && (screenWidth > '600') ) {
		$('.gl-inner').columnize({
			columns: 2,
			buildOnce: false,
			lastNeverTallest: true
		});
	}
	$('.gl-wrap').removeClass('hidden-content');
}

//header style on scroll

var transparent_header = $("header:not(.normal-header)");

if($(window).scrollTop() > 0)
	transparent_header.removeClass('clear-header').addClass("dark-header");

$(function() {
	// caches a jQuery object containing the header element

	$(window).scroll(function() {
		var scroll = $(window).scrollTop();

		if (scroll > 0) {
			transparent_header.removeClass('clear-header').addClass("dark-header");
		} else {
			transparent_header.removeClass("dark-header").addClass('clear-header');
		}
	});

	// Counter.
	if($('.num-counter').length) {
        startCounter();

        $(window).scroll(function() {
    		startCounter();
    	});
    }

	// Match height with plugin for class "equal-height-block".
    if ($('.equal-height-block').length > 0) {
        $('.equal-height-block').matchHeight();
    }

    // Phone number formatting.
    if($('input[name="phone"]').length) {
        $('input[name="phone"]').mask('+48 999 999 999', {
            placeholder:" ",
            completed:function(){
                //alert("You typed the following: "+this.val());
            }
        });
    }
    // |END| Phone number formatting.

    /*$('.tooltip-follow').tooltipster({
	    maxWidth: 500,
	    contentAsHTML: true
	});*/

	$('.tooltip-follow').tooltipster({
	    maxWidth: 500,
	    contentAsHTML: true,
	    theme: ['tooltipster-follower'],
	    plugins: ['follower']
	});

    // Read utm-tags.
	var utm_source = getUrlParameter('utm_source');
	var utm_medium = getUrlParameter('utm_medium');
	var utm_campaign = getUrlParameter('utm_campaign');
	var utm_term = getUrlParameter('utm_term');
	var utm_content = getUrlParameter('utm_content');

	// Clearing old cookie if exist new ones.
	if((utm_source !== undefined && utm_source !== '') || (utm_medium !== undefined && utm_medium !== '') || (utm_campaign !== undefined && utm_campaign !== '') || (utm_term !== undefined && utm_term !== '') || (utm_content !== undefined && utm_content !== '')) {
        eraseCookie('utm_source');
        eraseCookie('utm_medium');
        eraseCookie('utm_campaign');
        eraseCookie('utm_term');
        eraseCookie('utm_content');
	}

	// Saving new utm-tags to cookies.
	if(utm_source !== undefined && utm_source !== '') {
        createCookie('utm_source', utm_source, 1);
    }
    if(utm_medium !== undefined && utm_medium !== '') {
        createCookie('utm_medium', utm_medium, 1);
    }
    if(utm_campaign !== undefined && utm_campaign !== '') {
        createCookie('utm_campaign', utm_campaign, 1);
    }
    if(utm_term !== undefined && utm_term !== '') {
        createCookie('utm_term', utm_term, 1);
    }
    if(utm_content !== undefined && utm_content !== '') {
        createCookie('utm_content', utm_content, 1);
    }
    // |END| Save utm-tags to cookies.

	$.jGrowl.defaults.closeTemplate = '×';
	$.jGrowl.defaults.closerTemplate = '<div class="jgrowl-close-all">[ zamknij wszystkie ]</div>';


	// Form validation.
    $('form.need-validation').each(function() {  // attach to all form elements on page
        $(this).validate({      // initialize plugin on each form
            lang: 'pl',
            errorElement: 'span',
            onfocusout: function(element) {
                $(element).siblings('.error-wrapper').children('span.error').css('display', 'none');
                //$(element).valid();
            },
            highlight: function(element, errorClass, validClass) {
                // console.log($(element).val() + ' for attr ' + $(element).attr('name'));
                $(element).parent('.form-container').addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                // console.log($(element).val() + ' for attr ' + $(element).attr('name'));
                $(element).parent('.form-container').removeClass('error');
            },
            invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    validator.errorList[0].element.focus(); //Set Focus on first error field
                }
            },
            showErrors: function(errorMap, errorList) {
                if (errorList.length) {
                   var s = errorList.shift();
                   var n = [];
                   n.push(s);
                   this.errorList = n;
                }
                this.defaultShowErrors();
            },
			errorPlacement: function(error, element) {
				error.appendTo( element.siblings(".error-wrapper"));
			},
			// Jgrowl notifications - needs to update.
			/*showErrors: function(errorMap, errorList) {
			     for (var error in errorMap) {
					 $.jGrowl(
				         errorMap[error], {
				             header: error,
				             theme: 'response-popup-success',
				             life: 6000
				         }
				     );
			     }
			},*/
            rules: {
                first_name: {
                    required: true,
                    textspace: true
                },
                last_name: {
                    required: true,
                    textspace: true
                },
                name: {
                    required: true,
                    textspace: true
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                required_checkbox: {
                    required: true
                },
                query: {
                    required: true,
                    minlength: 3
                }
            }
        });
    });
	// |END| Form validation.

	// Flipclock watches.
	$.each($('.webinar-clock'), function () {
        // Check if element exist in the DOM.
        var end_time = $(this).attr('data-time'),
    	    date = new Date(end_time.replace(/-/g, "/")), // Fix for calich safari.
            now = new Date(),
            w_form = $('.webinar-info .lead-form'),
            diff = (date.getTime()/1000) - (now.getTime()/1000)

        //console.log(diff);

        if (diff < 0) {
			// Hiding webinar timer and text information.

            $('.timer-normal', w_form).hide();
            $('.timer-online', w_form).show();
			$('.ms-webinar-time', '.webinar-title').hide();
			$('.webinar-clock-wrapper', '.webinar-title').hide();
            //diff = 0;
            return false;
        }
        $(this).click(function (e){
            e.preventDefault();
        });
        FlipClock.Lang.Polish = {
            'years'   : 'Lata',
            'months'  : 'Miesiące',
            'days'    : 'Dni',
            'hours'   : 'Godziny',
            'minutes' : 'Minuty',
            'seconds' : 'Sekundy'
        };

        // Create various aliases for convenience.
        FlipClock.Lang['pl']      = FlipClock.Lang.Polish;
        FlipClock.Lang['pl-pl']   = FlipClock.Lang.Polish;
        FlipClock.Lang['polish'] = FlipClock.Lang.Polish;

        var clock = $(this).FlipClock(diff, {
            clockFace: 'DailyCounter',
            language: 'pl',
            countdown: true
        });
    });
	// |END| Flipclock watches.

	// Datetime picker.
	if($('#date-picker-input').length) {
        $('#date-picker-input').datetimepicker({
			daysOfWeekDisabled: [0,6],
			inline: true,
			icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down"
            }
		});
    }
    
    // Glossary
    if($('.gl-inner').length) {
        var screenWidth = getWidth();
        adaptative_columns(screenWidth);
        
        window.addEventListener("orientationchange", function() {
            if ($('.gl-inner').length > 0) {
                adaptative_columns(screenWidth);
            }
        }, false);
    }
});

// Sending each form on the site.
$(document).on('submit', 'form.lead-form',function(){
	var data = { },
	    form = $(this),
        form_id = $('input[name="form_id"]', form).val(),
		ga_goal_cat = $('input[name="goals"]', form).attr('data-cat'),
		ga_goal_action = $('input[name="goals"]', form).attr('data-action');

    $.each(form.serializeArray(), function() {
        data[this.name] = this.value;
    });

	// Spam check.
    if ($('input[name="spam"]', form).val() !== '') {
        return false;
    }

    form.toggleClass('processing');

    if(form_id == 1) {
        // Registration client in clickmeeting.
        $.post(
            '',
            {
                ajax_handler: 'clickmeeting_registration',
                data: JSON.stringify(data)
            },
            function(result) {
                var res = JSON.parse(result);

                if(res.status == 'success') {
                    form[0].reset();
                }

                show_form_response(result, form);

                data['webinar_name'] = res.webinar_name;
                data['webinar_time'] = res.webinar_time;
                data['webinar_status'] = res.webinar_status;
                data['registered_clients'] = res.registered_clients;

                $.post(
                    '',
                    {
                        ajax_handler: 'form_handler',
                        data: JSON.stringify(data)
                    },
                    function(result) {
                        if(ga_goal_cat && ga_goal_action && ga_goal_cat !== '' && ga_goal_action !== '') {
                            // Sending google goal success.
                            ga('send', 'event', ga_goal_cat, ga_goal_action);
                            //console.log(ga_goal_cat + ' ' + ga_goal_action);
                        }
                    }
                );


                form.toggleClass('processing');
            }
        );
    }
    else {
        // All usual forms sending.
        $.post(
            '',
            {
                ajax_handler: 'form_handler',
                data: JSON.stringify(data)
            },
            function(result) {
                var res = JSON.parse(result);
                
                if(res.status == 'success' || res.status == 'hidden') {
                    form[0].reset();
                    if(ga_goal_cat && ga_goal_action && ga_goal_cat !== '' && ga_goal_action !== '') {
                        // Sending google goal success.
                        ga('send', 'event', ga_goal_cat, ga_goal_action);
                        console.log(ga_goal_cat + ' ' + ga_goal_action);
                    }
                }
                
                show_form_response(result, form);
                form.toggleClass('processing');
            }
        );
    }

	return false;
});
// |END| Sending each form on the site.

//open-close mobile menu
$( ".menu-btn" ).click(function() {
	$(this).toggleClass('close');
	$(".nav").toggleClass("open");
	return false;
});

/*
	Define all sliders.
*/
var commentsSwiper = new Swiper('.comments-slider', {
	speed: 1000,
	autoplay: {
		delay: 10000,
	},
	slidesPerView: 4,
    spaceBetween: 100,
	breakpoints: {
		545: {
			slidesPerView: 1,
			spaceBetween: 50,
		},
		991: {
			slidesPerView: 2,
			spaceBetween: 50,
		},
		1600: {
			slidesPerView: 3,
			spaceBetween: 70,
		}
	}
});

var lecturersSwiper = new Swiper('.lecturers-slider', {
	speed: 1000,
	autoplay: {
		delay: 12000,
	},
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	loop: true,
	pagination: {
		el: '.lecturers .swiper-pagination',
		clickable: true,
	}
});

var factsSwiper = new Swiper('.interesting-facts-slider', {
	speed: 1000,
	autoplay: {
		delay: 10000,
		disableOnInteraction: false
	},
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	loop: true,
	grabCursor: true
	/*pagination: {
		el: '.interesting-facts-slider .swiper-pagination',
		clickable: true,
	}*/
});

var socialAboutUsSwiper = new Swiper('.social-about-us-slider', {
	speed: 1000,
	autoplay: {
		delay: 10000,
	},
	centeredSlides: false,
	slidesPerView: 6,
    spaceBetween: 20,
	breakpoints: {
		480: {
			slidesPerView: 1,
			spaceBetween: 0,
			centeredSlides: true,
		},
		939: {
			slidesPerView: 2,
			centeredSlides: false,
			spaceBetween: 20
		},
		1259: {
			slidesPerView: 3
		},
		1579: {
			slidesPerView: 4
		},
		1899: {
			slidesPerView: 5
		},
	}
});

var mainSliderContent = new Swiper('.main-slider-content', {
	speed: 300,
	autoplay: {
		delay: 15000,
	},
	/*loop: true,*/
	navigation: {
		nextEl: '.main-slider .swiper-button-next',
		prevEl: '.main-slider .swiper-button-prev',
	},
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	on: {
		init: function () {
			$('.ms-thumb').eq(0).addClass('active');
		},
		slideChange: function () {
			$('.ms-thumb').removeClass('active');
			current_index = mainSliderContent.activeIndex;
			$('.ms-thumb').eq(current_index).addClass('active');
		}
	}
});

$(document).on('click', '.ms-thumb', function(){
	mainSliderContent.slideTo($(this).index());
	return false;
});

/* FULLSCREEN SWIPER */
$(window).resize(function() {
	if ($('.main-slider-content').length > 0) {
        $('.main-slider-content').height($(window).height()).width($(window).width());
        $('.main-slider').height($(window).height());
        //Add reInit, because jQuery's resize event handler may occur earlier than Swiper's one
        mainSliderContent.update();
	}
	
	if ($('.gl-inner').length > 0) {
	    var screenWidth = getWidth();
	    adaptative_columns(screenWidth);
	}
});

//$(window).resize();

// document.querySelector('.ms-thumb').addEventListener('click', function (e) {
// 	e.preventDefault();
//
// 	console.log($(this).attr('data-id'));
//
// 	//mainSliderContent.slideToLoop(0);
// });


/*
//comments slider are hiding and instead of him showing the form
$('.leave-comment', '.comments-content').click(function() {
	//$(".comments-content").fadeOut(300);
	$(".comments-form").fadeIn(600);
	return false;
});

//comments slider are hiding and instead of him showing the form
$(".close-button", '.comments-form').click(function() {
	//$(".comments-content").fadeOut(300);
	$(".comments-form").fadeOut(600);
	return false;
});
*/

//scroll to top
$('.to-top').click(function(){
	$('html, body').animate({
		scrollTop : 0
	}, 800);
	return false;
});

//hover effect on consultation section
$(".consult-hover").mouseover(function() {
	if(!$(this).hasClass("active")){
		$(".consult-hover").removeClass("active");
		$(this).addClass("active");
	}
});

$('.menu-btn').click(function(){
    if ($('header nav').css('display') == 'none') {
        $('header nav').fadeIn().css('display', 'flex');
        $('body').addClass('stopScroll');
    } else {
        $('header nav').fadeOut();
        $('body').removeClass('stopScroll');
    }
});
