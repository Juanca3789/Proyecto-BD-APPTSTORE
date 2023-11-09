<?php
    require_once "../Libraries/Conexion.php";
    class Usuario{
        private $conexion;
        public function __construct()
        {
            $this->conexion = new Conexion();
            $this->conexion = $this->conexion->connect();
        }
        public function crearUsuario(string $nombre){
            $rs = $this->conexion->query("CALL crearUsuario('{$nombre}')");
            $rs = $rs->fetch_object();
            return $rs;
        }
        public function iniciarSesion(string $nombre){
            $rs = $this->conexion->query("CALL iniciarSesion('{$nombre}')");
            $rs = $rs->fetch_object();
            return $rs;
        }
        public function comprarLicencias(int $idUsuario, string $nombreJuego, int $cantidad, int $descuento){
            $rs = $this->conexion->query("CALL comprarLicencias('{$idUsuario}','{$nombreJuego}','{$cantidad}','{$descuento}')");
            $rs = $rs->fetch_object();
            return $rs;
        }
    }
?>