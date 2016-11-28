var swiper = new Swiper(".swiper-container",{
	direction : 'vertical',
	speed : 1000,
	pagination : ".swiper-pagination",
	noSwipingClass : 'stop-swiping',
	mousewheelControl : true,
	paginationClickable: true,
	onInit: function(swiper){
		var index = swiper.activeIndex + 1;
      $("#nav-" + index).addClass("active");
   	},
   	paginationBulletRender : function(index,className){
   		var arr = ["首页","找游戏","领礼包","游戏预告","快乐赚","下载应用"];
   		return "<span class='swiper-pagination-bullet'>"+arr[index]+"</span>";
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
