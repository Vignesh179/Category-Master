<?php
    
    require 'database.php';

    header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $id = $data->id;
    $name = $data->name;
    $status = $data->status;
    echo json_encode($request_body);
    if(isset($data)){
    $sql = "INSERT INTO tablecategory (id, name, status)
        VALUES (null,'$name','$status')";
    	$category = mysqli_query($db,$sql);
    }
?>