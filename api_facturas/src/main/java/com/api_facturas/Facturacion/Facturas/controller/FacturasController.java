package com.api_facturas.Facturacion.Facturas.controller;


import com.api_facturas.Clientes.service.ClienteService;
import com.api_facturas.Facturacion.Facturas.service.FacturaEntityService;
import com.api_facturas.Productos.service.ProductoService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/invoices")
public class FacturasController {


    final HttpSession httpSession;
    private final FacturaEntityService facturaEntityService;
    private final ClienteService clienteService;
    private final ProductoService productoService;

    public FacturasController(FacturaEntityService facturaEntityService, ClienteService clienteService, ProductoService productoService, HttpSession httpSession) {
        this.facturaEntityService = facturaEntityService;
        this.clienteService = clienteService;
        this.productoService = productoService;
        this.httpSession = httpSession;
    }


}

