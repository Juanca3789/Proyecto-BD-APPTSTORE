<?php
    require_once "../Models/Tienda.php";
    $tienda = new Tienda();
    if($_POST){
        if($_POST["nombreJuego"]){
            $nombreJuego = trim($_POST["nombreJuego"]);
            $tienda = $tienda->obtenerInfo($nombreJuego);
            $tienda->Imagen = base64_encode($tienda->Imagen);
            echo json_encode($tienda);
        }
    }
?>