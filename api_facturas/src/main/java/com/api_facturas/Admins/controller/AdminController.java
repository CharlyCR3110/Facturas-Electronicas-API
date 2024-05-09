package com.api_facturas.Admins.controller;


import com.api_facturas.Admins.model.AdminEntity;
import com.api_facturas.Admins.service.AdminService;
import com.api_facturas.Proveedores.model.ProveedorEntity;
import com.api_facturas.Proveedores.service.ProveedorService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/admins")
public class AdminController {
    private final AdminService adminService;
    private final ProveedorService proveedorService;
    final HttpSession httpSession;

    public AdminController(AdminService adminService, ProveedorService proveedorService, HttpSession httpSession) {
        this.adminService = adminService;
        this.proveedorService = proveedorService;
        this.httpSession = httpSession;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginAdmin(@Valid @RequestBody AdminEntity adminEntity) {
        try {
            AdminEntity loggedAdmin = adminService.loginAdmin(adminEntity.getNombre(), adminEntity.getContrasena());
            httpSession.setAttribute("adminLogged", loggedAdmin);
            return ResponseEntity.ok(loggedAdmin);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Object> logoutAdmin(HttpSession session) {
        session.removeAttribute("adminLogged");
        return ResponseEntity.ok("Sesión cerrada");
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Object> getAdminDashboard() {
        AdminEntity admin = (AdminEntity) httpSession.getAttribute("adminLogged");
        if (admin == null) {
            return ResponseEntity.badRequest().body("No hay una sesión activa");
        }
        // obtener la lista de proveedores
        List<ProveedorEntity> proveedores = proveedorService.getAllProviders();

        return ResponseEntity.ok(proveedores);
    }

}
