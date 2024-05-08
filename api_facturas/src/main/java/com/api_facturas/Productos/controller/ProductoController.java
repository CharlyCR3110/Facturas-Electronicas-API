package com.api_facturas.Productos.controller;

import com.api_facturas.Productos.model.ProductoEntity;
import com.api_facturas.Productos.service.ProductoService;
import com.api_facturas.Proveedores.model.ProveedorEntity;
import com.api_facturas.Proveedores.service.ProveedorService;
import jakarta.servlet.http.HttpSession;
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


}
