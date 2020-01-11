<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<?php $this->need('header.php'); ?>
<div class="grace-main grace-margin-top">
	<div class="grace-rows1 grace-l">
			<div id="msearch">
				<input type="text" id="msearchKey" placeholder="搜索模块名称" value="" />
			</div>
			<div class="grace-accordion" style="display:none; margin-top:5px;">
				<dl id="docdl-se" >
					<dt><span class="fa fa-search"></span>搜索结果</dt>
				</dl>
			</div>
			<div class="grace-accordion" id="grace-accordion">
					<!-- 左侧菜单栏 -->
				    <?php $this->need('sidebar.php'); ?>
				
			</div>
	</div>
	
	<div class="grace-rows2 grace-r">
		<div class="sabackhome">
			<a href="<?php $this->options->siteUrl(); ?>"><span class="fa fa-angle-double-left"> 返回首页</a>
		</div>
		<div class="grace-content" style="padding:15px 0px;">
			<h1 class="grace-h3 grace-color-main"><?php $this->title() ?></h1>
			<?php $this->content(); ?>
		</div>		
	</div>
</div>
<?php
		$db = Typecho_Db::get();
		$result = $db->fetchall($db->select()->from('table.relationships')
			->where('cid = ?',$this->cid));	
		$mid = $result[0]['mid'];
?>


<script type="text/javascript">
$('#nav-doc').addClass('grace-current');
var index = $('#docdl-<?php echo $mid;?>').index();
$('#grace-accordion').accordion(index);
$('#doc-menu-<?php $this->cid(); ?>').addClass('grace-current');
</script>

<?php $this->need('footer.php'); ?>

</body>
</html>