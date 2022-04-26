function muestraReloj() {
  var d = new Date(); // aqui se llama al constructor de la fecha
  var horas = d.getHours(); // aqui se llama al constructor de la hora
  var minutos = d.getMinutes(); // aqui se llama al constructor de los minutos
  var segundos = d.getSeconds(); // aqui se llama al constructor de los segundos

  // SI, el numero que tienen estas variables es menor a 10 entonces se les añadira un 0
  if (horas < 10) {
    horas = "0" + horas;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }
  // Recorrido de los dias en total son 7 contando el 0
  var dia = new Array(7);
  dia[0] = "Domingo";
  dia[1] = "Lunes";
  dia[2] = "Martes";
  dia[3] = "Miercoles";
  dia[4] = "Jueves";
  dia[5] = "Viernes";
  dia[6] = "Sabado";

  var coco = document.getElementById("reloj"); // Llamamos a la id del div la caja
  // INTENTE LLAMARLO POR CLASES PERO NO PUDE, ASI QUE LO REALICE CON ID
  // var coco = document.getElementsByClassName("reloj");

  var hora = horas + ":" + minutos + ":" + segundos; // AQUI SE CONCATENA SOLAMENTE Y SE ALMACENA EN LA VARIABLE HORA

  //AQUI SE PINTAN LOS DATOS EN LA VARIBALE COCO QUE ES LA ID DE LA CAJA(DIV)
  coco.innerHTML =
    "<b>" +
    dia[d.getDay()] +
    " / " +
    d.toISOString().split("T")[0] +
    " / " +
    hora +
    "</b>";
}

window.onload = function () {
  // ESTA FUNCION SE ACTIVA CADA 1 SEGUNDO ES LO QUE SE LOGRA CON setInterval
  setInterval(muestraReloj, 1000);
};

var nuevoId;
var db = openDatabase("sectionsDB", "1.0", "sectionsDB", 655351);

function limpiar() {
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
}

