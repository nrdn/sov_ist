<?php
  $serv_uri=$_SERVER['REQUEST_URI'];
  if ($serv_uri == '/') {
		header('Location: http://www.nrdnhost.nichost.ru/s/');
		exit;
	}
  $K2Itemid = JRequest::getInt('id');
	$db = JFactory::getDBO();
	$db->setQuery("SELECT title FROM #__k2_items WHERE id = ".$K2Itemid );
	$K2Catid = $db->loadResult(); 
	$pageClassSuffix = JSite::getMenu()->getActive()? JSite::getMenu()->getActive()->params->get('pageclass_sfx', '-default') : '-default';
?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=1280">
<title>Государственный музей современной истории России</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/gcmsir/css/template3.css?v=5.1" type="text/css" />
<?php if ($serv_uri=="/museum/istoriya-muzeya"): ?>
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/gcmsir/css/istoriya.css?v=2.0" type="text/css" />
<?php elseif ($serv_uri=="/museum/ekspozitsiya"): ?>
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/gcmsir/css/ekspozitsiya.css?v=1.0" type="text/css" />
<?php elseif ($serv_uri=="/sobytiya/lektsii" || $serv_uri=="/posetiteliam/ekskursii") :?>
		<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/gcmsir/css/lections_excursions.css?v=1.0" type="text/css" />
<?php elseif ($serv_uri=="/sobytiya/vystavki") :?>
		<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/gcmsir/css/exhibitions.css?v=1.0" type="text/css" />
<?php elseif ($serv_uri=="/posetiteliam/kontakty") :?>
		<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/gcmsir/css/contacts.css?v=1.0" type="text/css" />
<?php elseif ($serv_uri=="/magazin") :?>
		<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/gcmsir/css/shop.css?v=1.0" type="text/css" />
<?php endif; ?>

<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/gcmsir/js/jquery.js"></script>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/gcmsir/js/jquery-swing-scroll.js?v=1"></script>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/gcmsir/js/main.js?v=1.3"></script>
<?php if ($serv_uri=="/museum/istoriya-muzeya"): ?>
	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/gcmsir/js/istoriya.js?v=2.0"></script>
<?php elseif ($serv_uri=="/sobytiya/vystavki") :?>
	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/gcmsir/js/exhibitions.js"></script>
