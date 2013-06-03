<h1><strong>iosslider</strong> &ndash; Touch Enabled, Responsive jQuery Horizontal Content Slider/Carousel/Image Gallery Plugin</h1>

<p class = 'intro' itemprop = 'description'>iosslider is a <a target="_blank" href="http://jquery.com">jQuery</a> plugin which allows you to integrate a customizable, cross-browser content slider into your web presence. Designed for use as a <strong>content slider</strong>, <strong>carousel</strong>, <strong>scrolling website banner</strong>, or <strong>image&nbsp;gallery</strong>.</p>

<h2>Features</h2>

<ul>
	<li>Hardware accelerated - Using CSS3 for supported iOS, Surface, Android and WebKit browsers.</li>
	<li>Responsive support - To work with the most dynamic desktop and mobile sites.</li>
	<li>Non-intrusive JavaScript - Respects your code first. No unnecessary CSS attribute overrides or event bindings.</li>
	<li>Tons of API callbacks - To get the perfect slider feel for your web application.</li>
	<li>FF/Safari/Chrome/IE7+ - Full modern browser support for desktop.</li>
	<li>iOS/Surface/Android - Support for a wide range of mobile operating systems and platforms.</li>
	<li>Infinitely looping - Loop through your slides endlessly in both directions.</li>
	<li>Auto-sliding - Set your slider to automatically transition and pause on hover.</li>
	<li>Custom scrollbars - Over a dozen settings to control placement, look and feel, and user interaction.</li>
	<li>Slide Navigation - Built-in support for slide indicators and next/previous buttons.</li>
	<li>Robust demo package - Download package includes working examples of all features.</li>
	<li>First class service - Your license includes premium customer service from experienced plugin developers.</li>
</ul>

<h2>Browser Support Details</h2>

<h3>iOS - iPhone / iPad / iPod Touch</h3>
						
<table class = 'data'>
	
	<col></col>
	<col width = '1%'></col>
	
	<thead>
		<tr>
			<th>Browser</th>
			<th>Version</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>Safari</td>
			<td>4.0+</td>
		</tr>
		<tr>
			<td>Chrome</td>
			<td>19.0+</td>
		</tr>
	</tbody>
</table>

<h3 style = 'margin-top: 20px;'>Surface - Multi-platform</h3>

<table class = 'data'>
	
	<col></col>
	<col width = '1%'></col>
	
	<thead>
		<tr>
			<th>Browser</th>
			<th>Version</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>Internet Explorer</td>
			<td>10+</td>
		</tr>
	</tbody>
</table>
	
<h3>Desktop - Windows / Mac</h3>

<table class = 'data'>
	
	<col></col>
	<col width = '1%'></col>
	
	<thead>
		<tr>
			<th>Browser</th>
			<th>Version</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>Firefox</td>
			<td>5.0+</td>
		</tr>
		<tr>
			<td>Chrome</td>
			<td>19.0+</td>
		</tr>
		<tr>
			<td>Safari</td>
			<td>5.0+</td>
		</tr>
		<tr>
			<td>Internet Explorer</td>
			<td>7+</td>
		</tr>
	</tbody>
</table>

<h3>Android - Multi-platform</h3>

<table class = 'data'>
	
	<col></col>
	<col width = '1%'></col>
	
	<thead>
		<tr>
			<th>Browser</th>
			<th>Version</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>Stock</td>
			<td>2.3+</td>
		</tr>
		<tr>
			<td>Firefox</td>
			<td>18.0+</td>
		</tr>
		<tr>
			<td>Chrome</td>
			<td>19.0+</td>
		</tr>
		<tr>
			<td>Opera</td>
			<td>12.0+</td>
		</tr>
	</tbody>
</table>

<p>iosslider may work in earlier versions of browsers listed, but are not supported at this time.</p>

<h2 id = 'installation-and-setup'><a class = 'driverLink' name = 'installation-and-setup'></a>Installation &amp; Setup</h2>

<h3>Getting Ready</h3>

<p>To get started, you will need to download the iosslider script. The download package contains the iosslider script, the jQuery library, demos and benchmarks.</p>

<h3>Include the Necessary JavaScript Files</h3>

<p>The <a href="http://jquery.com" target="_blank">jQuery</a> library and iosslider Plugin scripts must be included in the HTML header of the web page. The jQuery library must be included first for the iosslider plugin to function.</p>

<pre>
&lt;!-- jQuery library --&gt;
&lt;script type = 'text/javascript' src = 'jquery-1.4.min.js'&gt;&lt;/script&gt;

