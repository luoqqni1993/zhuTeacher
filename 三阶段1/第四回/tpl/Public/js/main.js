

/* 滚轮函数 */
var scrollFunc=function(e){ 
    e=e || window.event; 
    var t2=document.getElementById("detail"); 
    if(e.wheelDelta){//IE/Opera/Chrome 
		if(e.wheelDelta < 0){
			if($(".page_title").attr("class").indexOf("run")!=-1){}else{
				if($(".menu a.on").index()<5){
					var index = $(".menu a.on").index()+1;
					page_goTo(index);
				}
			}
		}else{
			if($(".page_title").attr("class").indexOf("run")!=-1){}else{
				if($(".menu a.on").index()>0){
					var index = $(".menu a.on").index()-1;
					page_goTo(index);
				}
			}
		}
    }else if(e.detail){//Firefox 
		if(e.detail > 0){
			if($(".page_title").attr("class").indexOf("run")!=-1){}else{
				if($(".menu a.on").index()<5){
					var index = $(".menu a.on").index()+1;
					page_goTo(index);
				}
			}
		}else{
			if($(".page_title").attr("class").indexOf("run")!=-1){}else{
				if($(".menu a.on").index()>0){
					var index = $(".menu a.on").index()-1;
					page_goTo(index);
				}
			}
		}
    } 
}

/*注册鼠标滚轮函数*/ 
if(document.addEventListener){ 
    document.addEventListener('DOMMouseScroll',scrollFunc,false); 
}//W3C 
/* 鼠标滚轮监听 */
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome 

$(function(){

		//alert(window.screen.height);
		if(window.screen.height < 900){
			$("#css_box").attr("href","../Public/css/style768.css");
			
				$(".p1_main_img.img1").addClass("show");
				$(".p1_main_img.img2").addClass("show");
		}else if(window.screen.height < 1024){
			$("#css_box").attr("href","../Public/css/style900.css");
		}else if(window.screen.height < 1080){
			$("#css_box").attr("href","../Public/css/style1024.css");
		}else{
			/* 执行首页动画 */
			page1_animation("show");
		}
		//$("#css_box").attr("href","../Public/css/style.css");
		
		
		$(".menu a").click(function(){
			if($(this).attr("class") == "on" || $(".page_title").attr("class").indexOf("run")!=-1){
			}else{
				var index = $(this).index();
				page_goTo(index);
			}
		});
		
		$(".download_btn").click(function(){
			if($(".page_title").attr("class").indexOf("run")!=-1){}else{
					page_goTo(5);
			}
		});
		
	})

	
