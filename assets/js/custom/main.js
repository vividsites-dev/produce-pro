function getTransitionEndEventName() {
	var transitions = {
		"transition"      : "transitionend",
		"OTransition"     : "oTransitionEnd",
		"MozTransition"   : "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	 }
	let bodyStyle = document.body.style;
	for(let transition in transitions) {
		if(bodyStyle[transition] != undefined) {
			return transitions[transition];
		} 
	}
}

let transitionEndEventName = getTransitionEndEventName();

// toggle hamburger icon for mobile nav 
(function ($) {
	// allow user to press ESC to exit modal 
	$(document).keydown(function(e) {
		var code = e.keyCode || e.which;
		if (code == 27) $(".active").removeClass('active');
	});

	jQuery(document).on('gform_post_render', function(event, form_id, current_page){
		$('input, textarea').focus(function() {
			$(this).parents( '.gfield' ).addClass('gfield--active')
		});
		$('input, textarea').blur(function() {
			if ( $(this).val() === '' ) {
				$(this).parents( '.gfield' ).removeClass('gfield--active')
			} else {
				$(this).parents( '.gfield' ).removeClass('gfield_error')
			}
		});

		$('#submit_button_replacement').click( function(e) {
			e.preventDefault();
			$(this).parents('form').submit();
		});
	});
})
(jQuery, void 0);

let reloadPage;
let banner;
let shareButton;
let formModal;
let commendationsModal;
let commendationsSlider;
let promotionsModal;
let promotionsModalContent;
let loginModal;
let loginForm;
let welcomeModal;
let registerForm;
let welcome;
let welcomeBanner;
let navToggle;
let scrollDown;

if( document.body.classList.contains( 'explore-view' ) ) {
	window.onscroll = function () {
		scrollRotate();
	};
}

function scrollRotate() {
	let image = document.getElementById('system');
	const turn = window.pageYOffset/20;
	image.style.transform = 'rotate(-' + turn + 'deg)';
	navToggle.classList.remove('open');
	scrollDown.classList.add('invisible');
	if ( window.pageYOffset > 50 ) {
		welcome.style.opacity = ( 150 - window.pageYOffset ) / 100;
	} else {
		welcome.style.opacity = '';
	}
	if ( window.pageYOffset > 150 ) {
		welcome.style.display = 'none';
	} else {
		welcome.style.display = 'block';
	}
}

function checkForClass( el, className ) {
	if ( el.classList.contains( className ) ) {
		return true;
	} else {
		return false;
	}
}

document.addEventListener('DOMContentLoaded', function(event) {
	reloadPage = document.getElementById( 'reload_page' );
	welcomeBanner = document.getElementById( 'welcome_banner' );
	welcome = document.getElementById( 'welcome' );
	scrollDown = document.getElementById( 'scroll_down' );
	navToggle = document.getElementById( 'nav_toggle' );
	if( reloadPage ) {
		reloadPage.addEventListener( 'click', function(e) {
			e.preventDefault();
			welcome.parentNode.classList.add('hidden');
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			window.location.href = window.location.origin + '?initialized=true';
		} );
	}
	if( welcomeBanner ) {
		welcomeBanner.addEventListener( transitionEndEventName, function(e) {
			if ( e.propertyName === 'transform' ) {
				e.target.classList.add( 'banner--loaded' );
			}
		} );
	}



	var animationRadii = document.querySelectorAll( '.animation-radius__inner' );
	for ( var i = 0; i < animationRadii.length; i++ ) {
		const radius = animationRadii[i];
		radius.addEventListener( transitionEndEventName, function(e) {
			if ( e.propertyName === 'transform' ) {
				if ( checkForClass( radius, 'animation-radius__inner--removed' ) ) {
					radius.classList.add('animationHidden');
					radius.classList.remove( 'animation-radius__inner--removed' );
					setTimeout( function() {
						radius.classList.remove( 'animationHidden' );
					}, 3000 );
				}
			}
		} );
	}

	var animations = document.querySelectorAll( '.animation' );
	for ( var i = 0; i < animations.length; i++ ) {
		const animation = animations[i];
		animation.addEventListener( transitionEndEventName, function(e) {
			if ( e.propertyName === 'transform' ) {
				if ( checkForClass( animation, 'animation--away' ) ) {
					animation.classList.add('animationHidden');
					animation.classList.remove( 'animation--away' );
					setTimeout( function() {
						animation.classList.remove( 'animationHidden' );
					}, 3000 );
				}
			}
		} );
	}
} );

var myLottieFile;

window.addEventListener('load', function(event) {
	document.body.classList.add('initialized');

	// var player = document.getElementById('svgContainer');
	const players = document.querySelectorAll("lottie-player");
	for ( var i = 0; i < players.length; i++ ) {
		var path = players[i].getAttribute( 'data-lottie' );
		players[i].load(path);
	}
});

(function ($, root, undefined) {
	$(function () {
	'use strict';
		$('.language-picker:not(.language--active)').click( function(e) {
			e.preventDefault();
			// var lang = ( simpleGetCookie( 'wordpress_mccarthy_language' ) === 'es' ? 'en' : 'es' );
			const lang = ( $(this).attr( 'data-language' ) === 'esp' ? 'es' : 'en' );
			document.cookie = 'wordpress_mccarthy_language=' + lang + ';path=/;max-age=' + 60*60*24*30 + ';';
			location.reload();
		} );

		$('#language_picker_toggle').click( function(e) {
			e.preventDefault();
			if ( this.classList.contains( 'open' ) ) {
				this.classList.remove( 'open' );
				this.parentNode.setAttribute( 'data-active', '' );
			} else {
				document.getElementById( 'nav_toggle' ).classList.remove( 'open' );
				this.classList.add( 'open' );
				this.parentNode.setAttribute( 'data-active', 'languages' );
			}
		} );

		function toggleCommendationLike( trigger, resolve ) {
			const post_id = $(trigger).attr( 'data-id' );
			const action = ( $(trigger).hasClass( 'commendation__heart--liked' ) ? 'remove' : 'add' );
			let post_likes = simpleGetCookie( 'mccarthy_post_likes' );
			$.post('/wp-json/mccarthy/v1/toggle-commendation-like', {
				id: post_id,
				action: action
			}, function ( data, status ) {
				if( status === 'success' ) {
					$(trigger).toggleClass( 'commendation__heart--liked' );
					if( post_likes ) {
						post_likes = JSON.parse( post_likes );
					} else {
						post_likes = [];
					}
					if( action === 'add' ) {
						$(trigger).attr( 'data-likes', parseInt( $(trigger).attr( 'data-likes' ) ) + 1 );
						if( ! post_likes.includes( post_id ) ) {
							post_likes.push( post_id );
						}
					} else {
						$(trigger).attr( 'data-likes', parseInt( $(trigger).attr( 'data-likes' ) ) - 1 );
						if( post_likes.includes( post_id ) ) {
							const index_to_remove = post_likes.findIndex( function( el ) {
								return ( el === post_id );
							} );
							post_likes.splice( index_to_remove, 1 );
						}
					}
					simpleSetCookie( 'mccarthy_post_likes', JSON.stringify( post_likes ), 30, '/' );
				}
			});
		};

		// DOM ready, take it away
		$(document).on('ready', function() {
			shareButton = $('#share_button');
			formModal = $('#form_modal');
			commendationsModal = $('#commendations_modal');
			commendationsSlider = $('#commendations_slider');
			promotionsModal = $('#promotions_modal');
			promotionsModalContent = promotionsModal.find('.modal__text');
			welcomeModal = $('#welcome_modal');

			if ( $( window ).width() >= 960 ) {
				$('#nav_toggle').addClass( 'open' ).parent('.header__wrapper').attr( 'data-active', 'menu' );
			}

			if ( $( 'body' ).hasClass( 'new-user' ) ) {
				setTimeout( function() {
					$('html').addClass( 'modal-open' );
					welcomeModal.removeClass('hidden');
				}, 5000 );
			}

			const urlSearchParameters = ( document.location.search ? new URLSearchParams( document.location.search ) : false );
			if (urlSearchParameters && urlSearchParameters.get( 'p' ) && urlSearchParameters.get( 'liked' ) ) {
				const heart = $( '#commendation_like_' + urlSearchParameters.get( 'p' ) );
				if ( ! $(heart).hasClass( 'commendation__heart--liked' ) ) {
					toggleCommendationLike( heart );
				}
			}
			
			commendationsSlider.on( 'init', function() {
				if( commendationsModal.hasClass( 'openOnLoad' ) ) {
					$('html').addClass( 'modal-open' );
					commendationsModal.removeClass( 'hidden' );
				}
			} );

			$( commendationsSlider ).slick({
				adaptiveHeight: true,
			})

			if( window.location.hash === '#share' ) {
				$('html').addClass( 'modal-open' );
				formModal.removeClass( 'hidden' );
			}

			$('#nav_toggle').click( function(e) {
				e.preventDefault();
				if ( this.classList.contains( 'open' ) ) {
					this.classList.remove( 'open' );
					this.parentNode.setAttribute( 'data-active', '' );
				} else {
					document.getElementById( 'language_picker_toggle' ).classList.remove( 'open' );
					this.classList.add( 'open' );
					this.parentNode.setAttribute( 'data-active', 'menu' );
				}
			} );

			$(shareButton).on( 'click', function(e) {
				e.preventDefault();
				if( $(this).hasClass( 'used' ) ) {
					window.location.hash = 'share';
					window.location.href = window.location.origin + '?initialized=true#share';
				} else {
					$('html').addClass( 'modal-open' );
					formModal.removeClass( 'hidden' );
				}
			} );
			
			$('.cloud').on( 'click', function(e) {
				e.preventDefault();
				var index = $(this).attr('data-index');
				$( commendationsSlider ).slick( 'slickSetOption', 'speed', 0 ).slick( 'slickGoTo', index ).slick( 'slickSetOption', 'speed', 300 );
				$('html').addClass( 'modal-open' );
				commendationsModal.removeClass( 'hidden' );
			} );

			$('.animation').on( 'click', function(e) {
				e.preventDefault();
				if( $(this).hasClass('animate-on-click') ) {
					const radius = $(this).closest('.animation-radius__inner');
					radius.addClass( 'animation-radius__inner--removed' );
				}
				if( $(this).hasClass('modal-on-click') ) {
					const json = $(this).attr('data-modal'); 
					promotionsModalContent.html( JSON.parse( json ) );
					promotionsModal.removeClass( 'hidden' );
				}
			} );
			
			$('.modal__close').on( 'click', function(e) {
				e.preventDefault();
				if( window.location.hash !== '' ) {
					window.location.hash = '';
				}
				const modal = $(this).parents('.modal');
				modal.addClass('hidden');
				// if( modal[0] === loginModal[0] ) {
				// 	$('html').removeClass( 'login-open' );
				// } else {
				// }
				$('html').removeClass( 'modal-open' );
				if( modal[0] === welcomeModal[0] ) {
					document.cookie = 'mccarthy_return_user=true;path=/;max-age=' + 60*60*24*30 + ';';
				}
			} );

			$(document).on( 'click', '.commendation__heart', function(e) {
				e.preventDefault();
				toggleCommendationLike( this );
			} );

			$( 'input[name="instruction_language"]' ).change( function() {
				const instructions_english = document.getElementById( 'instructions_english' );
				const instructions_spanish = document.getElementById( 'instructions_spanish' );
				const modal_text = instructions_english.parentNode;
				if ( this.value === 'spanish' ) {
					$( instructions_english ).slideUp();
					$( instructions_spanish ).slideDown();
				} else {
					$( instructions_spanish ).slideUp();
					$( instructions_english ).slideDown();
				}
			} );
		});

		$(document).on('gform_confirmation_loaded', function(){
			shareButton.addClass('used');
			var adjustedTitle = $('#mule').attr('data-share_post_title');
			if( adjustedTitle ) {
				$('title').text( adjustedTitle );
				$('meta[property="og:title"]').attr('content', adjustedTitle );
			}
		});
	});
})(jQuery, this);