&lt;!-- iosslider plugin --&gt;
&lt;script type = 'text/javascript' src = 'jquery.iosslider.js'&gt;&lt;/script&gt;
</pre>

<h3>Add the HTML</h3>
					
<p>Add the iosslider HTML code within the body of the web page. The HTML can contain as little as one slide element.</p>

<pre>
&lt;div class = 'iosslider'&gt;

	&lt;!-- slider --&gt;
	&lt;div class = 'slider'&gt;
	
		&lt;!-- slides --&gt;
		&lt;div class = 'slide'&gt;...&lt;/div&gt;
		&lt;div class = 'slide'&gt;...&lt;/div&gt;
		&lt;div class = 'slide'&gt;...&lt;/div&gt;
	
	&lt;/div&gt;

&lt;/div&gt;
</pre>

<h3>Add the CSS</h3>

<p>Place the CSS in your stylesheet. The <em>required</em> CSS attributes are included to guarantee optimal performance. Feel free to apply as many other CSS attributes as you want. To see some <em>real-world</em> examples of this, check the demos folder of the iosslider download package.</p>

<pre>
/* slider container */
.iosSlider {
	/* required */
	position: relative;
	top: 0;
	left: 0;
	overflow: hidden;
	
	width: <slider width>px;
	height: <slider height>px;
}

/* slider */
.iosSlider .slider {
	/* required */
	width: 100%;
	height: 100%;
}

/* slide */
.iosSlider .slider .slide {
	/* required */
	float: left;

	width: <slide width>px;
	height: <slide height>px;
}
</pre>

<h3>Add the JavaScript</h3>

<p>Add the code below to your JavaScript file. The following code uses the jQuery selector to initialize the iosslider jQuery plugin. If you are unfamiliar with jQuery, here is <a href="http://docs.jquery.com/Tutorials:How_jQuery_Works" target="_blank">a tutorial</a> to get you started.</p>

<pre>
$(document).ready(function() {

	/* basic - default settings */
	$('.iosSlider').iosSlider();
	
	/* some custom settings */
	$('.iosSlider').iosSlider({
		snapToChildren: true,
		scrollbar: true,
		scrollbarHide: false,
		desktopClickDrag: true,
		scrollbarLocation: 'bottom',
		scrollbarHeight: '6px',
		scrollbarBackground: 'url(_img/some-img.png) repeat 0 0',
		scrollbarBorder: '1px solid #000',
		scrollbarMargin: '0 30px 16px 30px',
		scrollbarOpacity: '0.75',
		onSlideChange: changeSlideIdentifier
	});

});
</pre>

<h2 id = 'settings-and-options'><a class = 'driverLink' name = 'settings-and-options'></a>Settings & Options</h2>

<p>You can pass along any of the following key/value pairs listed below to the iosSlider() function or modify them within the iosslider JavaScript file directly.</p>
					
<h3>Basic Settings & Options</h3>

