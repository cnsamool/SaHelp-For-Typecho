<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>

<?php
error_reporting(0);
$db = Typecho_Db::get();
$query= $db->select('mid','name','iconfont','count')->from('table.metas')->where('type=?','category')->order('order',Typecho_Db::SORT_ASC);
$data = $db->fetchAll($query);
//print_r($data);
//for循环遍历数组
$menu = '';

foreach ($data as $key => $val) {
	//初始化
	$dt = '';
	$dd = '';
	$ico = $val['iconfont'];
	$name = $val['name'];
	$mid = $val['mid'];
	$count = $val['count'];
	
	$dt =  '<dl id="docdl-'.$mid.'">';
	$dt .= '<dt><span class=" fa '.$ico.' "></span>'.$name.' ( '.$count.' )<i class="iconfont icon-jt-down"></i></dt>';
	
	$db2 = Typecho_Db::get();
	$query2= $db2->select('cid','title')->from('table.SAcontents')->where('mid=?',$mid)->order('cid',Typecho_Db::SORT_ASC);
	$data2 = $db2->fetchAll($query2);
	foreach ($data2 as $key2 => $val2) {
		$dd .=   '<dd><a href="'.$val2["cid"].'.html"  id="doc-menu-'.$val2["cid"].'">'.$val2["title"].'</a></dd>';
	}
	
	if($dd<>''){
		$menu .= $dt.$dd.'</dl>';
	}
}

echo $menu;

?>

