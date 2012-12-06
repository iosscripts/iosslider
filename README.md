<h1>iosSlider</h1>

<p>iosSlider is a <a href="http://jquery.com" target="_blank">jQuery</a> plugin which allows you to integrate a customizable, cross-browser content slider into your web presence. Designed for use as a <strong>content slider</strong>, <strong>carousel</strong>, <strong>scrolling website banner</strong>, or <strong>image gallery</strong>.</p>
					
<h2>Features</h2>

<ul>
	
	<li>Hardware accelerated using CSS3 for supported iOS, Android and WebKit browsers.</li>

	<li>Responsive support to work with the most dynamic desktop and mobile sites.</li>

	<li>Tons of API callbacks to get the perfect slider feel for your web application.</li>
	
	<li>FF/Safari/Chrome/IE7+ Full modern browser support for desktop.</li>
	
	<li>Infinitely looping Loop through your slides endlessly in both directions.</li>
	
	<li>Auto-sliding Set your slider to automatically transition and pause on hover.</li>

</ul>

<h2>Tutorial</h2>

<h4>Getting Ready</h4>

<p>To get started, you will need to download the iosSlider script. Click <a href = 'http://iosscripts.com/iosslider/' target = '_blank'>here</a> to download the latest version. This download contains the iosSlider script, the jQuery library, and source files for the examples shown above.</p>

<h4>Include the Necessary JavaScript Files</h4>

<p>The <a href="http://jquery.com" target="_blank">jQuery</a> library and iosSlider Plugin scripts must be included in the HTML header of the web page. The jQuery library must be included first for the iosSlider plugin to function.</p>

<pre>
&lt;!-- jQuery library --&gt;
&lt;script type = 'text/javascript' src = '/iosSlider/jquery-1.6.1.min.js'&gt;&lt;/script&gt;

&lt;!-- iosSlider plugin --&gt;
&lt;script type = 'text/javascript' src = '/iosSlider/jquery.iosslider.js'&gt;&lt;/script&gt;
</pre>

<h4>Add the HTML</h4>

<p>Add the iosSlider HTML code within the body of the web page. The HTML can contain as little as one slide element, but if you want to leverage the <em>snapToChildren</em> setting, you will need to use multiple slides.</p>

<pre>
&lt;!-- slider container --&gt;
&lt;div class = 'iosSlider'&gt;
	
	&lt;!-- slider --&gt;
	&lt;div class = 'slider'&gt;
	
		&lt;!-- slides --&gt;
		&lt;div class = 'slide'&gt;...&lt;/div&gt;
		&lt;div class = 'slide'&gt;...&lt;/div&gt;
		&lt;div class = 'slide'&gt;...&lt;/div&gt;

	&lt;/div&gt;

&lt;/div&gt;
</pre>

<h4>Add the CSS</h4>

<p>Place the CSS in your stylesheet. The <em>required</em> CSS attributes are included to guarantee optimal performance. Feel free to apply as many other CSS attributes as you want. To see some <em>real-world</em> examples of this, check the examples folder of the <a href = 'http://iosscripts.com/iosslider/' target = '_blank'>iosSlider</a> download.</p>

<pre>
/* slider container */
.iosSlider {
	/* required */
	position: relative;
	top: 0;
	left: 0;
	overflow: hidden;
	
	/* optional */
	width: 630px;
	height: 214px;
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

	/* optional */
	width: 630px;
	height: 214px;
}
</pre>

<h4>Add the JavaScript</h4>

<p>Add the code below to your JavaScript file. The following code uses the jQuery selector to fire the iosSlider jQuery plugin. If you are unfamiliar with jQuery, here is <a href="http://docs.jquery.com/Tutorials:How_jQuery_Works" target="_blank">a tutorial</a> to get you started.</p>

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

</div>
					
<h2>Settings & Options</h2>

<p>You can pass along any of the following key/value pairs listed below to the iosSlider() function or modify them within the iosSlider JavaScript file directly.</p>

<h3>Basic Settings & Options</h3>

