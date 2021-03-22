<?php
include 'database.php';
$category = [];

$sql = "SELECT * FROM tablecategory";
if($result = $db->query($sql))
{
	$i = 0;
	while($row = $result->fetch_assoc())
	{
		$category[$i]['id'] = $row['id'];
		$category[$i]['name'] = $row['name'];
		$category[$i]['status'] = $row['status'];
		$i++;
	}
	echo json_encode($category);
}
else
{
	http_response_code(404);
}