package com.api_facturas.Usuarios.controller;

import ch.qos.logback.classic.encoder.JsonEncoder;
import com.api_facturas.Usuarios.model.UsuarioEntity;
import com.api_facturas.Usuarios.service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/providers")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final HttpSession httpSession;
    private final PasswordEncoder passwordEncoder;

    // Constructor para "inyectar" el servicio (se usa en lugar de @Autowired)
    public UsuarioController(UsuarioService usuarioService, HttpSession httpSession, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.httpSession = httpSession;
        this.passwordEncoder = passwordEncoder;
    }

    // http://localhost:8080/api/providers/account/change-email?idProveedor=1&newEmail="newemail@example.com"
    @PutMapping("/account/change-email")
    public ResponseEntity<Object> changeEmail(@RequestParam("idProveedor") Integer idProveedor,
                                              @RequestParam("newEmail") String newEmail) {
        try {
            UsuarioEntity updatedProveedor = usuarioService.changeEmail(idProveedor, newEmail);
            return ResponseEntity.ok(updatedProveedor);
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

        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            UsuarioEntity updatedProveedor = usuarioService.changePassword(userLogged, passwordEncoder.encode(newPassword));
            httpSession.setAttribute("userLogged", updatedProveedor);
            return ResponseEntity.ok("Contraseña actualizada correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // localhost:8080/api/providers/account/change-info
    @PutMapping("/account/change-info")
    public ResponseEntity<Object> changeProviderInfo(@Valid @RequestBody UsuarioEntity usuarioEntity) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            UsuarioEntity updatedProveedor = usuarioService.changeProviderInfo(userLogged, usuarioEntity);
            httpSession.setAttribute("userLogged", updatedProveedor);
            return ResponseEntity.ok("Información del proveedor actualizada correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}