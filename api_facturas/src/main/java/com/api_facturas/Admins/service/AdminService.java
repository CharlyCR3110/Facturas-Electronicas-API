package com.api_facturas.Admins.service;

import com.api_facturas.Admins.model.AdminEntity;
import com.api_facturas.Admins.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public AdminEntity loginAdmin(String nombre, String contrasena) {
        AdminEntity admin = adminRepository.findByNombre(nombre);
        if (admin == null) {
            throw new IllegalArgumentException("Usuario no encontrado");
        }
        if (!admin.getContrasena().equals(contrasena)) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }
        return admin;
    }
}
