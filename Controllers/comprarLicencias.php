<?php
    require_once "../Models/Usuario.php";
    $usuario = new Usuario();
    if($_POST){
        if($_POST["Id"] && $_POST["NJuego"] && $_POST["Cantidad"] && $_POST["Descuento"]){
            $Id = $_POST["Id"];
            $NJuego = $_POST["NJuego"];
            $Cantidad = $_POST["Cantidad"];
            $Descuento = $_POST["Descuento"];
            $usuario = $usuario->comprarLicencias($Id, $NJuego, $Cantidad, $Descuento);
            echo json_encode($usuario);
        }
    }
?>