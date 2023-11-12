<?php
    require_once "../Libraries/Conexion.php";
    class Tienda{
        private $connection;
        public function __construct()
        {
            $this->connection = new Conexion();
            $this->connection = $this->connection->connect();
        }
        public function obtenerImagen(string $nombreJuego){
            $rs = $this->connection->query("SELECT Imagen FROM juegos WHERE Nombre = '{$nombreJuego}'");
            $rs = $rs->fetch_assoc();
            header("Content-type: image/png");
            echo $rs['Imagen'];
        }
        public function obtenerInfo(string $nombreJuego){
            $rs = $this->connection->query("SELECT J.Nombre, J.Categoria, J.PrecioLicencia, J.Tamanio, O.cantVendida, o.cantDisponible FROM juegos J, licencias O WHERE J.Nombre = O.NombreJuego AND J.Nombre = '{$nombreJuego}';");
            $rs = $rs->fetch_object();
            return $rs;
        }
    }
    //$Tienda = new Tienda();
    //print_r($Tienda->obtenerInfo("8 Ball Pool"));
?>