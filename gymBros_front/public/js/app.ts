// Escuchar el evento de submit en el formulario de login
document.getElementById("login-form")?.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar recarga de la página

    const email = (document.getElementById("loginEmail") as HTMLInputElement)?.value;
    const password = (document.getElementById("loginPassword") as HTMLInputElement)?.value;

    try {
        const response = await fetch("http://localhost:3002/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Inicio de sesión exitoso.");
            localStorage.setItem("token", data.token);
            location.href = "/views/ejercicios.html";
        } else {
            alert(`Error: ${data.message || "Credenciales incorrectas."}`);
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
});

// Escuchar el evento de submit en el formulario de registro
document.getElementById("register-form")?.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar recarga de la página

    const user = (document.getElementById("user") as HTMLInputElement)?.value; // Nombre de usuario
    const email = (document.getElementById("email") as HTMLInputElement)?.value; // Email
    const password = (document.getElementById("password") as HTMLInputElement)?.value; // Contraseña

    try {
        const response = await fetch("http://localhost:3002/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Registro exitoso.");
            location.href = "/views/login.html";
        } else {
            alert(`Error: ${data.message || "No se pudo realizar el registro."}`);
        }
    } catch (error) {
        console.error("Error al registrarse:", error);
        alert("Error al registrarse");
    }
});
