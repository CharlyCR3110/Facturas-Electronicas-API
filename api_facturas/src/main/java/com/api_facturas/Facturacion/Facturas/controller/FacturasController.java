package com.api_facturas.Facturacion.Facturas.controller;


import ch.qos.logback.core.model.Model;
import com.api_facturas.Clientes.service.ClienteService;
import com.api_facturas.Facturacion.DTO.FacturaConDetallesDTO;
import com.api_facturas.Facturacion.DTO.ProductOnCart;
import com.api_facturas.Facturacion.Facturas.service.FacturaEntityService;
import com.api_facturas.Productos.service.ProductoService;
import com.api_facturas.Usuarios.model.UsuarioEntity;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


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
    @PostMapping("/search")
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


}

