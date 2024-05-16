package com.api_facturas.Security;

import com.api_facturas.Usuarios.model.UsuarioEntity;
import com.api_facturas.Usuarios.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    final UsuarioRepository userRepository;

    public UserDetailsServiceImpl(UsuarioRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        try {
            System.out.println("loadUserByUsername: correo: " + correo);
            UsuarioEntity usuario = userRepository.findByCorreo(correo).orElseThrow(() -> new UsernameNotFoundException("Email " + correo + " not found"));

            // Codificar la contraseña antes de crear UserDetails
            String encodedPassword = passwordEncoder.encode(usuario.getContrasena());

            // Actualizar la contrase
            usuario.setContrasena(encodedPassword);
            System.out.println("loadUserByUsername: usuario: " + usuario);
            return new UserDetailsImpl(usuario);
        } catch (Exception e) {
            throw new UsernameNotFoundException("Email " + correo + " not found");
        }
    }

}
