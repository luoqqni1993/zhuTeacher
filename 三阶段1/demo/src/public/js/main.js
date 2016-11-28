$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
	data = JSON.parse(data);

	var classBox = $(".goods-class").find("ul");
	var liDom = classBox.find("li").clone(false);
	classBox.empty();
	for(var i in data){
		var li = liDom.clone(false);
		if(i == 0){
			li.addClass("active");	
		}

		li.find("a").html(data[i].icon);

		$(".goods-class").find("ul").append(li);
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