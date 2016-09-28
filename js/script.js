//浏览器大小改变，背景图的变化
window.onresize=function(){
	var screenHeight = document.documentElement.clientHeight+"px";

	$(".bg_photo").find("img").css("height",screenHeight);
}

window.onload=function(){
	//初始化背景图
	initBg();

	//触发图片轮播	
	bannerChange();
	//鼠标点击事件
	changeImg();

	//gowhere模块图册效果
	$("#gowhere_next").bind("click",gowherePrev);
	$("#gowhere_prev").bind("click",gowhereNext);

	$("#losMap").find("a").bind("click",losMapClick);

	//触发experence_box的轮播
	cycleExpChange();
	//点击experence_box下方的按钮
	$(".experence_box .change_btn ul li").bind("click",experenceClick)


	//鼠标滑到左侧导航栏图标上
	$(".leftNavContent ul li img").bind("mouseover",leftNavIn);
	//鼠标移出左侧导航栏图标上
	$(".leftNavContent ul li img").bind("mouseout",leftNavOut);
	//鼠标点击左侧导航栏
	$(".leftNavContent ul li img").bind("click",leftNavClick);
	//鼠标移开整个左侧导航栏点亮当前的索引
	$(".leftNavContent ul").bind("mouseleave",leftNavChecked)
	//自动触发左侧导航栏第一个图标的点击事件
	$(".leftNavContent ul li img").eq(0).trigger('click');


	//点击toTop
	$(".toTop").bind('click',toTopFuc);
	
	//窗口滚动条位置的变化
	window.addEventListener("scroll",windowScroll)


}