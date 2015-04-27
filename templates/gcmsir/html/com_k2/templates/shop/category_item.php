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
// Define default image size (do not change)
K2HelperUtilities::setDefaultImage($this->item, 'itemlist', $this->params);
?>
<div class="catItemBody">
	<div class="catItemImageBlock">
		<a href="<?php echo $this->item->link; ?>">
		  <img src="<?php echo $this->item->image; ?>" />
		  <h3 class="catItemTitle"><?php echo $this->item->title; ?></h3>
		 </a>
	</div>
</div>

