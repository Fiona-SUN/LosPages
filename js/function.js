
//gowhere模块图片的移动
//obj:移动的对象；moveLeft移动的实际距离；width移动的限制距离；maxIdx：移动的最大值
function calcArguments(obj,Idx,width,maxIdx){
	var currentDis = obj.offsetLeft;
	var targetDis = Idx*width;
	var animator = new objAnim();

	animator.stop();
	animator.moveLeft(obj,targetDis,currentDis);
}

var Idx = 0;
var maxIdx = 17;

//gowhere模块图片的移动----点击《
function gowherePrev(){
	var moveObj = document.getElementById("boxLocation");
	var moveObjWidth = -581;
	Idx = Idx == maxIdx-1 ? 0 : Idx+1;

	if(Idx == 0){
		Idx++;
		moveObj.style.left = "0px";
	}
	moveGowherePhoto();
}

//gowhere模块图片的移动----点击》
function gowhereNext(){
	var moveObj = document.getElementById("boxLocation");
	var moveObjWidth = -581;
	Idx = Idx == 0 ? maxIdx-1 : Idx-1;

	if(Idx == maxIdx-1){
		Idx--;
		moveObj.style.left = (maxIdx-1)*moveObjWidth+"px";
	}
	moveGowherePhoto();

}

//图片移动
function moveGowherePhoto(){
	var moveObj = document.getElementById("boxLocation");
	var moveObjWidth = -581;

	losMapChange(Idx);

	calcArguments(moveObj,Idx,moveObjWidth,maxIdx);

}

//对losMap的class的改变
function losMapChange(mapIdx){
	var losMap = $("#losMap a");
	losMap.removeClass("current");

	switch(mapIdx){
		case 0:
		case 1:
		case 2:
		case 16:
			losMap.eq(0).addClass("current");
			break;

		case 3:
		case 4:
		case 5:
			losMap.eq(1).addClass("current");
			break;

		case 6:
		case 7:
			losMap.eq(2).addClass("current");
			break;

		case 8:
		case 9:
		case 10:
			losMap.eq(3).addClass("current");
			break;

		case 11:
		case 12:
			losMap.eq(4).addClass("current");
			break;

		case 13:
		case 14:
		case 15:
			losMap.eq(5).addClass("current");
			break;
	}

}

//鼠标点击losMap事件
function losMapClick(){
	var that = $(this);
	var losMapIdx = parseInt(that.attr("data-index"));
	//alert(losMapIdx)
	if(losMapIdx == 1){
		Idx = 0;
	}else if(losMapIdx == 2){
		Idx = 3;
	}else if(losMapIdx == 3){
		Idx = 6;
	}else if(losMapIdx == 4){
		Idx = 8;
	}else if(losMapIdx == 5){
		Idx = 11;
	}else if(losMapIdx == 6){
		Idx = 13;
	}
	moveGowherePhoto();
}

//exp的参数
var expIdx = 0;
var preExpIdx = 0;
var exp_timer = null;

//在experence_box点击图片切换
function experenceClick(){
	clearInterval(exp_timer);

	var that = $(this);
	expIdx = parseInt(that.attr("data-index"));
	var moveObj = document.getElementById("exp_photoItem");
	var moveObjWidth = -380;

	//li的class的变化
	expClassChange(expIdx)

	//前一个index
	preExpIdx = expIdx;

	calcArguments(moveObj,expIdx,moveObjWidth);

	//再次运行定时器
	cycleExpChange();

}

//exp循环轮播
function cycleExpChange(speed){
	var moveObj = document.getElementById("exp_photoItem");
	var moveObjWidth = -380;
	var speedChange = speed | 4000;

	//前一个index
	preExpIdx = expIdx;

	exp_timer = setInterval(function(){

		expIdx = (expIdx == 5)?0:expIdx+1;
		
		if(expIdx == 0){
			expIdx++;
			moveObj.style.left = "0px";
		}
		
		expClassChange(expIdx);
		calcArguments(moveObj,expIdx,moveObjWidth);
		
		preExpIdx = expIdx;

	},speedChange)
}

//experence_box li的class的变化
function expClassChange(expIdx){
	var expLi = $(".experence_box .change_btn ul li");
	expLi.eq(preExpIdx).removeClass("active");
	expLi.eq(expIdx).addClass("active");
}

