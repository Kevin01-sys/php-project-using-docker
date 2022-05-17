/* fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => console.log(json)) */

  fetch('/controllers/users_list_controller.php')
  .then(response => response.json())
  /* .then(json => console.log(json)) */
  //.then(json => console.log(hola = JSON.stringify(json)))
  //.then(hola => console.log(hola))

  const $testButton = document.getElementById("testButton");
  const $testInput = document.getElementById("testInput");
  
  //$testInput.setAttribute("value", "Modelo de Objeto del Documento");
  //$testInput.value = "Modelo de Objeto del Documento";

  //$testButton.addEventListener("click", () =>  {console.log(`Hola bienvenido a tu primer evento JS`)});
  $testButton.onclick = () => $testInput.value = "onclick";