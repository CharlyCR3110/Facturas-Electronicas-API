package com.api_facturas.Facturacion.Facturas.controller;


import ch.qos.logback.core.model.Model;
import com.api_facturas.Clientes.model.ClienteEntity;
import com.api_facturas.Clientes.service.ClienteService;
import com.api_facturas.Facturacion.DTO.FacturaConDetallesDTO;
import com.api_facturas.Facturacion.DTO.ProductOnCart;
import com.api_facturas.Facturacion.Detalles.model.DetalleFacturaEntity;
import com.api_facturas.Facturacion.Facturas.model.FacturaEntity;
import com.api_facturas.Facturacion.Facturas.service.FacturaEntityService;
import com.api_facturas.Productos.service.ProductoService;
import com.api_facturas.Usuarios.model.UsuarioEntity;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Collections;


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
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        ArrayList<FacturaConDetallesDTO> invoices = facturaEntityService.getFacturasByProveedor(userLogged);
        if (invoices != null) {
            return ResponseEntity.ok(invoices);
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<Map<String, Object>> getInvoiceDetails(@PathVariable("id") Integer id) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            FacturaConDetallesDTO facturaConDetallesDTO = facturaEntityService.getFacturaById(id);
            FacturaEntity factura = facturaConDetallesDTO.getFactura();

            // Crear el objeto JSON con el formato deseado
            Map<String, Object> facturaJson = new HashMap<>();
            Map<String, Object> facturaObject = new HashMap<>();
            facturaObject.put("fechaEmision", factura.getFechaEmision());
            facturaObject.put("idProveedor", factura.getIdProveedor());
            facturaObject.put("idCliente", factura.getIdCliente());
            facturaObject.put("subtotal", factura.getSubtotal());
            facturaObject.put("impuesto", factura.getImpuesto());
            facturaObject.put("total", factura.getTotal());

            // Crear la lista de detalles
            List<Map<String, Object>> detalles = new ArrayList<>();
            for (DetalleFacturaEntity detalle : facturaConDetallesDTO.getDetalles()) {
                Map<String, Object> detalleObject = new HashMap<>();
                detalleObject.put("idProducto", detalle.getIdProducto());
                detalleObject.put("cantidad", detalle.getCantidad());
                detalleObject.put("precioUnitario", detalle.getPrecioUnitario());
                detalleObject.put("total", detalle.getTotal());
                detalles.add(detalleObject);
            }
            facturaObject.put("detalles", detalles);

            facturaJson.put("factura", facturaObject);

            return ResponseEntity.ok(facturaJson);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteInvoice(@PathVariable("id") Integer id, Model model) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            facturaEntityService.deleteFactura(id);
            ArrayList<FacturaConDetallesDTO> invoices = facturaEntityService.getFacturasByProveedor(userLogged);
            if (invoices != null) {
                return ResponseEntity.ok("Factura eliminada");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.badRequest().body("No se pudo eliminar la factura");
    }

    // http://localhost:8080/api/invoices/search?searchClientID=1
    @GetMapping("/search")
    public ResponseEntity<ArrayList<FacturaConDetallesDTO>> searchInvoice(@RequestParam(name = "searchClientID", required = false) Integer searchClientID, Model model) {
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(401).build();
        }

        ArrayList<FacturaConDetallesDTO> invoices = facturaEntityService.getFacturasByProveedorAndClientID(userLogged, searchClientID);
        if (invoices != null) {
            return ResponseEntity.ok(invoices);
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/sendProductToInvoiceCreator")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> sendProductToInvoiceCreator(@RequestParam(name = "idProducto") Integer idProducto, HttpSession httpSession) {
        Map<String, Object> response = new HashMap<>();

        // obtener el usuario loggeado (se obtiene de la sesion)
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            response.put("status", "error");
            response.put("message", "Usuario no autenticado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // obtener el producto
        ProductOnCart productOnCart = new ProductOnCart();
        productOnCart.setProduct(productoService.getProductoByID(idProducto));
        productOnCart.setQuantity(1);

        // obtener o crear el carrito en la sesión
        @SuppressWarnings("unchecked")
        ArrayList<ProductOnCart> cart = (ArrayList<ProductOnCart>) httpSession.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
        }

        // verificar que en el carrito no haya un producto con el mismo id
        boolean found = false;
        for (ProductOnCart p : cart) {
            if (p.getProduct().getIdProducto() == idProducto) {
                p.setQuantity(p.getQuantity() + 1);
                found = true;
                break;
            }
        }

        if (!found) {
            cart.add(productOnCart);
        }

        // Calcular el total
        BigDecimal total = BigDecimal.ZERO;
        for (ProductOnCart p : cart) {
            BigDecimal price = p.getProduct().getPrecioUnitario();
            BigDecimal quantityP = BigDecimal.valueOf(p.getQuantity());
            total = total.add(price.multiply(quantityP));
        }

        // Guardar el carrito y el total en la sesión
        httpSession.setAttribute("cart", cart);
        httpSession.setAttribute("total", total);

        response.put("status", "success");
        response.put("cart", cart);
        response.put("total", total);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/sendClientToInvoiceCreator")
    @ResponseBody
    public ResponseEntity<ClienteEntity> sendClientToInvoiceCreator(@RequestParam(name = "idCliente") Integer idCliente, HttpSession httpSession) {
        // obtener el usuario loggeado (se obtiene de la sesion)
        UsuarioEntity userLogged = (UsuarioEntity) httpSession.getAttribute("userLogged");
        if (userLogged == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // obtener el cliente
        ClienteEntity client = clienteService.getClientById(idCliente);

        return ResponseEntity.ok(client);
    }

    @GetMapping("/export/pdf/{id}")
    public ResponseEntity<ByteArrayResource> exportInvoicePDF(@PathVariable("id") Integer id) {
        try {
            // Exportar la factura como un archivo PDF
            byte[] pdfBytes = facturaEntityService.exportInvoiceInPDF(id);

            // Crear un ByteArrayResource con los bytes del PDF
            ByteArrayResource resource = new ByteArrayResource(pdfBytes);

            // Configurar los encabezados de la respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=factura.pdf");
            headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE);

            // Devolver una respuesta con el recurso ByteArrayResource y las cabeceras configuradas
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(pdfBytes.length)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
}