<table class = 'data'>

	<thead>
		<tr>
			<th width="25%">Key</th>
			<th width="10%">Value</th>
			<th width="56%">Description</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>elasticPullResistance</td>
			<td>0.6</td>
			<td>(decimal, 0.0 - 1.0) The elastic resistance when pulling on the slider edge.</td>
		</tr>
		<tr>
			<td>frictionCoefficient</td>
			<td>0.92</td>
			<td>(decimal, 0.0 - 1.0) The friction coefficient applied to the momentum on touch release affecting the rate of deceleration.</td>
		</tr>
		<tr>
			<td>elasticFrictionCoefficient</td>
			<td>0.6</td>
			<td>(decimal, 0.0 - 1.0) Additonal friction coefficient applied when momentum slides outside the bounds of the slider.</td>
		</tr>
		<tr>
			<td>snapFrictionCoefficient</td>
			<td>0.92</td>
			<td>(decimal, 0.0 - 1.0) Friction applied to the slider when snapping to an element.</td>
		</tr>
		<tr>
			<td>snapToChildren</td>
			<td>false</td>
			<td>(boolean) Slider will slide to the closest child element on touch release.</td>
		</tr>
		<tr>
			<td>snapSlideCenter</td>
			<td>false</td>	
			<td>(boolean) When snapToChildren is true, this option will snap the slide to the center of the draggable area.</td>
		</tr>
		<tr>
			<td>startAtSlide</td>
			<td>1</td>
			<td>(integer) Current slide when slider is initially loaded.</td>
		</tr>
		<tr>
			<td>scrollbar</td>
			<td>false</td>
			<td>(boolean) Show or hide the scrollbar.</td>
		</tr>
		<tr>
			<td>scrollbarDrag</td>
			<td>false</td>
			<td>(boolean) Enables click/drag, touch/drag functionality on the scrollbar. When enabled, the options scrollbar and scrollbarHide are automatically set to true and false respectively.</td>
		</tr>
		<tr>
			<td>scrollbarHide</td>
			<td>true</td>
			<td>(boolean) Show or hide the scrollbar when it is idle.</td>
		</tr>
		<tr>
			<td>scrollbarLocation</td>
			<td>'top'</td>
			<td>(string, 'bottom' or 'top') Location that the scrollbar will appear.</td>
		</tr>
		<tr>
			<td>scrollbarContainer</td>
			<td>''</td>
			<td>(string) A jQuery selection (ex. $('#scrollbarContainer') ), the scrollbar will be loaded and contained by this selection. The scrollbar width will be defined by this container.</td>
		</tr>
		<tr>
			<td>scrollbarOpacity</td>
			<td>0.4</td>
			<td>(decimal) The css opacity of the scrollbar when visible.</td>
		</tr>
		<tr>
			<td>scrollbarHeight</td>
			<td>'4px'</td>
			<td>(string) The css height in 'px' of the scrollbar.</td>
		</tr>
		<tr>
			<td>scrollbarBorder</td>
			<td>'none'</td>
			<td>(string) The css border of the scrollbar.</td>
		</tr>
		<tr>
			<td>scrollbarMargin</td>
			<td>'5px'</td>
			<td>(string) The css margin of the scrollbar.</td>
		</tr>
		<tr>
			<td>scrollbarBackground</td>
			<td>'none'</td>
			<td>(string) The css background of the scrollbar.</td>
		</tr>
		<tr>
			<td>scrollbarBorderRadius</td>
			<td>'100px'</td>
			<td>(string) The css border-radius of the scrollbar.</td>
		</tr>
		<tr>
			<td>scrollbarShadow</td>
			<td>'none'</td>
			<td>(string) The css box-shadow of the scrollbar.</td>
		</tr>
		<tr>
			<td>scrollbarElasticPullResistance</td>
			<td>0.9</td>
			<td>(decimal, 0.0 - 1.0) Additonal friction coefficient applied to the scrollbar when momentum/user moves slides outside the bounds of the slider.</td>
		</tr>
		<tr>
			<td>desktopClickDrag</td>
			<td>false</td>
			<td>(boolean) Desktop click and drag fallback for the desktop slider.</td>
		</tr>
		<tr>
			<td>keyboardControls</td>
			<td>false</td>
			<td>(boolean) Left/right keyboard arrows can be used to navigate the slider.</td>
		</tr>
		<tr>
			<td>tabToAdvance</td>
			<td>false</td>
			<td>(boolean) Tab key can be used to navigate the slider forward.</td>
		</tr>
		<tr>
			<td>responsiveSlideContainer</td>
			<td>true</td>
			<td>(boolean) Width of slide container becomes responsive to the width/height of its parent element. Slide container dynamically collapse to the width/height of the parent element when wider/taller.</td>
		</tr>
		<tr>
			<td>responsiveSlides</td>
			<td>true</td>
			<td>(boolean) Width of slides becomes responsive to the width/height of its parent element. Slides dynamically collapse to the width/height of the parent element of the slider when wider/taller.</td>
		</tr>
		<tr>
			<td>navSlideSelector</td>
			<td>null</td>
			<td>(string) A jQuery selection (ex. $('.navButtons .button') ), each element returned by the selector will activate navigation to each slide respectively. ie. element 0 when clicked (or touched) will animate to the first slide and so on.</td>
		</tr>
		<tr>
			<td>navPrevSelector</td>
			<td>null</td>
			<td>(string) A jQuery selection (ex. $('#previousSlide') ), the element returned by the selector will navigate to the previous slide when clicked.</td>
		</tr>
		<tr>
			<td>navNextSelector</td>
			<td>null</td>
			<td>(string) A jQuery selection (ex. $('#nextSlide') ), the element returned by the selector will navigate to the next slide when clicked.</td>
		</tr>
		<tr>
			<td>autoSlide</td>
			<td>false</td>
			<td>(boolean) Enables automatic cycling through slides.</td>
		</tr>
		<tr>
			<td>autoSlideTimer</td>
			<td>5000</td>
			<td>(integer) the time (in milliseconds) that a slide will wait before automatically navigating to the next slide.</td>
		</tr>
		<tr>
			<td>autoSlideTransTimer</td>
			<td>750</td>
			<td>(integer) the time (in milliseconds) required for all automatic animations to move between slides. See <em>navSlideSelector</em>, <em>navPrevSelector</em>, <em>navNextSelector</em> for details on activating elements for automatic sliding.</td>
		</tr>
		<tr>
			<td>autoSlideToggleSelector</td>
			<td>null</td>
			<td>(string) A jQuery selection (ex. $('#autoScrollToggle') ), the element returned by the selector will disable/enable automatic scrolling when clicked. Note: Only works when <em>autoSlide</em> is set to 'true'.</td>
		</tr>
		<tr>
			<td>autoSlideHoverPause</td>
			<td>true</td>
			<td>(boolean) Enables pausing of the autoSlide function when the user mouses over the slider area.</td>
		</tr>
		<tr>
			<td>infiniteSlider</td>
			<td>false</td>
			<td>(boolean) Makes the slider loop in both directions infinitely with no end. When set to true, the option <em>scrollbar</em> is automatically disabled.</td>
		</tr>
		<tr>
			<td>snapVelocityThreshold</td>
			<td>5</td>
			<td>Minimum slide velocity threshold required to trigger slide snapping to next/previous slide.</td>
		</tr>
		<tr>
			<td>slideStartVelocityThreshold</td>
			<td>0</td>
			<td>Minimum slide velocity threshold required to begin slider movement.</td>
		</tr>
		<tr>
			<td>horizontalSlideLockThreshold</td>
			<td>5</td>
			<td>Minimum slide velocity threshold required to lock vertical sliding in the browser.</td>
		</tr>
		<tr>
			<td>verticalSlideLockThreshold</td>
			<td>3</td>
			<td>Minimum slide velocity threshold required to lock horizontal slider movement.</td>
		</tr>
		<tr>
			<td>stageCSS</td>
			<td>{ position: 'relative', top: '0', left: '0', overflow: 'hidden', zIndex: 1 }</td>
			<td>(object) The customizable CSS of the stage object.</td>
		</tr>
		
		<tr>
			<td>sliderCSS</td>
			<td>{ overflow: 'hidden' }</td>
			<td>(object) The customizable CSS of the slider object.</td>
		</tr>
		
		<tr>
			<td>unselectableSelector</td>
			<td>null</td>
			<td>(string) A jQuery selection (ex. $('.unselectable') ), each element returned by the selector will become removed from touch/click move events.</td>
		</tr>
	</tbody>
