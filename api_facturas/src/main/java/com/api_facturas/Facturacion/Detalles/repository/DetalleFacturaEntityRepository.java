package com.api_facturas.Facturacion.Detalles.repository;

import com.api_facturas.Facturacion.Detalles.model.DetalleFacturaEntity;
import com.api_facturas.Facturacion.Detalles.model.DetalleFacturaEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleFacturaEntityRepository extends JpaRepository<DetalleFacturaEntity, DetalleFacturaEntityPK> {
    List<DetalleFacturaEntity> getDetallesByIdFactura(int idFactura);
}