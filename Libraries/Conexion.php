<?php
    require_once("../Config/Config.php");
    class Conexion{
        public function connect(){
            $mysql = new mysqli(server, user, password, database);
            $mysql->set_charset(charset);
            if(mysqli_errno($mysql)){
                echo "Error ".mysqli_errno($mysql)." ,no conectado a la base de datos";
                exit();
            }
            return $mysql;
        }
    }
    //$prueba = new Conexion();
    //$prueba->connect();
?>