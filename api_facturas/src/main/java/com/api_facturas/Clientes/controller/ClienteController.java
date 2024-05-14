package com.api_facturas.Clientes.controller;

import com.api_facturas.Clientes.model.ClienteEntity;
import com.api_facturas.Clientes.service.ClienteService;
import com.api_facturas.Usuarios.model.UsuarioEntity;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/clients")
public class ClienteController {
    private final ClienteService clienteService;

    private final HttpSession httpSession;

    public ClienteController(ClienteService clienteService, HttpSession httpSession) {
        this.clienteService = clienteService;
        this.httpSession = httpSession;
    }

    @GetMapping("/")
    public ResponseEntity<ArrayList<ClienteEntity>> getAllClients(Model model) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        ArrayList<ClienteEntity> clientes = clienteService.getClientesByProveedor(userLogged);
        if (clientes != null) {
            return ResponseEntity.ok(clientes);
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add")
    public ResponseEntity<ClienteEntity> addClient(@Valid @RequestBody ClienteEntity cliente) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        cliente.setIdUsuario(userLogged.getIdUsuario());
        ClienteEntity newClient = clienteService.saveClient(cliente);
        if (newClient != null) {
            return ResponseEntity.ok(newClient);
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable int id) {
        try {
            clienteService.deleteClientById(id);
            return ResponseEntity.ok("Cliente eliminado");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ClienteEntity> updateClient(@PathVariable("id") Integer clienteId, @RequestBody ClienteEntity cliente) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        cliente.setIdUsuario(userLogged.getIdUsuario());
        cliente.setIdCliente(clienteId);
        ClienteEntity updatedClient = clienteService.editCliente(cliente);
        if (updatedClient != null) {
            return ResponseEntity.ok(updatedClient);
        }

        return ResponseEntity.badRequest().build();
    }

    // http://localhost:8080/api/clients/search?searchName=Juan
    @PostMapping("/search")
    public ResponseEntity<ArrayList<ClienteEntity>> searchClients(@RequestParam("searchName") String searchName) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        ArrayList<ClienteEntity> clientes = clienteService.searchClientsByName(userLogged, searchName);
        if (clientes != null) {
            return ResponseEntity.ok(clientes);
        }

        return ResponseEntity.noContent().build();
    }

}
