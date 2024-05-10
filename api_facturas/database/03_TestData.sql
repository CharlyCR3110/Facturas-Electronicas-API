USE facturas_electronicas_api;
-- proveedores --
INSERT INTO tbl_usuarios (nombre, direccion, telefono, correo, contrasena, estado, rol) 
VALUES 
("Proveedor A", "Calle Principal 123", "555-1234", "proveedora@example.com", "123", "activo", "proveedor"),
("Proveedor B", "Avenida Central 456", "555-5678", "proveedorb@example.com", "123", "activo", "proveedor"),
("Proveedor C", "Plaza Mayor 789", "555-9012", "proveedorc@example.com", "123", "activo", "proveedor"),
("Proveedor D", "Calle 15A", "555-3110", "proveedord@example.com", "123", "inactivo", "proveedor"),
("Proveedor E", "Calle 15B", "506-2138", "proveedore@example.com", "123", "inactivo", "proveedor"),
("Proveedor F", "Calle 15C", "555-3104", "proveedorf@example.com", "123", "inactivo", "proveedor"),
("Proveedor G", "Calle 15G", "506-2222", "proveedorg@example.com", "123", "activo", "proveedor"),
("Proveedor H", "Calle 15H", "64583082", "proveedorh@example.com", "123", "inactivo", "proveedor"),
("Proveedor I", "Calle 15I", "13145", "proveedori@example.com", "123", "activo", "proveedor"),
("Proveedor J", "Calle 15J", "883-331-231", "proveedorj@example.com", "123", "activo", "proveedor"),
("Carlos Garita", "Miramar", "64583082", "carlosgarita3110@gmail.com", "123", "inactivo", "proveedor"),
("Proveedor API_TEST_EDIT", "Calle Principal 12345", "555-4343", "proveedor_api@example.com", "123", "activo", "proveedor"),
("admin", "Calle Principal 123", "555-1234", "admin@admin.com", "admin", "activo", "admin"),
("root", "Calle Principal 123", "555-1234", "root@root.com", "root", "activo", "admin");

-- clientes --
INSERT INTO tbl_clientes (nombre, identificacion, telefono, correo, id_usuario)
VALUES 
('Cliente1', 'ID001', '111222333', 'cliente1@example.com', 1),
('Cliente2', 'ID002', '444555666', 'cliente2@example.com', 1),
('Cliente3', 'ID003', '777888999', 'cliente3@example.com', 1);

-- productos --
INSERT INTO tbl_productos (nombre, descripcion, precio_unitario, id_usuario)
VALUES 
('Producto1', 'Descripción del Producto 1', 10.50, 1),
('Producto2', 'Descripción del Producto 2', 20.75, 1),
('Producto3', 'Descripción del Producto 3', 15.00, 1);

-- facturas --
INSERT INTO tbl_facturas (fecha_emision, id_usuario, id_cliente, subtotal, impuesto, total)
VALUES 
('2024-03-30 10:00:00', 1, 1, 0.00, 13.00, 0.00),
('2024-03-30 11:00:00', 1, 2, 0.00, 13.00, 0.00),
('2024-03-30 12:00:00', 1, 3, 0.00, 13.00, 0.00);

-- detalle_facturas --
INSERT INTO tbl_detalle_facturas (id_factura, id_producto, cantidad, precio_unitario, total)
VALUES 
(1, 1, 2, 0, 0),
(2, 2, 1, 0, 0),
(3, 3, 3, 0, 0);