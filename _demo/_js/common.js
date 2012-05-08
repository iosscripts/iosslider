$(document).ready(function() {
	
	/*$('.default-slider').iosSlider({
		desktopClickDrag: true,
		navNextSelector: $('.default-slider .next'),
		navPrevSelector: $('.default-slider .prev')
	});
	
	$('.default-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.default-slider').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.snap-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.infinite-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.responsive-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		responsiveSlideWidth: false
	});
	
	$('.autoslide-slider1').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		autoSlide: true,
		startAtSlide: '2',
		scrollbar: true
	});
	
	$('.autoslide-slider2').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		autoSlide: true,
		startAtSlide: '2',
		scrollbar: true,
		navNextSelector: $('.autoslide-slider2 .next'),
		navPrevSelector: $('.autoslide-slider2 .prev')
	});
	
	$('.autoslide-slider2-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.autoslide-slider2').iosSlider('goToSlide', i + 1);
		});
	});*/
	
	$('.variable-width-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	/*$('.autoslide-slider3').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		autoSlide: true,
		autoSlideTransTimer: 0,
		navNextSelector: $('.autoslide-slider3 .next'),
		navPrevSelector: $('.autoslide-slider3 .prev')
	});
	
	$('.destroy-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		autoSlide: true,
		navNextSelector: $('.destroy-slider .next'),
		navPrevSelector: $('.destroy-slider .prev')
	});
	
	$('.destroy-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.destroy-slider-container .destInitBlock .dest').each(function(i) {
	
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider('destroy');
		});
	
	});
	
	$('.destroy-slider-container .destInitBlock .init').each(function(i) {
	
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider({
				desktopClickDrag: true,
				snapToChildren: true,
				infiniteSlider: true,
				autoSlide: true,
				navNextSelector: $('.destroy-slider .next'),
				navPrevSelector: $('.destroy-slider .prev')
			});
		});
	
	});
	
	$('.callback-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		navSlideSelector: $('.callback-slider .paging .box'),
		onSliderLoaded: callbackSliderLoadedChanged,
		onSlideChange: callbackSliderLoadedChanged,
		onSlideComplete: callbackSliderComplete
	});
	
	$('.callback-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.callback-slider').iosSlider('goToSlide', i + 1);
		});
	});*/
	
	setStage();
	
});

function callbackSliderLoadedChanged(args) {
	
	$(args.sliderObject).siblings('.paging').children('.box').removeClass('selected');
	$(args.sliderObject).siblings('.paging').children('.box:eq(' + args.currentSlideNumber + ')').addClass('selected');
	
}

function callbackSliderComplete(args) {
	
	console.log(args);
	
}

function animateSlideContent1Complete(args) {
	
	/* animation */
	$(args.sliderObject).find('.text1, .text2').attr('style', '');
	
	$(args.currentSlideObject).children('.text1').animate({
		right: '100px',
		opacity: 1
	}, 400, 'easeOutQuint');
	
	$(args.currentSlideObject).children('.text2').delay(200).animate({
		right: '50px',
		opacity: 1
	}, 400, 'easeOutQuint');
	
}

function animateSlideContent1Loaded(args) {
	
	/* animation */
	$(args.sliderObject).find('.text1, .text2').attr('style', '');
	
	$(args.currentSlideObject).children('.text1').animate({
		right: '100px',
		opacity: 1
	}, 400, 'easeOutQuint');
	
	$(args.currentSlideObject).children('.text2').delay(200).animate({
		right: '50px',
		opacity: 1
	}, 400, 'easeOutQuint');
	
	/* indicator */
	$(args.sliderObject).parent().find('.iosSlider1Buttons .button').removeClass('selected');
	$(args.sliderObject).parent().find('.iosSlider1Buttons .button:eq(' + args.currentSlideNumber + ')').addClass('selected');
	
}

