var gulp = require("gulp");//引入gulp模块 赋给变量gulp
var less = require("gulp-less");//引入gulp-less模块
var cssClean = require("gulp-clean-css");//引入压缩css模块
var htmlmin = require("gulp-htmlmin");//引入html压缩模块
var connect = require("gulp-connect");//web服务器模块

//定义处理css相关的模块
gulp.task("css",function(){
	// gulp.src():用来抓取文件,参数为文件路径
	// gulp.dest():用来输出文件,参数为输出文件路径
	// .pipe():管道,用来放各种用来处理文件的模块
	gulp.src("src/public/less/*.less").pipe(less()).pipe(cssClean()).pipe(gulp.dest("dest/public/css"));
	gulp.src("src/public/css/*.css").pipe(gulp.dest("dest/css"));
});

gulp.task("watch",function(){

	//gulp.watch();传两个参数,第一个参数为被监听的文件路径,第二个参数,为数组,是当被监听的文件发生变化的时候,执行对应的模块内容
	// 当less路径下的所有less文件内容发生变化的时候,执行css压缩动作,并且执行css刷新动作
	gulp.watch("src/public/less/*.less",["css","cssload","htmlload"]);
	// 当src路径下的所有html文件内容发生变化的时候,执行html压缩动作,并且执行html刷新动作
	gulp.watch("src/*.html",["html","htmlload"]);
});


//web服务模块
gulp.task("server",function(){
	// 调用服务模块的server方法,参数为一个对象
	connect.server({
		root:"dest",//你的web服务器根目录
		port:8003,
		livereload:true
	});
});

//配置模块,执行刷新html动作
gulp.task("htmlload",function(){
	gulp.src("dest/*.html").pipe(connect.reload());
});
//配置模块,执行刷新css动作
gulp.task("cssload",function(){
	gulp.src("dest/css/*.css").pipe(connect.reload());
});


//初始化的时候执行的模块
gulp.task("init",["css","html"]);


//执行gulp的时候,默认执行的模块
gulp.task("default",["server","watch"]);

//定义处理html页面相关的模块
gulp.task("html",function(){

	//定义压缩html文件模块的参数,以及设置相关属性
	var obj = {
		removeComments: true,//清楚html注释
		collapseWhitespace: true,//压缩html
		removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		minifyJS: true,//压缩页面的js
		minifyCSS: true//压缩页面的css
	};

	gulp.src("src/*.html").pipe(htmlmin(obj)).pipe(gulp.dest("dest/"));
})