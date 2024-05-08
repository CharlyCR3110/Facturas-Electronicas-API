package com.api_facturas.Productos.controller;

import com.api_facturas.Productos.model.ProductoEntity;
import com.api_facturas.Productos.service.ProductoService;
import com.api_facturas.Proveedores.model.ProveedorEntity;
import com.api_facturas.Proveedores.service.ProveedorService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
@RestController
@RequestMapping("/api/products")
public class ProductoController {
    private final ProductoService productoService;
    private final ProveedorService proveedorService;

    private final HttpSession httpSession;

    public ProductoController(ProductoService productoService, ProveedorService proveedorService, HttpSession httpSession) {
        this.productoService = productoService;
        this.proveedorService = proveedorService;
        this.httpSession = httpSession;
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/")
    public ResponseEntity<List<ProductoEntity>> getAllProducts() {
//        ProveedorEntity userLogged = (ProveedorEntity) httpSession.getAttribute("userLogged");
//        if (userLogged == null) {
//            return ResponseEntity.status(401).build();
//        }
        ProveedorEntity userLogged = proveedorService.loginProveedor("proveedora@example.com", "123");
        //TODO: Cambiar el usuario loggeado por el que se obtiene de la sesion

        ArrayList<ProductoEntity> productos = productoService.getProductosByProveedor(userLogged);
        if (productos != null) {
            return ResponseEntity.ok(productos);
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add")
    public ResponseEntity<ProductoEntity> addProduct(@Valid @RequestBody ProductoEntity producto) {
        ProveedorEntity userLogged = proveedorService.loginProveedor("proveedora@example.com", "123");

        producto.setIdProveedor(userLogged.getIdProveedor());

        ProductoEntity productoGuardado = productoService.saveProduct(producto);
        if (productoGuardado != null) {
            return ResponseEntity.ok(productoGuardado);
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        try {
            productoService.deleteProductById(id);
            return ResponseEntity.ok("Producto eliminado");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductoEntity> updateProduct(@PathVariable("id") Integer productoId, @Valid @RequestBody ProductoEntity producto) {
        ProveedorEntity userLogged = proveedorService.loginProveedor("proveedora@example.com", "123");

        producto.setIdProveedor(userLogged.getIdProveedor());
        ProductoEntity existingProduct = productoService.getProductoByID(productoId);
        if (existingProduct != null) {
            producto.setIdProducto(productoId);
            ProductoEntity updatedProduct = productoService.editProduct(producto);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
