<?php
include 'DBconnect.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

// echo "testing local API";

// phpinfo();
$objectDB = new Dbconnect;
$conn = $objectDB->connect();
// var_export($conn);



// print_r(file_get_contents('php://input'));
// echo "Helo why not working you";


$user = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'OPTIONS') {
    http_response_code(200);
    exit();
}


switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users(id, name, email, mobile, created_at, updated_at) VALUES(null, :name, :email,
         :mobile, :created_at, :updated_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date("Y-m-d");
        $updated_at = date("Y-m-d");
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create a record'];
        }
        echo json_encode($response);
        break;

    case "GET":
        $sql = "SELECT * FROM users";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;

    case "DELETE":
        $rawData = file_get_contents("php://input");
        $data = json_decode($rawData, true);
        $id = $data['id'];
        $sql = "Delete FROM users where id=:id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record Deleted successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete a record'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        // echo "Update request here";
        $user = json_decode(file_get_contents('php://input'), true);
        // echo json_encode($response);

        // $id = $user['id'];
        // echo $id;


        $sql = "Update users set name=:name,email=:email,mobile=:mobile, updated_at=:updated_at where id=:id";
        $stmt = $conn->prepare($sql);
        $created_at = date("Y-m-d");
        $updated_at = date("Y-m-d");
        $stmt->bindParam(':id', $user['id']);
        $stmt->bindParam(':name', $user['name']);
        $stmt->bindParam(':email', $user['email']);
        $stmt->bindParam(':mobile', $user['mobile']);
        $stmt->bindParam(':updated_at', $updated_at);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record Updated successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to Update a record'];
        }
        echo json_encode($response);
        break;

    default:
        http_response_code(405);
        echo "Method Not Allowed";
        break;
}
