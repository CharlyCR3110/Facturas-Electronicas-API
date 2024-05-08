package com.api_facturas.Productos.repository;

import com.api_facturas.Productos.model.ProductoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface ProductoRepository  extends JpaRepository<ProductoEntity, Integer> {
    // metoodo para obtener la lista de productos de un proveedor
    ArrayList<ProductoEntity> findAllByIdProveedor(int idProveedor);

    ArrayList<ProductoEntity> findAllByIdProveedorAndNombreContaining(int idProveedor, String searchName);

    ProductoEntity findByNombreAndIdProveedor(String productName, int idProveedor);
}