<?php endif; ?>
<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic,700italic|PT+Sans+Narrow:400,700|PT+Serif+Caption:400,400italic|PT+Serif:400,700,400italic,700italic|PT+Sans+Caption:400,700&subset=latin,cyrillic-ext,latin-ext,cyrillic' rel='stylesheet' type='text/css'>
</head>
<body class=" <?php echo $pageClassSuffix;?>body">
		<div class="header">
			<div class="menu_cont">
				<jdoc:include type="modules" name="top_menu" style="xhtml" />
				<div class="title menu_butt_1">
					<a href="/" class="after logo"></a>
				</div>
			</div>
		</div>
		<div class="main main_content">
			<div id="about" class="contaniner">
				<?php if ($serv_uri =="/new-3103/komanda"):?>
					<?php include 's/team.html' ?>
				<?php endif; ?>
				<?php if ($serv_uri =="/sobytiya/vystavki"):?>
					<div class="container_block left_block scrolled_block">
						<h2>Выставки</h2>
						<div class="container_block_excursions_all">
							<div class="container_block_excursions excursions_left">
								<div class="excursions_left_sort">
									<h4>Отделы музея:</h4>
									<div class="sort_items_container">
										<div class="sort_item" id="_gcmsir">ГЦМСИР</div>
										<div class="sort_item" id="_presnia">«Пресня»</div>
										<div class="sort_item" id="_podpolnaya">«Подпольная типография 1905-1906 гг.»</div>
										<div class="sort_item" id="_delegatskaya">Экспозиция на Делегатской «Мой дом — Россия»</div>
										<!--<div class="sort_item" id="">«Квартира Г.М. Кржижановского»</div>-->
										<div class="sort_item" id="_evtushenko">«Музей-галерея Е.Евтушенко»</div>
										<!--<div class="sort_item" id="school1">Мемориал «Катынь»</div>-->
										<!--<div class="sort_item" id="school1">Мемориальный комплекс «Медное»</div>-->
										<div class="sort_item active" id="_all">Все филиалы</div>
									</div>
								</div>
								<jdoc:include type="modules" name="left_mod" style="xhtml" />
							</div>
						</div>
					</div>
					<?php endif; ?>

					<?php if($this->countModules('left_mod')) : ?>
						<div class="container_block left_block scrolled_block">
							<jdoc:include type="modules" name="left_mod" style="xhtml" />
						</div>
					<?php elseif ($serv_uri =="/posetiteliam/ekskursii"):?>

					<div class="container_block left_block scrolled_block">
						<h2>Экскурсии</h2>
						<div class="container_block_excursions_all">
							<div class="container_block_excursions excursions_left">
								<div class="excursions_left_sort">
									<h4>Для детей</h4>
									<div class="sort_items_container">
										<div class="sort_item" id="school1">Для дошкольников</div>
										<div class="sort_item" id="school2">Для учащихся средних классов и старшеклассников</div>
									</div>
								</div>
								<jdoc:include type="modules" name="excursions_left_mod" style="xhtml" />
							</div>

							<div class="container_block_excursions excursions_right">
								<div class="excursions_right_sort">
									<h4>Для взрослых</h4>
									<div class="sort_items_container">
										<div class="sort_item" id="musem_tusdays">Музейные четверги</div>
										<div class="sort_item" id="overview_excursions">Обзорные, тематические и проблемные экскурсии</div>
										<div class="sort_item" id="family_in_museum">Экскурсия выходного дня «Семья в музее»</div>
									</div>
								</div>
								<jdoc:include type="modules" name="excursions_right_mod" style="xhtml" />
							</div>
						</div>
					</div>

					<?php elseif ($serv_uri =="/sobytiya/lektsii"):?>
					<div class="container_block left_block scrolled_block">
						<h2>Лекции</h2>
						<div class="container_block_excursions_all">
							<div class="container_block_excursions excursions_left">
								<div class="excursions_left_sort">
									<h4>Для детей</h4>
									<div class="sort_items_container">
										<div class="sort_item" id="school1">Для дошкольников</div>
										<div class="sort_item" id="school2">Для учащихся средних<br/>классов и старшеклассников</div>
									</div>
								</div>
								<jdoc:include type="modules" name="excursions_left_mod" style="xhtml" />
							</div>

							<div class="container_block_excursions excursions_right">
								<div class="excursions_right_sort">
									<h4>Для взрослых</h4>
									<div class="sort_items_container">
										<div class="sort_item" id="musem_tusdays">Музейные<br/>четверги</div>
										<div class="sort_item" id="overview_excursions">Обзорные, тематические<br/>и проблемные экскурсии</div>
										<div class="sort_item" id="family_in_museum">Экскурсия выходного дня<br/>«Семья в музее»</div>
									</div>
								</div>
								<jdoc:include type="modules" name="excursions_right_mod" style="xhtml" />
							</div>
						</div>
					</div>

					<?php else: ?>
					<div class="container_block left_block scrolled_block">
					<?php if ($serv_uri =="/museum/filialy"): ?>
								<h2 class="museum_filials">
									Филиалы музея
								</h2>
						<?php endif; ?>
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
			      	<?php if ($serv_uri=="/museum/istoriya-muzeya"): ?>
			      		<div class="history_left_stripe_base"></div>
			      		<div class="history_left_stripe"></div>
								<div class="history_left_block">
									<div class="history_left_block_inner">
										<a class="active">1831-1917</a>
										<a>1917</a>
										<a>1920–1930-е</a>
										<a>1940–1950-е</a>
										<a>1950-е</a>
										<a>1960-е</a>
										<a>1970-е</a>
										<a>1980-е</a>
										<a>1990-е</a>
										<a>XXI в.</a>
									</div>
								</div>
			      	<?php endif ;?>
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