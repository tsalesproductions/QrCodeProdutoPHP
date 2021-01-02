<?php
    header('Content-Type: application/json');
    include_once("../vendor/autoload.php");

    use chillerlan\QRCode\QRCode;
    use chillerlan\QRCode\QROptions;
    
    if(isset($_GET['url'])){
        
        $data = $_GET['url'];

        $options = new QROptions([
            'version' => 5, //versao do QRCode
            'eccLevel' => QRCode::ECC_L, //Error Correction Feature Level L
        ]);

        echo json_encode(["qrCode" => (new QRCode($options))->render($data)]);  
    }
