package com.api_facturas.Clientes.service;

import com.api_facturas.Clientes.model.ClienteEntity;
import com.api_facturas.Clientes.repository.ClienteRepository;
import com.api_facturas.Proveedores.model.ProveedorEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public ArrayList<ClienteEntity> getClientesByProveedor(ProveedorEntity userLogged) {
        return clienteRepository.findAllByIdProveedor(userLogged.getIdProveedor());
    }

    public ClienteEntity saveClient(ClienteEntity newClient) {
        // validar que el proveedor no tenga otro cliente con la misma identificación
        ArrayList<ClienteEntity> clientes = clienteRepository.findAllByIdProveedor(newClient.getIdProveedor());
        for (ClienteEntity c : clientes) {
            if (c.getIdentificacion().equals(newClient.getIdentificacion())) {
                throw new RuntimeException("Ya existe un cliente con la misma identificación");
            }
        }
        // Ademas la base de datos no permite que se repita el correo (entonces no es necesario validar) (tira excepción)

        return clienteRepository.save(newClient);
    }

    public void deleteClientById(Integer clienteId) {
        try {
            if (clienteRepository.existsById(clienteId)) {
                clienteRepository.deleteById(clienteId);
            } else {
                throw new RuntimeException("No se encontró el cliente con ID " + clienteId);
            }
        } catch (Exception e) {
            if (e.getMessage().contains("foreign key constraint fails")) {
                throw new RuntimeException("No se pudo eliminar el cliente con ID " + clienteId + ". Esto puede deberse a que hay facturas asociadas a este cliente. Por favor, elimine primero las facturas asociadas y luego intente nuevamente.");
            } else if (e.getMessage().contains("No se encontró el cliente")) {
                throw new RuntimeException("No se encontró el cliente con ID " + clienteId);
            }
            throw new RuntimeException("No se pudo eliminar el cliente");
        }
    }

    public ClienteEntity editCliente(ClienteEntity cliente) {
        // validar que el proveedor no tenga otro cliente con la misma identificación
        ArrayList<ClienteEntity> clientes = clienteRepository.findAllByIdProveedor(cliente.getIdProveedor());
        for (ClienteEntity c : clientes) {
            if (c.getIdentificacion().equals(cliente.getIdentificacion()) && c.getIdCliente() != cliente.getIdCliente()) {
                throw new RuntimeException("Ya existe un cliente con la misma identificación");
            }
        }
        // Ademas la base de datos no permite que se repita el correo (entonces no es necesario validar) (tira excepción)

        return clienteRepository.save(cliente);
    }

    public ArrayList<ClienteEntity> searchClientsByName(ProveedorEntity userLogged, String searchName) {
        if (searchName == null || searchName.isEmpty()) {
            return clienteRepository.findAllByIdProveedor(userLogged.getIdProveedor());
        }

        return clienteRepository.findAllByIdProveedorAndNombreContaining(userLogged.getIdProveedor(), searchName);
    }

    public ClienteEntity getClientByID(Integer clientID) {
        return clienteRepository.findById(clientID).orElse(null);
    }

    public ClienteEntity getClientByIdentificationAndProveedor(String clientIdentification, ProveedorEntity userLogged) {
        ClienteEntity clienteEntityReturn = clienteRepository.findByIdentificacionAndIdProveedor(clientIdentification, userLogged.getIdProveedor());
        if (clienteEntityReturn == null) {
            throw new RuntimeException("No se encontró el cliente con la identificación ingresada");
        }

        return clienteEntityReturn;
    }

    public ClienteEntity getClientById(Integer idCliente) {
        return clienteRepository.findById(idCliente).orElse(null);
    }
}
