const $ = el => document.querySelector(el);

function toggleForm(e, form_action="Nueva", key_name, key){
    let active = $("#new-key-form").style.display == "block";
    $("#form-action").innerText = form_action;
    if(form_action != "Nueva") $("#new-key-form").setAttribute("action", `/claves-api/${key}/editar`);
    else $("#new-key-form").setAttribute("action", `/claves-api/nueva`);
    $("#name").value = key_name || "";
    $("#create-btn").innerText = `${form_action} clave`;
    if(!active){
        $("#new-key-form-bg").style.display = "block";
        $("#new-key-form").style.display = "block";
    } else {
        $("#new-key-form-bg").style.display = "none";
        $("#new-key-form").style.display = "none";
    }
}

function toggleDelForm(key_name, key){
    let active = $("#del-key-form").style.display == "block";
    $("#del-key-form").setAttribute("action", `/claves-api/${key}/eliminar`);
    $("#del-key-name").innerText = key_name;
    if(!active){
        $("#new-key-form-bg").style.display = "block";
        $("#del-key-form").style.display = "block";
    } else {
        $("#new-key-form-bg").style.display = "none";
        $("#del-key-form").style.display = "none";
    }
}

function showKey(btn, key, id){
    // $(`#${id}`).innerText = key;
    $(`#${id}`).style.filter = "blur(0)";
    btn.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
    btn.setAttribute("onclick", `hideKey(this, '${key}', '${id}')`);
}

function copyKey(btn, key){
    navigator.clipboard.writeText(key);
    btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    setTimeout(() => {btn.innerHTML = `<i class="fa-solid fa-copy"></i>`}, 1000);
}

function hideKey(btn, key, id){
    // $(`#${id}`).innerText = "****************************************";
    $(`#${id}`).style.filter = "blur(4px)";
    btn.innerHTML = `<i class="fa-solid fa-eye"></i>`;
    btn.setAttribute("onclick", `showKey(this, '${key}', '${id}')`);
}

$("#new-key").addEventListener("click", e => toggleForm(e, "Nueva"));

$("#cancel-btn").addEventListener("click", e => {
    e.preventDefault();
    toggleForm();
});

$("#cancel-btn-2").addEventListener("click", e => {
    e.preventDefault();
    toggleDelForm();
});