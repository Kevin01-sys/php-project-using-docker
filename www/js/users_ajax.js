
import {spanish_language} from "./datatable/language.js";
import {get_data_edit, get_data_delete, prepare_new_user, data_cleaning, display_message, get_form_method} from "./app.js";

       // The "list_user()" function transforms the table "dt_client" into a Datatable and fetches the data from the server.  
        const list_user = () =>{
            $("#cuadro2").slideUp("slow");
            $("#cuadro1").slideDown("slow");
            // DataTable gave problems after using the list_user(), to solve it we used empty()
            // I was getting "data is undefined" when trying to bring the row to a variable or duplicate or even triplicate data and it would go up every time I listed 
            // It is initialized, left empty, destroyed, and reassembled. This is the process every time you list
            let table = $('#dt_cliente').DataTable();
            $('#dt_cliente').empty();
            table.destroy();
            table = $("#dt_cliente").DataTable({
                paging: true,   
                ajax:{
                    "method":"GET",
                    "url": "../controllers/users_list.php"
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
                language: spanish_language,
/*                 dom: 'Bfrtip', */
				dom: "<'row'<'form-inline' <'col-sm-offset-5'B>>>"
					 +"<'row' <'form-inline' <'col-sm-2'f>>>"
					 +"<rt>"
					 +"<'row'<'form-inline'"
					 +" <'col-sm-6 col-md-6 col-lg-6'l>"
					 +"<'col-sm-6 col-md-6 col-lg-6'p>>>",//'Bfrtip',
                buttons: [
                    {
                        text: "<i class='fa fa-user-plus'></i>",
		                titleAttr: 'Agregar',
                        action: () =>{
                            prepare_new_user();
                        }
                    },
		            {
		                extend:    'excelHtml5',
                        text: "<i class='fa fa-file-excel-o'></i>",
		                titleAttr: 'Excel'
		            },
		            {
		                extend:    'csvHtml5',
                        text: "<i class='fa fa-file-text-o'></i>",
		                titleAttr: 'CSV'
		            },
		            {
		                extend:    'pdfHtml5',
                        text: "<i class='fa fa-file-pdf-o'></i>",
		                titleAttr: 'PDF'
		            }
                ]
            });
            get_data_edit("#dt_cliente tbody", table);
            get_data_delete("#dt_cliente tbody", table);
        }

       // The data to edit the user are sent 
        const save_user = () => {
            $("#frmEditarUsuario").on("submit", function(e){
                e.preventDefault();
                let method;
                let option;
                const frm = $(this).serializeArray();
                //const object = JSON.stringify(frm);
                option = frm[1].value;
                method = get_form_method(option);
                $.ajax({
                    method: method,
                    url: "../controllers/users_save.php",
                    data: frm,
                    contentType:"application/json; charset=utf-8",
                }).done(function(info){
                    console.log(info);
                    const json_info = JSON.parse(info);
                    console.log(json_info);
                    display_message(json_info);
                    data_cleaning();
                    list_user();
                });
            });
        }

        

    	// User is deleted when their status is changed to zero
         const delete_user = () => {
            $("#eliminar-usuario").on("click",function(){
                let idusuario = $("#frmEliminarUsuario #id").val(),
                    opcion = $("#frmEliminarUsuario #opcion").val();
                    //console.log(opcion);
                    $.ajax({
                        method: "PUT",
                        url: "../controllers/users_save.php",
                        contentType:"application/json; charset=utf-8",
                        data: {"id": idusuario,"opcion": opcion}
                    }).done(function(info){
                        console.log(info);
                        const json_info=JSON.parse(info);
                        display_message(json_info);
                        data_cleaning();
                        list_user();
                        console.log(json_info);
                    })
            });
        }

        // By pressing the buttons, the following functions will occur
        $("#btn_listar").on("click", () =>list_user());
        $("#agregarUsuario").on("click", () =>prepare_new_user());

        /* Functions to be executed when loading the file */ 
        list_user();
        save_user();
        delete_user();