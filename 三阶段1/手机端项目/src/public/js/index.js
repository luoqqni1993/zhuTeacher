var bannerBox,bannerSlide,indexGoodsBox,indexGoodsLi,searchGoodsBox,searchGoodsLi;

pageInit();

function pageInit(){


	// 获取幻灯片盒子对象,以及子模板对象
	bannerBox = $(".index-banner").find(".swiper-wrapper");
	bannerSlide = bannerBox.find(".swiper-slide").clone(false);

	//获取首页商品列表盒子对象,以及子模板对象
	indexGoodsBox = $(".index-goods-list");
	indexGoodsLi = indexGoodsBox.find("li").clone(false);

	// 获取搜索结果列表盒子对象,以及子模板对象
	searchGoodsBox = $(".search-list");
	searchGoodsLi = searchGoodsBox.find("li").clone(false);

	getIndex();

	$(".search-bar").find("input").change(function(){
		var text = $(this).val();

		if(!text){
			$(".index-search").removeClass("show");
		}
	});

	$(".search-btn").click(function(){

		var wa = waiting("正在搜索");

		var text = $(".search-bar").find("input").val();


		$.ajax({
			url : "http://datainfo.duapp.com/shopdata/selectGoodes.php",
			type : "post",
			dataType : "JSONP",
			data : "selectText="+text,
			success : function(data){
				wa();
				console.log(data);
				if(data == 0){
					var none = $("<p>没有找到相关商品</p>");
					$(".index-search").append(none);
				}else{
					loadSearchList(data);
				}
					$(".index-search").addClass("show");
			}
		});
	});
}

//获取首页数据
function getIndex(){

	var dd = waiting("正在加载");

	var bnr=false,lit=false;


	//获取商品列表
	$.ajax({
		url : "http://datainfo.duapp.com/shopdata/getGoods.php",
		type : "post",
		dataType : "JSONP",
		success : function(data){
			loadIndexList(data);

			lit = true;

			if(bnr){
				dd();
			}

		}
	});

	//获取幻灯片
	$.ajax({
		url : "http://datainfo.duapp.com/shopdata/getBanner.php",
		type : "post",
		dataType : "JSONP",
		success : function(data){
			loadBanner(data);

			bnr = true;

			if(lit){
				dd();
			}
		}
	});
}

//渲染幻灯片
function loadBanner(data){
	bannerBox.empty();

	for(var i in data){
		var dom = bannerSlide.clone(false);

		var goodsID = data[i].goodsID;
		var imgSrc = JSON.parse(data[i].goodsBenUrl)[0];

		dom.find("a").attr("data-goodsID",goodsID);
		dom.find("img").attr("src",imgSrc);

		bannerBox.append(dom);
	}

	var mySwiper = new Swiper(".swiper-container",{
		autoplay : 3000,
		loop : true
	});

	console.log(data);
}

//渲染首页商品列表
function loadIndexList(data){
	indexGoodsBox.empty();

	for(var i in data){
		var dom = indexGoodsLi.clone(false);

		var imgSrc = data[i].goodsListImg;
		var goodsName = data[i].goodsName;
		var price = data[i].price*1;
		var discount = data[i].discount*1;
		var oldPrice = price;

		if(discount != 0){
			discount = discount/10;
			oldPrice = price/discount;
		}

		oldPrice = oldPrice.toFixed(2);

		dom.find("img").attr("src",imgSrc);
		dom.find(".goods-name").text(goodsName);
		dom.find(".price-box").find("span").text("¥"+price);
		dom.find(".price-box").find("del").text("¥"+oldPrice);
		dom.find(".discount").find("span").text(discount);

		indexGoodsBox.append(dom);
		
	}
}

// 渲染搜索页搜索列表
function loadSearchList(data){
	searchGoodsBox.empty();

	for(var i in data){
		var dom = searchGoodsLi.clone(false);

		var imgSrc = data[i].goodsListImg;
		var goodsName = data[i].goodsName;
		var price = data[i].price*1;
		var discount = data[i].discount*1;
		var oldPrice = price;

		if(discount != 0){
			discount = discount/10;
			oldPrice = price/discount;
		}

		oldPrice = oldPrice.toFixed(2);

		dom.find("img").attr("src",imgSrc);
		dom.find(".goods-name").text(goodsName);
		dom.find(".price-box").find("span").text("¥"+price);
		dom.find(".price-box").find("del").text("¥"+oldPrice);
		dom.find(".discount").find("span").text(discount);

		searchGoodsBox.append(dom);
	}

}


