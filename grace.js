/**
 * grace.js
 * 作者 : 刘海君 5213606@qq.com
 */
jQuery.fn.extend({
	hcHeight : function(type){
		var tmp = $('#graceJqFnTmp');
		if(tmp.length < 1){$('<div id="graceJqFnTmp" style="width:0px; height:0px;"></div>').appendTo('body');}
		tmp = $('#graceJqFnTmp');
		$(this).clone().appendTo(tmp);
		if(!type){type == '';}
		switch(type){
			case 'innerHeight':
			var domHeight = tmp.find('div').eq(0).innerHeight();
			break;
			case 'outerHeight':
			var domHeight = tmp.find('div').eq(0).outerHeight();
			break;
			default :
			var domHeight = tmp.find('div').eq(0).height();
		}
		tmp.remove();
		return domHeight;
	},
	accordion : function(defalutActive){
		var accordion = $(this);
		var defalutDl = accordion.find('dt').eq(defalutActive).parent();
		defalutDl.find('dd').show();
		defalutDl.find('dt').find('i').addClass('icon-jt-up').removeClass('icon-jt-down');
		accordion.find('dt').click(function(){
			var i = $(this).find('i');
			if(i.hasClass('icon-jt-down')){
				i.addClass('icon-jt-up').removeClass('icon-jt-down');
				$(this).parent().find('dd').show();
			}else{
				i.removeClass('icon-jt-up').addClass('icon-jt-down');
				$(this).parent().find('dd').hide();
			}
		});
	},
	slideMenu : function(menuId){
		var _self = $(this);
		var sets  = _self.offset();
		var menu  = $(menuId);
		menu.css({left:sets.left+'px', width:_self.outerWidth()+'px'});
		_self.hover(function(){
			$('.grace-slide-menu').hide();
			menu.slideDown(150);
		}, function(){});
		menu.hover(function(){}, function(){
			menu.slideUp(150);
		});
	}
});
//对话框
var graceDialog = function(){
	this.dialog   = null;
	this.bgColor  = 'rgba(61,65,75,0.9)';
	this.buttons  = ['确认'];
	this.close    = false;
	this.buttonsBgColor  = ['F5F6F7' ,'5FB878', 'E57373'];
	this.buttonsTxtColor = ['777777' ,'FFFFFF', 'FFFFFF'];
	var _self = this;
	this.openDialog = function(){
		this.dialog = $('#grace-alert-mask');
		if(this.dialog.length < 1){
			$('<div id="grace-dialog-mask" style="background:'+this.bgColor+';">'+
			'<div id="grace-dialog-msg">'+
				'<div id="grace-dialog-close">X</div>'+
				'<div id="grace-dialog-title"></div>'+
				'<div id="grace-dialog-content"></div>'+
				'<div id="grace-dialog-btns"></div>'+
			'</div>'+
			'</div>').appendTo('body');
			this.dialog = $('#grace-alert-mask');
		}
		$('#grace-dialog-close').click(_self.closeDialog);
	}
	this.setMsg = function(msg){$('#grace-dialog-content').html(msg);}
	this.setLoadingText = function(msg){$('#grace-dialog-loading-text').html(msg);}
	this.closeDialog = function(){
		$('#grace-dialog-mask').fadeOut(200, function(){$('#grace-dialog-mask').remove();});
	}
	this.show = function(){
		var winHeight = $(window).height();
		var msgMargin = (winHeight - $('#grace-dialog-msg').hcHeight('innerHeight')) / 2;
		if(msgMargin < 0){msgMargin = 0;}
		if(!this.close){$('#grace-dialog-close').hide();}
		$('#grace-dialog-msg').css({marginTop : msgMargin + 'px'});
		$('#grace-dialog-mask').fadeIn(150);
	}
	this.alert = function(msg, title, callBack0, callBack1, callBack2){
		callBack0 = typeof(callBack0) == 'undefined' ? function(){} : callBack0;
		callBack1 = typeof(callBack1) == 'undefined' ? function(){} : callBack1;
		callBack2 = typeof(callBack2) == 'undefined' ? function(){} : callBack2;
		this.openDialog();
		if(typeof(title) == 'undefined'){
			title = '提示';
		}else{
			$('#grace-dialog-title').html(title);
		}
		$('#grace-dialog-content').html(msg);
		var btnW = (1 / this.buttons.length) * 100 - 4;
		for(var i in this.buttons){
			$('<div style="background:#'+this.buttonsBgColor[i]+'; width:'+btnW+'%; color:#' + this.buttonsTxtColor[i]+';">'+this.buttons[i]+'</div>').appendTo('#grace-dialog-btns');
			$('#grace-dialog-btns div').eq(i).click(function(){_self.closeDialog();});
			var funName = 'callBack' + i;
			eval("$('#grace-dialog-btns div').eq(i).click("+funName+");");
		}
		this.show();
	}
	this.loading = function(msg){
		if(!msg){msg = '加载中...';}
		this.openDialog();
		$('<div id="grace-dialog-loading-text">'+msg+'</div>').appendTo('#grace-dialog-msg');
		$('#grace-dialog-title').remove();
		$('#grace-dialog-btns').remove();
		$('#grace-dialog-close').remove();
		$('#grace-dialog-msg').css({width:'288px', 'background':"rgba(255,255,255, 0)", 'box-shadow':'none'});
		$('#grace-dialog-content').html('<div id="grace-dialog-loading"><span></span><span></span><span></span>'+
        '<span></span><span></span><span></span><span></span><span></span></div>');
		this.show();
	}
};

