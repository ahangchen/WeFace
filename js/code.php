<?php
	$source="http://gc.ditu.aliyun.com/geocoding?a=%E8%8B%8F%E5%B7%9E%E5%B8%82";
	$file = fopen($source,'r');
	while(!feof($file)){
    	$result=fgets($file);
	}
	file_put_contents('code.json',$result);
	fclose($content);
?>