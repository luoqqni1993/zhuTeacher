$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
	data = JSON.parse(data);

	//竖屏状态下的导航栏容器对象
	var classBox = $(".goods-class.portrait").find("ul");
	// 竖屏状态下的导航栏列表对象
	var liDom = classBox.find("li").clone(false);

	//横屏状态下的导航栏容器对象
	var lClassBox = $(".goods-class.landscape").find("ul");
	//横屏状态下的导航栏列表对象
	var lLiDom = lClassBox.find("li").clone(false);

	//清空竖屏状态下的导航栏盒子
	classBox.empty();

	//清空横屏状态下的导航栏盒子
	lClassBox.empty();
	for(var i in data){

		var lLi = lLiDom.clone(false);
		if(i == 0){
			lLi.addClass("active");	
		}
		lLi.find(".iconfont").html(data[i].icon);
		lLi.find(".class-name").text(data[i].className);

		lClassBox.append(lLi);


		//竖屏
		var li = liDom.clone(false);
		if(i == 0){
			li.addClass("active");	
		}

		li.find("a").html(data[i].icon);

		classBox.append(li);
	}

	var num = data.length;
	
	classBox.width(num*0.57+"rem");
});

$.ajax({
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	type:"post",
	dataType : "JSONP",
	success :function(data){

		var goodsBox = $(".goods-list");
		var liDom = goodsBox.find("li").clone(false);
		goodsBox.empty();

		for(var i in data){
			var imgSrc = data[i].goodsListImg;
			var goodsName = data[i].goodsName;
			var price = data[i].price*1;
			var discount = data[i].discount/10;
			var oldPrice = price;
			if(discount != 0){
				oldPrice = price/(data[i].discount/10);
			}

			oldPrice = oldPrice.toFixed(2);

			var li = liDom.clone(false);

			li.find("img").attr("src",imgSrc);
			li.find(".goods-name").text(goodsName);
			li.find(".text").find("span").text("¥ "+price);
			li.find(".text").find("del").text("¥ "+oldPrice);

			goodsBox.append(li);
			
		}

	}
});