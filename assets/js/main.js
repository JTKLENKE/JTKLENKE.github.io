/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);


const galleryArray = document.getElementsByClassName("gallery");
let currentSlidesArray = Array(galleryArray.length).fill(0);

var currentSlides = {};

 // Loop to insert key & value in this object one by one
for(var i = 0; i < galleryArray.length; i++){ 
    currentSlides[galleryArray[i]] =  currentSlidesArray[i];

	showSlide(galleryArray[i])
} 

// Next/previous controls
function changeSlide(n, caller) {
 	 currentSlides[caller.parentElement] += n;
  	showSlide(caller.parentElement);
}

// Thumbnail image controls
function setSlide(n, caller) {	
	currentSlides[caller.parentElement.parentElement.parentElement] = n;
  	showSlide(caller.parentElement.parentElement.parentElement);
}

function showSlide(instance) {
  let i;
  let slides = [...instance.children].filter(element => element.classList.contains("slide"));
  let previews = findDemoDivs(instance)
  let slideIndex = currentSlides[instance];
  slideIndex = (((slideIndex%slides.length)+slides.length)%slides.length);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < previews.length; i++) {
    previews[i].className = previews[i].className.replace(" active", "");
  }
  slides[slideIndex].style.display = "block";
  previews[slideIndex].className += " active";
}

function findDemoDivs(node) {
	let demoDivs = [];
	if (node.childNodes.length == 0) return demoDivs;
	
	for (let i = 0; i < node.childNodes.length; i++) {
		demoDivs = demoDivs.concat(findDemoDivs(node.childNodes[i]));
	}
	
	demoDivs = demoDivs.concat([...node.children].filter(element => element.classList.contains("preview")));
	

	return demoDivs;
  }
/** working code 

let slideIndex = 0;
showSlide(slideIndex);

// Next/previous controls
function changeSlide(n) {
  slideIndex += n;
  showSlide();
}

// Thumbnail image controls
function setSlide(n) {
  slideIndex = n;
  showSlide();
}

function showSlide() {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("demo");
  slideIndex = (slideIndex%slides.length) + 1;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

*/



/*
let slideShows = document.getElementsByClassName("slideshow-container");
let currentSlideArray = new Array(slideShows.length).fill(0);

slideShows.array.forEach(element => {
	showSlide(0, element)
});


function changeSlide(direction, parent) {
  currentSlide += direction
  showSlide(currentSlide);
  
}

function showSlide(n, parent) {
  let htmlCollection = parent.children
  let images = [].filter.call(
    htmlCollection, element => [].includes.call(elements.classList, "mySlides fade")
)//document.getElementsByClassName("mySlides fade");
  n = n%images.length
  for (let i = 0; i < images.length; i++){
	images[i].style.display = "none";
  }
  images[n].style.display = "block";
}
*/