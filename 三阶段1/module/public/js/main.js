var swiper = new Swiper(".swiper-container",{
	direction : 'vertical',
	speed : 1000,
	noSwipingClass : 'stop-swiping',
	mousewheelControl : true,
	onInit: function(swiper){
		var index = swiper.activeIndex + 1;
      $("#nav-" + index).addClass("active");
   	},
   	onSlideChangeEnd : function(swiper){
   	},
	onSlideChangeStart : function(swiper){
   		$(".pageBox").find("a").removeClass("active");
   		var index = swiper.activeIndex + 1;
      	$("#nav-" + index).addClass("active");
      	
		if(swiper.activeIndex == 0){
			$(".panel").attr("class","panel");
		}else{
			$(".panel").attr("class","panel state"+swiper.activeIndex);
		}
	}
});

$(".pageBox").find("a").click(function(){
	var index = $(this).attr("id");
	index = index.split("-")[1] - 1;
	swiper.slideTo(index);
});
//
//$("#nav-1").click(function(){
//	swiper.slideTo(0);
//});
