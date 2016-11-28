//获取商品列表容器
var goodsBox = $(".goods-list");

//获取商品列表容器内的单个模板
var goodsLiDom = goodsBox.find("li").clone(false);

//竖屏状态下的导航栏容器对象
var classBox = $(".goods-class.portrait").find("ul");
// 竖屏状态下的导航栏列表对象
var classLiDom = classBox.find("li").clone(false);

//横屏状态下的导航栏容器对象
var lClassBox = $(".goods-class.landscape").find("ul");
//横屏状态下的导航栏列表对象
var lClassLiDom = lClassBox.find("li").clone(false);

//定义缓存对象列表
var goodsPageData = [];


//页面初始化的时候,获取商品分类列表(分类导航),并渲染到页面当中去
$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
	data = JSON.parse(data);


	

	//清空竖屏状态下的导航栏盒子
	classBox.empty();

	//清空横屏状态下的导航栏盒子
	lClassBox.empty();

	for(var i in data){

		var lLi = lClassLiDom.clone(false);
		if(i == 0){
			lLi.addClass("active");	
		}
		lLi.find(".iconfont").html(data[i].icon);
		lLi.find(".class-name").text(data[i].className);
		lLi.attr("data-classID",data[i].classID);

		//竖屏
		var li = classLiDom.clone(false);
		

		li.attr("data-classID",data[i].classID);
		li.find("a").html(data[i].icon);

		classBox.append(li);
	}

	//给商品分类绑定点击事件
	$(".goods-class").find("li").click(function(){
		//获取当前被点击的商品分类ID
		var classID = $(this).attr("data-classID");


		//调用数据渲染方法
		getGoodsList(classID);

		//更新选中样式
		$(".goods-class").find(".active").removeClass("active");
		$(this).addClass("active");

	});

	var num = data.length
	
	classBox.width(num*0.57+"rem");
});

//页面初始化时,默认加载的商品列表数据
getGoodsList();


//定义更新商品列表的函数:每次执行,都会在相应的地方重新更新dom元素
function getGoodsList(){

	var goodsData = "";//参数
	var gi = 0;

	if(!!arguments[0]){//有参数
		goodsData = "classID=" + arguments[0];//

		gi = arguments[0];
	}


	// if(!!arguments[1]){
	// 	goodsData = arguments[0];
	// }

	if(goodsPageData.length == 0){
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			type:"post",
			dataType : "JSONP",
			data : goodsData,
			success :function(data){

				//请求到数据之后,讲数据存放到缓存列表当中
				var abc = {
					classID:gi,
					dataList : data
				};

				goodsPageData.push(abc);


				domUpdate(data);

			}
		});
	}else{
		//对缓存对象做遍历,若有数据,则直接从缓存列表中获取数据
		for(var i in goodsPageData){
			if(goodsPageData[i].classID == arguments[0]){//缓存对象内有数据的情况,则直接调用缓存内的数据

				var data = goodsPageData[i].dataList;

				domUpdate(data);

				return;
			}
		}

		// 能到这一步,说明缓存列表当中没有想要的数据,应当从服务器请求数据

		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			type:"post",
			dataType : "JSONP",
			data : goodsData,
			success :function(data){

				//请求到数据之后,讲数据存放到缓存列表当中
				var abc = {
					classID:gi,
					dataList : data
				};

				goodsPageData.push(abc);


				domUpdate(data);

			}
		});

	}

	//定义渲染数据函数
	function domUpdate(data){
		goodsBox.empty();

			//数据渲染
			for(var i in data){

				//获取数据
				var imgSrc = data[i].goodsListImg;
				var goodsName = data[i].goodsName;
				var price = data[i].price*1;
				var discount = data[i].discount/10;
				var oldPrice = price;
				if(discount != 0){
					oldPrice = price/(data[i].discount/10);
				}

				oldPrice = oldPrice.toFixed(2);


				//处理数据
				var li = goodsLiDom.clone(false);

				li.find("img").attr("src",imgSrc);
				li.find(".goods-name").text(goodsName);
				li.find(".text").find("span").text("¥ "+price);
				li.find(".text").find("del").text("¥ "+oldPrice);

				//把标签加入到页面对应的dom当中去
				goodsBox.append(li);
				
			}
	}



	
}

/*
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
});*/