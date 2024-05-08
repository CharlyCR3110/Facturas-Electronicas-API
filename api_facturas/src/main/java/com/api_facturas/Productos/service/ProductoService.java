package com.api_facturas.Productos.service;

import com.api_facturas.Productos.model.ProductoEntity;
import com.api_facturas.Productos.repository.ProductoRepository;
import com.api_facturas.Proveedores.model.ProveedorEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public ArrayList<ProductoEntity> getProductosByProveedor(ProveedorEntity userLogged) {
        return productoRepository.findAllByIdProveedor(userLogged.getIdProveedor());
    }

    // save a product
    public ProductoEntity saveProduct(ProductoEntity producto) {
        // verificar que el proveedor no tenga un producto con el mismo nombre
        ArrayList<ProductoEntity> productos = productoRepository.findAllByIdProveedor(producto.getIdProveedor());
        for (ProductoEntity p : productos) {
            if (p.getNombre().equals(producto.getNombre())) {
                throw new RuntimeException("Ya existe un producto con el mismo nombre");
            }
        }
        return productoRepository.save(producto);
    }

    // eliminar un producto por su 
    public void deleteProductById(int idProducto) {
        try {
            productoRepository.deleteById(idProducto);
        } catch (Exception e) {
            if (e.getMessage().contains("foreign key constraint fails")) {
                throw new RuntimeException("No se pudo eliminar el producto con ID " + idProducto + ". Esto puede deberse a que hay facturas asociadas a este producto. Por favor, elimine primero las facturas asociadas y luego intente nuevamente.");
            }
            throw new RuntimeException("No se pudo eliminar el producto con ID " + idProducto);
        }
    }

    public ProductoEntity editProduct(ProductoEntity producto) {
        // verificar que el proveedor no tenga un producto con el mismo nombre
        ArrayList<ProductoEntity> productos = productoRepository.findAllByIdProveedor(producto.getIdProveedor());
        for (ProductoEntity p : productos) {
            if (p.getNombre().equals(producto.getNombre()) && p.getIdProducto() != producto.getIdProducto()) {
                throw new RuntimeException("Ya existe un producto con el mismo nombre");
            }
        }
        return productoRepository.save(producto);
    }

    public ArrayList<ProductoEntity> searchProductsByName(ProveedorEntity userLogged, String searchName) {
        if (searchName == null || searchName.isEmpty()) {
            return productoRepository.findAllByIdProveedor(userLogged.getIdProveedor());
        }

        return productoRepository.findAllByIdProveedorAndNombreContaining(userLogged.getIdProveedor(), searchName);
    }

    public ProductoEntity getProductoByID(Integer productID) {
        return productoRepository.findById(productID).orElse(null);
    }

    public ProductoEntity getProductoByNombreAndProveedor(String productName, ProveedorEntity userLogged) {
        ProductoEntity returnValue = productoRepository.findByNombreAndIdProveedor(productName, userLogged.getIdProveedor());
        if (returnValue == null) {
            throw new RuntimeException("Parece que el producto no existe");
        }

        return returnValue;
    }
}
