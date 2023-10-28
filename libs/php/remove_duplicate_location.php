<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getAll.php

	$executionStartTime = microtime(true);

	include("config.php");
	// include("configHostinger.php");


	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	// SQL does not accept parameters and so is not prepared
		# code...
	$query = $conn->prepare('SELECT id,name FROM location where name = ?');

	$query->bind_param("s", $_REQUEST['name']);

	$query->execute();
	// $query = 'SELECT id, LOWER(name) FROM location where LOWER(name)='.$_REQUEST['name'];

	// $query->bind_param("s", $_REQUEST['name']);


	
	
	if (false == $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
	$result = $query->get_result();

	$location = [];

 	while ($row = mysqli_fetch_assoc($result)) {

	 array_push($location, $row);

 	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $location;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>