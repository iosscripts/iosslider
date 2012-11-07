<h1>Changelog</h1>

<h4>2012/11/07 - v1.1.32</h4>

<ul>
	<li>Added dynamic variables for slider to jQuery.data() object.<li>
	<li>slideChanged added to callback array</li>
	<li>targetSlideNumber/targetSlideObject added to callback array</li>
	<li>args.currentSlideNumber changed from base 0 to base 1 number returned in callbacks</li>
	<li>Performance improvements</li>
	<li>Updated infinite sliding to remove cloned slides</li>
	<li>Added option <em>snapSlideCenter</em>: (boolean) When snapToChildren is true, this option will snap the slide to the center of the draggable area.</li>
</ul>

<h4>2012/08/23 - v1.0.38</h4>

<ul>
	<li>Added callback: <em>onSliderUpdate</em></li>
	<li>Added option: <em>keyboardControls</em></li>
	<li>Improved jQuery support from 1.6+ to 1.4+</li>
	<li>Added public methods: <em>lock</em>, <em>unlock</em></li>
	<li>Added options: <em>stageCSS</em>, <em>sliderCSS</em></li>
	<li>Added options: <em>scrollbarDrag</em>, <em>scrollbarElasticPullResistance</em></li>
	<li>Added public methods: <em>update</em>, <em>addSlide</em>, <em>removeSlide</em></li>
	<li>Support for firefox/opera (android) added.</li>
	<li>Resolved issue #51</li>
	<li>Added new args for function callbacks: sliderContainerObject, numberOfSlides</li>
	<li>Added new callback option <em>onSlideStart</em>. Check Setting for details</li>
	<li>Fixed an issue where next/prev buttons not working</li>
	<li>Broke option <em>responsiveSlideWidth</em> into 2 options: <em>responsiveSlideContainer</em> and <em>responsiveSlides</em></li>
	<li>Resolved issue #40</li>
	<li>Improved slide animation efficiency by ~30%.</li>
	<li>Updated disclaimer.</li>
</ul>
				
<h4>2012/06/26 - v0.9.4.7 (beta)</h4>

<ul>
	<li>Added option: <em>scrollbarContainer</em>. The scrollbar will be loaded and contained by this selection. The scrollbar width will be defined by this container.</li>
	<li>Fixed issue #11, #15, #18, #20, #21, #22, #23, #25, #27, #30, #31, #32, #33, #34, #36</li>
	<li>Fixed issue where rapid window resizing causes slides to jump.</li>
	<li>Fixed issue preventing sliding beyond +/-1 slide while <em>snapToSlide</em> is active.</li>
	<li>Fixed iosslider breaking in minified version.</li>
	<li><em>onSlideComplete</em> returning inconsistent data sets between the goToSlide function and click+drag behavior.</li>
	<li>Changed option name: <em>autoSlideSpeed</em> to <em>autoSlideTransTimer</em>.</li>
	<li>Fixed a rounding issue where <em>autoSlideTransTimer</em> could not be set to 0.</li>
	<li>Fixed <em>startAtSlide</em> not initializing.</li>
	<li>Fixed a float bug with package example 4.</li>
	<li>Issue with anchor click/onclick breaking slider.</li>
	<li>Auto slide and then resize browser not saving current slide offset.</li>
	<li>Responsive slide height not resizing properly.</li>
	<li>Destroy not removing autoslide completely.</li>
	<li>Destroy not removing resize/orientation change triggers completely.</li>
	<li>Changing slides via <em>goToSlide</em>/<em>nextSlide</em>/<em>prevSlide</em>/<em>navSlide</em> now resets autoslide timer.</li>
	<li>Removed ability to reinitialize slider without destroying first.</li>
	<li>Fixed ie7/ie8 infinite slide duplication issue.</li>
	<li><em>ResposiveSlideWidth</em> calculation now controls height.</li>
	<li><em>ResposiveSlideWidth</em> calculation is based off parent element.</li>
	<li><em>ResposiveSlideWidth</em> now manages slides individually, width/height calculations only applied to specific elements.</li>
	<li>Fixed issue when <em>autoSlide</em>, <em>next/prev/gotoslide</em> functions were not maintaining correct slide information and jumping.</li>
	<li>Bulletproofing added to <em>destroy</em> method.</li>
</ul>

<h4>2012/04/12 - v0.9 (beta)</h4>

<ul>
	<li>Fixed infinite oversliding issue.</li>
	<li>Reworked codebase to follow jQuery plugin specifications more closely.</li>
	<li>Improved handling of parameters passed to slider functions.</li>
	<li>Added new public methods <em>destroy</em>, <em>goToSlide</em>. (See Public Methods for usage)</li>
	<li>IE7/8 scrollbar opacity bug fixed.</li>
	<li>IE7/8 default border width bug fixed.</li>
	<li>Automatic sliding options added: autoScroll, autoScrollTImer, autoScrollToggleSelector. (see Settings &amp; Options for usage)</li>
	<li>Desktop support for IE7+ Added.</li>
	<li>Added (or re-added) options: onSlideComplete, infiniteSlider. (see Settings &amp; Options for usage)</li>
	<li>New option: responsiveSlideWidth. (see Settings &amp; Options for usage)</li>
	<li>Various improvements made to 'responsive' slider designs.</li>
	<li>New options: navSlideSelector, navPrevSelector, navNextSelector, autoSlideSpeed. (see Settings &amp; Options for usage)</li>
</ul>

<h4>2012/02/27 - v0.8 (beta)</h4>

<ul>
	<li>New options: startAtSlide, onSliderLoaded, onSlideChange. (see Settings &amp; Options for usage)</li>
	<li>Deprecated options: onSlideComplete, onSlideStart.</li>
	<li>Adaptive, landscape/portrait switching (or screen resizing on desktop) now supported.</li>
	<li>Giant performance improvements/memory leak fixes.</li>
	<li>Fallback click+drag option for Firefox/Chrome/Safari added.</li>
	<li>Enabled normal page scrolling when dragging vertically on the slider.</li>
	<li>Added check to disable slider if contents of slider are less than slider width.</li>
	<li>Elasticity on right side of slider fixed.</li>
	<li>Small slides stopping/changing direction incorrectly fixed.</li>
</ul>

<h4>2012/01/26 - v0.7 (beta)</h4>

<ul>
	<li>Removed option 'snapToDirection'.</li>
	<li>Default 'elasticFrictionCoefficient' value changed from 0.8 to 0.6.</li>
	<li>Slider default behavior changed to mimic iOS home screen.</li>
	<li>Slider sometimes bouncing backwards when sliding to quickly from edge fixed. (Thanks to tomh for the find)</li>
</ul>

<h4>2012/01/24 - v0.6 (beta)</h4>

<ul>
	<li>New option 'snapToDirection' added. (see Settings &amp; Options above for usage)</li>
	<li>Overall performance improvements.</li>
	<li>Unresponsive anchor links fixed. (Thanks to Robin for the find)</li>
</ul>

<h4>2011/11/29 - v0.4 (beta)</h4>

<ul>
	<li>Overall performance improvements.</li>
	<li>Slider overflow inaccuracy fixed.</li>
	<li>Slider snap/stop location inaccuracy fixed.</li>
	<li>Modified default <em>frictionCoefficient</em> value.</li>
	<li>Multi-touching slider causing unintentional 'jumping' fixed.</li>
</ul>

<h4>2011/11/21 - v0.3 (beta)</h4>

<ul>
	<li>Launch of beta.</li>
</ul>