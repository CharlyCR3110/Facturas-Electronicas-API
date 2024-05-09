package com.api_facturas.Facturacion.Facturas.service;


import com.api_facturas.Facturacion.DTO.FacturaConDetallesDTO;
import com.api_facturas.Facturacion.Detalles.model.DetalleFacturaEntity;
import com.api_facturas.Facturacion.Detalles.repository.DetalleFacturaEntityRepository;
import com.api_facturas.Facturacion.Facturas.model.FacturaEntity;
import com.api_facturas.Facturacion.Facturas.repository.FacturaEntityRepository;
import com.api_facturas.Proveedores.model.ProveedorEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FacturaEntityService {
    private final FacturaEntityRepository facturaEntityRepository;
    private final DetalleFacturaEntityRepository detalleFacturaEntityRepository;

    public FacturaEntityService(FacturaEntityRepository facturaEntityRepository, DetalleFacturaEntityRepository detalleFacturaEntityRepository) {
        this.facturaEntityRepository = facturaEntityRepository;
        this.detalleFacturaEntityRepository = detalleFacturaEntityRepository;
    }

    public ArrayList<FacturaConDetallesDTO> getFacturasByProveedor(ProveedorEntity userLogged) {
        ArrayList<FacturaConDetallesDTO> facturas = new ArrayList<>();
        List<FacturaEntity> facturasDelProveedor = facturaEntityRepository.getFacturasByIdProveedor(userLogged.getIdProveedor());

        for (FacturaEntity factura : facturasDelProveedor) {
            List<DetalleFacturaEntity> detalles = detalleFacturaEntityRepository.getDetallesByIdFactura(factura.getIdFactura());
            FacturaConDetallesDTO facturaConDetallesDTO = new FacturaConDetallesDTO();
            facturaConDetallesDTO.setFactura(factura);
            facturaConDetallesDTO.setDetalles(detalles);
            facturas.add(facturaConDetallesDTO);
        }

        return facturas;
    }

    public void deleteFactura(Integer id) {
        facturaEntityRepository.deleteById(id);
    }

    public ArrayList<FacturaConDetallesDTO> getFacturasByProveedorAndClientID(ProveedorEntity userLogged, Integer searchClientID) {
        if (searchClientID == null || searchClientID == -1) {
            return getFacturasByProveedor(userLogged);
        }

        ArrayList<FacturaConDetallesDTO> facturas = new ArrayList<>();
        List<FacturaEntity> facturasDelProveedor = facturaEntityRepository.getFacturasByIdProveedorAndIdCliente(userLogged.getIdProveedor(), searchClientID);

        for (FacturaEntity factura : facturasDelProveedor) {
            List<DetalleFacturaEntity> detalles = detalleFacturaEntityRepository.getDetallesByIdFactura(factura.getIdFactura());
            FacturaConDetallesDTO facturaConDetallesDTO = new FacturaConDetallesDTO();
            facturaConDetallesDTO.setFactura(factura);
            facturaConDetallesDTO.setDetalles(detalles);
            facturas.add(facturaConDetallesDTO);
        }

        return facturas;
    }

    public FacturaEntity saveFactura(FacturaEntity factura) {
        return facturaEntityRepository.save(factura);
    }

    public void saveDetalleFactura(int idFactura, int idProducto, int quantity) {
        DetalleFacturaEntity detalleFacturaEntity = new DetalleFacturaEntity();
        detalleFacturaEntity.setIdFactura(idFactura);
        detalleFacturaEntity.setIdProducto(idProducto);
        detalleFacturaEntity.setCantidad(quantity);
        detalleFacturaEntityRepository.save(detalleFacturaEntity);
    }

    public FacturaConDetallesDTO getFacturaById(Integer facturaId) {
        FacturaEntity factura = facturaEntityRepository.findById(facturaId).
                orElseThrow(() -> new RuntimeException("Factura no encontrada"));

        List<DetalleFacturaEntity> detalles = detalleFacturaEntityRepository.getDetallesByIdFactura(facturaId);
        FacturaConDetallesDTO facturaConDetallesDTO = new FacturaConDetallesDTO();
        facturaConDetallesDTO.setFactura(factura);
        facturaConDetallesDTO.setDetalles(detalles);

        return facturaConDetallesDTO;
    }

}
