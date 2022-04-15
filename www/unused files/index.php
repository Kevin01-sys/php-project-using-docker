<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Tutorial Conexión PHP BD puro</title>
	<!-- Css usado para dar estilo a la hoja -->
	<link href="css/basic.css" rel="stylesheet" title="Default Style">
	<!-- Librerias que podrían ser para los botones de exportar documentos pero no funcionaron
	<link href="buttons.dataTables.min.css" rel="stylesheet" title="Default Style">
	<link href="jquery.dataTables.min.css" rel="stylesheet" title="Default Style">-->
	<!--Librerias para el uso del Datatable-->
	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css"/>
	<!-- Librerias para el uso de bootstrap -->
	<!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">-->
	<!-- Librerias para los iconos de los botones -->
	<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	<!-- Con el link rel y los 2 script es que se puede levantar el modal -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>
	<!-- Div en el que se podrá registrar usuarios -->
	<div class="row">
		<div id="cuadro2" class="col-sm-12 col-md-12 col-lg-12 ocultar">
			<form class="form-horizontal" id="frmEditarUsuario" action="" method="POST">
				<div class="form-group">
					<h3 class="col-sm-offset-2 col-sm-8 text-center">					
					Formulario de Registro de Usuarios</h3>
				</div>
				<input type="hidden" id="id" name="id" value="0">
				<input type="hidden" id="opcion" name="opcion" value="registrar">
				<div class="form-group">
					<label for="nombre" class="col-sm-2 control-label">Run</label>
					<div class="col-sm-8"><input id="run" name="run" type="text" class="form-control" autofocus></div>				
				</div>
				<div class="form-group">
					<label for="nombre" class="col-sm-2 control-label">Nombres</label>
					<div class="col-sm-8"><input id="nombreusuario" name="nombre" type="text" class="form-control"  autofocus></div>			
				</div>
				<div class="form-group">
					<label for="apellidos" class="col-sm-2 control-label">Hobby</label>
					<div class="col-sm-8"><input id="hobby" name="hobby" type="text" class="form-control" ></div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-8">
						<input id="" type="submit" class="btn btn-primary" value="Guardar">
						<input id="btn_listar" type="button" class="btn btn-primary" value="Listar">
					</div>
				</div>
			</form>
			<div class="col-sm-offset-2 col-sm-8">
				<p class="mensaje"></p>
			</div>
			
		</div>
	</div>
	<!--Termino de registro de usuarios -->
	<!--<div class="note" id="Registrar y botones exportar"><a name="registrar y botones exportar"></a><h1>Registrar y botones exportar</h1>Describa aquí su nota nueva.</div>-->
	
	<button type='button' id='agregarUsuario' class='btn btn-success'><i class='fa fa-user-plus' aria-hidden='true'></i></button>

	<!-- Sección en la cual se listan los datos, se puede borrar registros -->
	<div class="row">
		<div id="cuadro1" class="col-sm-12 col-md-12 col-lg-12">
			<div class="col-sm-offset-2 col-sm-8">
				<h3 class="text-center"> <small class="mensaje"></small></h3>
			</div>
			<div class="table-responsive col-sm-12">		
				<table id="dt_cliente" class="table table-bordered table-hover" cellspacing="0" width="100%">
					<thead>
						<tr>								
					      <th>Run</th>
					      <th>Nombre</th>
					      <th>Hobby</th>
					      <th></th>										
						</tr>
					</thead>					
				</table>
				<!--<input type="button" class="btn btn-primary" onclick="mostrarDatos(<?php echo $id; ?>)" value="Listar antiguo">-->
				<div id="test" class="mensaje">
					<!--<button type="button" class="editar btn btn-primary"><i class="fa fa-pencil-square-o"></i></button>
					<button type="button" class="eliminar btn btn-danger" data-toggle="modal" data-target="#modalEliminar"><i class="fa fa-trash-o"></i></button>-->
				</div>
			</div>			
		</div>		
	</div>

  <!-- Modal Eliminar usuario -->
	<div>
		<form id="frmEliminarUsuario" action="" method="POST">
			<input type="hidden" id="id" name="idusuario" value="">
			<input type="hidden" id="opcion" name="opcion" value="eliminar">
			<!-- Modal -->
			<div class="modal fade" id="modalEliminar" tabindex="-1" role="dialog" aria-labelledby="modalEliminarLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="modalEliminarLabel">Eliminar Usuario</h4>
						</div>
						<div class="modal-body">							
							¿Está seguro de eliminar al usuario?<strong data-name=""></strong>
						</div>
						<div class="modal-footer">
							<button type="button" id="eliminar-usuario" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
							<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
						</div>
					</div>
				</div>
			</div>
			<!-- Modal -->
		</form>
	</div>
  <!-- Fin Modal Eliminar usuario -->

	<!-- Termino de div listar -->
	<!--<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->
	<!-- Librerias que podrían ser para los botones de exportar documentos pero no funcionaron
	<script src="js/jquery-3.5.1.js"></script>
	<script src="js/jquery.dataTables.min.js"></script>
	<script src="js/jszip.min.js"></script>
	<script src="js/dataTables.buttons.min.js"></script>
	<script src="js/pdfmake.min.js"></script>
	<script src="js/vfs_fonts.js"></script>
	<script src="js/buttons.html5.min.js"></script>-->
	<!-- Script necesario para el uso del Datatable-->
    <script type="text/javascript" src="//cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="js/app.js"></script>
    <script>
       $(document).ready(function(){
          listar();
          guardar();
          eliminar();
       });
    </script>

</body>
</html>
