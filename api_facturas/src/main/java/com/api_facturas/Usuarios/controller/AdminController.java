package com.api_facturas.Usuarios.controller;

import com.api_facturas.Usuarios.model.UsuarioEntity;
import com.api_facturas.Usuarios.service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/admins")
public class AdminController {
    private final UsuarioService usuarioService;
    private final HttpSession httpSession;

    // Constructor para "inyectar" el servicio (se usa en lugar de @Autowired)
    public AdminController(UsuarioService usuarioService, HttpSession httpSession, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.httpSession = httpSession;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<List<UsuarioEntity>> getAdminDashboard() {
        List<UsuarioEntity> admins = usuarioService.getAllProviders();
        return ResponseEntity.ok(admins);
    }

    @PatchMapping("/changeProviderState")
    public ResponseEntity<List<UsuarioEntity>> changeProviderState(@RequestParam("idProvider") Integer idProvider) {
        try {
            UsuarioEntity updatedProvider = usuarioService.changeProviderState(idProvider);
            return getAdminDashboard();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).build();
        }
    }
}