//自定义弹框  
function graceToast(msg, duration){  
    duration=isNaN(duration) ? 2000 : duration;  
    var m = document.createElement('div');  
    m.innerHTML = '<div style="width:188px; color:#fff;  line-height:40px; background:#000; opacity:0.6; margin:0 auto; text-align:center; border-radius:5px;">'+msg+'</div>';  
    m.style.cssText="width:100%; height:40px; position:fixed; top:50%; z-index:999999;";  
    document.body.appendChild(m);
    setTimeout(function(){
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';  
        m.style.opacity = '0';  
        setTimeout(function() {document.body.removeChild(m) }, d * 1000);  
    }, duration);
    return false;
} 

function hcFormCheckErrorShow(msg){
	return graceToast(msg);
}
/*
功       能 : 表单元素验证
返       回 : 检查到错误返回false否则返回true，利用hcFormCheckErrorMsg全局变量保存错误信息，hcFormCheckErrorObj保存错误对象。
作       者 : 刘海君 5213606@qq.com
发布站点 : http://www.hcoder.net
-------------------------------------------------------------
支持检查类型     : 描述
string        : 字符串长度验证 参数格式 checkData="x," 或 checkData="x,x"
int           : 整数及整数位数验证 参数格式 checkData="x," 或 checkData="x,x"
between       : 2数之间验证(不限制数值类型) 参数格式 checkData="x,"  checkData=",x" 或 checkData="x,x"
betweenD      : 2数之间验证(数值类型为整数) 参数格式 checkData="x," checkData=",x" 或 checkData="x,x"
betweenF      : 2数之间验证(数值类型为小数) 参数格式 checkData="x," checkData=",x" checkData="x,x"
same          : 是否为某个固定值 参数格式 checkData="xx"
sameWith      : 是否和指定id表单元素的值相等 参数格式 checkData="元素id"
notSame       : 不等某个固定值 参数格式 checkData="xx"
notSameWith   : 是否和指定id表单元素的值不相等 参数格式 checkData="元素id"
email         : 电子邮箱验证 (无需参数)
phone         : 手机号码验证(无需参数)
url           : 验证字符串是否为网址(无需参数)
zipCode       : 国内邮编(无需参数)
reg           : 正则表达式验证 参数格式 checkData="正则表达式内容"
fun           : 通过调用自定义函数进行验证 自动传递值到改函数。例: func(val); 自定义函数的返回值必须为布尔类型(验证成功返回真，否则返回假)。
*/

var hcFormCheckErrorMsg = '';
var hcFormCheckErrorObj = null;

jQuery.fn.extend({
	hcFormCheck : function(){
		var hcCheckStatus = true;
		$(this).find('input,select,textarea').each(function(){
			var checkRes = hcFormCheckBase($(this), true);
			if(!checkRes){hcCheckStatus = false; return false;}
		});
		if(hcCheckStatus){
			if(typeof(hcAttachFormCheck) != 'undefined'){
				hcCheckStatus = hcAttachFormCheck();
			}
		}
		return hcCheckStatus;
	}
	,
	hcFormAutoCheck : function(){
		$(this).find('input,select,textarea').each(function(){
			$(this).change(function(){
				var res = hcFormCheckBase($(this), false);
				if(res){
					hcFormAutoCheckRight($(this));
				}else{
					hcFormAutoCheckError($(this));
				}
			});
		});
	}
});

