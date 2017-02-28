var options = {
	loaded: false
};
function equalizeHeight(c_ITEMS) {
console.log("PROOROR");
	var i_tallest = 0;
	c_ITEMS.each(function() {
		var i_height = 0;
console.log("ART " + 		$(this).outerHeight(true));
		$(this).children().each(function(){
console.log("Found " + 		$(this).outerHeight(true));
			i_height += $(this).outerHeight(true);
		});
console.log("HEIGHT EL " + 	i_height);
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
		$(this).removeClass('image-loading');
		$(this).addClass('image-loaded');
console.log($('.portfolio-picture img').length+"/"+ $('.portfolio-picture img.image-loaded').length);
console.log($('.portfolio-img').length+"---/"+ $('.image-loaded').length);
console.log(":::"+options.loaded);
	});
	$(window).resize();
});

$(window).resize(function(){
		console.log($('.portfolio-img').length+"/"+ $('.image-loaded').length);
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
		options.loaded = ($('.portfolio-picture img').length == $('.portfolio-picture img.image-loaded').length);
	}
	if(options.loaded){
console.log("ssssssssssss");
		equalizeHeight($('.portfolio-article'));
	}
});