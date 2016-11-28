function show(text){
	var panel = $("<div class='prompt-panel'>"+text+"</div>");
	var times = 3000;

	if(!!arguments[1]){
		times = arguments[1];
	}

	$("body").append(panel);
	setTimeout(function(){
		panel.addClass("show");
	},1);

	setTimeout(function(){
		panel.removeClass("show");
		setTimeout(function(){
			panel.remove();
		},750);
	},times);
}

function addShopCar(obj){
	$.ajax({
		url : "http://datainfo.duapp.com/shopdata/updatecar.php",
		type : "post",
		data : obj,
		success : function(data){
			if(data == 0){
				show("购物车添加失败,请联系管理员");
			}else{
				show("更新购物车成功!");
			}
		}
	})
}


//显示等待画面
function waiting(text){
	var waitDom = $('<div class="waiting-box"><div class="iconfont icon-waiting"></div><p>'+text+'...</p></div>');

	$("body").append(waitDom);

	var killMe = function(){
		waitDom.remove();
	}

	//返回删除方法
	return killMe;
}













































