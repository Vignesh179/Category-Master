<?php
require 'database.php';
$postdata = file_get_contents('php://input');

if(isset($postdata) && !empty($postdata))
{
	$request = json_decode($postdata,true);
	if (trim($request['name']) == '' || (trim($request['status'] < 0))) {
		return http_response_code(400);
	}
	$id = mysqli_real_escape_string($db, (int)$request['id']);
	$name = mysqli_real_escape_string($db, trim($request['name']));
	$status = mysqli_real_escape_string($db, trim($request['status']));
	$sql = "UPDATE tablecategory SET name='$name',status='$status' WHERE id = $id";
	
	if($db->query($sql))
	{
		http_response_code(204);
	}
	else
	{
		return http_response_code(422);
	}
}