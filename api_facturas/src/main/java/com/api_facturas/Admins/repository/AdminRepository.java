package com.api_facturas.Admins.repository;

import com.api_facturas.Admins.model.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    AdminEntity findByNombreAndContrasena(String nombre, String contrasena);

    AdminEntity findByNombre(String nombre);
}
