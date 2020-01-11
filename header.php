<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<!DOCTYPE html>
<html>
<head>
<meta charset="<?php $this->options->charset(); ?>">
<title><?php $this->options->title() ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link rel="stylesheet" href="<?php $this->options->themeUrl('grace.css'); ?>"  />
<link rel="stylesheet" type="text/css" href="<?php $this->options->themeUrl('font_611166_fpdzl80md8u.css'); ?>" />
<link href="<?php $this->options->themeUrl('font-awesome/css/font-awesome.css'); ?>" rel="stylesheet">
<script type="text/javascript" src="<?php $this->options->themeUrl('jquery-3.4.1.min.js'); ?>" ></script>
<script type="text/javascript" src="<?php $this->options->themeUrl('grace.js'); ?>" ></script>
<style type="text/css">
#msearch{width:100%; margin-bottom:10px;}
#msearch input{width:82%; padding:10px 9%; border-radius:3px; line-height:20px; height:20px; background:#F2F2F2; border:none;}
#docdl-se dt{color:#3688FF;}
#docdl-se dt *{color:#3688FF;}
</style>
</head>
<?php if ($this->is('index')): ?>
<style type="text/css">  
 @media screen and (max-width:800px){  
 .grace-rows1{width:94%; padding:5px 2%;}  
 .grace-rows2{display:none;}
 }  
 </style> 
<?php else : ?>
<style type="text/css">  
 @media screen and (max-width:800px){  
 .grace-rows1{display:none;}
 .grace-rows2{width:94%; padding:5px 2%;} 

 }  
 </style> 
<?php endif; ?>
<body>
<div class="grace-header">
	<div class="grace-main">
		<ul class="grace-nav">
				<li><a href="<?php $this->options->siteUrl(); ?>" id="nav-doc">SaCRM帮助手册 v1.2</a></li>
				<li><a href="https://www.sacrm.com" target="_blank" id="nav-tmp">官方网站</a></li>
		</ul>
	</div>
</div>
<div class="grace-header-line"></div>