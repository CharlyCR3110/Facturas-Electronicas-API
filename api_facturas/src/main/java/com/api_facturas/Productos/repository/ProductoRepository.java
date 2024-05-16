package com.api_facturas.Productos.repository;

import com.api_facturas.Productos.model.ProductoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface ProductoRepository  extends JpaRepository<ProductoEntity, Integer> {
    // metoodo para obtener la lista de productos de un proveedor
    ArrayList<ProductoEntity> findAllByIdUsuario(int idProveedor);

    ArrayList<ProductoEntity> findAllByIdUsuarioAndNombreContaining(int idProveedor, String searchName);

    ProductoEntity findByNombreAndIdUsuario(String productName, int idProveedor);
}
