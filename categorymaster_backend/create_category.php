<?php
include 'database.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
	$request = json_decode($postdata,true);
	// Validate.
	if(trim($request['name']) === '' || (trim($request['status']) < 0))
	{
		return http_response_code(400);
	}
	$name = mysqli_real_escape_string($db, trim($request['name']));
	$status = mysqli_real_escape_string($db, trim($request['status']));
	$sql = "INSERT INTO tablecategory (id,name,status) VALUES (null,'$name','$status')";
	if($db->query($sql))
	{
		http_response_code(201);
		$category = [
		'id' => mysqli_insert_id($db),'name' => $name,
		'status' => $status];
		echo json_encode($category);
	}
	else
	{
		http_response_code(422);
	}
}