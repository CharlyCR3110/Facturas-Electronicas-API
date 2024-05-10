package com.api_facturas.Productos.controller;

import com.api_facturas.Productos.model.ProductoEntity;
import com.api_facturas.Productos.service.ProductoService;
import com.api_facturas.Usuarios.model.UsuarioEntity;
import com.api_facturas.Usuarios.service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/products")
public class ProductoController {
    private final ProductoService productoService;
    private final UsuarioService usuarioService;

    private final HttpSession httpSession;

    public ProductoController(ProductoService productoService, UsuarioService usuarioService, HttpSession httpSession) {
        this.productoService = productoService;
        this.usuarioService = usuarioService;
        this.httpSession = httpSession;
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/")
    public ResponseEntity<List<ProductoEntity>> getAllProducts() {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        ArrayList<ProductoEntity> productos = productoService.getProductosByProveedor(userLogged);
        if (productos != null) {
            return ResponseEntity.ok(productos);
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add")
    public ResponseEntity<ProductoEntity> addProduct(@Valid @RequestBody ProductoEntity producto) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        producto.setIdUsuario(userLogged.getIdUsuario());

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
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        producto.setIdUsuario(userLogged.getIdUsuario());
        ProductoEntity existingProduct = productoService.getProductoByID(productoId);
        if (existingProduct != null) {
            producto.setIdProducto(productoId);
            ProductoEntity updatedProduct = productoService.editProduct(producto);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // http://localhost:8080/api/products/search?searchName=producto
    @GetMapping("/search")
    public ResponseEntity<List<ProductoEntity>> searchProducts(@RequestParam("searchName") String searchName) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        ArrayList<ProductoEntity> productos = productoService.searchProductsByName(userLogged, searchName);
        if (!productos.isEmpty()) {
            return new ResponseEntity<>(productos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
