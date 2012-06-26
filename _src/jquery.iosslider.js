/*
 * iosSlider - http://iosscripts.com/iosslider-jquery-horizontal-slider-for-iphone-ipad-safari/
 * 
 * A jQuery Horizontal Slider for iPhone/iPad Safari (Beta) 
 * This plugin turns any wide element into a touch enabled horizontal slider.
 * 
 * Copyright (c) 2012 Marc Whitbread
 * 
 * Version: v0.9.4.7 beta (06/25/2012)
 * Requires: jQuery v1.3+
 *
 * My Rules:
 *
 * 1) You may use iosSlider freely, without restriction in any material intended for sale 
 *    or distribution. Attribution is not required but always appreciated.
 * 2) You are not permitted to make the resources found on iosscripts.com available for 
 *    distribution elsewhere "as is" without prior consent. If you would like to feature 
 *    iosSlider on your site, please do not link directly to the resource zip files. Please 
 *    link to the appropriate page on iosscripts.com where users can find the download.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

;(function($) {
	
	/* global variables */
	var scrollbarNumber = 0;
	var sliderMin = 0;
	var xScrollDistance = 0;
	var yScrollDistance = 0;
	var scrollIntervalTime = 10;
	var scrollbarDistance = 0;
	var isTouch = 'ontouchstart' in window;
	var supportsOrientationChange = 'onorientationchange' in window;
	var isWebkit = false;
	var isIe7 = false;
	var isIe8 = false;
	var isIe9 = false;
	var isIe = false;
	var isGecko = false;
	var grabOutCursor = 'pointer';
	var grabInCursor = 'pointer';
	var onChangeEventLastFired = new Array();
	var autoSlideTimeouts = new Array();
	var iosSliders = new Array();
	var iosSliderSettings = new Array();
	var isEventCleared = new Array();
	var slideTimeouts = new Array();
	var activeChildOffsets = new Array();
	
	/* private functions */
	var helpers = {
    
        showScrollbar: function(settings, scrollbarClass) {
			
			if(settings.scrollbarHide) {
				$('.' + scrollbarClass).css({
					opacity: settings.scrollbarOpacity,
					filter: 'alpha(opacity:' + (settings.scrollbarOpacity * 100) + ')'
				});
			}
			
		},
		
		hideScrollbar: function(settings, scrollTimeouts, j, distanceOffsetArray, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder) {
			
			if(settings.scrollbar && settings.scrollbarHide) {
				
				for(var i = j; i < j+25; i++) {
					
					scrollTimeouts[scrollTimeouts.length] = helpers.hideScrollbarIntervalTimer(scrollIntervalTime * i, distanceOffsetArray[j], ((j + 24) - i) / 24, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, settings);
					
				}
			
			}
			
		},
		
		hideScrollbarInterval: function(newOffset, opacity, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, settings) {
			
			scrollbarDistance = (newOffset * -1) / (sliderMax) * (stageWidth - scrollMargin - scrollBorder - scrollbarWidth);
			
			helpers.setSliderOffset('.' + scrollbarClass, scrollbarDistance);
			
			$('.' + scrollbarClass).css({
				opacity: settings.scrollbarOpacity * opacity,
				filter: 'alpha(opacity:' + (settings.scrollbarOpacity * opacity * 100) + ')'
			});
			
		},
		
		slowScrollHorizontalInterval: function(node, newOffset, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, activeChildOffset, childrenOffsets, infiniteSliderWidth, infiniteSliderOffset, numberOfSlides, sliderNumber, settings) {
	
			newChildOffset = helpers.calcActiveOffset(settings, newOffset, 0, childrenOffsets, sliderMax, stageWidth, infiniteSliderOffset, activeChildOffset);
			if(newChildOffset != activeChildOffsets[sliderNumber]) {
				activeChildOffsets[sliderNumber] = newChildOffset;
				settings.onSlideChange(new helpers.args(settings, node, $(node).children(':eq(' + activeChildOffset + ')'), activeChildOffset%infiniteSliderOffset));
			}
						
			newOffset = Math.floor(newOffset);
			
			helpers.setSliderOffset(node, newOffset);

			if(settings.scrollbar) {
				
				scrollbarDistance = Math.floor((newOffset * -1) / (sliderMax) * (scrollbarStageWidth - scrollMargin - scrollbarWidth));
				var width = scrollbarWidth - scrollBorder;
				
				if(newOffset >= sliderMin) {
					
					width = scrollbarWidth - scrollBorder - (scrollbarDistance * -1);
					
					helpers.setSliderOffset($('.' + scrollbarClass), 0);
					
					$('.' + scrollbarClass).css({
						width: width + 'px'
					});
				
				} else if(newOffset <= ((sliderMax * -1) + 1)) {
					
					width = scrollbarStageWidth - scrollMargin - scrollBorder - scrollbarDistance;
					
					helpers.setSliderOffset($('.' + scrollbarClass), scrollbarDistance);
					
					$('.' + scrollbarClass).css({
						width: width + 'px'
					});
					
				} else {
					
					helpers.setSliderOffset($('.' + scrollbarClass), scrollbarDistance);
					
					$('.' + scrollbarClass).css({
						width: width + 'px'
					});
				
				}
				
			}
			
		},
		
		slowScrollHorizontal: function(node, scrollTimeouts, sliderMax, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings) {
			
			var distanceOffsetArray = new Array();
			var nodeOffset = helpers.getSliderOffset(node, 'x');
			var snapDirection = 0;
			var maxSlideVelocity = 25 / 1024 * stageWidth;
			var changeSlideFired = false;
			frictionCoefficient = settings.frictionCoefficient;
			elasticFrictionCoefficient = settings.elasticFrictionCoefficient;
			snapFrictionCoefficient = settings.snapFrictionCoefficient;
			snapToChildren = settings.snapToChildren;
				
			if((xScrollDistance > 5) && snapToChildren) {
				snapDirection = 1;
			} else if((xScrollDistance < -5) && snapToChildren) {
				snapDirection = -1;
			}
			
			if(xScrollDistance < (maxSlideVelocity * -1)) {
				xScrollDistance = maxSlideVelocity * -1;
			} else if(xScrollDistance > maxSlideVelocity) {
				xScrollDistance = maxSlideVelocity;
			}
			
			var testNodeOffsets = helpers.getAnimationSteps(settings, xScrollDistance, nodeOffset, sliderMax, sliderMin, childrenOffsets);
			var newChildOffset = helpers.calcActiveOffset(settings, testNodeOffsets[testNodeOffsets.length-1], snapDirection, childrenOffsets, sliderMax, stageWidth, infiniteSliderOffset, activeChildOffsets[sliderNumber]);
			
			if(settings.infiniteSlider) {
	
				if(childrenOffsets[newChildOffset] > (childrenOffsets[numberOfSlides + 1] + stageWidth)) {
					newChildOffset = newChildOffset + numberOfSlides;
				}
				
				if(childrenOffsets[newChildOffset] < (childrenOffsets[(numberOfSlides * 2 - 1)] - stageWidth)) {
					newChildOffset = newChildOffset - numberOfSlides;
				}
				
			}
			
			if(((testNodeOffsets[testNodeOffsets.length-1] < childrenOffsets[newChildOffset]) && (snapDirection < 0)) || ((testNodeOffsets[testNodeOffsets.length-1] > childrenOffsets[newChildOffset]) && (snapDirection > 0)) || (!snapToChildren)) {
				
				while((xScrollDistance > 1) || (xScrollDistance < -1)) {
			
					xScrollDistance = xScrollDistance * frictionCoefficient;
					nodeOffset = nodeOffset + xScrollDistance;
					
					if((nodeOffset > sliderMin) || (nodeOffset < (sliderMax * -1))) {
						xScrollDistance = xScrollDistance * elasticFrictionCoefficient;
						nodeOffset = nodeOffset + xScrollDistance;
					}
					
					distanceOffsetArray[distanceOffsetArray.length] = nodeOffset;
			
				}
				
			}
			
			if(snapToChildren || (nodeOffset > sliderMin) || (nodeOffset < (sliderMax * -1))) {
	
				while((nodeOffset < (childrenOffsets[newChildOffset] - 0.5)) || (nodeOffset > (childrenOffsets[newChildOffset] + 0.5))) {
					
					nodeOffset = ((nodeOffset - (childrenOffsets[newChildOffset])) * snapFrictionCoefficient) + (childrenOffsets[newChildOffset]);
					distanceOffsetArray[distanceOffsetArray.length] = nodeOffset;
					
				}
				
				distanceOffsetArray[distanceOffsetArray.length] = childrenOffsets[newChildOffset];
	
			}
			
			var jStart = 1;
			if((distanceOffsetArray.length%2) != 0) {
				jStart = 0;
			}
			
			var lastTimeoutRegistered = 0;
			var count = 0;
			
			if(settings.infiniteSlider) {
				newChildOffset = (newChildOffset%numberOfSlides) + numberOfSlides;
			}
			
			for(var j = 0; j < scrollTimeouts.length; j++) {
				clearTimeout(scrollTimeouts[j]);
			}
			
			for(var j = jStart; j < distanceOffsetArray.length; j = j + 2) {
				
				if(settings.infiniteSlider) {
					if(distanceOffsetArray[j] < (childrenOffsets[(numberOfSlides * 2)] + stageWidth)) {
						distanceOffsetArray[j] = distanceOffsetArray[j] - (childrenOffsets[numberOfSlides]);
					}
				}
					
				scrollTimeouts[scrollTimeouts.length] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * j, node, distanceOffsetArray[j], sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, newChildOffset, childrenOffsets, infiniteSliderWidth, infiniteSliderOffset, numberOfSlides, sliderNumber, settings);
				
			}
			
			scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (j + 1), settings, node, $(node).children(':eq(' + newChildOffset + ')'), newChildOffset%infiniteSliderOffset, sliderNumber);
			
			slideTimeouts[sliderNumber] = scrollTimeouts;
			
			helpers.hideScrollbar(settings, scrollTimeouts, j, distanceOffsetArray, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder);
				
		},
		
		onSlideComplete: function(settings, node, slideNode, newChildOffset, sliderNumber) {
			
			if(onChangeEventLastFired[sliderNumber] != newChildOffset) {
			
				settings.onSlideComplete(new helpers.args(settings, $(node), slideNode, newChildOffset));
			
			}
			
			onChangeEventLastFired[sliderNumber] = newChildOffset;
		
		},
		
		getSliderOffset: function(node, xy) {
			
			var sliderOffset = 0;
			if(xy == 'x') {
				xy = 4;
			} else {
				xy = 5;
			}
			
			if(isTouch || isWebkit) {
			
				var webkitTransformArray = $(node).css('-webkit-transform').split(',');
				sliderOffset = parseInt(webkitTransformArray[xy], 10);
				
			} else {
			
				sliderOffset = parseInt($(node).css('left'), 10);
			
			}
			
			return sliderOffset;
		
		},
		
		setSliderOffset: function(node, sliderOffset) {
			
			if(isTouch || isWebkit) {
			
				$(node).css({
					webkitTransform: 'translateX(' + sliderOffset + 'px)'
				});
			
			} else {
			
				$(node).css({
					left: sliderOffset + 'px'
				});
			
			}
						
		},
		
		setBrowserInfo: function() {
			
			if(navigator.userAgent.match('WebKit') != null) {
				isWebkit = true;
				grabOutCursor = '-webkit-grab';
				grabInCursor = '-webkit-grabbing';
			} else if(navigator.userAgent.match('Gecko') != null) {
				isGecko = true;
				grabOutCursor = 'move';
				grabInCursor = '-moz-grabbing';
			} else if(navigator.userAgent.match('MSIE 7') != null) {
				isIe7 = true;
				isIe = true;
			} else if(navigator.userAgent.match('MSIE 8') != null) {
				isIe8 = true;
				isIe = true;
			} else if(navigator.userAgent.match('MSIE 9') != null) {
				isIe9 = true;
				isIe = true;
			}
			
		},
		
		getAnimationSteps: function(settings, xScrollDistance, nodeOffset, sliderMax, sliderMin, childrenOffsets) {
			
			var offsets = new Array();
			
			if((xScrollDistance <= 1) && (xScrollDistance >= 0)) {
			
				xScrollDistance = -2;
			
			} else if((xScrollDistance >= -1) && (xScrollDistance <= 0)) {
			
				xScrollDistance = 2;
			
			}
			
			while((xScrollDistance > 1) || (xScrollDistance < -1)) {
				
				xScrollDistance = xScrollDistance * settings.frictionCoefficient;
				nodeOffset = nodeOffset + xScrollDistance;
				
				if((nodeOffset > sliderMin) || (nodeOffset < (sliderMax * -1))) {
					xScrollDistance = xScrollDistance * settings.elasticFrictionCoefficient;
					nodeOffset = nodeOffset + xScrollDistance;
				}
				
				offsets[offsets.length] = nodeOffset;
		
			}
			
			activeChildOffset = 0;
			
			return offsets;
			
		},

        calcActiveOffset: function(settings, offset, snapDirection, childrenOffsets, sliderMax, stageWidth, infiniteSliderOffset, activeChildOffset) {
			
			var isFirst = false;
			var arrayOfOffsets = new Array();
			var newChildOffset;
			
			for(var i = 0; i < childrenOffsets.length; i++) {
				
				if((childrenOffsets[i] <= offset) && (childrenOffsets[i] > (offset - stageWidth))) {
					
					if(!isFirst && (childrenOffsets[i] != offset)) {
						
						arrayOfOffsets[arrayOfOffsets.length] = childrenOffsets[i-1];
						
					}
					
					arrayOfOffsets[arrayOfOffsets.length] = childrenOffsets[i];
					
					isFirst = true;
						
				}
			
			}
			
			if(arrayOfOffsets.length == 0) {
				arrayOfOffsets[0] = childrenOffsets[childrenOffsets.length - 1];
			}
			
			var distance = stageWidth;
			var closestChildOffset = 0;
			
			for(var i = 0; i < arrayOfOffsets.length; i++) {
				
				var newDistance = Math.abs(offset - arrayOfOffsets[i]);
				
				if(newDistance < distance) {
					closestChildOffset = arrayOfOffsets[i];
					distance = newDistance;
				}
				
			}
			
			for(var i = 0; i < childrenOffsets.length; i++) {
				
				if(closestChildOffset == childrenOffsets[i]) {
					
					newChildOffset = i;
					
				}
				
			}
			
			if((snapDirection < 0) && (newChildOffset%infiniteSliderOffset == activeChildOffset%infiniteSliderOffset)) {
				
				newChildOffset = activeChildOffset + 1;
			
				if(newChildOffset >= childrenOffsets.length) newChildOffset = childrenOffsets.length - 1;
				
			} else if((snapDirection > 0) && (newChildOffset%infiniteSliderOffset == activeChildOffset%infiniteSliderOffset)) {
				
				newChildOffset = activeChildOffset - 1;
				
				if(newChildOffset < 0) newChildOffset = 0;
				
			}
			
			return newChildOffset;
		
		},
		
		changeSlide: function(slide, node, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, scrollbarNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings) {
			
			helpers.autoSlidePause(scrollbarNumber);
			
			for(var j = 0; j < scrollTimeouts.length; j++) {
				clearTimeout(scrollTimeouts[j]);
			}
			
			var steps = Math.ceil(settings.autoSlideTransTimer / 10) + 1;
			var startOffset = helpers.getSliderOffset(node, 'x');
			if(settings.infiniteSlider) {
				if((startOffset > (childrenOffsets[numberOfSlides + 1] + stageWidth)) && (slide == (numberOfSlides * 2 - 2))) {
					startOffset = startOffset - infiniteSliderWidth;
				}
			}
			var endOffset = childrenOffsets[slide];
			var offsetDiff = endOffset - startOffset;
			var stepArray = new Array();
			var t;
			var nextStep;
			
			helpers.showScrollbar(settings, scrollbarClass);

			for(var i = 0; i <= steps; i++) {

				t = i;
				t /= steps;
				t--;
				nextStep = startOffset + offsetDiff*(Math.pow(t,5) + 1);
				
				if(settings.infiniteSlider) {
					
					if(nextStep > (childrenOffsets[numberOfSlides + 1] + stageWidth)) {
						nextStep = nextStep - infiniteSliderWidth;
					}
					
					if(nextStep < (childrenOffsets[numberOfSlides * 2 - 1] - stageWidth)) {
						nextStep = nextStep + infiniteSliderWidth;
					}
				
				}
				
				stepArray[stepArray.length] = nextStep;
				
			}
			
			if(settings.infiniteSlider) {
				slide = (slide%numberOfSlides) + numberOfSlides;
			} 
			
			for(var i = 0; i < stepArray.length; i++) {
				
				if(settings.infiniteSlider) {
					if(stepArray[i] < (childrenOffsets[(numberOfSlides * 2)] + stageWidth)) {
						stepArray[i] = stepArray[i] - (childrenOffsets[numberOfSlides]);
					}
				}
				
				scrollTimeouts[i] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * (i + 1), node, stepArray[i], sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, childrenOffsets, infiniteSliderWidth, infiniteSliderOffset, numberOfSlides, scrollbarNumber, settings);
					
			}

			if(offsetDiff != 0) {
				scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (i + 1), settings, node, $(node).children(':eq(' + slide + ')'), slide%infiniteSliderOffset, scrollbarNumber);
			}
			
			slideTimeouts[scrollbarNumber] = scrollTimeouts;
			
			helpers.hideScrollbar(settings, scrollTimeouts, i, stepArray, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder);
			
			helpers.autoSlide(node, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, scrollbarNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);

			return slide;
			
		},
		
		autoSlide: function(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings) {
			
			if(!settings.autoSlide) return false;
			
			helpers.autoSlidePause(sliderNumber);

			autoSlideTimeouts[sliderNumber] = setTimeout(function() {
				
				if(!settings.infiniteSlider && (activeChildOffsets[sliderNumber] > childrenOffsets.length-1)) {
					activeChildOffsets[sliderNumber] = activeChildOffsets[sliderNumber] - numberOfSlides;
				}
				
				var nextSlide = settings.infiniteSlider ? activeChildOffsets[sliderNumber] + 1 : (activeChildOffsets[sliderNumber] + 1) % numberOfSlides;
				activeChildOffsets[sliderNumber] = helpers.changeSlide(nextSlide, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
				
				helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
				
			}, settings.autoSlideTimer + settings.autoSlideTransTimer);
			
		},
		
		autoSlidePause: function(sliderNumber) {
			
			clearTimeout(autoSlideTimeouts[sliderNumber]);

		},
		
		/* timers */
		slowScrollHorizontalIntervalTimer: function(scrollIntervalTime, node, step, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, childrenOffsets, infiniteSliderWidth, infiniteSliderOffset, numberOfSlides, sliderNumber, settings) {
		
			var scrollTimeout = setTimeout(function() {
				helpers.slowScrollHorizontalInterval(node, step, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, childrenOffsets, infiniteSliderWidth, infiniteSliderOffset, numberOfSlides, sliderNumber, settings);
			}, scrollIntervalTime);
			
			return scrollTimeout;
		
		},
		
		onSlideCompleteTimer: function(scrollIntervalTime, settings, node, slideNode, slide, scrollbarNumber) {
			
			var scrollTimeout = setTimeout(function() {
				helpers.onSlideComplete(settings, node, slideNode, slide, scrollbarNumber);
			}, scrollIntervalTime);
			
			return scrollTimeout;
		
		},
		
		hideScrollbarIntervalTimer: function(scrollIntervalTime, newOffset, opacity, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, settings) {
		
			var scrollTimeout = setTimeout(function() {
				helpers.hideScrollbarInterval(newOffset, opacity, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, settings);
			}, scrollIntervalTime);
		
			return scrollTimeout;
		
		},
						
		args: function(settings, node, activeSlideNode, newChildOffset) {
			this.settings = settings;
			this.sliderObject = node;
			this.currentSlideObject = activeSlideNode;
			this.currentSlideNumber = newChildOffset;
		},
		
		preventDrag: function(event) {
			event.preventDefault();
		},
		
		preventClick: function(event) {
			event.stopImmediatePropagation();
			return false;
		},
		
		enableClick: function() {
			return true;
		}
        
    }
    
    helpers.setBrowserInfo();
    
    var methods = {
		
		init: function(options) {
			
			var settings = $.extend({
				'elasticPullResistance': 0.6, 		
				'frictionCoefficient': 0.92,
				'elasticFrictionCoefficient': 0.6,
				'snapFrictionCoefficient': 0.92,
				'snapToChildren': false,
				'startAtSlide': 1,
				'scrollbar': false,
				'scrollbarHide': true,
				'scrollbarLocation': 'top',
				'scrollbarContainer': '',
				'scrollbarOpacity': 0.4,
				'scrollbarHeight': '4px',
				'scrollbarBorder': '0',
				'scrollbarMargin': '5px',
				'scrollbarBackground': '#000',
				'scrollbarBorderRadius': '100px',
				'scrollbarShadow': '0 0 0 #000',
				'desktopClickDrag': false,
				'responsiveSlideWidth': true,
				'navSlideSelector': '',
				'navPrevSelector': '',
				'navNextSelector': '',
				'autoSlideToggleSelector': '',
				'autoSlide': false,
				'autoSlideTimer': 5000,
				'autoSlideTransTimer': 750,
				'infiniteSlider': false,
				'onSliderLoaded': function() {},
				'onSlideChange': function() {},
				'onSlideComplete': function() {}
			}, options);
			
			return this.each(function(i) {
				
				scrollbarNumber++;
				var sliderNumber = scrollbarNumber;
				var scrollTimeouts = new Array();
				iosSliderSettings[sliderNumber] = settings;
				var sliderMax;
				var minTouchpoints = 0;
				var xCurrentScrollRate = new Array(0, 0);
				var yCurrentScrollRate = new Array(0, 0);
				var scrollbarBlockClass = 'scrollbarBlock' + scrollbarNumber;
				var scrollbarClass = 'scrollbar' + scrollbarNumber;
				var scrollbarStageWidth;
				var scrollbarWidth;
				var containerWidth;
				var containerHeight;
				var stageNode = $(this);
				var stageWidth;
				var stageHeight;
				var slideWidth;
				var scrollMargin;
				var scrollBorder;
				var lastTouch;
				activeChildOffsets[sliderNumber] = settings.startAtSlide-1;
				var newChildOffset = -1;
				var webkitTransformArray = new Array();
				var childrenOffsets;
				var scrollbarStartOpacity = 0;
				var xScrollStartPosition = 0;
				var yScrollStartPosition = 0;
				var currentTouches = 0;
				var scrollerNode = $(this).children(':first-child');
				var slideNodes;
				var numberOfSlides = $(scrollerNode).children().size();
				var xScrollStarted = false;
				var lastChildOffset = 0;
				var isMouseDown = false;
				var currentSlider = undefined;
				var sliderStopLocation = 0;
				var infiniteSliderWidth;
				var infiniteSliderOffset = numberOfSlides;
				var isFirstInit = true;
				onChangeEventLastFired[sliderNumber] = -1;
				var isAutoSlideToggleOn = false;
				iosSliders[sliderNumber] = stageNode;
				isEventCleared[sliderNumber] = false;
				var intermediateChildOffset = -1;
				slideTimeouts[sliderNumber] = new Array();
				var $this = $(this);
				var data = $this.data('iosslider');	
				if(data != undefined) return true;
           
				if(settings.infiniteSlider) {
		
					settings.scrollbar = false;
					$(scrollerNode).children().clone(true, true).prependTo(scrollerNode).clone(true, true).appendTo(scrollerNode);
					infiniteSliderOffset = numberOfSlides;
					
				}
				
				slideNodes = $(scrollerNode).children();
						
				if(settings.scrollbar) {
					
					if(settings.scrollbarContainer != '') {
						$(settings.scrollbarContainer).append("<div class = '" + scrollbarBlockClass + "'><div class = '" + scrollbarClass + "'></div></div>");
					} else {
						$(scrollerNode).parent().append("<div class = '" + scrollbarBlockClass + "'><div class = '" + scrollbarClass + "'></div></div>");
					}
				
				}
				
				if(!init()) return true;
				
				if(settings.infiniteSlider) {
					
					activeChildOffsets[sliderNumber] = activeChildOffsets[sliderNumber] + infiniteSliderOffset;
					helpers.setSliderOffset(scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]);
					
				}
				
				$(this).find('a').bind('mousedown', helpers.preventDrag);
				$(this).find("[onclick]").bind('click', helpers.preventDrag).each(function() {
					
					$(this).data('onclick', this.onclick);
				
				});
						
				settings.onSliderLoaded(new helpers.args(settings, scrollerNode, $(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')'), activeChildOffsets[sliderNumber]%infiniteSliderOffset));
				
				onChangeEventLastFired[sliderNumber] = activeChildOffsets[sliderNumber]%infiniteSliderOffset;
				
				function init() {
					
					helpers.autoSlidePause(sliderNumber);
					
					$(stageNode).css('width', '');
					$(stageNode).css('height', '');
					$(slideNodes).css('width', '');
					
					sliderMax = 0;
					childrenOffsets = new Array();
					containerWidth = $(stageNode).parent().width();
					stageWidth = $(stageNode).outerWidth(true);
					
					if(settings.responsiveSlideWidth) {
						stageWidth = ($(stageNode).outerWidth(true) > containerWidth) ? containerWidth : $(stageNode).outerWidth(true);
					}
					
					$(stageNode).css({
						position: 'relative',
						top: '0',
						left: '0',
						overflow: 'hidden',
						zIndex: 1,
						width: stageWidth
					});
					
					if(settings.responsiveSlideWidth) {
						
						$(slideNodes).each(function(j) {
							
							var thisSlideWidth = $(this).outerWidth(true);

							if(thisSlideWidth > stageWidth) {
								
								thisSlideWidth = stageWidth + ($(this).outerWidth(true) - $(this).width()) * -1;
							
							} else {
								
								thisSlideWidth = $(this).width();
								
							}
							
							$(this).css({
								width: thisSlideWidth
							});
						
						});
					
					}
	
					$(scrollerNode).children().each(function(j) {
						
						$(this).css({
							'float': 'left'
						});
						
						childrenOffsets[j] = sliderMax * -1;
						
						sliderMax = sliderMax + $(this).outerWidth(true);
						
					});
					
					for(var i = 0; i < childrenOffsets.length; i++) {
						
						if(childrenOffsets[i] <= ((sliderMax - stageWidth) * -1)) {
							break;
						}
						
						lastChildOffset = i;
						
					}
					
					childrenOffsets.splice(lastChildOffset + 1, childrenOffsets.length);
		
					childrenOffsets[childrenOffsets.length] = (sliderMax - stageWidth) * -1;
					
					sliderMax = sliderMax - stageWidth;
					
					$(scrollerNode).css({
						'webkitPerspective': 1000,
						'webkitBackfaceVisibility': 'hidden',
						position: 'relative',
						cursor: grabOutCursor,
						width: sliderMax + stageWidth + 'px',
						overflow: 'hidden'
					});
					
					containerHeight = $(stageNode).parent().height();
					stageHeight = $(stageNode).height();
					
					if(settings.responsiveSlideWidth) {
						stageHeight = ($(stageNode).height() > containerHeight) ? containerHeight : $(stageNode).height();
					}
					
					$(stageNode).css({
						height: stageHeight
					});
					
					helpers.setSliderOffset(scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]);
					
					if(sliderMax <= 0) {
						
						$(scrollerNode).css({
							cursor: 'default'
						});
						
						return false;
					}
					
					if(!isTouch && !settings.desktopClickDrag) {
						
						$(scrollerNode).css({
							cursor: 'default'
						});
						
					}
					
					if(settings.scrollbar) {
						
						$('.' + scrollbarBlockClass).css({ 
							margin: settings.scrollbarMargin,
							overflow: 'hidden',
							display: 'none'
						});
						
						$('.' + scrollbarBlockClass + ' .' + scrollbarClass).css({ 
							border: settings.scrollbarBorder
						});
						
						scrollMargin = parseInt($('.' + scrollbarBlockClass).css('marginLeft')) + parseInt($('.' + scrollbarBlockClass).css('marginRight'));
						scrollBorder = parseInt($('.' + scrollbarBlockClass + ' .' + scrollbarClass).css('borderLeftWidth'), 10) + parseInt($('.' + scrollbarBlockClass + ' .' + scrollbarClass).css('borderRightWidth'), 10);
						scrollbarStageWidth = (settings.scrollbarContainer != '') ? $(settings.scrollbarContainer).width() : stageWidth;
						scrollbarWidth = (scrollbarStageWidth - scrollMargin) / numberOfSlides;
		
						if(!settings.scrollbarHide) {
							scrollbarStartOpacity = settings.scrollbarOpacity;
						}
						
						$('.' + scrollbarBlockClass).css({ 
							position: 'absolute',
							left: 0,
							width: scrollbarStageWidth - scrollMargin + 'px',
							margin: settings.scrollbarMargin
						});
						
						if(settings.scrollbarLocation == 'top') {
							$('.' + scrollbarBlockClass).css('top', '0');
						} else {
							$('.' + scrollbarBlockClass).css('bottom', '0');
						}
						
						$('.' + scrollbarBlockClass + ' .' + scrollbarClass).css({ 
							borderRadius: settings.scrollbarBorderRadius,
							background: settings.scrollbarBackground,
							height: settings.scrollbarHeight,
							width: scrollbarWidth - scrollBorder + 'px',
							minWidth: settings.scrollbarHeight,
							border: settings.scrollbarBorder,
							'webkitPerspective': 1000,
							'webkitBackfaceVisibility': 'hidden',
							'webkitTransform': 'translateX(' + Math.floor((childrenOffsets[activeChildOffsets[sliderNumber]] * -1) / (sliderMax) * (scrollbarStageWidth - scrollMargin - scrollbarWidth)) + 'px)',
							opacity: scrollbarStartOpacity,
							filter: 'alpha(opacity:' + (scrollbarStartOpacity * 100) + ')',
							boxShadow: settings.scrollbarShadow
						});
		
						$('.' + scrollbarBlockClass).css({
							display: 'block'
						});
						
						if(!isTouch) {	
							$('.' + scrollbarClass).css({
								position: 'relative',
								left: Math.floor((childrenOffsets[activeChildOffsets[sliderNumber]] * -1) / (sliderMax) * (scrollbarStageWidth - scrollMargin - scrollbarWidth))
							});
						}
						
					}
					
					if(settings.infiniteSlider) {
					
						infiniteSliderWidth = (sliderMax + stageWidth) / 3;
						
					}
					
					if(settings.navSlideSelector != '') {
								
						$(settings.navSlideSelector).each(function(j) {
							
							$(this).css({
								cursor: 'pointer'
							});
							
							$(this).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {
								
								var goToSlide = j;
								if(settings.infiniteSlider) {
									goToSlide = j + infiniteSliderOffset;
								}
								
								activeChildOffsets[sliderNumber] = helpers.changeSlide(goToSlide, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							});
						
						});
								
					}	
					
					if(settings.navPrevSelector != '') {
						
						$(settings.navPrevSelector).css({
							cursor: 'pointer'
						});
						
						$(settings.navPrevSelector).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {					
							if((activeChildOffsets[sliderNumber] > 0) || settings.infiniteSlider) {
								activeChildOffsets[sliderNumber] = helpers.changeSlide(activeChildOffsets[sliderNumber] - 1, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							} 
						});
					
					}
					
					if(settings.navNextSelector != '') {
						
						$(settings.navNextSelector).css({
							cursor: 'pointer'
						});
						
						$(settings.navNextSelector).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {
							if((activeChildOffsets[sliderNumber] < childrenOffsets.length-1) || settings.infiniteSlider) {
								activeChildOffsets[sliderNumber] = helpers.changeSlide(activeChildOffsets[sliderNumber] + 1, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							}
						});
					
					}
					
					if(settings.autoSlide) {
						
						if(settings.autoSlideToggleSelector != '') {
						
							$(settings.autoSlideToggleSelector).css({
								cursor: 'pointer'
							});
							
							$(settings.autoSlideToggleSelector).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {
								
								if(!isAutoSlideToggleOn) {
								
									helpers.autoSlidePause(sliderNumber);
									isAutoSlideToggleOn = true;
									
									$(settings.autoSlideToggleSelector).addClass('on');
									
								} else {
									
									helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
									
									isAutoSlideToggleOn = false;
									
									$(settings.autoSlideToggleSelector).removeClass('on');
									
								}
							
							});
						
						}
						
						if(!isAutoSlideToggleOn) {
							helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
						}
	
						if(!isTouch) {
							
							$(stageNode).bind('mouseenter.iosSliderEvent', function() {
								helpers.autoSlidePause(sliderNumber);
							});
							
							$(stageNode).bind('mouseleave.iosSliderEvent', function() {
								if(!isAutoSlideToggleOn) {
									helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
								}
							});
						
						} else {
							
							$(stageNode).bind('touchend.iosSliderEvent', function() {
							
								if(!isAutoSlideToggleOn) {
									helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
								}
							
							});
						
						}
					
					}
					
					$(stageNode).data('iosslider', {
						obj: $this,
						settings: settings,
						scrollerNode: scrollerNode,
						numberOfSlides: numberOfSlides,
						sliderNumber: sliderNumber,
						childrenOffsets: childrenOffsets,
						sliderMax: sliderMax,
						scrollbarClass: scrollbarClass,
						scrollbarWidth: scrollbarWidth, 
						scrollbarStageWidth: scrollbarStageWidth,
						stageWidth: stageWidth, 
						scrollMargin: scrollMargin, 
						scrollBorder: scrollBorder, 
						infiniteSliderOffset: infiniteSliderOffset, 
						infiniteSliderWidth: infiniteSliderWidth
					});
					
					isFirstInit = false;
					
					return true;
				
				}
				
				if(iosSliderSettings[sliderNumber].responsiveSlideWidth) {
					
					var orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';
					
					$(window).bind(orientationEvent + '.iosSliderEvent', function() {
							
						if(!init()) return true;
						
					});
					
				}
				
				if(isTouch || settings.desktopClickDrag) {
					
					var touchStartEvent = isTouch ? 'touchstart.iosSliderEvent' : 'mousedown.iosSliderEvent';
					
					$(scrollerNode).bind(touchStartEvent, function(e) {

						helpers.autoSlidePause(sliderNumber);
						
						if(!isTouch) {
							
							if (window.getSelection) {
								if (window.getSelection().empty) {
									window.getSelection().empty();
								} else if (window.getSelection().removeAllRanges) {
									window.getSelection().removeAllRanges();
								}
							} else if (document.selection) {
								document.selection.empty();
							}
							
							eventX = e.pageX;
							eventY = e.pageY;
							isMouseDown = true;
							currentSlider = this;

							$(this).css({
								cursor: grabInCursor
							});
							
						} else {
						
							eventX = event.touches[0].pageX;
							eventY = event.touches[0].pageY;
						
						}
						
						xCurrentScrollRate = new Array(0, 0);
						yCurrentScrollRate = new Array(0, 0);
						xScrollDistance = 0;
						xScrollStarted = false;
						
						for(var j = 0; j < scrollTimeouts.length; j++) {
							clearTimeout(scrollTimeouts[j]);
						}
						
						var scrollPosition = helpers.getSliderOffset(this, 'x');
						
						intermediateChildOffset = activeChildOffsets[sliderNumber];
						
						if(settings.infiniteSlider) {
							
							if(activeChildOffsets[sliderNumber]%numberOfSlides == 0) {
								
								$(this).children().each(function(i) {
									
									if((i%numberOfSlides == 0) && (i != activeChildOffsets[sliderNumber])) {
										$(this).replaceWith(function() {
											return $(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')').clone(true);
										});
									}
									
								});
								
							}
							
						}
						
						if(scrollPosition > sliderMin) {
						
							scrollPosition = sliderMin;
							
							helpers.setSliderOffset(this, scrollPosition);
							
							$('.' + scrollbarClass).css({
								width: (scrollbarWidth - scrollBorder) + 'px'
							});
							
						} else if(scrollPosition < (sliderMax * -1)) {
						
							scrollPosition = sliderMax * -1;
							
							helpers.setSliderOffset(this, scrollPosition);
							
							helpers.setSliderOffset($('.' + scrollbarClass), (scrollbarStageWidth - scrollMargin - scrollbarWidth));
							
							$('.' + scrollbarClass).css({
								width: (scrollbarWidth - scrollBorder) + 'px'
							});
							
						} 
						
						xScrollStartPosition = (helpers.getSliderOffset(this, 'x') - eventX) * -1;
						yScrollStartPosition = (helpers.getSliderOffset(this, 'y') - eventY) * -1;
						
						xCurrentScrollRate[1] = eventX;
						yCurrentScrollRate[1] = eventY;
						
					});
					
					var touchMoveEvent = isTouch ? 'touchmove.iosSliderEvent' : 'mousemove.iosSliderEvent';
					
					$(scrollerNode).bind(touchMoveEvent, function(e) {
						
						var edgeDegradation = 0;
						
						if(!isTouch) {
							
							if (window.getSelection) {
								if (window.getSelection().empty) {
									window.getSelection().empty();
								} else if (window.getSelection().removeAllRanges) {
									window.getSelection().removeAllRanges();
								}
							} else if (document.selection) {
								document.selection.empty();
							}
							
						}
						
						if(isTouch) {
							eventX = event.touches[0].pageX;
							eventY = event.touches[0].pageY;
						} else {
							eventX = e.pageX;
							eventY = e.pageY;
							
							if(!isMouseDown) {
								return false;
							}
						}
						
						if(settings.infiniteSlider) {
	
							if(helpers.getSliderOffset(this, 'x') > (childrenOffsets[numberOfSlides + 1] + stageWidth)) {
								xScrollStartPosition = xScrollStartPosition + infiniteSliderWidth;
							}
							
							if(helpers.getSliderOffset(this, 'x') < (childrenOffsets[numberOfSlides * 2 - 1] - stageWidth)) {
								xScrollStartPosition = xScrollStartPosition - infiniteSliderWidth;
							}
							
						}
						
						xCurrentScrollRate[0] = xCurrentScrollRate[1];
						xCurrentScrollRate[1] = eventX;
						xScrollDistance = (xCurrentScrollRate[1] - xCurrentScrollRate[0]) / 2;
						
						yCurrentScrollRate[0] = yCurrentScrollRate[1];
						yCurrentScrollRate[1] = eventY;
						yScrollDistance = (yCurrentScrollRate[1] - yCurrentScrollRate[0]) / 2;
						
						if(((xScrollDistance > 5) || (xScrollDistance < -5)) && (isTouch)) {
						
							event.preventDefault();
							xScrollStarted = true;
							
						} else if(!isTouch) {
							
							xScrollStarted = true;
							
						}
						
						if(xScrollStarted) {
	
							var scrollPosition = helpers.getSliderOffset(this, 'x');
							
							if(isTouch) {
								if(currentTouches != event.touches.length) {
									xScrollStartPosition = (scrollPosition * -1) + eventX;	
								}
								
								currentTouches = event.touches.length;
							}
									
							elasticPullResistance = settings.elasticPullResistance;
							
							if(scrollPosition > sliderMin) {
							
								edgeDegradation = (xScrollStartPosition - eventX) * elasticPullResistance;
								
							}
							
							if(scrollPosition < (sliderMax * -1)) {
								
								edgeDegradation = (sliderMax + ((xScrollStartPosition - eventX) * -1)) * elasticPullResistance * -1;
											
							}
							
							helpers.setSliderOffset(this, (xScrollStartPosition - eventX - edgeDegradation) * -1);
							
							if(settings.scrollbar) {
								
								helpers.showScrollbar(settings, scrollbarClass);
			
								scrollbarDistance = Math.floor((xScrollStartPosition - eventX - edgeDegradation) / (sliderMax) * (scrollbarStageWidth - scrollMargin - scrollbarWidth));
								var width = scrollbarWidth;
								
								if(scrollPosition >= sliderMin) {
									
									width = scrollbarWidth - scrollBorder - (scrollbarDistance * -1);
									
									helpers.setSliderOffset($('.' + scrollbarClass), 0);
									
									$('.' + scrollbarClass).css({
										width: width + 'px'
									});
									
								} else if(scrollPosition <= ((sliderMax * -1) + 1)) {
									
									width = scrollbarStageWidth - scrollMargin - scrollBorder - scrollbarDistance;
									
									helpers.setSliderOffset($('.' + scrollbarClass), scrollbarDistance);
									
									$('.' + scrollbarClass).css({
										width: width + 'px'
									});	
									
								} else {
									
									helpers.setSliderOffset($('.' + scrollbarClass), scrollbarDistance);
									
								}
								
							}
							
							if(isTouch) {
								lastTouch = event.touches[0].pageX;
							}
						
						}
						
						newChildOffset = helpers.calcActiveOffset(settings, (xScrollStartPosition - eventX - edgeDegradation) * -1, 0, childrenOffsets, sliderMax, stageWidth, infiniteSliderOffset, undefined);
						if(newChildOffset != activeChildOffsets[sliderNumber]) {
							activeChildOffsets[sliderNumber] = newChildOffset;
							settings.onSlideChange(new helpers.args(settings, this, $(this).children(':eq(' + newChildOffset + ')'), newChildOffset%infiniteSliderOffset));	
						}
						
					});
					
					$(scrollerNode).bind('touchend.iosSliderEvent', function() {

						if(event.touches.length != 0) {
							
							for(var j = 0; j < sizeof(event.touches.length); j++) {
								
								if(event.touches[j].pageX == lastTouch) {
									helpers.slowScrollHorizontal(this, scrollTimeouts, sliderMax, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
								}
								
							}
							
						} else {
							
							helpers.slowScrollHorizontal(this, scrollTimeouts, sliderMax, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							
						}
						
					});
					
					if(!isTouch) {

						var eventObject = $(window);
	
						if(isIe8 || isIe7) {
							var eventObject = $(document); 
						}
						
						$(eventObject).bind('mouseup.iosSliderEvent', function(e) {
							
							if(xScrollStarted) {
								$(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')').find('a').unbind('click.disableClick').bind('click.disableClick', helpers.preventClick);
							} else {
								$(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')').find('a').unbind('click.disableClick').bind('click.disableClick', helpers.enableClick);
							}
							
							$(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')').find("[onclick]").each(function() {
								
								this.onclick = function(event) {
									if(xScrollStarted) { 
										return false;
									}
								
									$(this).data('onclick').call(this, event || window.event);
								}
								
							});

							$(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')').find('*').each(function() {
				
								var clickObject = $(this).data('events');
								
								if(clickObject != undefined) {
									if(clickObject.click[0].namespace != 'iosSliderEvent') {
										
										if(!xScrollStarted) { 
											return false;
										}
									
										$(this).one('click.disableClick', helpers.preventClick);
									    var handlers = $(this).data('events').click;
									    var handler = handlers.pop();
									    handlers.splice(0, 0, handler);
										
									}
								}
								
							});
							
							if(!isEventCleared[sliderNumber]) {
								
								$(scrollerNode).css({
									cursor: grabOutCursor
								});
								
								isMouseDown = false;
								
								if(currentSlider == undefined) {
									return false;
								}
								
								helpers.slowScrollHorizontal(currentSlider, scrollTimeouts, sliderMax, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
								
								currentSlider = undefined;
							
							}
							
						});
						
					} 
				
				}
				
			});	
			
		},
		
		destroy: function(clearStyle) {
			
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				if(clearStyle == undefined) {
		    		clearStyle = true;
		    	}
		    	
	    		helpers.autoSlidePause(data.sliderNumber);
		    	isEventCleared[data.sliderNumber] = true;
		    	$(window).unbind('.iosSliderEvent');
		    	$(this).unbind('.iosSliderEvent');
	    		$(this).children(':first-child').unbind('.iosSliderEvent');
	    		$(this).children(':first-child').children().unbind('.iosSliderEvent');
		    	
		    	if(clearStyle) {
	    			$(this).attr('style', '');
		    		$(this).children(':first-child').attr('style', '');
		    		$(this).children(':first-child').children().attr('style', '');
		    		
		    		$(data.settings.navSlideSelector).attr('style', '');
		    		$(data.settings.navPrevSelector).attr('style', '');
		    		$(data.settings.navNextSelector).attr('style', '');
		    		$(data.settings.autoSlideToggleSelector).attr('style', '');
	    		}
	    		
	    		if(data.settings.infiniteSlider) {
	    			$(this).children(':first-child').html();
	    			$(this).children(':first-child').html($(this).children(':first-child').children(':nth-child(-n+' + data.numberOfSlides + ')').clone(true));
	    		}
	    		
	    		$this.removeData('iosslider');
		    	
			});
		
		},
		
		goToSlide: function(slide) {
			
			return this.each(function() {
					
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				slide = (slide - 1)%data.numberOfSlides;
				if(data.settings.infiniteSlider) {
					slide = slide + data.infiniteSliderOffset;
				}
								
				helpers.changeSlide(slide, $(data.scrollerNode), slideTimeouts[data.sliderNumber], data.sliderMax, data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.childrenOffsets, data.sliderNumber, data.infiniteSliderOffset, data.infiniteSliderWidth, data.numberOfSlides, data.settings);
				
				activeChildOffsets[data.sliderNumber] = slide;

			});
			
		}
	
	}
	
	/* public functions */
	$.fn.iosSlider = function(method) {

		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('invalid method call!');
		}
	
    };

}) (jQuery);