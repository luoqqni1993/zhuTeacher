function getGoodsList(){function a(a){goodsBox.empty();for(var s in a){var o=a[s].goodsListImg,t=a[s].goodsName,d=1*a[s].price,i=a[s].discount/10,l=d;0!=i&&(l=d/(a[s].discount/10)),l=l.toFixed(2);var e=goodsLiDom.clone(!1);e.find("img").attr("src",o),e.find(".goods-name").text(t),e.find(".text").find("span").text("¥ "+d),e.find(".text").find("del").text("¥ "+l),goodsBox.append(e)}}var s="",o=0;if(arguments[0]&&(s="classID="+arguments[0],o=arguments[0]),0==goodsPageData.length)$.ajax({url:"http://datainfo.duapp.com/shopdata/getGoods.php",type:"post",dataType:"JSONP",data:s,success:function(s){var t={classID:o,dataList:s};goodsPageData.push(t),a(s)}});else{for(var t in goodsPageData)if(goodsPageData[t].classID==arguments[0]){var d=goodsPageData[t].dataList;return void a(d)}$.ajax({url:"http://datainfo.duapp.com/shopdata/getGoods.php",type:"post",dataType:"JSONP",data:s,success:function(s){var t={classID:o,dataList:s};goodsPageData.push(t),a(s)}})}}var goodsBox=$(".goods-list"),goodsLiDom=goodsBox.find("li").clone(!1),classBox=$(".goods-class.portrait").find("ul"),classLiDom=classBox.find("li").clone(!1),lClassBox=$(".goods-class.landscape").find("ul"),lClassLiDom=lClassBox.find("li").clone(!1),goodsPageData=[];$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(a){a=JSON.parse(a),classBox.empty(),lClassBox.empty();for(var s in a){var o=lClassLiDom.clone(!1);0==s&&o.addClass("active"),o.find(".iconfont").html(a[s].icon),o.find(".class-name").text(a[s].className),o.attr("data-classID",a[s].classID);var t=classLiDom.clone(!1);t.attr("data-classID",a[s].classID),t.find("a").html(a[s].icon),classBox.append(t)}$(".goods-class").find("li").click(function(){var a=$(this).attr("data-classID");getGoodsList(a),$(".goods-class").find(".active").removeClass("active"),$(this).addClass("active")});var d=a.length;classBox.width(.57*d+"rem")}),getGoodsList();