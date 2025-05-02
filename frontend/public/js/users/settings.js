const $ = el => document.querySelector(el);

$("#btn-disable").addEventListener("hover", e => {
    $("#delete-form").setAttribute("action", "/usuarios/desactivar");
});

$("#btn-delete").addEventListener("hover", e => {
    $("#delete-form").setAttribute("action", "/usuarios/eliminar");
});