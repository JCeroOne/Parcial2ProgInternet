const $ = el => document.querySelector(el);

$("#btn-disable").addEventListener("click", e => {
    e.preventDefault();
    $("#delete-form").setAttribute("action", "/usuarios/desactivar");
    if(hasPwd()) $("#delete-form").submit();
});

$("#btn-delete").addEventListener("click", e => {
    e.preventDefault();
    $("#delete-form").setAttribute("action", "/usuarios/eliminar");
    if(hasPwd()) $("#delete-form").submit();
});

function hasPwd(){
    return $("#password-del").value == "" ? false : true;
}