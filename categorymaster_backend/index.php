<?php
    require 'database.php';
    header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    $sql = "Select * From tablecategory";
    $category = mysqli_query($db,$sql);
    $data =array();
    while($row = mysqli_fetch_array($category)){
        $data[] = $row;
    }
    echo json_encode($data);
?>