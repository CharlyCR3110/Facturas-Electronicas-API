package com.api_facturas.Proveedores.controller;

import com.api_facturas.Proveedores.model.ProveedorEntity;
import com.api_facturas.Proveedores.service.ProveedorService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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
    public ResponseEntity<Object> loginProveedor(@RequestBody ProveedorEntity proveedorEntity) {
        try {
            ProveedorEntity loggedProveedor = proveedorService.loginProveedor(proveedorEntity.getCorreo(), proveedorEntity.getContrasena());
            httpSession.setAttribute("userLogged", loggedProveedor);
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

    @PutMapping("/account/change-email")
    public ResponseEntity<Object> changeEmail(@Valid @RequestBody ProveedorEntity proveedorEntity) {
        ProveedorEntity userLogged = (ProveedorEntity) httpSession.getAttribute("userLogged");
        try {
            ProveedorEntity updatedProveedor = proveedorService.changeEmail(userLogged, proveedorEntity.getCorreo());
            httpSession.setAttribute("userLogged", updatedProveedor);
            return ResponseEntity.ok("Correo actualizado correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // localhost:8080/api/providers/account/change-password?currentPassword=123&newPassword=1234&confirmPassword=1234
    @PutMapping("/account/change-password")
    public ResponseEntity<Object> changePassword(@RequestParam("currentPassword") String currentPassword,
                                                 @RequestParam("newPassword") String newPassword,
                                                 @RequestParam("confirmPassword") String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body("Las contraseñas no coinciden");
        }

        if (newPassword.equals(currentPassword)) {
            return ResponseEntity.badRequest().body("La nueva contraseña no puede ser igual a la actual");
        }

        ProveedorEntity userLogged = (ProveedorEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.badRequest().body("No se ha iniciado sesión");
        }

        try {
            ProveedorEntity updatedProveedor = proveedorService.changePassword(userLogged, newPassword);
            httpSession.setAttribute("userLogged", updatedProveedor);
            return ResponseEntity.ok("Contraseña actualizada correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}