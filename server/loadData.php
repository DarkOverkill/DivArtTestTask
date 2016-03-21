<?php
	$file = fopen('elemPosition.txt', 'r');
	while(!feof($file)){
		$pos = fgetc($file);
		$val = fgetc($file);
		if (!empty($pos)){
			echo '<div class="block50" data-placement="bottom" data-toggle="tooltip" title="'.$val.' - position: '.$pos.'" data-pos="'.$pos.'">'.$val.'</div>';
		}
	}
	fclose($file);
?>