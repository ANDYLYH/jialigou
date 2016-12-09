//1)引入gulp和gulp-sass两个包
var gulp = require('gulp');  //本地安装为了在这里引入gulp
var sass = require('gulp-sass');

//同步测试
var browerSync = require('brower-sync').create();
//2)填写任务
gulp.task('bulidSass',function(){
	//console.log('编译完成');
	
	//匹配文件
	return gulp.src('./src/sass/style.scss');
	
	//编译
	.pipe(sass(outputStyle:expanded));
	
	//输出文件
	.pipe(gulp.dest('./src/css'));
	
	//输出文件后可以确定css完成编译
	//刷新操作一定要在编译完成后进行
	.pipe(borwSync.reload({stream:true}));
	
});

//监听sass文件修改，并自动编译
gulp.task('jtSass',function(){
	gulp.watch('./src/sass/*.scss',['bulidSass'])
});

//运行任务
//在命令提示符进行
//在cmd -->根目录文件下   运行gulp -v
//格式  gulp 任务名   gulp buildSass



//创建一个任务
gulp.task('server','jtSass',function(){
	browerSync.init({
		server:{
			baseDir:'./src';
		},
		//监听文件修改并自动更新
		files:['./src/**/*.html','./src/css/*.css']
	});	
})