</table>

<h3>Advanced Settings & Options</h3>

<p>Advanced callbacks allow further customization through end user created functions/hooks. For additional information regarding parameters supplied to these callbacks, see parameter object details directly below the following table.</p>
		
<table class = 'data'>

	<thead>
		<tr>
			<th width="25%">Key</th>
			<th width="10%">Value</th>
			<th width="56%">Description</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>onSliderLoaded</td>
			<td>null</td>
			<td>(function) Executed when slider has finished loading initially.</td>
		</tr>
		<tr>
			<td>onSliderUpdate</td>
			<td>null</td>
			<td>(function) Executed when public method 'update' has been completed.</td>
		</tr>
		<tr>
			<td>onSliderResize</td>
			<td>null</td>
			<td>(function) Executed when the window has been resized or a device has been rotated.</td>
		</tr>
		<tr>
			<td>onSlideStart</td>
			<td>null</td>
			<td>(function) Executed when the slider has begun to move.</td>
		</tr>
		<tr>
			<td>onSlideChange</td>
			<td>null</td>
			<td>(function) Executed when the slider has entered the range of a new slide.</td>
		</tr>
		<tr>
			<td>onSlideComplete</td>
			<td>null</td>
			<td>(function) Executed when the slider has come to a stop on a new slide.</td>
		</tr>
	</tbody>
</table>

<h3>Callback Parameter Object Details</h3>

<p>All callback functions listed above return the same object, for our example, we will call this object 'args'.</p>

<pre>
args = {
	settings: {
		/* all basic/advanced settings & options from above */
	},
	data: {
		obj,
		settings,
		scrollerNode,
		numberOfSlides,
		sliderNumber,
		childrenOffsets,
		sliderMax,
		scrollbarClass,
		scrollbarWidth, 
		scrollbarStageWidth,
		stageWidth, 
		scrollMargin, 
		scrollBorder, 
		infiniteSliderOffset, 
		infiniteSliderWidth
	},
	sliderObject,
	sliderContainerObject,
	targetSlideObject,
	targetSlideNumber,
	currentSlideObject,
	currentSlideNumber,
	currentSliderOffset
}
</pre>

<p>Accessing callback parameter data following the above object structure.</p>

<pre>
$('.iosSlider').iosSlider({
	onSlideChange: someCallback
});

