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
		<?php while($this->next()): ?>
			<div style="line-height:2em;">
				<h1 class="grace-h3 grace-color-main"><?php $this->title() ?></h1>
			</div>
			<div class="grace-content" style="padding:15px 0px;">
				<?php $this->content(); ?>
			</div>
		<?php endwhile; ?>
			
	</div>
</div>

<script type="text/javascript">
$('#nav-doc').addClass('grace-current');
var index = $('#docdl-2').index();
$('#grace-accordion').accordion(index);
$('#doc-menu-7').addClass('grace-current');
</script>

<?php $this->need('footer.php'); ?>

</body>
</html>