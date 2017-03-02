var options = {
	loaded: false,
	single: false
};

var imgs = document.querySelectorAll('img.image-loading');
var i;
for(i = 0; i < imgs.length; ++i) {
	imgs[i].src = imgs[i].getAttribute('data-foo');
	imgs[i].setAttribute('onload',"this.setAttribute('class','image-loaded');");
	imgs[i].removeAttribute('data-src');
}

function checkLoaded(){
	return ($('.portfolio-picture img').length == $('.portfolio-picture img.image-loaded').length);
}

function initSlider(o_SLIDER) {
	$(o_SLIDER).on('init',function(a,slider){
		if($(slider.$slides))
		{
			$(this).addClass('initiated');
		}
	});
	$(o_SLIDER).slick({
		dots: true,
		infinite: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		speed: 500,
		fade: false,
		arrows: false
	});
	return $(o_SLIDER);
}

function equalizeHeight(c_ITEMS) {
	var i_tallest = 0;
	c_ITEMS.each(function() {
		var i_height = 0;
		$(this).children().each(function(){
			i_height += $(this).outerHeight(true);
			$(this).data('height',$(this).outerHeight(true));
		});
		if(i_height > i_tallest) {
			i_tallest = i_height;
		}
		if(options.single) {
			$(this).height(i_height);
		}
		$(this).data('xheight',i_height);
	});

	if(!options.single){
		c_ITEMS.height(i_tallest);
	}
}

$(document).ready(function(){

	$('.slick-slider').each(function(){
		initSlider(this);
	});
	$('.portfolio-img').on('load',function(event){
		var loaded = options.loaded;
		$(this).removeClass('image-loading');
		$(this).addClass('image-loaded');
		equalizeHeight($('.portfolio-article'));

		options.single = ($('article.portfolio-article').get(0).clientWidth == $('article.portfolio-article').first().parent().get(0).clientWidth);
		options.loaded = ($('.portfolio-picture img').length == $('.portfolio-picture img.image-loaded').length);
		if(options.loaded != loaded){
			equalizeHeight($('.portfolio-article'));
		}
	});
	equalizeHeight($('.portfolio-article'));

	$(document).on('show.bs.modal',function(event){
		$(event.relatedTarget).find('.slick-slider').first().each(function(){
			$(this).slick("unslick");
			$(this).attr("class","slick-slider");
		});

		var context = $(event.relatedTarget).clone();
		$('#more-info .modal-showcase').html($(context).html());
		$('#more-info .modal-showcase .slick-slider').first().each(function(){
			initSlider(this);
		});
		$(event.relatedTarget).find('.slick-slider').each(function(){
			initSlider(this);
		});
		$('#more-info p').removeClass('portfolio-teaser');
	});
});

$(window).resize(function(){
	options.single = ($('article.portfolio-article').get(0).clientWidth == $('article.portfolio-article').first().parent().get(0).clientWidth);
	if(!options.loaded){
		options.loaded = checkLoaded();
	}
	if(options.loaded){
		equalizeHeight($('.portfolio-article'));
	}
});