//返回顶部
var posY = 0;
function toTopFuc(){
	var des = 0;
	var start = posY;

	var animator = new objAnim();
	animator.moveSlowly(start,des);
}


//左侧导航栏的大小变化
function leftNavChange(leftNavIdx,tall,big,marLeft,flag,time){
	var speedTime = time || 150;
	var leftNavLi = $(".leftNavContent ul li");

	if(flag){
		var newSrc = "./images/nav_bgA0"+leftNavIdx+"H.png";
	}else{
		var newSrc = "./images/nav_bgA0"+leftNavIdx+".png";
	}
	leftNavLi.eq(leftNavIdx-1).finish().animate({height:tall,width:big,marginLeft:marLeft},speedTime).find("img").attr("src",newSrc)
}

var leftNavIdxIn = -1;
var leftNavIdxOut = -1;
//鼠标移出左侧导航栏动作
function leftNavOut(){
	var that = $(this);
	leftNavIdxOut = parseInt(that.attr("data-index"));
	
	if(leftNavIdxOut != leftNavCurIdx){
		leftNavChange(leftNavIdxOut,"58px","58px","0px");
	}
}


//鼠标移入左侧导航栏动作
function leftNavIn(){
	var that = $(this);
	leftNavIdxIn = parseInt(that.attr("data-index"));
	
	if(leftNavCurIdx != -1 && leftNavIdxIn != leftNavCurIdx){
		leftNavChange(leftNavCurIdx,"58px","58px","0px");
	}

	leftNavChange(leftNavIdxIn,"110px","110px","-26px",true);
}
//鼠标点击左侧导航栏动作
var leftNavCurIdx = -1;
function leftNavClick(){
	var that = $(this);
	leftNavCurIdx = parseInt(that.attr("data-index"));

	leftNavChange(leftNavCurIdx,"110px","110px","-26px",true);

	//定位到相应位置
	var content_box = $(".content_box").eq(leftNavCurIdx-1);
	var contentBoxTop = parseInt(content_box.offset().top - parseInt(content_box.css("margin-top")));
	var contentCurPos = $(document).scrollTop();
	
	if(contentBoxTop != contentCurPos){
		var animator = new objAnim();
		animator.moveSlowly(contentCurPos,contentBoxTop);
	}
	
}
//鼠标移开整个左侧导航栏点亮当前的索引
function leftNavChecked(){

	if(leftNavCurIdx != -1){
		leftNavChange(leftNavCurIdx,"110px","110px","-26px",true);
	}
}

//初始化背景图
function initBg(){
	var screenHeight = $(window).height()+"px";
	$(".bg_photo").find("img").css("height",screenHeight);

	//将各个内容块的高度存在数组中
	var contentBoxs = $(".content_box");
	var len = contentBoxs.size()
	contentBoxsTop = [];

	for(var i=0;i<len;i++){
		contentBoxsTop.push(parseInt(contentBoxs.eq(i).offset().top - parseInt(contentBoxs.eq(i).css("margin-top"))))
	}
	
}

//窗口滚动条位置的变化
var prevContentBox = -1;
function windowScroll(){
	//获取鼠标滚动的距离
	posY = $(document).scrollTop();

	var bg_photo = $(".bg_photo");

	//鼠标移动之后左侧导航栏的图标变化
	var contentBoxs = $(".content_box");
	var len = contentBoxs.size();
	var t;

	//获取initBg()保存的每个内容块的高度
	for(var i=0;i<len;i++){
		if(posY>=contentBoxsTop[i]){
			t=i;
		}
	} 
	
	leftNavCurIdx = t+1;
	//如果上一个索引和现在索引不同则变化左侧导航栏，并且显示当前的背景图隐藏上一个背景图
	if(prevContentBox!=-1 && leftNavCurIdx != prevContentBox){
		leftNavChange(prevContentBox,"58px","58px","0px");
		bg_photo.eq(prevContentBox-1).find("img").fadeOut(600);

		leftNavChange(leftNavCurIdx,"110px","110px","-26px",true);
		bg_photo.eq(leftNavCurIdx-1).find("img").fadeIn(600);
	}

	//变化索引
	prevContentBox = leftNavCurIdx;
}