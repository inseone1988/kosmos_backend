DROP PROCEDURE IF EXISTS `get_existent_students`;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_existent_students`()
BEGIN
	#La ventaja de los procedimientos almacenados es que son consultas precompiladas
	#una vez que la conexion cachea el plan de ejecucion esta esta disponible a nivel de conexion ademas
	#que pueden aceptar parametros de entrada y salida
	SELECT * FROM students WHERE students.`status` = TRUE;
END