<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<div class="grace-footer-line"></div>
<div class="grace-footer">
	<span style="color:#FF2755;">本站内容版权归 sacrm.com 所有, 未经允许不得转载 !</span><br>蜀ICP备14011608号
</div>

<script type="text/javascript">
		$(function(){
			$("#msearchKey").keyup(function(){
				var kwd = $(this).val();
				$('#docdl-se').find('dd').remove();
				$('#docdl-se').parent().hide();
				if(kwd.length < 2){return false;}
				var res = false;
				$('#grace-accordion dd').each(function(){
					var atext = $(this).text();
					if(atext.indexOf(kwd) != -1){
						$(this).clone().appendTo('#docdl-se');
						res = true;
					}
				});
				if(!res){
					$('<dd style="text-align:center;">无搜索结果 ...</dd>').appendTo('#docdl-se');
				}
				$('#docdl-se').parent().show();
				$('#docdl-se').find('dd').show();
			});
		});
		
</script>
<script type="text/javascript" src="<?php $this->options->themeUrl('prettify.js'); ?>"></script>
<script type="text/javascript">
$('pre').addClass('prettyprint');
$('table').each(function(){
	$(this).find('tr:even').find('td').css({background:'#F6F7F8'});
});
prettyPrint();
$('#grace-ctype div').click(function(){
	var index = $(this).index();
	if(index > 2){return;}
	$(this).addClass('grace-current').siblings().removeClass('grace-current');
	$('#sc-content .grace-content').eq(index).show().siblings().hide();
});
</script>
<style type="text/css">
.grace-content pre{position:relative;}
.grace-content pre .copy{width:88px; cursor:pointer; text-align:center; height:28px; line-height:28px; background:#3688FF; font-size:12px; color:#FFF; position:absolute; z-index:1; right:0px; top:0px;}
blockquote{font-size:15px; line-height:2em; padding:10px 20px; color:#000000; background:#F7F8F9; border-left:5px solid #009688; margin:15px 0; text-indent:0;}
</style>
<script type="text/javascript" src="<?php $this->options->themeUrl('clipboard.min.js'); ?>"></script>
<script type="text/javascript">
$('pre').each(function(){
	$('<div class="copy">复制代码</div>').appendTo($(this));
});
var clopyObj;
var clipboard = new ClipboardJS('.copy', {
    target: function(trigger) {
    	clopyObj = $(trigger).parent();
    	clopyObj.find('.copy').remove();
        return clopyObj.get(0);
    }
});

clipboard.on('success', function(e) {
	graceToast('代码复制成功 (:');
	$('<div class="copy">复制代码</div>').appendTo(clopyObj);
});

clipboard.on('error', function(e) {
	graceToast('复制失败 ):');
	$('<div class="copy">复制代码</div>').appendTo(clopyObj);
});
</script>