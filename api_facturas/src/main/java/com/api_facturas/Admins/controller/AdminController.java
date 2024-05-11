package com.api_facturas.Admins.controller;


import com.api_facturas.Usuarios.model.UsuarioEntity;
import com.api_facturas.Usuarios.service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/admins")
public class AdminController {
    private final UsuarioService usuarioService;
    final HttpSession httpSession;

    public AdminController(UsuarioService usuarioService, HttpSession httpSession) {
        this.usuarioService = usuarioService;
        this.httpSession = httpSession;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Object> getAdminDashboard() {
        UsuarioEntity admin = (UsuarioEntity) httpSession.getAttribute("adminLogged");
        if (admin == null) {
            return ResponseEntity.status(401).build();
        }
        // obtener la lista de proveedores
        List<UsuarioEntity> proveedores = usuarioService.getAllProviders();

        return ResponseEntity.ok(proveedores);
    }

    // changeProviderState
    @PutMapping("/providers/changeState/{providerId}")
    public ResponseEntity<Object> changeProviderState(@PathVariable("providerId") Integer providerId) {
        UsuarioEntity admin = (UsuarioEntity) httpSession.getAttribute("adminLogged");
        if (admin == null) {
            return ResponseEntity.status(401).build();
        }

        UsuarioEntity updatedProvider = usuarioService.changeProviderState(providerId);
        if (updatedProvider != null) {
            return ResponseEntity.ok(updatedProvider);
        }

        return ResponseEntity.badRequest().body("No se pudo actualizar el proveedor");
    }

}
