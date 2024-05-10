package com.api_facturas.Usuarios.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
@Table(name = "tbl_usuarios", schema = "facturas_electronicas_api", catalog = "")
public class UsuarioEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_usuario")
    private int idUsuario;

    @Basic
    @NotBlank(message = "El nombre es requerido")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    @Column(name = "nombre")
    private String nombre;

    @Basic
    @NotBlank(message = "La dirección es requerida")
    @Size(min = 3, max = 255, message = "La dirección debe tener entre 3 y 255 caracteres")
    @Column(name = "direccion")
    private String direccion;

    @Basic
    @NotBlank(message = "El teléfono es requerido")
    @Size(min = 3, max = 20, message = "El teléfono debe tener entre 3 y 20 caracteres")
    @Column(name = "telefono")
    private String telefono;

    @Basic
    @NotBlank(message = "El correo es requerido")
    @Size(min = 3, max = 100, message = "El correo debe tener entre 3 y 100 caracteres")
    @Column(name = "correo")
    private String correo;

    @Basic
    @NotBlank(message = "La contraseña es requerida")
    @Size(min = 3, max = 255, message = "La contraseña debe tener entre 3 y 255 caracteres")
    @Column(name = "contrasena")
    private String contrasena;

    @Basic
    @Pattern(regexp = "^(en espera|activo|inactivo|)$", message = "El estado debe ser 'en espera', 'activo' o 'inactivo'")
    @Column(name = "estado")
    private String estado;

    @Basic
    @Pattern(regexp = "^(proveedor|admin)$", message = "El rol debe ser 'proveedor' o 'admin'")
    @Column(name = "rol")
    private String rol;

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioEntity that = (UsuarioEntity) o;
        return idUsuario == that.idUsuario && Objects.equals(nombre, that.nombre) && Objects.equals(direccion, that.direccion) && Objects.equals(telefono, that.telefono) && Objects.equals(correo, that.correo) && Objects.equals(contrasena, that.contrasena) && Objects.equals(estado, that.estado) && Objects.equals(rol, that.rol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario, nombre, direccion, telefono, correo, contrasena, estado, rol);
    }
}