/* 页面切换 */
function page_goTo(index){
				var mh = $(".page_opt").height();
				var oldIndex = $(".menu a.on").index();
				$(".main").animate({top:-mh*index,opacity:1},800);
				$(".menu a.on").removeClass("on");
				//$(this).addClass("on");
				$(".menu a").eq(index).addClass("on");
				$(".page_title").addClass("rotation_main_"+index);
				$(".page_title").addClass("run");
				
				/* 判断将去往哪个页面 */
				if(index == 0){//首页
					page1_animation("show");
				}else if(index == 1){
					page2_animation("show");
				}else if(index == 2){
					page3_animation("show");
				}else if(index == 3){
					page4_animation("show");
				}else if(index == 4){
					page5_animation("show");
				}else if(index == 5){
					$(".btm_page_title").addClass("showi");
					$(".btm_page_title").addClass("run");
				}
				
				/* 判断从哪个页面离开 */
				if(oldIndex == 0){//首页
					page1_animation("hide");
				}else if(oldIndex == 1){
					page2_animation("hide");
				}else if(oldIndex == 2){
					page3_animation("hide");
				}else if(oldIndex == 3){
					page4_animation("hide");
				}else if(oldIndex == 4){
					page5_animation("hide");
				}else if(oldIndex == 5){
					$(".btm_page_title").addClass("hidei");
					$(".btm_page_title").addClass("run");
				}
				
				if(index != 0){					
					$(".p_icon p.index").fadeOut(400);
				}else{
					$(".p_icon p.index").fadeIn(400);
				}
				for (var i=1;i<5;i++)
				{
					$(".icon"+i).addClass("rotation_"+index);
					$(".icon"+i).addClass("run");
					
					
					$(".icon"+i).fadeIn(300);//显示图标模块
				}
				
				/* 隐藏和显示副标题 */
				if(0< index <5){
				
					$(".p_icon.icon"+index+" p.page").show(300);
					$(".p_icon.icon"+oldIndex+" p.page").hide(300);
				}
				
				var timeout1 = setTimeout(function(){
					$(".page_title").removeClass("run");
					$(".page_title").removeClass("rotation_main"+oldIndex);
					$(".page_title").removeClass("rotation_main_"+index);
					$(".page_title").addClass("rotation_main"+index);
					
					/* 更换下载页背景class */
					if(index == 5){
						$(".btm_page_title").removeClass("run");
						$(".btm_page_title").removeClass("showi");
						$(".btm_page_title").removeClass("hide");
						$(".btm_page_title").addClass("show");
					}else if(oldIndex == 5){
						$(".btm_page_title").removeClass("run");
						$(".btm_page_title").removeClass("hidei");
						$(".btm_page_title").removeClass("show");
						$(".btm_page_title").addClass("hide");
					}
					
					
					for (var i=1;i<5;i++)
					{
						$(".icon"+i).removeClass("run");
						$(".icon"+i).removeClass("rotation"+oldIndex);
						$(".icon"+i).removeClass("rotation_"+index);
						$(".icon"+i).addClass("rotation"+index);
						
						
						if(index != 0 && i != index && index != 5){
							$(".icon"+i).fadeOut(300);
						}
					}
					
				},1400);
}

	/* 首页页面动画 */
		function page1_animation(sth){
			if(sth == "show"){
				$(".p1_main_img.img1").addClass("showi");
				$(".p1_main_img.img1").addClass("run");
				
				$(".p1_main_img.img2").addClass("showi");
				$(".p1_main_img.img2").addClass("run");
				
			}else if(sth == "hide"){
				$(".p1_main_img.img1").addClass("hidei");
				$(".p1_main_img.img1").addClass("run");
				
				$(".p1_main_img.img2").addClass("hidei");
				$(".p1_main_img.img2").addClass("run");
			}else{}
			
			setTimeout(function(){
				if(sth == "show"){
					$(".p1_main_img.img1").removeClass("run");
					$(".p1_main_img.img1").removeClass("showi");
					$(".p1_main_img.img1").removeClass("hide");
					$(".p1_main_img.img1").addClass("show");
					
					$(".p1_main_img.img2").removeClass("run");
					$(".p1_main_img.img2").removeClass("showi");
					$(".p1_main_img.img2").removeClass("hide");
					$(".p1_main_img.img2").addClass("show");
				}else if(sth == "hide"){
					$(".p1_main_img.img1").removeClass("run");
					$(".p1_main_img.img1").removeClass("hidei");
					$(".p1_main_img.img1").removeClass("show");
					$(".p1_main_img.img1").addClass("hide");
					
					$(".p1_main_img.img2").removeClass("run");
					$(".p1_main_img.img2").removeClass("hidei");
					$(".p1_main_img.img2").removeClass("show");
					$(".p1_main_img.img2").addClass("hide");
				}else{
					alert("参数传递错误");
				}
			},1300);
		}
/* 第二页页面动画 */
function page2_animation(sth){
	if(sth == "show"){
				$("h3.p2_title").addClass("showi");
				$("h3.p2_title").addClass("run");
				
				$("h4.p2_title").addClass("showi");
				$("h4.p2_title").addClass("run");
				
			}else if(sth == "hide"){
				//$("h3.p2_title").addClass("hidei");
				//$("h3.p2_title").addClass("run");
				
				//$("h4.p2_title").addClass("hidei");
				//$("h4.p2_title").addClass("run");
			}else{}
	
	setTimeout(function(){
				if(sth == "show"){
					$("h3.p2_title").removeClass("run");
					$("h3.p2_title").removeClass("showi");
					$("h3.p2_title").removeClass("hide");
					$("h3.p2_title").addClass("show");
					
					$("h4.p2_title").removeClass("run");
					$("h4.p2_title").removeClass("showi");
					$("h4.p2_title").removeClass("hide");
					$("h4.p2_title").addClass("show");
				}else if(sth == "hide"){
					$("h3.p2_title").removeClass("run");
					$("h3.p2_title").removeClass("hidei");
					$("h3.p2_title").removeClass("show");
					$("h3.p2_title").addClass("hide");
					
					$("h4.p2_title").removeClass("run");
					$("h4.p2_title").removeClass("hidei");
					$("h4.p2_title").removeClass("show");
					$("h4.p2_title").addClass("hide");
				}else{
					alert("参数传递错误");
				}
			},1300);
}
	
