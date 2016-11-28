var swiper = new Swiper(".swiper-container",{
	direction : 'vertical',
	speed : 1000,
	noSwipingClass : 'stop-swiping',
	mousewheelControl : true,
	onSlideChangeStart : function(swiper){
		if(swiper.activeIndex == 0){
			$(".panel").attr("class","panel");
		}else{
			$(".panel").attr("class","panel state"+swiper.activeIndex);
		}
	}
});