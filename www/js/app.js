	   // When the btn_listar button is pressed, the list_user() function will occur.
       $("#btn_listar").on("click", function(){
       		list_user();
       });

       $("#agregarUsuario").on("click", function(){
       		prepare_new_user();
       });

    	//The variables of the edit row are obtained 
    	const get_data_edit = (tbody, table) => {
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

    	// The variables of the row to be eliminated are obtained
    	const get_data_delete = (tbody, table) => {
    		$(tbody).on("click", "#buttonEliminar", function(){
    			const data = table.row( $(this).parents("tr")).data();
    			console.log(data);	
    			const idusuario = $("#frmEliminarUsuario #id").val(data.id);
    		});
    	}
		
		// hides the Datatable, displays the form and clears the data
		const prepare_new_user = () => {
			$("#cuadro2").slideDown("slow");
			$("#cuadro1").slideUp("slow");
			data_cleaning();
		}

		// cleans the fields
		const data_cleaning = () => {
		    $("#run").val("").focus();
		    $("#nombreusuario").val("");
		    $("#hobby").val("");
		    $("#opcion").val("registrar");
		    $("#id").val("");
		}

		// Function used to display a message on the screen
		const display_message = (informacion) => {
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