$(function () {
  $("#contenido-article2").hide();
  $("#contenido-article3").hide();
  $("#contenido-article4").hide();
  $(".formulario-contacto").hide();

  $("#inicioID").click(function () {
    $("#contenido-article2").hide();
    $("#contenido-article3").hide();
    $(".formulario-contacto").hide();

    $("#contenido-article1").toggle("fast");
    $("#contenido-article4").toggle("fast");
  });
  $("#negociosID").click(function () {
    $("#contenido-article1").hide();
    $("#contenido-article3").hide();
    $("#contenido-article4").hide();
    $(".formulario-contacto").hide();

    $("#contenido-article2").toggle("fast");
  });
  $("#deportesID").click(function () {
    $("#contenido-article1").hide();
    $("#contenido-article2").hide();
    $("#contenido-article4").hide();
    $(".formulario-contacto").hide();

    $("#contenido-article3").toggle("fast");
  });
  $("#contact").click(function () {
    $("#contenido-article1").hide();
    $("#contenido-article2").hide();
    $("#contenido-article3").hide();
    $("#contenido-article4").hide();

    $(".formulario-contacto").toggle("fast");
  });
  $("#modalID").click(function () {
    $(".formulario-contacto").hide();
  });

  $("#enviar").click(function () {
    $(".formulario-contacto").removeClass("formulario-contacto-visibilidad");
    var nombre = $("#formGroupExampleInput").val();
    var descripcion = $("#contenido").val();
    console.log("Nombre: " + nombre + " - Descripcion: " + descripcion);
  });

  $("#crear").click(function () {
    if ($("#seccion-selected")) {
      var estado = $("#seccion-selected").val();
      if (estado == "Inicio") {
        db.transaction(function (transaction) {
          var sql =
            "CREATE TABLE section1 " +
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
            "descripcion VARCHAR(255) NOT NULL, " +
            "titulo VARCHAR(20) NOT NULL)";
          transaction.executeSql(
            //aqui hacemos la consulta de la transaccion sql
            sql,
            undefined,
            function () {
              alert("Tabla 1 creada satisfactoriamente");
            },
            function (transaction, err) {
              alert(err.message);
            }
          );
        });
      }
      if (estado == "Negocios") {
        db.transaction(function (transaction) {
          var sql =
            "CREATE TABLE section2 " +
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
            "descripcion VARCHAR(255) NOT NULL, " +
            "titulo VARCHAR(20) NOT NULL)";
          transaction.executeSql(
            //aqui hacemos la consulta de la transaccion sql
            sql,
            undefined,
            function () {
              alert("Tabla 2 creada satisfactoriamente");
            },
            function (transaction, err) {
              alert(err.message);
            }
          );
        });
      }
      if (estado == "Deportes") {
        db.transaction(function (transaction) {
          var sql =
            "CREATE TABLE section3 " +
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
            "descripcion VARCHAR(255) NOT NULL, " +
            "titulo VARCHAR(20) NOT NULL)";
          transaction.executeSql(
            //aqui hacemos la consulta de la transaccion sql
            sql,
            undefined,
            function () {
              alert("Tabla 3 creada satisfactoriamente");
            },
            function (transaction, err) {
              alert(err.message);
            }
          );
        });
      }
    }
  });
  $("#inicioID").click(function () {
    cargarDatos_seccion1();
  });
  $("#negociosID").click(function () {
    cargarDatos_seccion2();
  });
  $("#deportesID").click(function () {
    cargarDatos_seccion3();
  });
  function cargarDatos_seccion1() {
    $("#section1").children().remove();

    $("#section2").children().remove();

    $("#section3").children().remove();
    db.transaction(function (transaction) {
      var sql = "SELECT * FROM section1 ORDER BY id DESC";
      transaction.executeSql(
        sql,
        undefined,
        function (transaction, result) {
          if (result.rows.length) {
            $("#section1").append("<tr><th></th></tr>");
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              var titulo = row.titulo;
              var id = row.id;
              var descripcion = row.descripcion;
              $("#section1").append(
                '<h5 id="id-section' +
                  id +
                  '" class="id-style' +
                  id +
                  '">ID: #' +
                  id +
                  "</h5>" +
                  "<h3>" +
                  titulo +
                  "</h3>" +
                  "<p>" +
                  descripcion +
                  "</p>"
              );
            }
          } else {
            $("#section1").append(
              '<tr><td colspan="5" align="center">No existen registros de productos</td></tr>'
            );
          }
        },
        function (transaction, err) {
          alert(err.message);
        }
      );
    });
  }
  function cargarDatos_seccion2() {
    $("#section1").children().remove();
    $("#section2").children().remove();
    $("#section3").children().remove();
    db.transaction(function (transaction) {
      var sql = "SELECT * FROM section2 ORDER BY id DESC";
      transaction.executeSql(
        sql,
        undefined,
        function (transaction, result) {
          if (result.rows.length) {
            $("#section2").append("<tr><th></th></tr>");
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              var titulo = row.titulo;
              var id = row.id;
              var descripcion = row.descripcion;
              $("#section2").append(
                '<h5 id="id-section' +
                  id +
                  '" align="center" class="id-style' +
                  id +
                  '">ID: #' +
                  id +
                  "</h5>" +
                  '<h3 align="center">' +
                  titulo +
                  "</h3>" +
                  "<p>" +
                  descripcion +
                  "</p>"
              );
            }
          } else {
            $("#section2").append(
              '<tr><td colspan="5" align="center">No existen registros de productos</td></tr>'
            );
          }
        },
        function (transaction, err) {
          alert(err.message);
        }
      );
    });
  }
  function cargarDatos_seccion3() {
    $("#section1").children().remove();
    $("#section2").children().remove();
    $("#section3").children().remove();
    db.transaction(function (transaction) {
      var sql = "SELECT * FROM section3 ORDER BY id DESC";
      transaction.executeSql(
        sql,
        undefined,
        function (transaction, result) {
          if (result.rows.length) {
            $("#section3").append("<tr><th></th></tr>");
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              var titulo = row.titulo;
              var id = row.id;
              var descripcion = row.descripcion;
              $("#section3").append(
                '<h5 id="id-section' +
                  id +
                  '" align="center" class="id-style' +
                  id +
                  '">ID: #' +
                  id +
                  "</h5>" +
                  '<h3 align="center">' +
                  titulo +
                  "</h3>" +
                  "<p>" +
                  descripcion +
                  "</p>"
              );
            }
          } else {
            $("#section3").append(
              '<tr><td colspan="5" align="center">No existen registros de productos</td></tr>'
            );
          }
        },
        function (transaction, err) {
          alert(err.message);
        }
      );
    });
  }
  $("#insertar").click(function () {
    var titulo = $("#titulo").val();
    var descripcion = $("#descripcion").val();

    var estado = $("#seccion-selected").val();
    if (estado == "Inicio") {
      db.transaction(function (transaction) {
        var sql = "INSERT INTO section1(titulo,descripcion) VALUES(?,?)";
        transaction.executeSql(
          sql,
          [titulo, descripcion],
          function () {},
          function (transaction, err) {
            alert(err.message);
          }
        );
      });
      limpiar();
      cargarDatos_seccion1();
    }
    if (estado == "Negocios") {
      db.transaction(function (transaction) {
        var sql = "INSERT INTO section2(titulo,descripcion) VALUES(?,?)";
        transaction.executeSql(
          sql,
          [titulo, descripcion],
          function () {},
          function (transaction, err) {
            alert(err.message);
          }
        );
      });
      limpiar();
      cargarDatos_seccion2();
    }
    if (estado == "Deportes") {
      db.transaction(function (transaction) {
        var sql = "INSERT INTO section3(titulo,descripcion) VALUES(?,?)";
        transaction.executeSql(
          sql,
          [titulo, descripcion],
          function () {},
          function (transaction, err) {
            alert(err.message);
          }
        );
      });
      limpiar();
      cargarDatos_seccion3();
    }
  });
  $("#borrarTodo").click(function () {
    if (
      !confirm(
        "Está seguro de borrar la tabla?, los datos se perderán permanentemente",
        ""
      )
    )
      return;
    db.transaction(function (transaction) {
      var estado = $("#seccion-selected").val();
      if (estado == "Inicio") {
        var sql = "DROP TABLE section1";
        transaction.executeSql(
          sql,
          undefined,
          function () {
            alert(
              "Tabla 1 borrada satisfactoriamente, Por favor, actualice la página"
            );
          },
          function (transaction, err) {
            alert(err.message);
          }
        );
      }
      if (estado == "Negocios") {
        var sql = "DROP TABLE section2";
        transaction.executeSql(
          sql,
          undefined,
          function () {
            alert(
              "Tabla 2 borrada satisfactoriamente, Por favor, actualice la página"
            );
          },
          function (transaction, err) {
            alert(err.message);
          }
        );
      }
      if (estado == "Deportes") {
        var sql = "DROP TABLE section3";
        transaction.executeSql(
          sql,
          undefined,
          function () {
            alert(
              "Tabla 3 borrada satisfactoriamente, Por favor, actualice la página"
            );
          },
          function (transaction, err) {
            alert(err.message);
          }
        );
      }
    });
  });
});
