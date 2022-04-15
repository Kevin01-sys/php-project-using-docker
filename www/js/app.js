	   // When the btn_listar button is pressed, the listar() function will occur.
       $("#btn_listar").on("click", function(){
       		listar();
       });

       $("#agregarUsuario").on("click", function(){
       		agregar_nuevo_usuario();
       });

	   // The listar() function transforms the table "dt_client" into a Datatable and fetches the data from the server.  
		const listar = () =>{
				$("#cuadro2").slideUp("slow");
				$("#cuadro1").slideDown("slow");
				// DataTable gave problems after using the listar(), to solve it we used empty()
				// I was getting "data is undefined" when trying to bring the row to a variable or duplicate or even triplicate data and it would go up every time I listed 
				// It is initialized, left empty, destroyed, and reassembled. This is the process every time you list
				let table = $('#dt_cliente').DataTable();
				$('#dt_cliente').empty();
				table.destroy();
				table = $("#dt_cliente").DataTable({
					paging: false,
					ajax:{
						"method":"POST",
						"url": "listarUsuario.php"
						// The path for consuming the node.js api is left
						//"method":"GET",
						//"url": "http://localhost:4000/api/movies"
					},
					columns:[
						{"data":"run"},
						{"data":"nombre"},
						{"data":"hobby"},
						{"defaultContent": "<button type='button' id='buttonEditar' class='editar btn btn-primary'><i class='fa fa-pencil-square-o'></i></button>	<button type='button'id='buttonEliminar' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}	
					],
					language: idioma_espanol,
				});

			obtener_data_editar("#dt_cliente tbody", table);
			obtener_id_eliminar("#dt_cliente tbody", table);
		}

    	//The variables of the edit row are obtained 
    	const obtener_data_editar = (tbody, table) => {
    		$(tbody).on("click", "button.editar", function(){
    			const data = table.row( $(this).parents("tr") ).data();	
    			const idusuario = $("#id").val(data.id),
    				run = $("#run").val(data.run),
    				nombre = $("#nombreusuario").val(data.nombre),
    				hobby = $("#hobby").val(data.hobby),
    				opcion = $("#opcion").val("modificar");
    			console.log(data);	

				$("#cuadro2").slideDown("slow");
				$("#cuadro1").slideUp("slow");
    		});
    	}

       // The data to edit the user are sent 
       	const guardar = () => {
       		$("#frmEditarUsuario").on("submit", function(e){
       			e.preventDefault();
       			const frm = $(this).serialize();
       			$.ajax({
       				method: "POST",
       				url: "guardar.php",
       				data: frm
       			}).done(function(info){
       				const json_info = JSON.parse(info);
       				console.log(json_info);
       				mostrar_mensaje(json_info);
       				limpiar_datos();
       				listar();
       			});
       		});
       }

    	// The variables of the row to be eliminated are obtained
    	const obtener_id_eliminar = (tbody, table) => {
    		$(tbody).on("click", "#buttonEliminar", function(){
    			const data = table.row( $(this).parents("tr")).data();
    			console.log(data);	
    			const idusuario = $("#frmEliminarUsuario #id").val(data.id);
    		});
    	}

    	// User is deleted when their status is changed to zero
       const eliminar = () => {
       	$("#eliminar-usuario").on("click",function(){
       		let idusuario = $("#frmEliminarUsuario #id").val(),
       			opcion = $("#frmEliminarUsuario #opcion").val();
       			$.ajax({
       				method: "POST",
       				url: "guardar.php",
       				data: {"id": idusuario,"opcion": opcion}
       			}).done(function(info){
       				const json_info=JSON.parse(info);
       				mostrar_mensaje(json_info);
       				limpiar_datos();
       				listar();
       				console.log(json_info);
       			})
       	});
       }
		
		// hides the Datatable, displays the form and clears the data
		const agregar_nuevo_usuario = () => {
			$("#cuadro2").slideDown("slow");
			$("#cuadro1").slideUp("slow");
			limpiar_datos();
		}

		// cleans the fields
		const limpiar_datos = () => {
		    $("#run").val("").focus();
		    $("#nombreusuario").val("");
		    $("#hobby").val("");
		    $("#opcion").val("registrar");
		    $("#id").val("");
		}

		// Function used to display a message on the screen
		const mostrar_mensaje = (informacion) => {
			let texto = "", color = "";
			if( informacion.respuesta == "BIEN" ){
					texto = "<strong>Bien!</strong> Se han guardado los cambios correctamente.";
					color = "#379911";
			}else if( informacion.respuesta == "ERROR"){
					texto = "<strong>Error</strong>, no se ejecutó la consulta.";
					color = "#C9302C";
			}else if( informacion.respuesta == "EXISTE" ){
					texto = "<strong>Información!</strong> el usuario ya existe.";
					color = "#5b94c5";
			}else if( informacion.respuesta == "VACIO" ){
					texto = "<strong>Advertencia!</strong> debe llenar todos los campos solicitados.";
					color = "#ddb11d";
			}else if( informacion.respuesta == "OPCION_VACIA" ){
					texto = "<strong>Advertencia!</strong> la opción no existe o esta vacia, recargar la página.";
					color = "#ddb11d";
			}

			$(".mensaje").html( texto ).css({"color": color });
			$(".mensaje").fadeOut(5000, function(){
					$(this).html("");
					$(this).fadeIn(3000);
			});			
		}

		// It was replaced by the "listar() function", but it is still useful for testing.
		/*const mostrarDatos = (id) => {
		    //let id = '<?=$id?>';
		    $.ajax({
		        type: "POST",
		        url: "listarUsuario.php",
		        dataType: "json",
		        data: {
		            'id': id
		        },
		        success: function(data) {
		            $('#test').html(data);
		            console.log(data);
		            //$('#test').value(data);
		            //$('#test').innerhtml(data);
		            //$('#test').load(data);
		        }
		    });
		}*/