/* 第三页页面动画 */
function page3_animation(sth){
	if(sth == "show"){
		$(".p3_img_pack").addClass("show");
		$(".p3_img_pack").addClass("run");
	}else if(sth == "hide"){
		
	}
	setTimeout(function(){
		if(sth == "show"){
			$(".p3_img_pack").removeClass("show");
			$(".p3_img_pack").removeClass("run");
		}else if(sth == "hide"){
			
		}
	},1300);
}
/* 第四页页面动画 */
function page4_animation(sth){
	if(sth == "show"){
		$(".p4_img").addClass("showi");
		$(".p4_img").addClass("run");
	}else if(sth == "hide"){
		//$(".p4_img").addClass("hidei");
		//$(".p4_img").addClass("run");
	}
	setTimeout(function(){
		if(sth == "show"){
			$(".p4_img").removeClass("showi");
			$(".p4_img").removeClass("hide");
			$(".p4_img").removeClass("run");
			$(".p4_img").addClass("show");
		}else if(sth == "hide"){
			$(".p4_img").removeClass("hidei");
			$(".p4_img").removeClass("show");
			$(".p4_img").removeClass("run");
			$(".p4_img").addClass("hide");
		}
	},1300);
}
/* 第五页页面动画 */
function page5_animation(sth){
	if(sth == "show"){
		$(".p5_img").addClass("showi");
		$(".p5_img").addClass("run");
	}else if(sth == "hide"){
		//$(".p5_img").addClass("hidei");
		//$(".p5_img").addClass("run");
	}
	setTimeout(function(){
		if(sth == "show"){
			$(".p5_img").removeClass("showi");
			$(".p5_img").removeClass("hide");
			$(".p5_img").removeClass("run");
			$(".p5_img").addClass("show");
		}else if(sth == "hide"){
			$(".p5_img").removeClass("hidei");
			$(".p5_img").removeClass("show");
			$(".p5_img").removeClass("run");
			$(".p5_img").addClass("hide");
		}
	},1300);
}	
/* 首页幻灯片 */		
jQuery(function ($) {
    if ($(".slide-pic").length > 0) {
        var defaultOpts = { interval: 3000, fadeInTime: 300, fadeOutTime: 200 };
        var _titles = $("ul.slide-txt li");
        var _titles_bg = $("ul.op li");
        var _bodies = $("ul.slide-pic li");
        var _count = _titles.length;
        var _current = 0;
        var _intervalID = null;
        var stop = function () { window.clearInterval(_intervalID); };
        var slide = function (opts) {
            if (opts) {
                _current = opts.current || 0;
            } else {
                _current = (_current >= (_count - 1)) ? 0 : (++_current);
            };
            _bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime, function () {
                _bodies.eq(_current).fadeIn(defaultOpts.fadeInTime);
                _bodies.removeClass("cur").eq(_current).addClass("cur");
            });
            _titles.removeClass("cur").eq(_current).addClass("cur");
            _titles_bg.removeClass("cur").eq(_current).addClass("cur");
        };
        var go = function () {
            stop();
            _intervalID = window.setInterval(function () { slide(); }, defaultOpts.interval);
        };
        var itemMouseOver = function (target, items) {
            stop();
            var i = $.inArray(target, items);
            slide({ current: i });
        };
        _titles.hover(function () { if ($(this).attr('class') != 'cur') { itemMouseOver(this, _titles); } else { stop(); } }, go);
        _bodies.hover(stop, go);
        go();
    }
});