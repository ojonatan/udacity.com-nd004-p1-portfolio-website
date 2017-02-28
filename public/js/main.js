var options = {
	loaded: false
};

function checkLoaded(){
	return ($('.portfolio-picture img').length == $('.portfolio-picture img.image-loaded').length);
}

function equalizeHeight(c_ITEMS) {
	var i_tallest = 0;
	c_ITEMS.each(function() {
		var i_height = 0;
		$(this).children().each(function(){
			i_height += $(this).outerHeight(true);
		});
		if(i_height > i_tallest) {
			i_tallest = i_height;
		}
	});
	c_ITEMS.height(i_tallest);
}

$(document).ready(function(){
	$('.slick-slider').slick({
		dots: true,
		infinite: true,
		slidesToShow: 1,
		speed: 500,
		fade: false,
		arrows: false
	});

	$('.portfolio-img').on('load',function(event){
		var loaded = options.loaded;
		$(this).removeClass('image-loading');
		$(this).addClass('image-loaded');

		options.loaded = ($('.portfolio-picture img').length == $('.portfolio-picture img.image-loaded').length);
		if(options.loaded != loaded){
			equalizeHeight($('.portfolio-article'));
		}
	});
	$(window).resize();
});

$(window).resize(function(){
	$('.portfoilio-teaser').each(function(i){
		$clamp(
			this,
			{
				clamp: 'auto'
			}
		);
		$(this).css('visibility', 'visible');
	});
	$('.portfolio-article').each(function(x){
		console.log($(this).height());
	});
	if(!options.loaded){
		options.loaded = checkLoaded();
	}
	if(options.loaded){
		equalizeHeight($('.portfolio-article'));
	}
});