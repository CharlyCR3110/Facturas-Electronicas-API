package com.api_facturas.Proveedores.controller;

import com.api_facturas.Proveedores.model.ProveedorEntity;
import com.api_facturas.Proveedores.service.ProveedorService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
@RestController
@RequestMapping("/api/providers")
public class ProveedorController {
    private final ProveedorService proveedorService;

    private final HttpSession httpSession;

    // Constructor para "inyectar" el servicio (se usa en lugar de @Autowired)
    public ProveedorController(ProveedorService proveedorService, HttpSession httpSession) {
        this.proveedorService = proveedorService;
        this.httpSession = httpSession;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerProveedor(@Valid @RequestBody ProveedorEntity proveedorEntity) {
        try {
            ProveedorEntity registeredProveedor = proveedorService.registerProveedor(proveedorEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredProveedor);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginProveedor(@RequestBody ProveedorEntity proveedorEntity, HttpSession session) {
        try {
            ProveedorEntity loggedProveedor = proveedorService.loginProveedor(proveedorEntity.getCorreo(), proveedorEntity.getContrasena());
            session.setAttribute("userLogged", loggedProveedor);
            return ResponseEntity.ok(loggedProveedor);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Object> logoutProveedor(HttpSession session) {
        session.removeAttribute("userLogged");
        return ResponseEntity.ok("Sesión cerrada");
    }

}