package com.api_facturas.Proveedores.controller;

import com.api_facturas.Proveedores.service.ProveedorService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    
}