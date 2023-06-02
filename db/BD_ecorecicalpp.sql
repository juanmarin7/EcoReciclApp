CREATE DATABASE ecoreciclapp;

USE ecoreciclapp;
-- TABLA PERSONAS
CREATE TABLE Personas (
  id_persona INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(30) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  cedula VARCHAR(15) NOT NULL UNIQUE,
  correo VARCHAR(50) NOT NULL UNIQUE
);
-- TABLA CREDENCIALES
CREATE TABLE Credenciales (
  id_credencial INT PRIMARY KEY AUTO_INCREMENT,
  id_persona INT NOT NULL UNIQUE,
  contrasena VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_persona) REFERENCES Personas(id_persona)
);

-- TABLA ENTIDADES RECOLECTORAS
CREATE TABLE entidades_recolectoras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomb_entidad VARCHAR(50),
  nit VARCHAR(20),
  telefono VARCHAR(20),
  direccion VARCHAR(100),
  correo VARCHAR(50),
  contrasena VARCHAR(50)
);
-- TABLA RESIDUOS
CREATE TABLE residuos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_entidad INT,
  tipo_residuo VARCHAR(50),
  peligroso ENUM('S', 'N'),
  reciclable ENUM('S', 'N'),
  FOREIGN KEY (id_entidad) REFERENCES entidades_recolectoras(id)
);

-- Insert para la tabla ENTIDADES_RECOLECTORAS
INSERT INTO entidades_recolectoras (nomb_entidad, nit, telefono, direccion, correo, contrasena) VALUES
('ECORECICLAJES SAS', '12345678', '3214567890', 'Calle 10 # 30-25 Medellin', 'ecoreciclajes@gmail.com', 'pass123'),
('RECICLA YA', '87654321', '3214561234', 'Calle 45 # 23-10 Medellin', 'reciclaya@hotmail.com', 'abc123'),
('RECICLEMOS', '45678912', '3216549870', 'Carrera 23 # 56-12 Medellin', 'reciclemos@gmail.com', 'qwerty'),
('RECOLECTORES UNIDOS', '98765432', '3214567820', 'Calle 67 # 12-30 Medellin', 'recolectoresunidos@gmail.com', 'pass123'),
('LIMPIEZA AMBIENTAL', '74185296', '3216540987', 'Carrera 34 # 45-12 Medellin', 'limpiezaambiental@gmail.com', '123456'),
('EcoGestión', '1111111111', '3101234567', 'Cra 12 # 34-56 Medellin', 'ecogestion@mail.com', '12345'),
('ReciAmbiental', '2222222222', '3119876543', 'Cra 22 # 45-67 Medellin', 'reciambiental@mail.com', '54321'),
('MediAmbiente', '3333333333', '3204567890', 'Cra 32 # 78-90 Medellin', 'mediambiente@mail.com', 'abcde'),
('CuidemosElPlaneta', '4444444444', '3105678901', 'Cra 44 # 56-78 Medellin', 'cuidemoselplaneta@mail.com', 'edcba'),
('ResiPlaneta', '5555555555', '3132345678', 'Cra 55 # 67-89 Medellin', 'resiplaneta@mail.com', '1a2b3c');



-- Insert para la tabla PERSONA
INSERT INTO Personas (nombre, apellido, cedula, correo) VALUES
('Ana', 'García', '123456789', 'ana@gmail.com'),
('Carlos', 'Martínez', '987654321', 'carlosmz@yahoo.com'),
('Luisa', 'Sánchez', '567890123', 'luisa.sanchez@gmail.com'),
('Pedro', 'Díaz', '2468101214', 'pedrodz@hotmail.com'),
('María', 'Pérez', '876543219', 'mariapz@gmail.com');

-- Insert para la tabla CREDENCIALES
INSERT INTO Credenciales (id_persona, contrasena) VALUES
(1, 'pass123'),
(2, 'abc123'),
(3, 'qwerty'),
(4, 'pass1234'),
(5, '123456');


-- Insert para la tabla RESIDUOS
INSERT INTO residuos (id_entidad, tipo_residuo, peligroso, reciclable) VALUES
(1, 'Plastico', 'N', 'S'),
(2, 'Papel', 'N', 'S'),
(3, 'Baterias', 'S', 'N'),
(4, 'Aceite usado', 'S', 'N'),
(5, 'Electrónicos', 'S', 'S'),
(6, 'Baterias', 'S', 'S'),
(7, 'Plastico', 'N', 'S'),
(8, 'Residuos de construcción', 'N', 'N'),
(9, 'Papel', 'N', 'S'),
(10, 'Baterías', 'S', 'N');