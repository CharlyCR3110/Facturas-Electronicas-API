package com.api_facturas.Usuarios.service;

import com.api_facturas.Usuarios.model.UsuarioEntity;
import com.api_facturas.Usuarios.repository.UsuarioRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioEntity registerProveedor(UsuarioEntity proveedor) {
        try {
            proveedor.setEstado("en espera");
            proveedor.setRol("proveedor");
            return usuarioRepository.save(proveedor);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("correo")) {
                throw new IllegalArgumentException("Parece que ya existe una cuenta con este correo.");
            } else {
                throw new IllegalArgumentException("Hubo un error al registrar el proveedor. Intenta de nuevo.");
            }
        }
    }

    // para hacer login
    public UsuarioEntity loginProveedor(String correo, String contrasena) {
        Optional<UsuarioEntity> proveedorOptional = usuarioRepository.findByCorreo(correo);

        if (proveedorOptional.isPresent()) {
            UsuarioEntity proveedor = proveedorOptional.get();
            if (proveedor.getContrasena().equals(contrasena)) {
                if (!proveedor.getEstado().equals("activo")) {
                    throw new IllegalArgumentException("Tu cuenta no se encuentra activa. Contacta con el administrador.");
                }
                return proveedor;
            } else {
                throw new IllegalArgumentException("La contraseña proporcionada no es válida.");
            }
        } else {
            throw new IllegalArgumentException("No se encontró un proveedor con el correo electrónico proporcionado.");
        }
    }

    public UsuarioEntity changeEmail(UsuarioEntity proveedor, String correo) {
        // se intenta actualizar el correo del proveedor en la base de datos para el proveedor loggeado (se hace primero para evitar errores)
        String correoAnterior = proveedor.getCorreo();
        if (correo.equals(correoAnterior)) {
            throw new IllegalArgumentException("El correo proporcionado es igual al actual.");
        }
        proveedor.setCorreo(correo);
        try {
            usuarioRepository.save(proveedor);
        } catch (DataIntegrityViolationException e) {
            proveedor.setCorreo(correoAnterior);
            if (e.getMessage().contains("Duplicate")) {
                throw new IllegalArgumentException("Parece que ya existe una cuenta con este correo.");
            } else {
                throw new IllegalArgumentException("Hubo un error al actualizar el correo. Intenta de nuevo.");
            }
        }
        return proveedor;
    }

    public UsuarioEntity changePassword(UsuarioEntity userLogged, String newPassword) {
        userLogged.setContrasena(newPassword);
        return usuarioRepository.save(userLogged);
    }

    public UsuarioEntity changeProviderInfo(UsuarioEntity userLogged, UsuarioEntity usuarioEntity) {
        if (usuarioEntity.getNombre().equals(userLogged.getNombre()) &&
                usuarioEntity.getTelefono().equals(userLogged.getTelefono()) &&
                usuarioEntity.getDireccion().equals(userLogged.getDireccion())) {
            throw new IllegalArgumentException("No se realizaron cambios.");
        }

        userLogged.setNombre(usuarioEntity.getNombre());
        userLogged.setTelefono(usuarioEntity.getTelefono());
        userLogged.setDireccion(usuarioEntity.getDireccion());
        return usuarioRepository.save(userLogged);
    }

    public List<UsuarioEntity> getAllProviders() {
        return usuarioRepository.findAllByRol("proveedor");
    }

    public UsuarioEntity changeProviderState(int idProveedor) {
        Optional<UsuarioEntity> proveedorOptional = usuarioRepository.findById(idProveedor);
        if (proveedorOptional.isPresent()) {
            UsuarioEntity proveedor = proveedorOptional.get();
            if (proveedor.getEstado().equals("activo")) {
                proveedor.setEstado("inactivo");
            } else {
                proveedor.setEstado("activo");
            }
            return usuarioRepository.save(proveedor);
        } else {
            throw new IllegalArgumentException("No se encontró un proveedor con el ID proporcionado.");
        }
    }
}

