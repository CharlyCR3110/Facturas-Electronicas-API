export const formatInvoices = (data) => {
  return data.map(item => ({
    idFactura: item.factura.idFactura,
    fechaEmision: new Date(item.factura.fechaEmision).toLocaleDateString('es-ES'),
    idProveedor: item.factura.idProveedor,
    idCliente: item.factura.idCliente,
    subtotal: item.factura.subtotal,
    impuesto: item.factura.impuesto + '%',
    total: item.factura.total
  }))
}
