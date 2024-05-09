package com.api_facturas.Facturacion.Facturas.controller;


import ch.qos.logback.core.model.Model;
import com.api_facturas.Clientes.service.ClienteService;
import com.api_facturas.Facturacion.DTO.FacturaConDetallesDTO;
import com.api_facturas.Facturacion.Facturas.service.FacturaEntityService;
import com.api_facturas.Productos.service.ProductoService;
import com.api_facturas.Proveedores.model.ProveedorEntity;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


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

    @GetMapping("/history")
    public ResponseEntity<ArrayList<FacturaConDetallesDTO>> getInvoices(Model model) {
        ProveedorEntity userLogged = (ProveedorEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        ArrayList<FacturaConDetallesDTO> invoices = facturaEntityService.getFacturasByProveedor(userLogged);
        if (invoices != null) {
            return ResponseEntity.ok(invoices);
        }

        return ResponseEntity.noContent().build();
    }

}

