<?php
  $serv_uri=$_SERVER['REQUEST_URI'];
  $K2Itemid = JRequest::getInt('id');
	$db = JFactory::getDBO();
	$db->setQuery("SELECT title FROM #__k2_items WHERE id = ".$K2Itemid );
	$K2Catid = $db->loadResult(); 
	$pageClassSuffix = JSite::getMenu()->getActive()? JSite::getMenu()->getActive()->params->get('pageclass_sfx', '-default') : '-default';
?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="1040, user-scalable=no" />
<title>Государственный музей современной истории России</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/gcmsir/css/template3.css?v=5.1" type="text/css" />
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/gcmsir/js/jquery.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/gcmsir/js/jquery-swing-scroll.js?v=1"></script>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/gcmsir/js/main.js?v=1.3"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic,700italic|PT+Sans+Narrow:400,700|PT+Serif+Caption:400,400italic|PT+Serif:400,700,400italic,700italic|PT+Sans+Caption:400,700&subset=latin,cyrillic-ext,latin-ext,cyrillic' rel='stylesheet' type='text/css'>
</head>
<body class=" <?php echo $pageClassSuffix;?>body">
		<div class="header">
			<div class="menu_all">
				<div class="menu_cont">
				<jdoc:include type="modules" name="top_menu" style="xhtml" />
					<div class="title menu_butt_1">
						<a class="title_text" href="/">
							<?php if($this->countModules('k2_tit')) : ?>
								<jdoc:include type="modules" name="k2_tit" style="xhtml" />
							<?php else: ?>
								Государственный центральный музей современной истории России
							<?php endif; ?>
						</a>
					</div>
						<ul class="social22">
	      			<li class="tw"><a title="Микроблог в Twitter" href="#"></a></li>
	      			<li class="fb"><a title="Страница в Facebook" href="#"></a></li>
	      			<li class="in"><a title="Instagram" href="#"></a></li>
	     				<li class="vk"><a title="Страница в Вконтакте" href="#"></a></li>
	    			</ul>
				</div>
			</div>
		</div>
		<div class="main main_content">
			<div id="about" class="contaniner">
					<?php if($this->countModules('left_mod')) : ?>
						<div class="container_block left_block scrolled_block">
							<jdoc:include type="modules" name="left_mod" style="xhtml" />
						</div>
					<?php else: ?>
					<div class="container_block left_block scrolled_block">
						<?php if ($serv_uri=="/museum/filialy" ||
						 					$serv_uri=="/memorial-mednoe" ||
						 					$serv_uri=="/podpolnaya-tipografiya" ||
						 					$serv_uri=="/ekspozitsiya-na-delegatskoj" ||
						 					$serv_uri=="/gtsmsir" ||
						 					$serv_uri=="/presnya" ||
						 					$serv_uri=="/memorial-katyn" ||
						 					$serv_uri=="/kvartira-krzhizhanovskogo" ||
						 					$serv_uri=="/muzej-galereya-e-evtushenko"
						 ) : ?>
							<?php include 'images/fil3.svg' ?>
							<?php if ($serv_uri =="/museum/filialy"): ?>
								<h2 class="museum_filials">
									Филиалы музея
								</h2>
							<?php endif; ?>
							<?php if ($serv_uri!="/museum/filialy"): ?>
								<style>
									svg #buttons a[xlink:href="<?php echo $serv_uri?>"] g text {
										    fill:#f00!important;
									}
								</style>
								<div class="_eksp_top_menu">
									<h3>Филиал:</h3>
									<ul class="menu">
										<li><a href="#events">События филиала</a></li>
										<li><a href="#visitiors">Посетителям филиала</a></li>
										<li><a href="#contacts">Контакты филиала</a></li>
										<li><a href="/museum/filialy">Все филиалы ></a></li>
									</ul>
								</div>
							<?php endif; ?>
						<?php endif; ?>
							<jdoc:include type="message" />
			      	<jdoc:include type="component" />
			      	<div class="footer">
								<ul class="social22">
			      			<li class="tw"><a title="Микроблог в Twitter" href="#"></a></li>
			      			<li class="fb"><a title="Страница в Facebook" href="#"></a></li>
			      			<li class="in"><a title="Instagram" href="#"></a></li>
			     				<li class="vk"><a title="Страница в Вконтакте" href="#"></a></li>
			    			</ul>
		    				<div class="special_menu"><a href="#describe">Подписаться</a><a href="uslugi">Перечень услуг музея</a><a href="contacts">Контакты</a></div>
							<div class="footer_credits">
								2014. Государственный центральный музей современной истории России.<br>
								Все права защищены. Использование материалов сайта разрешено только с<br>
								предварительного согласия правообладателей.
							</div>
						</div>
		      </div>
					<?php endif; ?>

					<div class="right_block container_outer scrolled_block">
						<div class="container_block" <?php if($this->countModules('right_mod')) : ?> style="background:none;" <?php endif; ?>>
							<?php if($this->countModules('right_mod')) : ?>
								<div class="block_inner">
									<jdoc:include type="modules" name="right_mod" style="xhtml" />
								</div>
							<?php endif; ?>
						</div>
					</div>

			</div>
	</div>
</body>
</html>