function someCallback(args) {
	
	/* accessing user defined settings from initialization */
	var autoSlideToggleSelector = args.settings.autoSlideToggleSelector;
	
	/* accessing data from the slider object */
	var sliderMax = args.data.sliderMax;
	
	/* additional calculated variables supplied to the 'args' object */
	var currentSlideNumber = args.currentSlideNumber;

}
</pre>

<h3>jQuery .data() Object Details</h3>
		
<p>Additional public information is stored using the <a href = 'http://api.jquery.com/data/' target = '_blank'>jQuery.data()</a> object. For usage and access instructions, please consult the <a href = 'http://api.jquery.com/data/' target = '_blank'>jQuery.data() object reference</a>.</p>
					
<pre>
/* General variables. These variables are set during initialization,
 * window resize, orientation change, and via the 'update' public method 
 */
$('.iosSlider').data('iosslider', {
	obj,
	settings,
	scrollerNode,
	numberOfSlides,
	sliderNumber,
	childrenOffsets,
	sliderMax,
	scrollbarClass,
	scrollbarWidth, 
	scrollbarStageWidth,
	stageWidth, 
	scrollMargin, 
	scrollBorder, 
	infiniteSliderOffset, 
	infiniteSliderWidth
});

/* Dynamic variables. These variables are updated with every user interaction. */
$('.iosSlider').data('args', {
	sliderObject,
	sliderContainerObject,
	slideChanged,
	prevSlideNumber,
	prevSliderOffset
	targetSlideObject,
	targetSlideNumber,
	currentSlideObject,
	currentSlideNumber,
	currentSliderOffset
});
</pre>

<h2 id = 'public-methods'><a class = 'driverLink' name = 'public-methods'></a>Public Methods</h2>

<table class = 'data'>
	<thead>
		<tr>
			<th width="25%">Method</th>
			<th width="66%">Description</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>$(element).iosSlider('destroy');</td>
			<td>Destroys the selected slider.<br /><em>Optional parameter: 'clearStyle' (boolean, default: true) when iosslider is destroyed, all inline style applied to the slider will be removed.</em></td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('goToSlide', slideNum);</td>
			<td>Moves to the selected slide.<br /><em>Required parameter: 'slideNumber' (integer, default: null)</em></td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('prevSlide', slideNum);</td>
			<td>Slides to the previous slide.</td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('nextSlide', slideNum);</td>
			<td>Slides to the next slide.</td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('update');</td>
			<td>Updates/reinitializes internal variables/CSS attributes based on changes to the HTML/CSS/JS structure of the slider.</td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('addSlide', slideHTML, slidePosition);</td>
			<td>Adds a slide defined by 'slideHTML' and placed at position 'slidePosition'.<br /><em>Required parameters: 'slideHTML' (string, default: null), 'slidePosition' (integer, default: null)</em></td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('removeSlide', slideNum);</td>
			<td>Removes a slide from the slider.<br /><em>Required parameter: 'slideNumber' (integer, default: null)</em></td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('lock');</td>
			<td>Locks the slider. Temporarily disabling touch/drag events within the slider without unbinding them.</td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('unlock');</td>
			<td>Unlocks the slider. Enables touch/drag events previously disabled by the lock method.</td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('autoSlidePlay');</td>
			<td>Starts and enables auto-sliding on the slider.</td>
		</tr>
		
		<tr>
			<td>$(element).iosSlider('autoSlidePause');</td>
			<td>Stops the slider from auto-sliding.</td>
		</tr>
	</tbody>
</table>

<h2 id = 'licensing'><a class = 'driverLink' name = 'licensing'></a><a class = 'driverLink' name = 'download'></a>Licensing</h2>

<p>Licensing options can be found at <a href = 'http://iosscripts.com/iosslider/#licensing'>http://iosscripts.com/iosslider/#licensing</a></p>

<h2>Help & Support</h2>

<h3>Product Support</h3>

<p>Need help setting up one of our plugins? Drop us a line and we'll do our best to help.</p>

<p><a href = 'http://iosscripts.com/support/'>Access support</a></p>

<h3>Feature Request</h3>

<p>If you have an idea for a new feature or if our plugins are missing something your application needs, tell us about it and we'll consider adding it!</p>

<p><a href = 'http://iosscripts.com/contact/?f=feature'>Submit request</a></p>

<h3>Report a Bug</h3>

<p>If you think you might have found a bug in one of our plugins, let us know. We'll take a look under the hood and see if we can fix it.</p>

<p><a href = 'http://iosscripts.com/contact/?f=issue'>Submit a bug</a></p>