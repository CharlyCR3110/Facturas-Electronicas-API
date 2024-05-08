package com.api_facturas.Proveedores.repository;

import com.api_facturas.Proveedores.model.ProveedorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProveedorRepository extends JpaRepository<ProveedorEntity, Integer> {
    Optional<ProveedorEntity> findByCorreoAndContrasena (String correo, String contrasena);

    Optional<ProveedorEntity> findByCorreo(String correo);
}
