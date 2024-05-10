--- naming convention: https://www.c-sharpcorner.com/UploadFile/f0b2ed/what-is-naming-convention/ ---
--- lo anterior, plus que todo va en minusculas y separado por guiones bajos ---

--- fk_<target_table>_<source_table> ---
--- es decir, la tabla que tiene la llave foranea, seguido de la tabla que tiene la llave primaria ---
--- uq_<table>_<column> ---
--- es decir, la tabla seguido de la columna que debe ser unica ---

CREATE DATABASE facturas_electronicas_api;
USE facturas_electronicas_api;

-- proveedores y administradores --
CREATE TABLE tbl_usuarios (
  id_usuario INT AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  estado ENUM('en espera','activo', 'inactivo') DEFAULT 'en espera',
  rol ENUM('proveedor', 'admin') DEFAULT 'proveedor',
  CONSTRAINT pk_proveedores PRIMARY KEY (id_usuario),
  CONSTRAINT uq_proveedores_correo UNIQUE (correo)
);

-- clientes --
CREATE TABLE tbl_clientes (
  id_cliente INT AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  identificacion VARCHAR(50) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  id_usuario INT,
  CONSTRAINT pk_clientes PRIMARY KEY (id_cliente),
  CONSTRAINT fk_clientes_proveedores FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id_usuario),
  CONSTRAINT uq_clientes_correo UNIQUE (correo)
);

-- productos --
CREATE TABLE tbl_productos (
  id_producto INT AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255),
  precio_unitario DECIMAL(10,2) NOT NULL,
  id_usuario INT,
  CONSTRAINT pk_productos PRIMARY KEY (id_producto),
  CONSTRAINT fk_productos_proveedores FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id_usuario)
);

-- facturas --
CREATE TABLE tbl_facturas (
  id_factura INT AUTO_INCREMENT,
  fecha_emision TIMESTAMP NOT NULL,
  id_usuario INT NOT NULL,
  id_cliente INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  impuesto DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  CONSTRAINT pk_facturas PRIMARY KEY (id_factura),
  CONSTRAINT fk_facturas_proveedores FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id_usuario),
  CONSTRAINT fk_facturas_clientes FOREIGN KEY (id_cliente) REFERENCES tbl_clientes(id_cliente)
);

-- detalle_facturas --
CREATE TABLE tbl_detalle_facturas (
  id_factura INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  CONSTRAINT pk_detalle_facturas PRIMARY KEY (id_factura, id_producto),
  CONSTRAINT fk_detalle_facturas_facturas FOREIGN KEY (id_factura) REFERENCES tbl_facturas(id_factura),
  CONSTRAINT fk_detalle_facturas_productos FOREIGN KEY (id_producto) REFERENCES tbl_productos(id_producto)
);
