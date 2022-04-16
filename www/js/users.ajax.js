	   // The "listar()" function transforms the table "dt_client" into a Datatable and fetches the data from the server.  
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
                    "url": "users_list.php"
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

       // The data to edit the user are sent 
       const guardar = () => {
            $("#frmEditarUsuario").on("submit", function(e){
                e.preventDefault();
                const frm = $(this).serialize();
                $.ajax({
                    method: "POST",
                    url: "users_save.php",
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

    	// User is deleted when their status is changed to zero
        const eliminar = () => {
            $("#eliminar-usuario").on("click",function(){
                let idusuario = $("#frmEliminarUsuario #id").val(),
                    opcion = $("#frmEliminarUsuario #opcion").val();
                    $.ajax({
                        method: "POST",
                        url: "users_save.php",
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

		// It was replaced by the "listar() function", but it is still useful for testing.
		/*const mostrarDatos = (id) => {
		    //let id = '<?=$id?>';
		    $.ajax({
		        type: "POST",
		        url: "users_list.php",
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