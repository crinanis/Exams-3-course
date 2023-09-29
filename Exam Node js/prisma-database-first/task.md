Создайте обработчики для добавления записей в таблицы, используя ORM Prisma. Модели сгенерировать из базы данных. Таблицы Cars(id, model, driverId) и Drivers(id, name, exp).

CREATE TABLE Drivers (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  exp INT
);

CREATE TABLE Cars (
  id INT PRIMARY KEY,
  model VARCHAR(255),
  driverId INT,
  FOREIGN KEY (driverId) REFERENCES Drivers(id)
);