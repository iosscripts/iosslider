/*
 * iosSlider - http://iosscripts.com/iosslider/
 * 
 * A jQuery Horizontal Slider for iPhone/iPad Safari 
 * This plugin turns any wide element into a touch enabled horizontal slider.
 * 
 * Copyright (c) 2012 Marc Whitbread
 * 
 * Version: v1.1.0 (09/26/2012)
 * Minimum requirements: jQuery v1.4+
 *
 * Advanced requirements:
 * 1) jQuery bind() click event override on slide requires jQuery v1.6+
 *
 * Terms of use:
 *
 * 1) iosSlider is licensed under the Creative Commons – Attribution-NonCommercial 3.0 License.
 * 2) You may use iosSlider free for personal or non-profit purposes, without restriction.
 *	  Attribution is not required but always appreciated. For commercial projects, you
 *	  must purchase a license. You may download and play with the script before deciding to
 *	  fully implement it in your project. Making sure you are satisfied, and knowing iosSlider
 *	  is the right script for your project is paramount.
 * 3) You are not permitted to make the resources found on iosscripts.com available for
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
	var activeChildInfOffsets = new Array();
	var infiniteSliderOffset = new Array();
	var sliderMin = new Array();
	var sliderMax = new Array();
	var sliderAbsMax = new Array();
	var touchLocks = new Array();
	
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
		
		hideScrollbar: function(settings, scrollTimeouts, j, distanceOffsetArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber) {
			
			if(settings.scrollbar && settings.scrollbarHide) {
					
				for(var i = j; i < j+25; i++) {
					
					scrollTimeouts[scrollTimeouts.length] = helpers.hideScrollbarIntervalTimer(scrollIntervalTime * i, distanceOffsetArray[j], ((j + 24) - i) / 24, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings);
					
				}
			
			}
			
		},
		
		hideScrollbarInterval: function(newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings) {
	
			scrollbarDistance = (newOffset * -1) / (sliderMax[sliderNumber]) * (stageWidth - scrollMargin - scrollBorder - scrollbarWidth);
			
			helpers.setSliderOffset('.' + scrollbarClass, scrollbarDistance);
			
			$('.' + scrollbarClass).css({
				opacity: settings.scrollbarOpacity * opacity,
				filter: 'alpha(opacity:' + (settings.scrollbarOpacity * opacity * 100) + ')'
			});
			
		},
		
		slowScrollHorizontalInterval: function(node, slideNodes, newOffset, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, activeChildOffset, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, sliderNumber, settings) {

			if(settings.infiniteSlider) {
				
				if(newOffset <= (sliderMax[sliderNumber] * -1)) {

					var scrollerWidth = $(node).width();
					
					if(newOffset <= (sliderAbsMax[sliderNumber] * -1)) {
						
						var sum = originalOffsets[0] * -1;
						$(slideNodes).each(function(i) {
							
							helpers.setSliderOffset($(slideNodes)[i], sum);
							if(i < childrenOffsets.length) {
								childrenOffsets[i] = sum * -1;
							}
							sum = sum + $(this).width();
							
						});
						
						newOffset = newOffset + childrenOffsets[0] * -1;
						sliderMin[sliderNumber] = childrenOffsets[0] * -1;
						sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
						infiniteSliderOffset[sliderNumber] = 0;
						
					} else {

						var lowSlideNumber = 0;
						var lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
						$(slideNodes).each(function(i) {
							
							if(helpers.getSliderOffset(this, 'x') < lowSlideOffset) {
								lowSlideOffset = helpers.getSliderOffset(this, 'x');
								lowSlideNumber = i;
							}
							
						});
						
						var tempOffset = sliderMin[sliderNumber] + scrollerWidth;
						helpers.setSliderOffset($(slideNodes)[lowSlideNumber], tempOffset);
						
						sliderMin[sliderNumber] = childrenOffsets[1] * -1;
						sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

						childrenOffsets.splice(0, 1);
						childrenOffsets.splice(childrenOffsets.length, 0, tempOffset * -1);

						infiniteSliderOffset[sliderNumber]++;
						
					}
					
				}
				
				if(newOffset >= (sliderMin[sliderNumber] * -1)) {

					var scrollerWidth = $(node).width();
					
					if(newOffset >= 0) {

						var sum = originalOffsets[0] * -1;
						$(slideNodes).each(function(i) {
							
							helpers.setSliderOffset($(slideNodes)[i], sum);
							if(i < childrenOffsets.length) {
								childrenOffsets[i] = sum * -1;
							}
							sum = sum + $(this).width();
							
						});
						
						newOffset = newOffset - childrenOffsets[0] * -1;
						sliderMin[sliderNumber] = childrenOffsets[0] * -1;
						sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
						infiniteSliderOffset[sliderNumber] = numberOfSlides;
					
					} else {
						
						var highSlideNumber = 0;
						var highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
						$(slideNodes).each(function(i) {
							
							if(helpers.getSliderOffset(this, 'x') > highSlideOffset) {
								highSlideOffset = helpers.getSliderOffset(this, 'x');
								highSlideNumber = i;
							}
							
						});

						var tempOffset = sliderMin[sliderNumber] - $(slideNodes[highSlideNumber]).width();
						helpers.setSliderOffset($(slideNodes)[highSlideNumber], tempOffset);
						
						childrenOffsets.splice(0, 0, tempOffset * -1);
						childrenOffsets.splice(childrenOffsets.length-1, 1);

						sliderMin[sliderNumber] = childrenOffsets[0] * -1;
						sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

						infiniteSliderOffset[sliderNumber]--;
						
					}
				
				}
				
			}

			var slideChanged = false;
			var newChildOffset = helpers.calcActiveOffset(settings, newOffset, childrenOffsets, stageWidth, infiniteSliderOffset[sliderNumber], numberOfSlides, activeChildOffset, sliderNumber);
			var tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
			
			if(settings.infiniteSlider) {
								
				if(tempOffset != activeChildInfOffsets[sliderNumber]) {
					slideChanged = true;
				}
					
			} else {
			
				if(newChildOffset != activeChildOffsets[sliderNumber]) {
					slideChanged = true;
				}
			
			}
			
			if(slideChanged && (settings.onSlideChange != '')) {
				
				settings.onSlideChange(new helpers.args(settings, node, $(node).children(':eq(' + tempOffset + ')'), tempOffset));
			
			}
			
			activeChildOffsets[sliderNumber] = newChildOffset;
			activeChildInfOffsets[sliderNumber] = tempOffset;

			newOffset = Math.floor(newOffset);
			
			helpers.setSliderOffset(node, newOffset);

			if(settings.scrollbar) {
				
				scrollbarDistance = Math.floor((newOffset * -1 - sliderMin[sliderNumber]) / (sliderMax[sliderNumber] - sliderMin[sliderNumber]) * (scrollbarStageWidth - scrollMargin - scrollbarWidth));
				var width = scrollbarWidth - scrollBorder;
				
				if(newOffset >= (sliderMin[sliderNumber] * -1)) {

					width = scrollbarWidth - scrollBorder - (scrollbarDistance * -1);
					
					helpers.setSliderOffset($('.' + scrollbarClass), 0);
					
					$('.' + scrollbarClass).css({
						width: width + 'px'
					});
				
				} else if(newOffset <= ((sliderMax[sliderNumber] * -1) + 1)) {
					
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
		
		slowScrollHorizontal: function(node, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, settings) {
			
			var distanceOffsetArray = new Array();
			var xScrollDistanceArray = new Array();
			var nodeOffset = helpers.getSliderOffset(node, 'x');
			var snapDirection = 0;
			var maxSlideVelocity = 25 / 1024 * stageWidth;
			var changeSlideFired = false;
			frictionCoefficient = settings.frictionCoefficient;
			elasticFrictionCoefficient = settings.elasticFrictionCoefficient;
			snapFrictionCoefficient = settings.snapFrictionCoefficient;
				
			if((xScrollDistance > 5) && settings.snapToChildren && !snapOverride) {
				snapDirection = 1;
			} else if((xScrollDistance < -5) && settings.snapToChildren && !snapOverride) {
				snapDirection = -1;
			}
			
			if(xScrollDistance < (maxSlideVelocity * -1)) {
				xScrollDistance = maxSlideVelocity * -1;
			} else if(xScrollDistance > maxSlideVelocity) {
				xScrollDistance = maxSlideVelocity;
			}
			
			if(!($(node)[0] === $(currentEventNode)[0])) {
				snapDirection = snapDirection * -1;
				xScrollDistance = xScrollDistance * -2;
			}
			
			if(settings.infiniteSlider) {
			
				var tempSliderMin = sliderMin[sliderNumber];
				var tempSliderMax = sliderMax[sliderNumber];
				var tempInfiniteSliderOffset = infiniteSliderOffset[sliderNumber];
			
			}
			
			var tempChildrenOffsets = new Array();
			var tempSlideNodeOffsets = new Array();
			
			for(var i = 0; i < childrenOffsets.length; i++) {
				
				tempChildrenOffsets[i] = childrenOffsets[i];
				tempSlideNodeOffsets[i] = helpers.getSliderOffset($(slideNodes[i]), 'x');
				
			}
			
			while((xScrollDistance > 1) || (xScrollDistance < -1)) {
				
				xScrollDistance = xScrollDistance * frictionCoefficient;
				nodeOffset = nodeOffset + xScrollDistance;

				if(((nodeOffset > (sliderMin[sliderNumber] * -1)) || (nodeOffset < (sliderMax[sliderNumber] * -1))) && !settings.infiniteSlider) {
					xScrollDistance = xScrollDistance * elasticFrictionCoefficient;
					nodeOffset = nodeOffset + xScrollDistance;
				}
				
				if(settings.infiniteSlider) {
					
					if(nodeOffset <= (tempSliderMax * -1)) {
						
						var scrollerWidth = $(node).width();
							
						var lowSlideNumber = 0;
						var lowSlideOffset = tempSlideNodeOffsets[0];
						for(var i = 0; i < tempSlideNodeOffsets.length; i++) {
							
							if(tempSlideNodeOffsets[i] < lowSlideOffset) {
								lowSlideOffset = tempSlideNodeOffsets[i];
								lowSlideNumber = i;
							}
							
						}
						
						var newOffset = tempSliderMin + scrollerWidth;
						tempSlideNodeOffsets[lowSlideNumber] = newOffset;
						
						tempSliderMin = tempChildrenOffsets[1] * -1;
						tempSliderMax = tempSliderMin + scrollerWidth - stageWidth;

						tempChildrenOffsets.splice(0, 1);
						tempChildrenOffsets.splice(tempChildrenOffsets.length, 0, newOffset * -1);

						tempInfiniteSliderOffset--;
						
					}
					
					if(nodeOffset >= (tempSliderMin * -1)) {
						
						var scrollerWidth = $(node).width();
						
						var highSlideNumber = 0;
						var highSlideOffset = tempSlideNodeOffsets[0];
						for(var i = 0; i < tempSlideNodeOffsets.length; i++) {
							
							if(tempSlideNodeOffsets[i] > highSlideOffset) {
								highSlideOffset = tempSlideNodeOffsets[i];
								highSlideNumber = i;
							}
							
						}

						var newOffset = tempSliderMin - $(slideNodes[highSlideNumber]).width();
						tempSlideNodeOffsets[highSlideNumber] = newOffset;
						
						tempChildrenOffsets.splice(0, 0, newOffset * -1);
						tempChildrenOffsets.splice(tempChildrenOffsets.length-1, 1);

						tempSliderMin = tempChildrenOffsets[0] * -1;
						tempSliderMax = tempSliderMin + scrollerWidth - stageWidth;

						tempInfiniteSliderOffset++;
					
					}
						
				}
				
				distanceOffsetArray[distanceOffsetArray.length] = nodeOffset;
				xScrollDistanceArray[xScrollDistanceArray.length] = xScrollDistance;

			}

			var slideChanged = false;
			var newChildOffset = helpers.calcActiveOffset(settings, nodeOffset, tempChildrenOffsets, stageWidth, tempInfiniteSliderOffset, numberOfSlides, activeChildOffsets[sliderNumber], sliderNumber);
			var tempOffset = (newChildOffset + tempInfiniteSliderOffset + numberOfSlides)%numberOfSlides;

			if(settings.snapToChildren) {
			
				if(settings.infiniteSlider) {
				
					if(tempOffset != activeChildInfOffsets[sliderNumber]) {
						slideChanged = true;
					}
						
				} else {
				
					if(newChildOffset != activeChildOffsets[sliderNumber]) {
						slideChanged = true;
					}
				
				}

				if((snapDirection < 0) && !slideChanged) {
				
					newChildOffset++;
					
					if((newChildOffset >= childrenOffsets.length) && !settings.infinteSlider) newChildOffset = childrenOffsets.length - 1;
					
				} else if((snapDirection > 0) && !slideChanged) {
				
					newChildOffset--;
					
					if((newChildOffset < 0) && !settings.infinteSlider) newChildOffset = 0;
					
				}
			
			}

			if(settings.snapToChildren || (((nodeOffset > (sliderMin[sliderNumber] * -1)) || (nodeOffset < (sliderMax[sliderNumber] * -1))) && !settings.infiniteSlider)) {
				
				nodeOffset = helpers.getSliderOffset(node, 'x');
				distanceOffsetArray.splice(0, distanceOffsetArray.length);
				
				while((nodeOffset < (tempChildrenOffsets[newChildOffset] - 0.5)) || (nodeOffset > (tempChildrenOffsets[newChildOffset] + 0.5))) {
					
					nodeOffset = ((nodeOffset - (tempChildrenOffsets[newChildOffset])) * snapFrictionCoefficient) + (tempChildrenOffsets[newChildOffset]);
					distanceOffsetArray[distanceOffsetArray.length] = nodeOffset;
					
				}

				distanceOffsetArray[distanceOffsetArray.length] = tempChildrenOffsets[newChildOffset];
	
			}

			var jStart = 1;
			if((distanceOffsetArray.length%2) != 0) {
				jStart = 0;
			}
			
			var lastTimeoutRegistered = 0;
			var count = 0;
			
			for(var j = 0; j < scrollTimeouts.length; j++) {
				clearTimeout(scrollTimeouts[j]);
			}
			
			var lastCheckOffset = 0;
			for(var j = jStart; j < distanceOffsetArray.length; j = j + 2) {
				
				if((j == jStart) || (Math.abs(distanceOffsetArray[j] - lastCheckOffset) > 1) || (j >= (distanceOffsetArray.length - 2))) {
				
					lastCheckOffset	= distanceOffsetArray[j];
					
					scrollTimeouts[scrollTimeouts.length] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * j, node, slideNodes, distanceOffsetArray[j], scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, newChildOffset, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, sliderNumber, settings);
				
				}
				
			}
			
			scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (j + 1), settings, node, $(node).children(':eq(' + newChildOffset + ')'), newChildOffset, sliderNumber);
			
			slideTimeouts[sliderNumber] = scrollTimeouts;
			
			helpers.hideScrollbar(settings, scrollTimeouts, j, distanceOffsetArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber);
				
		},
		
		onSlideComplete: function(settings, node, slideNode, newChildOffset, sliderNumber) {
			
			if((onChangeEventLastFired[sliderNumber] != newChildOffset) && (settings.onSlideComplete != '')) {
			
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
			
			if(isTouch && isWebkit) {
			
				var webkitTransformArray = $(node).css('-webkit-transform').split(',');
				sliderOffset = parseInt(webkitTransformArray[xy], 10);
					
			} else {
			
				sliderOffset = parseInt($(node).css('left'), 10);
			
			}
			
			return sliderOffset;
		
		},
		
		setSliderOffset: function(node, sliderOffset) {
			
			if(isTouch && isWebkit) {
			
				$(node).css({
					webkitTransform: 'matrix(1,0,0,1,' + sliderOffset + ',0)'
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
		
		getSlideNumber: function(slide, sliderNumber, numberOfSlides) {
			
			return (slide - infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides;
		
		}, 

        calcActiveOffset: function(settings, offset, childrenOffsets, stageWidth, infiniteSliderOffset, numberOfSlides, activeChildOffset, sliderNumber) {
								
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
			
			return newChildOffset;
		
		},
		
		changeSlide: function(slide, node, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings) {

			helpers.autoSlidePause(sliderNumber);
			
			for(var j = 0; j < scrollTimeouts.length; j++) {
				clearTimeout(scrollTimeouts[j]);
			}
			
			var steps = Math.ceil(settings.autoSlideTransTimer / 10) + 1;
			var startOffset = helpers.getSliderOffset(node, 'x');
			var endOffset = childrenOffsets[slide];
			var offsetDiff = endOffset - startOffset;
			
			if(settings.infiniteSlider) {
				
				slide = (slide - infiniteSliderOffset[sliderNumber] + numberOfSlides * 2)%numberOfSlides;
				endOffset = childrenOffsets[slide];
				offsetDiff = endOffset - startOffset;
				
				var offsets = new Array(childrenOffsets[slide] - $(node).width(), childrenOffsets[slide] + $(node).width());
				
				for(var i = 0; i < offsets.length; i++) {
					
					if(Math.abs(offsets[i] - startOffset) < Math.abs(offsetDiff)) {
						offsetDiff = (offsets[i] - startOffset);
					}
				
				}
				
			}
			
			var stepArray = new Array();
			var t;
			var nextStep;

			helpers.showScrollbar(settings, scrollbarClass);

			for(var i = 0; i <= steps; i++) {

				t = i;
				t /= steps;
				t--;
				nextStep = startOffset + offsetDiff*(Math.pow(t,5) + 1);
				
				stepArray[stepArray.length] = nextStep;
				
			}
			
			var lastCheckOffset = 0;
			for(var i = 0; i < stepArray.length; i++) {
				
				if((i == 0) || (Math.abs(stepArray[i] - lastCheckOffset) > 1) || (i >= (stepArray.length - 2))) {

					lastCheckOffset	= stepArray[i];
					
					scrollTimeouts[i] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * (i + 1), node, slideNodes, stepArray[i], scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, sliderNumber, settings);
						
				}
				
				if((i == 0) && (settings.onSlideStart != '')) {
					settings.onSlideStart(new helpers.args(settings, node, $(node).children(':eq(' + slide + ')'), slide));
				}
					
			}
			
			if(offsetDiff != 0) {
				scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (i + 1), settings, node, $(node).children(':eq(' + slide + ')'), slide, sliderNumber);
			}
			
			slideTimeouts[sliderNumber] = scrollTimeouts;
			
			helpers.hideScrollbar(settings, scrollTimeouts, i, stepArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber);
			
			helpers.autoSlide(node, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
			
		},
		
		autoSlide: function(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings) {
			
			if(!settings.autoSlide) return false;
			
			helpers.autoSlidePause(sliderNumber);

			autoSlideTimeouts[sliderNumber] = setTimeout(function() {

				if(!settings.infiniteSlider && (activeChildOffsets[sliderNumber] > childrenOffsets.length-1)) {
					activeChildOffsets[sliderNumber] = activeChildOffsets[sliderNumber] - numberOfSlides;
				}
				
				var nextSlide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;

				helpers.changeSlide(nextSlide + 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
				
				helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
				
			}, settings.autoSlideTimer + settings.autoSlideTransTimer);
			
		},
		
		autoSlidePause: function(sliderNumber) {
			
			clearTimeout(autoSlideTimeouts[sliderNumber]);

		},
		
		isUnselectable: function(node, settings) {

			if(settings.unselectableSelector != '') {
				if($(node).closest(settings.unselectableSelector).size() == 1) return true;
			}
			
			return false;
			
		},
		
		/* timers */
		slowScrollHorizontalIntervalTimer: function(scrollIntervalTime, node, slideNodes, step, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, sliderNumber, settings) {
		
			var scrollTimeout = setTimeout(function() {
				helpers.slowScrollHorizontalInterval(node, slideNodes, step, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, sliderNumber, settings);
			}, scrollIntervalTime);
			
			return scrollTimeout;
		
		},
		
		onSlideCompleteTimer: function(scrollIntervalTime, settings, node, slideNode, slide, scrollbarNumber) {
			
			var scrollTimeout = setTimeout(function() {
				helpers.onSlideComplete(settings, node, slideNode, slide, scrollbarNumber);
			}, scrollIntervalTime);
			
			return scrollTimeout;
		
		},
		
		hideScrollbarIntervalTimer: function(scrollIntervalTime, newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings) {

			var scrollTimeout = setTimeout(function() {
				helpers.hideScrollbarInterval(newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings);
			}, scrollIntervalTime);
		
			return scrollTimeout;
		
		},
						
		args: function(settings, node, activeSlideNode, newChildOffset) {
			this.settings = settings;
			this.data = $(node).parent().data('iosslider');
			this.sliderObject = node;
			this.sliderContainerObject = $(node).parent();
			this.currentSlideObject = activeSlideNode;
			this.currentSlideNumber = newChildOffset;
			this.currentSliderOffset = helpers.getSliderOffset(node, 'x') * -1;
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
		
		init: function(options, node) {
			
			var settings = $.extend(true, {
				'elasticPullResistance': 0.6, 		
				'frictionCoefficient': 0.92,
				'elasticFrictionCoefficient': 0.6,
				'snapFrictionCoefficient': 0.92,
				'snapToChildren': false,
				'startAtSlide': 1,
				'scrollbar': false,
				'scrollbarDrag': false,
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
				'scrollbarElasticPullResistance': 0.9,
				'desktopClickDrag': false,
				'keyboardControls': false,
				'responsiveSlideContainer': true,
				'responsiveSlides': true,
				'navSlideSelector': '',
				'navPrevSelector': '',
				'navNextSelector': '',
				'autoSlideToggleSelector': '',
				'autoSlide': false,
				'autoSlideTimer': 5000,
				'autoSlideTransTimer': 750,
				'infiniteSlider': false,
				'stageCSS': {
					position: 'relative',
					top: '0',
					left: '0',
					overflow: 'hidden',
					zIndex: 1
				},
				'unselectableSelector': '',
				'onSliderLoaded': '',
				'onSliderUpdate': '',
				'onSlideStart': '',
				'onSlideChange': '',
				'onSlideComplete': ''
			}, options);
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function(i) {
				
				scrollbarNumber++;
				var sliderNumber = scrollbarNumber;
				var scrollTimeouts = new Array();
				iosSliderSettings[sliderNumber] = settings;
				sliderMin[sliderNumber] = 0;
				sliderMax[sliderNumber] = 0;
				var minTouchpoints = 0;
				var xCurrentScrollRate = new Array(0, 0);
				var yCurrentScrollRate = new Array(0, 0);
				var scrollbarBlockClass = 'scrollbarBlock' + scrollbarNumber;
				var scrollbarClass = 'scrollbar' + scrollbarNumber;
				var scrollbarNode;
				var scrollbarBlockNode;
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
				activeChildInfOffsets[sliderNumber] = activeChildOffsets[sliderNumber];
				var newChildOffset = -1;
				var webkitTransformArray = new Array();
				var childrenOffsets;
				var originalOffsets = new Array();
				var scrollbarStartOpacity = 0;
				var xScrollStartPosition = 0;
				var yScrollStartPosition = 0;
				var currentTouches = 0;
				var scrollerNode = $(this).children(':first-child');
				var slideNodes;
				var numberOfSlides = $(scrollerNode).children().not('script').size();
				var xScrollStarted = false;
				var lastChildOffset = 0;
				var isMouseDown = false;
				var currentSlider = undefined;
				var sliderStopLocation = 0;
				var infiniteSliderWidth;
				infiniteSliderOffset[sliderNumber] = 0;
				var shortContent = false;
				onChangeEventLastFired[sliderNumber] = -1;
				var isAutoSlideToggleOn = false;
				iosSliders[sliderNumber] = stageNode;
				isEventCleared[sliderNumber] = false;
				var currentEventNode;
				var intermediateChildOffset = 0;
				var tempInfiniteSliderOffset = 0;
				var preventXScroll = false;
				var snapOverride = false;
				touchLocks[sliderNumber] = false;
				slideTimeouts[sliderNumber] = new Array();
				if(settings.scrollbarDrag) {
					settings.scrollbar = true;
					settings.scrollbarHide = false;
				}
				var $this = $(this);
				var data = $this.data('iosslider');	
				if(data != undefined) return true;
           		
           		$(this).find('img').bind('dragstart.iosSliderEvent', function(event) { event.preventDefault(); });

				if(settings.infiniteSlider) {
					settings.scrollbar = false;
				}
						
				if(settings.scrollbar) {
					
					if(settings.scrollbarContainer != '') {
						$(settings.scrollbarContainer).append("<div class = '" + scrollbarBlockClass + "'><div class = '" + scrollbarClass + "'></div></div>");
					} else {
						$(scrollerNode).parent().append("<div class = '" + scrollbarBlockClass + "'><div class = '" + scrollbarClass + "'></div></div>");
					}
				
				}
				
				if(!init()) return true;
				
				if(settings.infiniteSlider) {
					helpers.setSliderOffset(scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]);	
				}
				
				$(this).find('a').bind('mousedown', helpers.preventDrag);
				$(this).find("[onclick]").bind('click', helpers.preventDrag).each(function() {
					
					$(this).data('onclick', this.onclick);
				
				});
				
				if(settings.onSliderLoaded != '') {
					settings.onSliderLoaded(new helpers.args(settings, scrollerNode, $(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')'), activeChildOffsets[sliderNumber]));
				}
				
				onChangeEventLastFired[sliderNumber] = activeChildOffsets[sliderNumber];
				
				function init() {
					
					helpers.autoSlidePause(sliderNumber);
					
					$(stageNode).css('width', '');
					$(stageNode).css('height', '');
					$(scrollerNode).css('width', '');
					slideNodes = $(scrollerNode).children().not('script');
					$(slideNodes).css('width', '');
					
					sliderMax[sliderNumber] = 0;
					childrenOffsets = new Array();
					containerWidth = $(stageNode).parent().width();
					stageWidth = $(stageNode).outerWidth(true);
					
					if(settings.responsiveSlideContainer) {
						stageWidth = ($(stageNode).outerWidth(true) > containerWidth) ? containerWidth : $(stageNode).outerWidth(true);
					}
					
					$(stageNode).css({
						position: settings.stageCSS.position,
						top: settings.stageCSS.top,
						left: settings.stageCSS.left,
						overflow: settings.stageCSS.overflow,
						zIndex: settings.stageCSS.zIndex,
						'webkitPerspective': 1000,
						'webkitBackfaceVisibility': 'hidden',
						width: stageWidth
					});
					
					$(settings.unselectableSelector).css({
						cursor: 'default'
					});
					
					if(settings.responsiveSlides) {
						
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
	
					$(slideNodes).each(function(j) {
						
						$(this).css({
							position: 'absolute',
							top: 0
						});
						
						childrenOffsets[j] = sliderMax[sliderNumber] * -1;
						
						sliderMax[sliderNumber] = sliderMax[sliderNumber] + $(this).outerWidth(true);
						
					});
					
					sliderAbsMax[sliderNumber] = sliderMax[sliderNumber] * 2;

					$(slideNodes).each(function(j) {
						
						helpers.setSliderOffset($(this), childrenOffsets[j] * -1 + sliderMax[sliderNumber]);
						
						childrenOffsets[j] = childrenOffsets[j] - sliderMax[sliderNumber];
					
					});
					
					if(!settings.infiniteSlider) {
					
						for(var i = 0; i < childrenOffsets.length; i++) {
							
							if(childrenOffsets[i] <= ((sliderMax[sliderNumber] * 2 - stageWidth) * -1)) {
								break;
							}
							
							lastChildOffset = i;
							
						}
						
						childrenOffsets.splice(lastChildOffset + 1, childrenOffsets.length);
						childrenOffsets[childrenOffsets.length] = (sliderMax[sliderNumber] * 2 - stageWidth) * -1;
					
					}
					
					for(var i = 0; i < childrenOffsets.length; i++) {
						originalOffsets[i] = childrenOffsets[i];
					}
					
					sliderMin[sliderNumber] = sliderMax[sliderNumber];
					
					$(scrollerNode).css({
						position: 'relative',
						cursor: grabOutCursor,
						'webkitPerspective': 1000,
						'webkitBackfaceVisibility': 'hidden',
						width: sliderMax[sliderNumber] + 'px'
					});
					
					sliderMax[sliderNumber] = sliderMax[sliderNumber] * 2 - stageWidth;

					containerHeight = $(stageNode).parent().outerHeight(true);
					stageHeight = $(stageNode).height();
					
					if(settings.responsiveSlideContainer) {
						stageHeight = ($(stageNode).height() > containerHeight) ? containerHeight : $(stageNode).height();
					}
					
					$(stageNode).css({
						height: stageHeight
					});
					
					if(settings.infiniteSlider) {
						
						var currentScrollOffset = helpers.getSliderOffset($(scrollerNode), 'x');
						var scrollerWidth = $(scrollerNode).width();
						var count = (infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides * -1;

						while(count < 0) {
								
							var lowSlideNumber = 0;
							var lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
							$(slideNodes).each(function(i) {
								
								if(helpers.getSliderOffset(this, 'x') < lowSlideOffset) {
									lowSlideOffset = helpers.getSliderOffset(this, 'x');
									lowSlideNumber = i;
								}
								
							});
							
							var newOffset = sliderMin[sliderNumber] + scrollerWidth;
							helpers.setSliderOffset($(slideNodes)[lowSlideNumber], newOffset);
							
							sliderMin[sliderNumber] = childrenOffsets[1] * -1;
							sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

							childrenOffsets.splice(0, 1);
							childrenOffsets.splice(childrenOffsets.length, 0, newOffset * -1);

							count++;
							
						}
					
					}
					
					helpers.setSliderOffset(scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]);
					
					shortContent = (sliderMax[sliderNumber] <= 0) ? true : false;
					
					if(shortContent) {
						
						$(scrollerNode).css({
							cursor: 'default'
						});
						
					}
					
					if(!isTouch && !settings.desktopClickDrag) {
						
						$(scrollerNode).css({
							cursor: 'default'
						});
						
					}
					
					if(settings.scrollbar && !shortContent) {
						
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
							'position': 'relative',
							opacity: scrollbarStartOpacity,
							filter: 'alpha(opacity:' + (scrollbarStartOpacity * 100) + ')',
							boxShadow: settings.scrollbarShadow
						});
						
						helpers.setSliderOffset($('.' + scrollbarBlockClass + ' .' + scrollbarClass), Math.floor((childrenOffsets[activeChildOffsets[sliderNumber]] * -1 - sliderMin[sliderNumber]) / (sliderMax[sliderNumber] - sliderMin[sliderNumber]) * (scrollbarStageWidth - scrollMargin - scrollbarWidth)));
		
						$('.' + scrollbarBlockClass).css({
							display: 'block'
						});
						
						scrollbarNode = $('.' + scrollbarBlockClass + ' .' + scrollbarClass);
						scrollbarBlockNode = $('.' + scrollbarBlockClass);
						
					}
					
					if(settings.scrollbarDrag && !shortContent) {
						$('.' + scrollbarBlockClass + ' .' + scrollbarClass).css({
							cursor: grabOutCursor
						});
					}
					
					if(settings.infiniteSlider) {
					
						infiniteSliderWidth = (sliderMax[sliderNumber] + stageWidth) / 3;
						
					}
					
					if(settings.navSlideSelector != '') {
								
						$(settings.navSlideSelector).each(function(j) {
						
							$(this).css({
								cursor: 'pointer'
							});
							
							$(this).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {

								helpers.changeSlide(j, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
								
							});
						
						});
								
					}	
					
					if(settings.navPrevSelector != '') {
						
						$(settings.navPrevSelector).css({
							cursor: 'pointer'
						});
						
						$(settings.navPrevSelector).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {	
						
							var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
											
							if((slide > 0) || settings.infiniteSlider) {
								helpers.changeSlide(slide - 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
							}
						});
					
					}
					
					if(settings.navNextSelector != '') {
						
						$(settings.navNextSelector).css({
							cursor: 'pointer'
						});
						
						$(settings.navNextSelector).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {
							
							var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
							
							if((slide < childrenOffsets.length-1) || settings.infiniteSlider) {
								helpers.changeSlide(slide + 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
							}
						});
					
					}
					
					if(settings.autoSlide && !shortContent) {
						
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
									
									helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
									
									isAutoSlideToggleOn = false;
									
									$(settings.autoSlideToggleSelector).removeClass('on');
									
								}
							
							});
						
						}
						
						if(!isAutoSlideToggleOn && !shortContent) {
							helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
						}
	
						if(!isTouch) {
							
							$(stageNode).bind('mouseenter.iosSliderEvent', function() {
								helpers.autoSlidePause(sliderNumber);
							});
							
							$(stageNode).bind('mouseleave.iosSliderEvent', function() {
								if(!isAutoSlideToggleOn && !shortContent) {
									helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
								}
							});
						
						} else {
							
							$(stageNode).bind('touchend.iosSliderEvent', function() {
							
								if(!isAutoSlideToggleOn && !shortContent) {
									helpers.autoSlide(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
								}
							
							});
						
						}
					
					}
					
					$(stageNode).data('iosslider', {
						obj: $this,
						settings: settings,
						scrollerNode: scrollerNode,
						slideNodes: slideNodes,
						numberOfSlides: numberOfSlides,
						sliderNumber: sliderNumber,
						originalOffsets: originalOffsets,
						childrenOffsets: childrenOffsets,
						sliderMax: sliderMax[sliderNumber],
						scrollbarClass: scrollbarClass,
						scrollbarWidth: scrollbarWidth, 
						scrollbarStageWidth: scrollbarStageWidth,
						stageWidth: stageWidth, 
						scrollMargin: scrollMargin, 
						scrollBorder: scrollBorder, 
						infiniteSliderOffset: infiniteSliderOffset[sliderNumber], 
						infiniteSliderWidth: infiniteSliderWidth
					});
					
					return true;
				
				}
				
				if(iosSliderSettings[sliderNumber].responsiveSlides || iosSliderSettings[sliderNumber].responsiveSlideContainer) {
					
					var orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';
					
					$(window).bind(orientationEvent + '.iosSliderEvent', function() {
							
						if(!init()) return true;
						
					});
					
				}
				
				if(settings.keyboardControls && !shortContent) {
					
					$(document).bind('keydown.iosSliderEvent', function(e) {
						
						if((!isIe7) && (!isIe8)) {
							var e = e.originalEvent;
						}
						
						switch(e.keyCode) {
							
							case 37:
								
								var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;

								if((slide > 0) || settings.infiniteSlider) {
									helpers.changeSlide(slide - 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
								} 
								
							break;
							
							case 39:
								
								var slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;
								
								if((slide < childrenOffsets.length-1) || settings.infiniteSlider) {
									helpers.changeSlide(slide + 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, settings);
								}
								
							break;
							
						}
					
					});
					
				}
					
				if(isTouch || settings.desktopClickDrag && !shortContent) {
					
					var touchStartEvent = isTouch ? 'touchstart.iosSliderEvent' : 'mousedown.iosSliderEvent';
					var touchSelection = $(scrollerNode);
					var touchSelectionMove = $(scrollerNode);
					var preventDefault = null;
					var isUnselectable = false;
					
					if(settings.scrollbarDrag) {
					
						touchSelection = touchSelection.add(scrollbarNode);
						touchSelectionMove = touchSelectionMove.add(scrollbarBlockNode);
						
					} 
					
					$(touchSelection).bind(touchStartEvent, function(e) {
						
						if(touchLocks[sliderNumber]) return true;
						
						isUnselectable = helpers.isUnselectable(e.target, settings);
						
						if(isUnselectable) return true;
						
						currentEventNode = ($(this)[0] === $(scrollbarNode)[0]) ? scrollbarNode : scrollerNode;

						if((!isIe7) && (!isIe8)) {
							var e = e.originalEvent;
						}

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
							currentSlider = scrollerNode;

							$(this).css({
								cursor: grabInCursor
							});
							
						} else {
						
							eventX = e.touches[0].pageX;
							eventY = e.touches[0].pageY;

						}
						
						xCurrentScrollRate = new Array(0, 0);
						yCurrentScrollRate = new Array(0, 0);
						xScrollDistance = 0;
						xScrollStarted = false;
						
						for(var j = 0; j < scrollTimeouts.length; j++) {
							clearTimeout(scrollTimeouts[j]);
						}
						
						var scrollPosition = helpers.getSliderOffset(scrollerNode, 'x');
						
						if(scrollPosition > (sliderMin[sliderNumber] * -1)) {
						
							scrollPosition = sliderMin[sliderNumber];
							
							helpers.setSliderOffset($('.' + scrollbarClass), scrollPosition);
							
							$('.' + scrollbarClass).css({
								width: (scrollbarWidth - scrollBorder) + 'px'
							});
							
						} else if(scrollPosition < (sliderMax[sliderNumber] * -1)) {
						
							scrollPosition = sliderMax[sliderNumber] * -1;
							
							helpers.setSliderOffset(scrollerNode, scrollPosition);
							
							helpers.setSliderOffset($('.' + scrollbarClass), (scrollbarStageWidth - scrollMargin - scrollbarWidth));
							
							$('.' + scrollbarClass).css({
								width: (scrollbarWidth - scrollBorder) + 'px'
							});
							
						} 
						
						var scrollbarSubtractor = ($(this)[0] === $(scrollbarNode)[0]) ? (sliderMin[sliderNumber]) : 0;
						
						xScrollStartPosition = (helpers.getSliderOffset(this, 'x') - eventX - scrollbarSubtractor) * -1;
						yScrollStartPosition = (helpers.getSliderOffset(this, 'y') - eventY) * -1;
						
						xCurrentScrollRate[1] = eventX;
						yCurrentScrollRate[1] = eventY;
						
						snapOverride = false;
						
					});
					
					var touchMoveEvent = isTouch ? 'touchmove.iosSliderEvent' : 'mousemove.iosSliderEvent';
					
					$(touchSelectionMove).bind(touchMoveEvent, function(e) {
						
						if((!isIe7) && (!isIe8)) {
							var e = e.originalEvent;
						}
						
						if(isUnselectable) return true;
						
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
							eventX = e.touches[0].pageX;
							eventY = e.touches[0].pageY;
						} else {
							eventX = e.pageX;
							eventY = e.pageY;
							
							if(!isMouseDown) {
								return false;
							}
						}
						
						xCurrentScrollRate[0] = xCurrentScrollRate[1];
						xCurrentScrollRate[1] = eventX;
						xScrollDistance = (xCurrentScrollRate[1] - xCurrentScrollRate[0]) / 2;
						
						yCurrentScrollRate[0] = yCurrentScrollRate[1];
						yCurrentScrollRate[1] = eventY;
						yScrollDistance = (yCurrentScrollRate[1] - yCurrentScrollRate[0]) / 2;
						
						if(!xScrollStarted) {
							
							if(settings.onSlideStart != '') {
								settings.onSlideStart(new helpers.args(settings, scrollerNode, $(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')'), activeChildOffsets[sliderNumber]));
							}
							
						}
						
						if(((yScrollDistance > 3) || (yScrollDistance < -3)) && ((xScrollDistance < 3) && (xScrollDistance > -3)) && (isTouch) && (!xScrollStarted)) {
							preventXScroll = true;
						}
						
						if(((xScrollDistance > 5) || (xScrollDistance < -5)) && (isTouch)) {
						
							e.preventDefault();
							xScrollStarted = true;
							
						} else if(!isTouch) {
							
							xScrollStarted = true;
							
						}
						
						if(xScrollStarted && !preventXScroll) {
							
							var scrollPosition = helpers.getSliderOffset(scrollerNode, 'x');
							var scrollbarSubtractor = ($(this)[0] === $(scrollbarBlockNode)[0]) ? (sliderMin[sliderNumber]) : 0;
							var scrollbarMultiplier = ($(this)[0] === $(scrollbarBlockNode)[0]) ? ((sliderMin[sliderNumber] - sliderMax[sliderNumber]) / (scrollbarStageWidth - scrollMargin - scrollbarWidth)) : 1;
							var elasticPullResistance = ($(this)[0] === $(scrollbarBlockNode)[0]) ? settings.scrollbarElasticPullResistance : settings.elasticPullResistance;

							if(isTouch) {
								if(currentTouches != e.touches.length) {
									xScrollStartPosition = (scrollPosition * -1) + eventX;
								}
								
								currentTouches = e.touches.length;
							}
							
							if(settings.infiniteSlider) {

								if(scrollPosition <= (sliderMax[sliderNumber] * -1)) {
									
									var scrollerWidth = $(scrollerNode).width();
									
									if(scrollPosition <= (sliderAbsMax[sliderNumber] * -1)) {
										
										var sum = originalOffsets[0] * -1;
										$(slideNodes).each(function(i) {
											
											helpers.setSliderOffset($(slideNodes)[i], sum);
											if(i < childrenOffsets.length) {
												childrenOffsets[i] = sum * -1;
											}
											sum = sum + $(this).width();
											
										});
										
										xScrollStartPosition = xScrollStartPosition - childrenOffsets[0] * -1;
										sliderMin[sliderNumber] = childrenOffsets[0] * -1;
										sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
										infiniteSliderOffset[sliderNumber] = 0;
										
									} else {
										
										var lowSlideNumber = 0;
										var lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
										$(slideNodes).each(function(i) {
											
											if(helpers.getSliderOffset(this, 'x') < lowSlideOffset) {
												lowSlideOffset = helpers.getSliderOffset(this, 'x');
												lowSlideNumber = i;
											}
											
										});
										
										var newOffset = sliderMin[sliderNumber] + scrollerWidth;
										helpers.setSliderOffset($(slideNodes)[lowSlideNumber], newOffset);
										
										sliderMin[sliderNumber] = childrenOffsets[1] * -1;
										sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

										childrenOffsets.splice(0, 1);
										childrenOffsets.splice(childrenOffsets.length, 0, newOffset * -1);

										infiniteSliderOffset[sliderNumber]++;
										
									}
									
								}
								
								if(scrollPosition >= (sliderMin[sliderNumber] * -1)) {
									
									var scrollerWidth = $(scrollerNode).width();
									
									if(scrollPosition >= 0) {
									
										var sum = originalOffsets[0] * -1;
										$(slideNodes).each(function(i) {
											
											helpers.setSliderOffset($(slideNodes)[i], sum);
											if(i < childrenOffsets.length) {
												childrenOffsets[i] = sum * -1;
											}
											sum = sum + $(this).width();
											
										});
										
										xScrollStartPosition = xScrollStartPosition + childrenOffsets[0] * -1;
										sliderMin[sliderNumber] = childrenOffsets[0] * -1;
										sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;
										infiniteSliderOffset[sliderNumber] = numberOfSlides;
									
									} else {
										
										var highSlideNumber = 0;
										var highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), 'x');
										$(slideNodes).each(function(i) {
											
											if(helpers.getSliderOffset(this, 'x') > highSlideOffset) {
												highSlideOffset = helpers.getSliderOffset(this, 'x');
												highSlideNumber = i;
											}
											
										});

										var newOffset = sliderMin[sliderNumber] - $(slideNodes[highSlideNumber]).width();
										helpers.setSliderOffset($(slideNodes)[highSlideNumber], newOffset);
										
										childrenOffsets.splice(0, 0, newOffset * -1);
										childrenOffsets.splice(childrenOffsets.length-1, 1);

										sliderMin[sliderNumber] = childrenOffsets[0] * -1;
										sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth;

										infiniteSliderOffset[sliderNumber]--;
									
									}
								
								}
								
							} else {

								if(scrollPosition > (sliderMin[sliderNumber] * -1)) {
									
									edgeDegradation = (sliderMin[sliderNumber] + ((xScrollStartPosition - scrollbarSubtractor - eventX) * -1 * scrollbarMultiplier) - scrollbarSubtractor) * elasticPullResistance * -1 / scrollbarMultiplier;
									console.log(edgeDegradation);
									
								}
								
								if(scrollPosition < (sliderMax[sliderNumber] * -1)) {
									
									edgeDegradation = (sliderMax[sliderNumber] + ((xScrollStartPosition - scrollbarSubtractor - eventX) * -1 * scrollbarMultiplier) - scrollbarSubtractor) * elasticPullResistance * -1 / scrollbarMultiplier;
												
								}
							
							}

							helpers.setSliderOffset(scrollerNode, ((xScrollStartPosition - scrollbarSubtractor - eventX - edgeDegradation) * -1 * scrollbarMultiplier) - scrollbarSubtractor);

							if(settings.scrollbar) {
								
								helpers.showScrollbar(settings, scrollbarClass);
								
								scrollbarDistance = Math.floor((xScrollStartPosition - eventX - edgeDegradation - sliderMin[sliderNumber]) / (sliderMax[sliderNumber] - sliderMin[sliderNumber]) * (scrollbarStageWidth - scrollMargin - scrollbarWidth) * scrollbarMultiplier);
								
								var width = scrollbarWidth;
								
								if(scrollPosition >= (sliderMin[sliderNumber] * -1)) {
									
									width = scrollbarWidth - scrollBorder - (scrollbarDistance * -1);
									
									helpers.setSliderOffset($('.' + scrollbarClass), 0);
									
									$('.' + scrollbarClass).css({
										width: width + 'px'
									});
									
								} else if(scrollPosition <= ((sliderMax[sliderNumber] * -1) + 1)) {
																		
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
								lastTouch = e.touches[0].pageX;
							}

							var slideChanged = false;
							var newChildOffset = helpers.calcActiveOffset(settings, (xScrollStartPosition - eventX - edgeDegradation) * -1, childrenOffsets, stageWidth, infiniteSliderOffset[sliderNumber], numberOfSlides, undefined, sliderNumber);
							var tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides)%numberOfSlides;

							if(settings.infiniteSlider) {
								
								if(tempOffset != activeChildInfOffsets[sliderNumber]) {
									slideChanged = true;
								}
									
							} else {
							
								if(newChildOffset != activeChildOffsets[sliderNumber]) {
									slideChanged = true;
								}
							
							}
							
							if(slideChanged) {

								activeChildOffsets[sliderNumber] = newChildOffset;
								activeChildInfOffsets[sliderNumber] = tempOffset;
								snapOverride = true;
								
								if(settings.onSlideChange != '') {
									settings.onSlideChange(new helpers.args(settings, scrollerNode, $(scrollerNode).children(':eq(' + tempOffset + ')'), tempOffset));
								}
								
							}
							
						}
						
					});
					
					$(touchSelection).bind('touchend.iosSliderEvent', function(e) {

						var e = e.originalEvent;
						
						if(isUnselectable) return true;
						
						if(e.touches.length != 0) {
							
							for(var j = 0; j < e.touches.length; j++) {
								
								if(e.touches[j].pageX == lastTouch) {
									helpers.slowScrollHorizontal(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, settings);
								}
								
							}
							
						} else {
							
							helpers.slowScrollHorizontal(scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, settings);
							
						}
						
						preventXScroll = false;
						
					});
					
					if(!isTouch) {

						var eventObject = $(window);
	
						if(isIe8 || isIe7) {
							var eventObject = $(document); 
						}
						
						$(eventObject).bind('mouseup.iosSliderEvent' + sliderNumber, function(e) {

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
							
							if(parseFloat($().jquery) >= 1.6) {
							
								$(scrollerNode).children(':eq(' + activeChildOffsets[sliderNumber] + ')').find('*').each(function() {
													
									var clickObject = $(this).data('events');

									if(clickObject != undefined) {
										if(clickObject.click != undefined) {

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
									}
									
								});
							
							}
							
							if(!isEventCleared[sliderNumber]) {
								
								$(touchSelection).css({
									cursor: grabOutCursor
								});
								
								isMouseDown = false;
								
								if(currentSlider == undefined) {
									return false;
								}

								helpers.slowScrollHorizontal(currentSlider, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, settings);
								
								currentSlider = undefined;
							
							}
							
							preventXScroll = false;
							
						});
						
					} 
				
				}
				
			});	
			
		},
		
		destroy: function(clearStyle, node) {
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				if(clearStyle == undefined) {
		    		clearStyle = true;
		    	}
		    	
	    		helpers.autoSlidePause(data.sliderNumber);
		    	isEventCleared[data.sliderNumber] = true;
		    	$(window).unbind('.iosSliderEvent-' + data.sliderNumber);
		    	$(document).unbind('.iosSliderEvent-' + data.sliderNumber);
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
		    		$(data.settings.unselectableSelector).attr('style', '');
	    		}
	    		
	    		if(data.settings.scrollbar) {
	    			$('.scrollbarBlock' + data.sliderNumber).remove();
	    		}
	    		
	    		var scrollTimeouts = slideTimeouts[data.sliderNumber];
	    		
	    		for(var i = 0; i < scrollTimeouts.length; i++) {
					clearTimeout(scrollTimeouts[i]);
				}
	    		
	    		$this.removeData('iosslider');
		    	
			});
		
		},
		
		update: function(node) {
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function() {

				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				methods.destroy(false, this);
				data.settings.startAtSlide = activeChildOffsets[data.sliderNumber] + 1;
				methods.init(data.settings, this);

				if(data.settings.onSliderUpdate != '') {
			    	data.settings.onSliderUpdate(new helpers.args(data.settings, data.scrollerNode, $(data.scrollerNode).children(':eq(' + activeChildOffsets[data.sliderNumber] + ')'), activeChildOffsets[data.sliderNumber]%data.infiniteSliderOffset));
			    }
		    	
			});
		
		},
		
		addSlide: function(slideNode, slidePosition) {

			return this.each(function() {
				
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
				
				if(slidePosition <= data.numberOfSlides) {
					$(data.scrollerNode).children(':eq(' + (slidePosition - 1) + ')').before(slideNode);
				} else {
					$(data.scrollerNode).children(':eq(' + (slidePosition - 2) + ')').after(slideNode);
				}
				
				if(activeChildOffsets[data.sliderNumber] > (slidePosition - 2)) {
					activeChildOffsets[data.sliderNumber]++;
				}
				methods.update(this);
			
			});
		
		},
		
		removeSlide: function(slideNumber) {
		
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;

				$(data.scrollerNode).children(':eq(' + (slideNumber - 1) + ')').remove();
				if(activeChildOffsets[data.sliderNumber] > (slideNumber - 1)) {
					activeChildOffsets[data.sliderNumber]--;
				}
				methods.update(this);
			
			});
		
		},
		
		goToSlide: function(slide, node) {
			
			if(node == undefined) {
				node = this;
			}
			
			return $(node).each(function() {
					
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;
					
				slide = (slide - 1 + infiniteSliderOffset[data.sliderNumber])%data.numberOfSlides;
				
				if(data.settings.infiniteSlider) {

					var middle = data.numberOfSlides * 0.5;
					var half = (middle + activeChildOffsets[data.sliderNumber]) % data.numberOfSlides;
					var direction = (slide < half) ? 1 : -1;
					/*slide = slide + data.infiniteSliderOffset;
					
					if((direction < 0) && ((activeChildOffsets[data.sliderNumber]%data.numberOfSlides) < middle)) {
						slide = slide - data.infiniteSliderOffset;
					}
					
					if((direction > 0) && ((activeChildOffsets[data.sliderNumber]%data.numberOfSlides) > middle)) {
						slide = slide + data.infiniteSliderOffset;
					}*/
				}
				
				helpers.changeSlide(slide, $(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.settings);
				
				activeChildOffsets[data.sliderNumber] = slide;

			});
			
		},
		
		/* Locks the slider. Temporarily disabling touch events within the slider without unbinding them. */
		lock: function() {
			
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;

				touchLocks[data.sliderNumber] = true;
			
			});
			
		},
		
		/* Unlocks the slider. Enables touch events previously disabled by the lock method. */
		unlock: function() {
		
			return this.each(function() {
			
				var $this = $(this);
				var data = $this.data('iosslider');
				if(data == undefined) return false;

				touchLocks[data.sliderNumber] = false;
			
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