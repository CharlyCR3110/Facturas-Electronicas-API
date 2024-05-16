package com.api_facturas.Clientes.repository;

import com.api_facturas.Clientes.model.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface ClienteRepository extends JpaRepository<ClienteEntity, Integer> {
    ArrayList<ClienteEntity> findAllByIdUsuario(int idProveedor);

    ArrayList<ClienteEntity> findAllByIdUsuarioAndNombreContaining(int idProveedor, String searchName);

    ClienteEntity findByIdentificacionAndIdUsuario(String identificacion, int idProveedor);
}
