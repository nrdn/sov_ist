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

<div id="k2ModuleBox<?php echo $module->id; ?>" class="k2ItemsBlock<?php if($params->get('moduleclass_sfx')) echo ' '.$params->get('moduleclass_sfx'); ?>">

	<?php if(count($items)): ?>
    <?php foreach ($items as $key=>$item):	?>
    <a class="even_odd" href="<?php echo $item->link; ?>">
      <div class="moduleItemTitle" ><?php echo $item->title; ?></div>
      <?php if($params->get('itemImage') || $params->get('itemIntroText')): ?>
      <div class="moduleItemIntrotext">
	      <?php if($params->get('itemImage') && isset($item->image)): ?>
	      <div class="moduleItemImage">
	      	<img src="<?php echo $item->image; ?>"/>
	      </div>
	      <?php endif; ?>
      	<?php echo $item->introtext; ?>
      </div>
      <?php endif; ?>
      <?php if($params->get('itemDateCreated')): ?>
      <span class="moduleItemDateCreated">
      	<?php echo JText::_('K2_WRITTEN_ON') ; ?> <?php echo JHTML::_('date', $item->created, JText::_('K2_DATE_FORMAT_LC2')); ?>
      </span>
      <?php endif; ?>
      </a>
    <?php endforeach; ?>
  <?php endif; ?>
</div>
