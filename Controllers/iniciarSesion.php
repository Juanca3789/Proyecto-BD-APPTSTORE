<?php
    require_once "../Models/Usuario.php";
    $usuario = new Usuario();
    if($_POST){
        if($_POST["Nombre"]){
            $nombre = trim(strtolower($_POST["Nombre"]));
            $usuario = $usuario->iniciarSesion($nombre);
            echo json_encode($usuario);
        }
    }
?>