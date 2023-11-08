const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Ruta para registrar una venta con su detalle
  router.post('/createventa', (req, res) => {
    // Extraer datos de la solicitud
    const { fecha, idCliente, idEmpleado, detalle } = req.body;

    // Realizar la inserción de la venta en la tabla Ventas
    const sqlVenta = 'INSERT INTO Ventas (fecha, idCliente, idEmpleado) VALUES (?, ?, ?)';
    db.query(sqlVenta, [fecha, idCliente, idEmpleado], (err, result) => {
      if (err) {
        console.error('Error al insertar venta:', err);
        return res.status(500).json({ error: 'Error al insertar venta' });
      }

      const idVenta = result.insertId; // Obtener el ID de la venta insertada

      // Iterar sobre el detalle de la venta y realizar inserciones en DetalleVenta
      const sqlDetalle = 'INSERT INTO DetalleVenta (idVenta, cantidadProducto, idProducto) VALUES ?';
      const values = detalle.map((item) => [idVenta, item.cantidadProducto, item.idProducto]);
      db.query(sqlDetalle, [values], (err, result) => {
        if (err) {
          console.error('Error al insertar detalle de venta:', err);
          return res.status(500).json({ error: 'Error al insertar detalle de venta' });
        }

        // Devolver respuesta exitosa
        res.status(201).json({ message: 'Venta y detalle de venta agregados con éxito' });
      });
    });
  });

  // Ruta para listar todas las ventas con su detalle
  router.get('/readventas', (req, res) => {
    const sql = `
      SELECT v.*, dv.idDetalleVenta, dv.cantidadProducto, dv.idProducto
      FROM Ventas v
      LEFT JOIN DetalleVenta dv ON v.idVenta = dv.idVenta
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener ventas:', err);
        res.status(500).json({ error: 'Error al obtener ventas' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para actualizar una venta y su detalle
  router.put('/updateventa/:idVenta', (req, res) => {
    const idVenta = req.params.idVenta;
    const { fecha, idCliente, idEmpleado, detalle } = req.body;

    // Actualizar los datos de la venta en la tabla Ventas
    const sqlVenta = 'UPDATE Ventas SET fecha = ?, idCliente = ?, idEmpleado = ? WHERE idVenta = ?';
    db.query(sqlVenta, [fecha, idCliente, idEmpleado, idVenta], (err, result) => {
      if (err) {
        console.error('Error al actualizar la venta:', err);
        return res.status(500).json({ error: 'Error al actualizar la venta' });
      }

      // Eliminar el detalle de la venta actual para luego insertar el nuevo detalle
      const sqlDeleteDetalle = 'DELETE FROM DetalleVenta WHERE idVenta = ?';
      db.query(sqlDeleteDetalle, [idVenta], (err, result) => {
        if (err) {
          console.error('Error al eliminar detalle de venta:', err);
          return res.status(500).json({ error: 'Error al eliminar detalle de venta' });
        }

        // Insertar el nuevo detalle de la venta
        const sqlDetalle = 'INSERT INTO DetalleVenta (idVenta, cantidadProducto, idProducto) VALUES ?';
        const values = detalle.map((item) => [idVenta, item.cantidadProducto, item.idProducto]);
        db.query(sqlDetalle, [values], (err, result) => {
          if (err) {
            console.error('Error al insertar nuevo detalle de venta:', err);
            return res.status(500).json({ error: 'Error al insertar nuevo detalle de venta' });
          }

          res.status(200).json({ message: 'Venta y detalle de venta actualizados con éxito' });
        });
      });
    });
  });

  // Ruta para eliminar una venta y su detalle
  router.delete('/deleteventa/:idVenta', (req, res) => {
    const idVenta = req.params.idVenta;

    // Eliminar la venta en la tabla Ventas
    const sqlVenta = 'DELETE FROM Ventas WHERE idVenta = ?';
    db.query(sqlVenta, [idVenta], (err, result) => {
      if (err) {
        console.error('Error al eliminar la venta:', err);
        return res.status(500).json({ error: 'Error al eliminar la venta' });
      }

      // Eliminar el detalle de la venta en DetalleVenta asociado a la venta
      const sqlDetalle = 'DELETE FROM DetalleVenta WHERE idVenta = ?';
      db.query(sqlDetalle, [idVenta], (err, result) => {
        if (err) {
          console.error('Error al eliminar el detalle de la venta:', err);
          return res.status(500).json({ error: 'Error al eliminar el detalle de la venta' });
        }

        res.status(200).json({ message: 'Venta y detalle de venta eliminados con éxito' });
      });
    });
  });

  // Ruta para leer los productos
  router.get('/readProductos', (req, res) => {
    const sql = 'SELECT * FROM Productos';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener los productos:', err);
        res.status(500).json({ error: 'Error al obtener los productos' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para leer los clientes
  router.get('/readClientes', (req, res) => {
    const sql = 'SELECT * FROM Clientes';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).json({ error: 'Error al obtener los clientes' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para leer los empleados
  router.get('/readEmpleados', (req, res) => {
    const sql = 'SELECT * FROM Empleados';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener los empleados:', err);
        res.status(500).json({ error: 'Error al obtener los empleados' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  return router;
};
