function objAnim(){
	var defalutSpeed = 50;

	//淡入
	this.fadeIn = function(obj,speed,callback,flag){
		var num = Math.floor(window.getComputedStyle(obj,false).opacity*10);
		var speed = speed || defalutSpeed;

		if (flag == 0) {
			callback(obj);
		}

		if(num == 10){
			return;
		}
		else{
			var timer = setInterval(function(){
				num += 1;
				obj.style.opacity = num/10;
				if(num == 10){
					clearInterval(timer);
					if(flag == 1){
						callback(obj)	
					}
				}
			},speed);
		}
	};

	//淡出
	this.fadeOut = function(obj,speed,callback,flag){
		var num = Math.floor(window.getComputedStyle(obj,false).opacity*10);
		var speed = speed || defalutSpeed;

		if (flag == 0) {
			callback(obj);
		}

		if(num == 0){
			return;
		}
		else{
			var timer = setInterval(function(){
				num -= 1;
				obj.style.opacity = num/10;
				if(num == 0){
					clearInterval(timer);
					if(flag == 1){
						callback(obj);	
					}
				}
			},speed);
		}
			
	};

	//显示
	this.show = function(obj){
		obj.style.display = "block";
	}

	//隐藏
	this.hide = function(obj){
		obj.style.display = "none";
	}

	var timer = null;

	//取消定时器
	this.stop = function(){
		clearInterval(timer);
	}

	//向左移动目标距离
	this.moveLeft = function(obj,targetDis,currentDis,time){
		var objTime = time || 100;
		var i = 1;

		var distance = targetDis - currentDis;
		var speed = distance/objTime;

		timer = setInterval(function(){
			if(i == objTime){				
				obj.style.left = targetDis+"px";
				clearInterval(timer);
			}else{
				obj.style.left = Math.ceil(currentDis+speed*i)+"px";
				i++;
			}
		},1)
	}

	this.moveSlowly = function(start,des,time){
		clearInterval(timer);
		var speedTime = time || 100;
		var distance = des - start;
		var speed = distance/speedTime;
		var pos = start;
		var i = 1;

		timer = setInterval(function(){

			if(i == speedTime){
				$(document).scrollTop(des)
				//[firefox]此网站似乎使用 scroll-linked 定位效果。这可能不适合异步平移；参见 https://developer.mozilla.org/docs/Mozilla/Performance/ScrollLinkedEffects 以了解进一步细节，以及加入相关的工具和功能的讨论
				//window.scrollTo(0,des);
				clearInterval(timer);
			}else{
				pos = pos + speed;
				$(document).scrollTop(pos)
				// window.scrollTo(0,pos);
				i++;
			}

		},1)
	}

}
