package com.api_facturas.Security;

import com.api_facturas.Usuarios.model.UsuarioEntity;
import com.api_facturas.Usuarios.repository.UsuarioRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final HttpSession httpSession;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, HttpSession httpSession) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.httpSession = httpSession;
    }

    // http://localhost:8080/api/auth/login
    @PostMapping("/login")
    public UsuarioEntity login(@RequestBody UsuarioEntity form, HttpServletRequest request) {
        // Buscar al usuario por su correo electrónico
        Optional<UsuarioEntity> usuarioOptional = usuarioRepository.findByCorreo(form.getCorreo());
        if (usuarioOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado");
        }

        UsuarioEntity usuario = usuarioOptional.get();

        // Verificar si la contraseña coincide
        if (!passwordEncoder.matches(form.getContrasena(), usuario.getContrasena())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta");
        }

        // agregar el usuario a la http session (para el controlador de productos, clientes, etc)  
        if (usuario.getRol().equals("admin")) {
            httpSession.setAttribute("adminLogged", usuario);
        } else {
            System.out.println("loadUserByUsername: usuario: " + usuario);
            httpSession.setAttribute("userLogged", usuario);
        }

        // agregar el usuario a la sesión de autenticación (para Spring Security)
        try {
            request.login(usuario.getCorreo(), usuario.getContrasena());
        } catch (ServletException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        // El usuario está autenticado correctamente, puedes devolverlo
        return usuario;
    }


    @GetMapping("/logout")
    public void logout(HttpServletRequest request) {
        try {
            request.logout();
            httpSession.invalidate();
        } catch (ServletException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Error al cerrar sesión");
        }
    }
}