<table class="api">
<thead>
<tr>
<th width="25%">Key</th>
<th width="10%">Value</th>
<th width="55%">Description</th>
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
<td>(decimal, 0.0 - 1.0) Additonal friction coefficient applied when momentum/user moves slides outside the bounds of the slider.</td>
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
<td>(string) A jQuery selection (ex. $('#scrollbarContainer') ), the scrollbar will be loaded and contained by this selection. The scrollbar will width will be defined by this container.</td>
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
<td>infiniteSlider</td>
<td>false</td>
<td>(boolean) Makes the slider loop in both directions infinitely with no end. When set to true, the option <em>scrollbar</em> is automatically disabled.</td>
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

<table class="api">
<thead>
<tr>
<th width="25%">Key</th>
<th width="10%">Value</th>
<th width="55%">Description</th>
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
	slideChanged,
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
/* General variables. These variables are set during initialization, window resize, orientation change, and via the 'update' public method */
$('.iosSlider').iosSlider('data', {
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
$('.iosSlider').iosSlider('args', {
	sliderObject,
	sliderContainerObject,
	targetSlideObject,
	targetSlideNumber,
	currentSlideObject,
	currentSlideNumber,
	currentSliderOffset
}
</pre>
					
<h2>Public Methods</h2>

<table class="api">
	<thead>
		<tr>
			<th width="30%">Method</th>
			<th width="70%">Description</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>$('div').iosSlider('destroy');</td>
			<td>Destroys the selected slider.<br /><em>Optional parameter: 'clearStyle' (boolean, default: true) when iosSlider is destroyed, all inline style applied to the slider will be removed.</em></td>
		</tr>
		
		<tr>
			<td>$('div').iosSlider('goToSlide', slideNum);</td>
			<td>Moves to the selected slide.<br /><em>Required parameter: 'slideNumber' (integer, default: null)</em></td>
		</tr>
		
		<tr>
			<td>$('div').iosSlider('update');</td>
			<td>Updates/reinitializes internal variables/CSS attributes based on changes to the HTML/CSS/JS structure of the slider.</td>
		</tr>
		
		<tr>
			<td>$('div').iosSlider('addSlide', slideHTML, slidePosition);</td>
			<td>Adds a slide defined by 'slideHTML' and placed at position 'slidePosition'.<br /><em>Required parameters: 'slideHTML' (string, default: null), 'slidePosition' (integer, default: null)</em></td>
		</tr>
		
		<tr>
			<td>$('div').iosSlider('removeSlide', slideNum);</td>
			<td>Removes a slide from the slider.<br /><em>Required parameter: 'slideNumber' (integer, default: null)</em></td>
		</tr>
		
		<tr>
			<td>$('div').iosSlider('lock');</td>
			<td>Locks the slider. Temporarily disabling touch/drag events within the slider without unbinding them.</td>
		</tr>
		
		<tr>
			<td>$('div').iosSlider('unlock');</td>
			<td>Unlocks the slider. Enables touch/drag events previously disabled by the lock method.</td>
		</tr>
	</tbody>
</table>

<h2>License</h2>

<p>iosSlider is licensed under the <a href = 'http://creativecommons.org/licenses/by-nc/3.0/' target = '_blank'>Creative Commons &ndash; Attribution-NonCommercial 3.0</a> License.</p>

<h3>Personal or non-profit</h3>

<p>You may use iosSlider free for personal or non-profit purposes, without restriction. Attribution is not required but always appreciated.</p>

<h3>Commercial</h3>

<p>For commercial projects, you must <a href = 'http://sites.fastspring.com/iosscripts/product/iosslider' target = '_blank'>purchase a license</a>. You may download and play with the script before deciding to fully implement it in your project. Making sure you are satisfied, and knowing iosSlider is the right script for your project is paramount.</p>

<p>You are not permitted to make the resources found on iosscripts.com available for distribution elsewhere without prior consent. If you would like to feature iosSlider on your site, please do not link directly to the resource zip files. Please link to this page (http://iosscripts.com/iosslider) on iosscripts.com where users can find the download.</p>