<?php
  $serv_uri=$_SERVER['REQUEST_URI'];
?>
<!DOCTYPE html>
<jdoc:include type="head" />
<html>
<head>
<link href="<?php echo $this->baseurl ?>/templates/archstruktura_black/images/favicon.png" rel="shortcut icon" type="image/vnd.microsoft.icon" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/archstruktura_black/css/fonts.css?v=1" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/archstruktura_black/css/template.css?v=15.6" type="text/css" />
<style type="text/css">
</style>
<script src="<?php echo $this->baseurl ?>/templates/archstruktura_black/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/archstruktura_black/js/_scripts.js?v=2"></script>
</head>
<body>
  <div class="container main">
    <div class="header">
      <div class="header_inner head">
        <a class="header_left" href="/">
          Театр и клуб Мастерская
        </a>
        <div class="header_right">
          <div class="phone_head">Остальное по телефону</div>
          <div class="phone_body">+7(495)625-68-36</div>
        </div>
      </div>
      <div class="header_inner menu">
        <jdoc:include type="modules" name="top_mod" style="xhtml" />
        <div class="logo"></div>
      </div>
      <?php if ($serv_uri=="/") : ?>
        <div class="top_banner">
          <div class="top_banner_inner">
          </div>
        </div>
    <?php endif; ?>
    </div>
    <?php if ($serv_uri=="/index.php/eda") : ?>
    <style>
      ._conc, ._vech {
        padding: 15px 25px;
      }
      ._conc {
        padding-top: 0;
      }
      .calendar .day, .calendar .day:hover {
        background: none;
        border-bottom:3px solid transparent;
        border-radius: 0;
      }
     .calendar .day:hover {
          color: #C04900;
          border-bottom: 3px solid #c04900;
          cursor: pointer;
      }
      .calendar .day.active {
          border-bottom: 3px solid #000;
          color: #000;
          background: transparent;
      }
    </style>
    <div class="main menu">
      <div class="calendar ">
        <div class="periods">
          <div class="mounth">
            Еда
          </div>
          <div class="day" id="d20">Завтраки</div>
          <div class="day" id="d21">Закуски</div>
          <div class="day" id="d22">Салаты</div>
          <div class="day" id="d24">Супы</div>
          <div class="day" id="d25">Лапша</div>
          <div class="day" id="d26">Горячее</div>
          <div class="day" id="d27">Десерты</div>
          <div class="mounth">
            |
          </div>
          <div class="mounth">
            Бар
          </div>
          <div class="day" id="y1">Напитки</div>
          <div class="day" id="y2">Водка</div>
          <div class="day" id="y3">Пиво</div>
          <div class="day" id="y4">Чай</div>
        </div>
        <div class="types">
          <div class="type" id="_conc">Мастерская</div>
          <div class="type" id="_vech">Lady Jane</div>
          <div class="type2" id="all">Все</div>
        </div>

        <jdoc:include type="modules" name="cal_mod" style="xhtml" />
      </div>
    </div>
    <?php endif; ?>
    <?php if ($serv_uri=="/") : ?>
    <div class="main menu">
      <div class="calendar ">
        <div class="periods">
          <div class="mounth">
            Декабрь
          </div>
          <div class="day active" id="d20">20</div>
          <div class="day" id="d21">21</div>
          <div class="day" id="d22">22</div>
          <div class="day" id="d23">23</div>
          <div class="day" id="d24">24</div>
          <div class="day" id="d25">25</div>
          <div class="day" id="d26">26</div>
          <div class="day" id="d27">27</div>
          <div class="day" id="d28">28</div>
          <div class="day" id="d29">29</div>
          <div class="mounth">
            |
          </div>
          <div class="mounth">
            Январь
          </div>
          <div class="day" id="y1">1</div>
          <div class="day" id="y2">2</div>
          <div class="day" id="y3">3</div>
          <div class="day" id="y4">4</div>
          <div class="day" id="y5">5</div>
          <div class="day" id="y6">6</div>
          <div class="day" id="y7">7</div>
          <div class="day" id="y8">8</div>
          <div class="day" id="y9">9</div>
          <div class="day" id="y10">10</div>
          <div class="day" id="y11">11</div>
          <div class="day" id="y12">12</div>
          <div class="day" id="y13">13</div>
          <div class="day" id="y14">14</div>
          <div class="day" id="y15">15</div>
          <div class="day" id="y16">16</div>
          <div class="day" id="y17">17</div>
          <div class="day" id="y18">18</div>
          <div class="day" id="y19">19</div>
          <div class="day" id="y20">20</div>
          <div class="day" id="y21">21</div>
          <div class="day" id="y22">22</div>
          <div class="day" id="y23">23</div>
          <div class="day" id="y24">24</div>
        </div>
        <div class="types">
          <div class="type" id="_conc">Концерт</div>
          <div class="type" id="_vech">Вечеринка</div>
          <div class="type" id="_teatr">Театр</div>
          <div class="type" id="_fest">Фестиваль</div>
          <div class="type2 active" id="all">Все</div>
        </div>

        <jdoc:include type="modules" name="cal_mod" style="xhtml" />
      </div>
    </div>
    <?php endif; ?>
    <div class="container_inner">
    <?php if ($serv_uri=="/") : ?>
      <div class="date d20">
        <h2>20 декабря</h2>
        <jdoc:include type="modules" name="d20" style="xhtml" />
      </div>
      <div class="date d21">
        <h2>21 декабря</h2>
        <jdoc:include type="modules" name="d21" style="xhtml" />
      </div>
      <div class="date d22">
        <h2>22 декабря</h2>
        <jdoc:include type="modules" name="d22" style="xhtml" />
      </div>
      <div class="date d23">
        <h2>23 декабря</h2>
        <jdoc:include type="modules" name="d23" style="xhtml" />
      </div>
      <div class="date d24">
        <h2>24 декабря</h2>
        <jdoc:include type="modules" name="d24" style="xhtml" />
      </div>
      <div class="date d25">
        <h2>25 декабря</h2>
        <jdoc:include type="modules" name="d25" style="xhtml" />
      </div>
      <div class="date d26">
        <h2>26 декабря</h2>
        <jdoc:include type="modules" name="d26" style="xhtml" />
      </div>
      <div class="date d27">
        <h2>27 декабря</h2>
        <jdoc:include type="modules" name="d27" style="xhtml" />
      </div>
      <div class="date d28">
        <h2>28 декабря</h2>
        <jdoc:include type="modules" name="d28" style="xhtml" />
      </div>
      <div class="date d29">
        <h2>29 декабря</h2>
        <jdoc:include type="modules" name="d20" style="xhtml" />
      </div>
      <div class="date d30">
        <h2>30 декабря</h2>
        <jdoc:include type="modules" name="d21" style="xhtml" />
      </div>
      <div class="date d31">
        <h2>31 декабря</h2>
        <jdoc:include type="modules" name="d22" style="xhtml" />
      </div>
      <div class="date y1">
        <h2>1 января</h2>
        <jdoc:include type="modules" name="d23" style="xhtml" />
      </div>
      <div class="date y2">
        <h2>2 января</h2>
        <jdoc:include type="modules" name="d24" style="xhtml" />
      </div>
      <div class="date y3">
        <h2>3 января</h2>
        <jdoc:include type="modules" name="d25" style="xhtml" />
      </div>
      <div class="date y4">
        <h2>4 января</h2>
        <jdoc:include type="modules" name="d26" style="xhtml" />
      </div>
      <div class="date y5">
        <h2>5 января</h2>
        <jdoc:include type="modules" name="d27" style="xhtml" />
      </div>
      <div class="date y6">
        <h2>6 января</h2>
        <jdoc:include type="modules" name="d28" style="xhtml" />
      </div>
      <div class="date y7">
        <h2>7 января</h2>
        <jdoc:include type="modules" name="d23" style="xhtml" />
      </div>
      <div class="date y8">
        <h2>8 января</h2>
        <jdoc:include type="modules" name="d24" style="xhtml" />
      </div>
      <div class="date y9">
        <h2>9 января</h2>
        <jdoc:include type="modules" name="d25" style="xhtml" />
      </div>
      <div class="date y10">
        <h2>10 января</h2>
        <jdoc:include type="modules" name="d26" style="xhtml" />
      </div>
      <div class="date y11">
        <h2>11 января</h2>
        <jdoc:include type="modules" name="d27" style="xhtml" />
      </div>
      <div class="date y12">
        <h2>12 января</h2>
        <jdoc:include type="modules" name="d28" style="xhtml" />
      </div>
      <div class="date y13">
        <h2>13 января</h2>
        <jdoc:include type="modules" name="d27" style="xhtml" />
      </div>
      <div class="date y14">
        <h2>14 января</h2>
        <jdoc:include type="modules" name="d28" style="xhtml" />
      </div>
      <div class="date y15">
        <h2>15 января</h2>
        <jdoc:include type="modules" name="d23" style="xhtml" />
      </div>
      <div class="date y16">
        <h2>16 января</h2>
        <jdoc:include type="modules" name="d24" style="xhtml" />
      </div>
      <div class="date y17">
        <h2>17 января</h2>
        <jdoc:include type="modules" name="d25" style="xhtml" />
      </div>
      <div class="date y18">
        <h2>18 января</h2>
        <jdoc:include type="modules" name="d26" style="xhtml" />
      </div>
      <div class="date y19">
        <h2>19 января</h2>
        <jdoc:include type="modules" name="d27" style="xhtml" />
      </div>
      <div class="date y20">
        <h2>20 января</h2>
        <jdoc:include type="modules" name="d28" style="xhtml" />
      </div>
      <div class="date y21">
        <h2>21 января</h2>
        <jdoc:include type="modules" name="d25" style="xhtml" />
      </div>
      <div class="date y22">
        <h2>22 января</h2>
        <jdoc:include type="modules" name="d26" style="xhtml" />
      </div>
      <div class="date y23">
        <h2>23 января</h2>
        <jdoc:include type="modules" name="d27" style="xhtml" />
      </div>
      <div class="date y24">
        <h2>24 января</h2>
        <jdoc:include type="modules" name="d28" style="xhtml" />
      </div>
       <?php elseif ($serv_uri=="/index.php/eda") : ?>
      <div class="date d20">
        <h2>Завтраки</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date d21">
        <h2>Закуски</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date d22">
        <h2>Салаты</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date d24">
        <h2>Супы</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date d25">
        <h2>Лапша</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date d26">
        <h2>Горячее</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date d27">
        <h2>Десерты</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      
      <div class="date y1">
        <h2>Напитки</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date y2">
        <h2>Водка</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date y3">
        <h2>Пиво</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
      <div class="date y4">
        <h2>Чай</h2>
        <div class="_vech">Блюда 123</div>
        <div class="_conc">Блюда 123</div>
      </div>
    
    <?php else : ?>
      <jdoc:include type="message" />
      <jdoc:include type="component" />
    <?php endif; ?>
    </div>
    <div class="right">
    </div>
  </div>
</body>
</html>
