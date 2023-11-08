CREATE DATABASE eliab;

use eliab;

CREATE TABLE Clientes (
  idCliente     INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(50)
);

CREATE TABLE Empleados (
  idEmpleado    INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(50)
);

CREATE TABLE Productos (
  idProducto    INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(50),
  stock         INT,
  precio        DECIMAL
);

CREATE TABLE Ventas (
  idVenta       INT AUTO_INCREMENT PRIMARY KEY,
  fecha         DATE,
  idCliente     INT,
  idEmpleado    INT,
  FOREIGN KEY (idEmpleado) REFERENCES Empleados (idEmpleado),
  FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente)
);

CREATE TABLE DetalleVenta (
  idDetalleVenta    INT AUTO_INCREMENT PRIMARY KEY,
  idVenta           INT,
  cantidadProducto  INT,
  idProducto        INT,
  FOREIGN KEY (idProducto) REFERENCES Productos (idProducto),
  FOREIGN KEY (idVenta) REFERENCES Ventas (idVenta)
);

INSERT INTO Clientes (nombre) VALUES
  ('Eliab'),
  ('Ramiro'),
  ('Sofia'),
  ('Doris'),
  ('Juliana'),
  ('Maria'),
  ('Ramon'),
  ('Alan'),
  ('Carmen'),
  ('Anahi'),
  ('Camila'),
  ('Juan'),
  ('Rosa'),
  ('Carlos'),
  ('Alberto'),
  ('Carolina'),
  ('Iven');
  

INSERT INTO Empleados (nombre) VALUES
  ('Roberto'),
  ('Ronald'), 
  ('JordY');

INSERT INTO Productos (nombre, stock, precio) VALUES
  ('Galleta', 12, 50.00),
  ('Gaseoa', 24, 75.00),
  ('Azucar', 100, 20.00),
  ('Frijoles', 100, 45.00),
  ('Arroz', 100, 25.00),
  ('Café', 6, 150.00),
  ('Arroz', 100, 25.00),
  ('Sardina', 24, 80.00);
  
SELECT * FROM Productos;
  
SELECT * FROM Ventas;

SELECT * FROM DetalleVenta;