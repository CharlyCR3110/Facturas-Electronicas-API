package com.api_facturas.Clientes.controller;

import com.api_facturas.Clientes.model.ClienteEntity;
import com.api_facturas.Clientes.service.ClienteService;
import com.api_facturas.Proveedores.model.ProveedorEntity;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
public class ClienteController {
    private final ClienteService clienteService;

    private final HttpSession httpSession;

    public ClienteController(ClienteService clienteService, HttpSession httpSession) {
        this.clienteService = clienteService;
        this.httpSession = httpSession;
    }

}