function hcFormCheckBase(cObj, isMsg){
	var checkType  = cObj.attr('checkType');
	if(typeof(checkType) == 'undefined'){return true;}
	checkType      = checkType.toLowerCase();
	var checkData  = cObj.attr('checkData');
	checkMsg       = cObj.attr('checkMsg');
	if(typeof(checkMsg) == 'undefined'){return true;}
	var checkVal   = cObj.val();
	switch(checkType){
		case 'string' : 
			var checkArr  = checkData.split(',');
			if(checkVal.length < checkArr[0]){
				return hcFormCheckReError(cObj, checkMsg, isMsg);
			}
			if(checkArr[1] != ''){
				if(checkVal.length > checkArr[1]){
					return hcFormCheckReError(cObj, checkMsg, isMsg);
				}
			}
		break;
		case 'int' :
			var reg  = new RegExp('^\-?[0-9]{'+checkData+'}$');
			if(!reg.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
			var reg2 = new RegExp('^\-?0+[0-9]+$');
			if(reg2.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'between' : 
			if(!hcFormCheckNumber(checkVal, checkData, cObj, checkMsg, isMsg)){return false;}
		break;
		case 'betweend' : 
			var reg  = new RegExp('^\-?[0-9]+$');
			if(!reg.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
			if(!hcFormCheckNumber(checkVal, checkData, cObj, checkMsg, isMsg)){return false;}
		break;
		case 'betweenf' : 
			var reg  = new RegExp('^\-?[0-9]+\.[0-9]+$');
			if(!reg.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
			if(!hcFormCheckNumber(checkVal, checkData, cObj, checkMsg, isMsg)){return false;}
		break;
		case 'same' : 
			if(checkVal != checkData){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'samewith' : 
			if(checkVal != $('#'+checkData).val()){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'notsame' : 
			if(checkVal == checkData){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'notsamewith' : 
			if(checkVal == $('#'+checkData).val()){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'email' : 
			var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if(!reg.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'phone' :
			var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
			if(!reg.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'url'  :
			var reg = /^(\w+:\/\/)?\w+(\.\w+)+.*$/;
			if(!reg.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'zipcode'  :
			var reg = /^[0-9]{6}$/;
			if(!reg.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'reg'  : 
			var reg = new RegExp(checkData);
			if(!reg.test(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
		case 'fun'  : 
			eval('var res = '+checkData+'("'+checkVal+'");');
			if(!res){return hcFormCheckReError(cObj, checkMsg, isMsg);}
		break;
	}
	return true;
}

function hcFormCheckNumber(checkVal, checkData, cObj, checkMsg, isMsg){
	checkVal = Number(checkVal);
	if(isNaN(checkVal)){return hcFormCheckReError(cObj, checkMsg, isMsg);}
	cObj.val(checkVal);
	checkDataArray = checkData.split(',');
	if(checkDataArray[0] == ''){
		if(checkVal > Number(checkDataArray[1])){return hcFormCheckReError(cObj, checkMsg, isMsg);}
	}else if(checkDataArray[1] == ''){
		if(checkVal < Number(checkDataArray[0])){return hcFormCheckReError(cObj, checkMsg, isMsg);}
	}else{
		if(checkVal < Number(checkDataArray[0]) || checkVal > Number(checkDataArray[1])){
			return hcFormCheckReError(cObj, checkMsg, isMsg);
		}
	}
	return true;
}

function hcFormCheckReError(cObj, checkMsg, isMsg){
	hcFormCheckErrorObj = cObj;
	hcFormCheckErrorMsg = checkMsg;
	if(isMsg){
		if(typeof(hcFormCheckErrorShow) == 'undefined'){
			alert(hcFormCheckErrorMsg);
		}else{
			hcFormCheckErrorShow(hcFormCheckErrorMsg);
		}
	}
	return false;
}

function gracePost(url, data, callback, btnText){
	$.ajax({
		url   : url,
    	type  : 'POST',
    	async : true,
        data  : data,
		timeout :10000,
		beforeSend:function(xhr){
			$('#grace-submit').html('提交中...');
		},
    	success:function(res){callback(res);},
	    error:function(xhr,textStatus){
	        layui.use('layer', function(){
		  		var layer = layui.layer;
				layer.msg('<i class="layui-icon">&#xe60b;</i> 服务器忙，请重试！');
			});
			$('#graceSubBtn').html(btnText);
	    }
	});
}

function graceSwipe(selector){
	this.swipe       = $(selector);
	this.swipeIn     = this.swipe.find('.grace-swipe-items')
	this.items       = this.swipe.find('.grace-swipe-item');
	this.itemSize    = this.items.length;
	this.realSize    = this.items.length + 2;
	this.scale       = 1 / this.realSize;
	this.swipeIn.css({width: this.realSize * 100 +'%'});
	this.items.css({width: this.scale * 100 +'%'});
	this.width       = this.swipe.width();
	this.index       = 1;
	this.speed       = 1000;
	this.delay       = 5000;
	this.timer       = null;
	this.indicatorOn = true;
	this.autoPlay    = true;
	var _self = this;
	var lastItem     = this.items.last();
	this.items.eq(0).clone().appendTo(this.swipeIn);
	lastItem.clone().prependTo(this.swipeIn);
	this.items       = this.swipe.find('.grace-swipe-item');
	this.swipeIn.css({transform : 'translate3d(' + this.scale * -100 +'%, 0px, 0px)'});
	/* 进度标示 */
	this.indicator  = this.swipe.find('.grace-swipe-indicator');
	if(this.indicator.length < 1){
		var indicatorDom = document.createElement('div');
		indicatorDom.setAttribute('class', 'grace-swipe-indicator');
		var html = '<div class="grace-fr">';
		for(var i = 0; i < this.itemSize; i++){html += '<div class="grace-swipe-indicators"></div>';}
		indicatorDom.innerHTML = html + '</div>';
		$(indicatorDom).appendTo(this.swipe);
	}
	this.indicator  = this.swipe.find('.grace-swipe-indicator');
	this.indicator.find('.grace-swipe-indicators').eq(0).addClass('grace-swipe-indicator-active');
	this.items.show();
	this.changeIndicator = function(index){
		setTimeout(function(){
			_self.indicator.find('.grace-swipe-indicators').removeClass('grace-swipe-indicator-active');
			_self.indicator.find('.grace-swipe-indicators').eq(index - 1).addClass('grace-swipe-indicator-active');
		}, 500);
	};
	this.change = function(){
		if(_self.timer){clearTimeout(_self.timer);}
		_self.swipeIn.get(0).style.transform  = 'translate3d('+ (_self.scale * _self.index * -100) +'%, 0px, 0px)';
		_self.swipeIn.get(0).style.transition = 'linear 300ms';
		setTimeout(function(){_self.swipeIn.get(0).style.transition = 'none';}, 300);
		if(_self.index < 1){
			_self.index = this.itemSize;
			setTimeout(function(){
				_self.swipeIn.get(0).style.transform  = 'translate3d('+ (_self.scale * _self.index * -100) +'%, 0px, 0px)';
				_self.swipeIn.get(0).style.transition = 'none';
			}, 200);
			_self.changeIndicator(_self.index);
		}else if(_self.index > _self.itemSize){
			_self.index = 1;
			setTimeout(function(){
				_self.swipeIn.get(0).style.transform  = 'translate3d('+ (_self.scale * _self.index * -100) +'%, 0px, 0px)';
				_self.swipeIn.get(0).style.transition = 'none';
			}, 200);
			_self.changeIndicator(_self.index);
		}else{
			_self.changeIndicator(_self.index);
		}
		if(_self.autoPlay){_self.timer = setTimeout(function(){_self.index++; _self.change();}, _self.delay);}
	};
	this.run = function(){
		if(this.autoPlay){this.timer = setTimeout(_self.change, _self.delay);}
		if(this.indicatorOn){this.indicator.show();}
	}
}

function removeComments(commentsId){
	var gDialog = new graceDialog();
	gDialog.buttons = ['取消', '确定'];
	gDialog.alert('确定要删除吗？', '', function(){},function(){
		$.get('/account/removecomments/'+commentsId, {}, function(res){
			console.log(res);
			setTimeout(function(){
				graceToast('删除成功！');
				$('#grace-top-'+commentsId).remove();
			}, 300);
		});
	});
}