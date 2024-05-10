package com.api_facturas.Usuarios.repository;

import com.api_facturas.Usuarios.model.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    Optional<UsuarioEntity> findByCorreoAndContrasena (String correo, String contrasena);

    Optional<UsuarioEntity> findByCorreo(String correo);
}
