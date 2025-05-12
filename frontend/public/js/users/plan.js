const basic_el = [...document.getElementsByClassName("basic")],
    plus_el = [...document.getElementsByClassName("plus")],
    pro_el = [...document.getElementsByClassName("pro")];

basic_el.forEach(e => e.addEventListener("click", () => window.location.href = "/usuarios/cambiar-plan?plan=basic"));
plus_el.forEach(e => e.addEventListener("click", () => window.location.href = "/usuarios/cambiar-plan?plan=plus"));
pro_el.forEach(e => e.addEventListener("click", () => window.location.href = "/usuarios/cambiar-plan?plan=pro"));