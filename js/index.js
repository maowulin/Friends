
// 计算rem 模板宽375px
(function(temWid){
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function (){
		var cWidth = document.documentElement.clientWidth || document.body.clientWidth;
		if (!cWidth) {
			return;
			
		};
		document.documentElement.style.fontSize = cWidth*(100/temWid) + 'px';
	};
	if (!document.addEventListener) {
		return;
	};
	window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
})(375);

function hideComm(){
	//计算被隐藏的评论数 
	
	var dis = $(".dis_cont");
	for(var i = 0; i<dis.length; i++){
		//计算回复条数
		var len = dis[i].children.length;
		if(len > 4){
			$(".more")[i].style.display = "block";
		}
		if(len-4<1){
			$(".more")[i].style.display = "none";
		}
		var p = $(".more")[i].children[0].children[0];
		p.innerText = len-4 + "条";
	}
}

$(function(){
	//添加向下的图标
	$(".more i").addClass("laydown");
	
	hideComm();
	
	//显示更多
	var flag = true;
	$(".more").on("click", function(){
		var length = $(this).parent().children("li:nth-child(n+4)").length;
		if(flag){
			$(this).parent().children(":hidden").show();
			$(this).children("span").html("收起");
			$(this).children("i").addClass("packup").removeClass("laydown");
			flag = false;
		}else {
			var len = $(this).parent().children("li:nth-child(n+4)").length;
			var moreText = "显示更多" + len + "条信息";
			$(this).parent().children("li:nth-child(n+4)").hide();
			$(this).children("span").html(moreText);
			$(this).children("i").removeClass("packup").addClass("laydown");
			flag = true;
		}
	});
	
	//计算图片显示方式
	var img = $(".images");
	for(var i = 0; i < img.length; i++){
		//计算图片数量
		var imgCount = $(".images")[i].children[0].children.length;
		//计算图片宽与高
		var img = $(".img");
		if(imgCount === 1){
			$(".images")[i].children[0].style.height = 1.75 + "rem";
			for(var j = 0; j < img[i].children.length; j++){
				img[i].children[j].style.width = 1.75 + "rem";
				img[i].children[j].style.height = 1.75 + "rem";
				if(j%3 === 0){
					img[i].children[j].style.marginLeft = "0";
				}
			}
		}else if (imgCount === 2) {
			$(".images")[i].children[0].style.height = 1.34 + "rem";
			for(var j = 0; j < img[i].children.length; j++){
				img[i].children[j].style.width = 1.34 + "rem";
				img[i].children[j].style.height = 1.34 + "rem";
				if(j%3 === 0){
					img[i].children[j].style.marginLeft = "0";
				}
			}
		}else if (imgCount === 4) {
			$(".images")[i].children[0].style.height = 2.72 + "rem";
			for(var j = 0; j < img[i].children.length; j++){
				img[i].children[j].style.width = 1.34 + "rem";
				img[i].children[j].style.height = 1.34 + "rem";
				if(j%2 === 0){
					img[i].children[j].style.marginLeft = "0";
				}
				if (j > 1){
					img[i].children[j].style.marginTop = 0.04 + "rem";
				}
			}
		}else {
			//计算显示多少行
			var lineNumber = Math.ceil(imgCount/3);
			//计算高度
			$(".images")[i].children[0].style.height = lineNumber*0.88 + (lineNumber-1)*0.04 + "rem";
			for(var j = 0; j < img[i].children.length; j++){
				img[i].children[j].style.width = 0.88 + "rem";
				img[i].children[j].style.height = 0.88 + "rem";
				if(j%3 === 0){
					img[i].children[j].style.marginLeft = "0";
				}
				
				if (j > 2){
					img[i].children[j].style.marginTop = 0.04 + "rem";
				}
			}
		}
	}
	
	//点赞
	var flagAgree = true;
	$(".like").on("click", function(){
		
		var agreeCount = parseInt($(this).children("p").text());
	
		if(flagAgree){
			$(this).children("i").addClass("agree").removeClass("unagree");
			$(this).children("p").text(++agreeCount);
			flagAgree = false;
		}else {
			$(this).children("i").addClass("unagree").removeClass("agree");
			$(this).children("p").text(--agreeCount);
			flagAgree = true;
		}
	});
	
	//评论 
	$(".discuss").on("click", function(){
		$(this).siblings(".dele").show();
	});
	
	$(".discuss")[1].click();
	
	//删除
	$(".dele").on("click", function(){
		$(this).parent(".comment").siblings(".dis_cont").children("li:last").remove();
		hideComm();
	});
	
	
});
