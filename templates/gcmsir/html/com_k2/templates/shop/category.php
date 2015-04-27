<?php
/**
 * @version		2.6.x
 * @package		K2
 * @author		JoomlaWorks http://www.joomlaworks.net
 * @copyright	Copyright (c) 2006 - 2014 JoomlaWorks Ltd. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */
// no direct access
defined('_JEXEC') or die;
?>
<div class="itemListView">
	<div class="componentheading<?php echo $this->params->get('pageclass_sfx')?>">
		<?php echo $this->escape($this->params->get('page_title')); ?>
	</div>
		<div class="itemList itemList01">
			<?php foreach($this->leading as $key=>$item): ?>
			<div class="itemContainer">
				<?php
					$this->item=$item;
					echo $this->loadTemplate('item');
				?>
			</div>
			<?php endforeach; ?>
		</div>
		<div class="itemList itemList02">
			<?php foreach($this->leading as $key=>$item): ?>
			<div class="itemContainer">
				<?php
					$this->item=$item;
					echo $this->loadTemplate('item');
				?>
			</div>
			<?php endforeach; ?>
		</div>
		<div class="itemList itemList03">
			<?php foreach($this->leading as $key=>$item): ?>
			<div class="itemContainer">
				<?php
					$this->item=$item;
					echo $this->loadTemplate('item');
				?>
			</div>
			<?php endforeach; ?>
		</div>
		<div class="itemList itemList04">
			<?php foreach($this->leading as $key=>$item): ?>
			<div class="itemContainer">
				<?php
					$this->item=$item;
					echo $this->loadTemplate('item');
				?>
			</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>