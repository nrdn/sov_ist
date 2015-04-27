<?php
/**
 * @version		$Id: category_item.php 1251 2011-10-19 17:50:13Z joomlaworks $
 * @package		K2
 * @author		JoomlaWorks http://www.joomlaworks.gr
 * @copyright	Copyright (c) 2006 - 2011 JoomlaWorks Ltd. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

// Define default image size (do not change)
K2HelperUtilities::setDefaultImage($this->item, 'itemlist', $this->params);

?>

<!-- Start K2 Item Layout -->
<div class="catItemView group<?php echo ucfirst($this->item->itemGroup); ?><?php /*echo ($this->item->featured) ? ' catItemIsFeatured' : '';*/ ?><?php if($this->item->params->get('pageclass_sfx')) echo ' '.$this->item->params->get('pageclass_sfx'); ?>">


	<div class="catItemBody">

		<div class="news_cont">
		<div class="catItemImageBlock">
					<span class="catItemImage">
					<?php if($this->item->params->get('catItemImage') && !empty($this->item->image)): ?>

						<img src="<?php echo $this->item->image; ?>" alt="<?php if(!empty($this->item->image_caption)) echo K2HelperUtilities::cleanHtml($this->item->image_caption); else echo K2HelperUtilities::cleanHtml($this->item->title); ?>" style="width:<?php echo $this->item->imageWidth; ?>px; height:auto;" />

					<?php endif; ?>
					</span>
			</div>
		<div class="news_title">
				<span class="catItemDateCreated"><?php echo JHTML::_('date', $this->item->created , JText::_('DATE_FORMAT_LC3')); ?></span>
				<h3 class="catItemTitle"><a href="<?php echo $this->item->link; ?>"><?php echo $this->item->title; ?></a></h3>
		</div>
			


		</div>
	</div>


</div>