function changeSlider(node, offset, height) {
	
	//change slide identifier
	$('.selectSliderBlock .item').removeClass('selected');
	$(node).addClass('selected');
	
	//change slider
	$('.sliders').animate({
		height: height + 'px'
	}, 500, 'easeOutQuint');
	
	$('.sliders .inner').animate({
		top: offset + 'px'
	}, 500, 'easeOutQuint');
	
}

function setStage() {
	
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var iPadWidth = 1024;
	var iPhoneWidth = 320;
	var imageRatio = 0.64;
	var isIPad = false;
	
	if(windowWidth >= iPadWidth) {
		isIPad = true;
	}
	
	//set copy block height
	for(var i = 0; i < $('.iPadLayout .contentBlock .slider .item .text .bottomBlock .copyBlockOuter').size(); i++) {
		
		var newHeight = $('.iPadLayout .contentBlock .slider .item .text .bottomBlock .copyBlockOuter:eq(' + i + ') .copyBlock:eq(0)').height();
		if($('.iPadLayout .contentBlock .slider .item .text .bottomBlock .copyBlockOuter:eq(' + i + ') .copyBlock:eq(1)').height() > newHeight) {
			newHeight = $('.iPadLayout .contentBlock .slider .item .text .bottomBlock .copyBlockOuter:eq(' + i + ') .copyBlock:eq(1)').height();
		}
		
		$('.iPadLayout .contentBlock .slider .item .text .bottomBlock .copyBlockOuter:eq(' + i + ')').css({
			height: (newHeight + 40) + 'px'
		});
		
		$('.iPadLayout .contentBlock .slider .item .text .bottomBlock .copyBlockOuter:eq(' + i + ') .copyBlock:eq(0), .iPadLayout .contentBlock .slider .item .text .bottomBlock .copyBlockOuter:eq(' + i + ') .copyBlock:eq(1)').css({
			height: newHeight + 'px'
		});
		
	}
	
	if(isIPad) {
	
		$('body').addClass('iPadLayout');

		$('.contentBlock').css({
			height: windowHeight - $('.navigationBlock .bottom').height()
		});
		
	}
	
	//set nav arrows offset
	var topOffset = ($('.contentBlock').height() - $('.previousItemBlock').height()) * 0.5;
		
	$('.previousItemBlock').css({
		top: topOffset + 'px',
		left: $('.previousItemBlock').width() * -1
	});
	
	$('.nextItemBlock').css({
		top: topOffset + 'px',
		right: $('.previousItemBlock').width() * -1
	});
	
	/*setTimeout(function() {
		goRight('.previousItemBlock');
		goLeft('.nextItemBlock');
	}, 1000);*/
	
}

function returnToOrigin(node) {
	
	//get style
	var left = parseInt($(node).css('left'));
	var offsetx = left * -1;
	var top = parseInt($(node).css('top'));
	var offsety = top * -1;
	
	styleIncrement++;
	var styleNum = styleIncrement;
	
	var lastSheet = document.styleSheets[document.styleSheets.length - 1];
	lastSheet.insertRule(".goReturn" + styleNum + " { -webkit-animation-name: goReturn" + styleNum + "; -webkit-animation-duration: .3s; }", lastSheet.cssRules.length);
	lastSheet.insertRule("@-webkit-keyframes goReturn" + styleNum + " { from { -webkit-transform: translate3d(0,0,0); -webkit-transition-timing-function: ease-out; } to { -webkit-transform: translate3d(" + offsetx + "px," + offsety + "px,0); -webkit-transition-timing-function: ease-in; } }", lastSheet.cssRules.length);
	
	$(node).addClass('goReturn' + styleNum);
	
	$(node).bind('webkitAnimationEnd', function(animationName) {	
		
		$(node).unbind();

		$(node).css({
			top: '0px',
			left: '0px',
			zIndex: '0'
		});
		
		$(node).removeClass('goReturn' + styleNum);

	});
	
}