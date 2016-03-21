<?php
if(isset($_POST['i'])) {
	$current = "";
	foreach($_POST['i'] as $key => $value) {
		$current .= $value;
	}
}
$file = 'elemPosition.txt';
file_put_contents($file, $current);
?>