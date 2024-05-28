package com.api_facturas.Security;

import com.api_facturas.Usuarios.model.UsuarioEntity;
import com.api_facturas.Usuarios.repository.UsuarioRepository;
import com.api_facturas.Usuarios.service.UsuarioService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final HttpSession httpSession;
    private final UsuarioService usuarioService;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, HttpSession httpSession, UsuarioService usuarioService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.httpSession = httpSession;
        this.usuarioService = usuarioService;
    }

    // http://localhost:8080/api/auth/login
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UsuarioEntity form, HttpServletRequest request) {
        // Buscar al usuario por su correo electrónico
        Optional<UsuarioEntity> usuarioOptional = usuarioRepository.findByCorreo(form.getCorreo());
        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
        }

        UsuarioEntity usuario = usuarioOptional.get();

        // Verificar si la contraseña coincide
        if (!passwordEncoder.matches(form.getContrasena(), usuario.getContrasena())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error al iniciar sesión");
        }

        // El usuario está autenticado correctamente, puedes devolverlo
        return ResponseEntity.ok(usuario);
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

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody UsuarioEntity form, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors().get(0).getDefaultMessage());
        }

        // Encriptar la contraseña
        form.setContrasena(passwordEncoder.encode(form.getContrasena()));
        try {
            return ResponseEntity.ok(usuarioService.registerProveedor(form));
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("correo")) {
                return ResponseEntity.status(400).body("Correo ya registrado");
            } else {
                return ResponseEntity.status(400).body(e.getMessage());
            }
        }

    }
}
