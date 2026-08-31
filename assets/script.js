document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. VALIDACIONES FORMULARIO DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById("registroForm");
    if(formRegistro) {
        const btnAddMascota = document.getElementById("btnAnadirMascota");
        const contenedorMascotas = document.getElementById("contenedorMascotas");

        // Añadir nueva mascota al DOM
        btnAddMascota.addEventListener("click", () => {
            const mascotaItem = document.querySelector(".mascota-item").cloneNode(true);
            mascotaItem.querySelector(".nombre-mascota").value = "";
            mascotaItem.querySelector(".tipo-mascota").value = "";
            mascotaItem.querySelectorAll(".text-danger").forEach(el => el.innerText = "");
            
            contenedorMascotas.appendChild(mascotaItem);
            agregarEventosEliminar();
        });

        // Eliminar mascota del DOM
        function agregarEventosEliminar() {
            const btnEliminar = document.querySelectorAll(".btnEliminarMascota");
            btnEliminar.forEach(btn => {
                btn.onclick = function () {
                    if (document.querySelectorAll(".mascota-item").length > 1) {
                        this.closest(".mascota-item").remove();
                    } else {
                        alert("Debe haber al menos una mascota registrada en el formulario.");
                    }
                };
            });
        }
        agregarEventosEliminar();

        // Validar envío de registro
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();
            let esValido = true;

            // Validación: Nombre Completo
            const nombre = document.getElementById("nombre").value.trim();
            const errorNombre = document.getElementById("errorNombre");
            const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!regexNombre.test(nombre) || nombre.length > 50) {
                errorNombre.innerText = "El nombre solo debe contener letras y espacios (máx. 50 caracteres).";
                esValido = false;
            } else {
                errorNombre.innerText = "";
            }

            // Validación: Correo @duoc.cl
            const correo = document.getElementById("correo").value.trim();
            const errorCorreo = document.getElementById("errorCorreo");
            if (!correo.endsWith("@duoc.cl")) {
                errorCorreo.innerText = "Debe ser un usuario válido de @duoc.cl";
                esValido = false;
            } else {
                errorCorreo.innerText = "";
            }

            // Validación: Contraseña segura
            const password = document.getElementById("password").value;
            const errorPassword = document.getElementById("errorPassword");
            const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!\*\-\?]).{8,}$/;
            if (!regexPass.test(password)) {
                errorPassword.innerText = "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (ej: @#$%).";
                esValido = false;
            } else {
                errorPassword.innerText = "";
            }

            // Validación: Confirmar Contraseña
            const confirmPassword = document.getElementById("confirm_password").value;
            const errorConfirm = document.getElementById("errorConfirm");
            if (password !== confirmPassword) {
                errorConfirm.innerText = "Las contraseñas no coinciden.";
                esValido = false;
            } else {
                errorConfirm.innerText = "";
            }

            // Validación: Mascotas
            const mascotasNombres = document.querySelectorAll(".nombre-mascota");
            const mascotasErrores = document.querySelectorAll(".error-mascota-nombre");
            mascotasNombres.forEach((input, index) => {
                if (input.value.trim() === "" || input.value.length > 50) {
                    mascotasErrores[index].innerText = "Nombre de mascota obligatorio (máx. 50 caracteres).";
                    esValido = false;
                } else {
                    mascotasErrores[index].innerText = "";
                }
            });

            if (esValido) {
                alert("¡Registro validado y completado exitosamente!");
                formRegistro.reset();
            }
        });
    }

    // ==========================================
    // 2. VALIDACIONES FORMULARIO DE LOGIN
    // ==========================================
    const formLogin = document.getElementById("loginForm");
    if(formLogin) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();
            let esValido = true;
            
            // Validación: Login Email
            const email = document.getElementById("loginEmail").value.trim();
            const errorEmail = document.getElementById("errorLoginEmail");
            
            if (!email.endsWith("@duoc.cl")) {
                errorEmail.innerText = "El nombre de usuario o contraseña son incorrectos.";
                esValido = false;
            } else {
                errorEmail.innerText = "";
            }

            // Validación: Login Contraseña
            const pass = document.getElementById("loginPassword").value;
            const errorPass = document.getElementById("errorLoginPassword");
            if(pass.trim() === "") {
                errorPass.innerText = "Debe ingresar una contraseña.";
                esValido = false;
            } else {
                errorPass.innerText = "";
            }

            if(esValido) {
                alert("Inicio de sesión procesado correctamente.");
            }
        });
    }
});