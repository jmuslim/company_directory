<?php


    ini_set('display_errors', 'On');

    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    include("config.php");
	// include("configHostinger.php");


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

    $query = $conn->prepare('SELECT COUNT(d.id) as numdept, l.name
                             FROM department d
                             LEFT JOIN location l ON (l.id = d.locationID)
                             WHERE d.locationID=?');

    $query->bind_param("i", $_REQUEST['id']);

    $query->execute();

    $numdept = mysqli_fetch_assoc($query->get_result());

    if($numdept > 0) {
    // Create output telling the user they can’t delete

    $output['status']['code'] = "403";
    $output['status']['name'] = "forbidden";
    $output['status']['description'] = "Cannot delete location.";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = $numdept;

        echo json_encode($output);
        exit;
    } else{

        $output['status']['code'] = "400";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "Location can be deleted.";
        $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
        $output['data'] = $numdept;

        echo json_encode($output);
        exit;
    }
    if (false === $query) {

        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "query failed";  
        $output['data'] = [];

        mysqli_close($conn);
        echo json_encode($output);
        exit;

    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
 ?>