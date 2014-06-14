jQuery(document).ready(function ($) {
  // toTop
	$.scrollToTop();
	
	// Browser Selector
	$.browserSelector();
	
	// Mobile Menu
	$('header .region-header-menu').mobileMenu();
	
	// Add Button Class
	$(".contact-form .form-actions input[type='submit']").addClass("btn btn-primary btn-large");
	$("#search-block-form .form-actions").addClass("btn-primary");
  $("#search-block-form--2 .form-actions").addClass("btn-primary");
  $(".comment-form .form-actions input[type='submit']").addClass("btn-primary btn-large");
  
  $(".comment-form .form-type-textfield").addClass("span4");
  
  $(".contact-form .form-item-name").addClass("span3");
  $(".contact-form .form-item-mail").addClass("span3");
  $(".contact-form .form-item-subject").addClass("span6");
  
	
	// Tooltip
	$("a[rel=tooltip]").tooltip();
	
	// prettyPhoto
	$(window).load(function() {
	  $("a[rel^='flickr']").prettyPhoto();
  }); 
	
	// Post slider
  $('.post-image .flexslider').flexslider({
    slideshow: false,  
    animation: "slide"
  });
  
  // Testimonials slider
  $('.testimonials .flexslider').flexslider({
    slideshow: false,  
    animation: "slide",
    controlNav: false
  }); 
  
  // Portfolio slider
  $('.portfolio-wrap .flexslider').flexslider({
    slideshow: false,  
    animation: "slide"
  });
  
  // Recent posts block slider
  $('.recent-posts .flexslider').flexslider({
    animation: "slide",
    slideshow: false, 
    animationLoop: false,
    directionNav: false,
    itemWidth: 300,
    itemMargin: 0
  });
  
  // Elements page slider
  $('.elements-slider .flexslider').flexslider({
    animation: "slide",
    slideshow: false, 
    animationLoop: false,
    controlNav: false,
    maxVisibleItems: 1
  });
  
  // Client slider
  $('.client-carousel .flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    directionNav: false,
    itemWidth: 200,
    itemMargin: 0
  });
	
	// Dropdown arrow for menu
	$('li.dropdown a').append('<i class="icon-angle-down"></i>');
	  
  // Circle Slider
	if($("#fcSlideshow").get(0)) {
		$("#fcSlideshow").flipshow();
		
		setInterval( function() {
			$("#fcSlideshow div.fc-right span:first").click();
		}, 3000);
		
	}
			
	// Nivo Slider
	if($("#nivoSlider").get(0)) {
		$("#nivoSlider").nivoSlider();
	}
	
	// Cloud Animation
	function cloud() {
		$(".cloud").animate( {"top": "+=20px"}, 3000, "linear", cloud )
		$(".cloud").animate( {"top": "-=20px"}, 3000, "linear", cloud );	
	}
	cloud();
	
	// Isotope filters	
  $("ul.sort-source").each(function() {

		var source = $(this);
		var destination = $("ul.sort-destination[data-sort-id=" + $(this).attr("data-sort-id") + "]");

		if(destination.get(0)) {

			var minParagraphHeight = 0;
			var paragraphs = $("span.thumb-info-caption p", destination);

			paragraphs.each(function() {
				if($(this).height() > minParagraphHeight)
					minParagraphHeight = $(this).height();
			});

			paragraphs.height(minParagraphHeight);

			$(window).load(function() {

				destination.isotope({
					itemSelector: "li",
					layoutMode : "fitRows"
				});

				source.find("a").click(function(e) {

					e.preventDefault();

					var $this = $(this);

					source.find("li.active").removeClass("active");
					$(this).parent().addClass("active");

					destination.isotope({
						filter: $this.parent().attr("data-option-value")
					});

					return false;

				});

			});

		}

	});  	
			
});