"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
// Escuchar el evento de submit en el formulario de login
(_a = document.getElementById("login-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        event.preventDefault(); // Evitar recarga de la página
        const email = (_a = document.getElementById("loginEmail")) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = document.getElementById("loginPassword")) === null || _b === void 0 ? void 0 : _b.value;
        try {
            const response = yield fetch("http://localhost:3002/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = yield response.json();
            if (response.ok) {
                alert("Inicio de sesión exitoso.");
                localStorage.setItem("token", data.token);
                location.href = "/views/ejercicios.html";
            }
            else {
                alert(`Error: ${data.message || "Credenciales incorrectas."}`);
            }
        }
        catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    });
});
// Escuchar el evento de submit en el formulario de registro
(_b = document.getElementById("register-form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        event.preventDefault(); // Evitar recarga de la página
        const user = (_a = document.getElementById("user")) === null || _a === void 0 ? void 0 : _a.value; // Nombre de usuario
        const email = (_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value; // Email
        const password = (_c = document.getElementById("password")) === null || _c === void 0 ? void 0 : _c.value; // Contraseña
        try {
            const response = yield fetch("http://localhost:3002/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, email, password }),
            });
            const data = yield response.json();
            if (response.ok) {
                alert("Registro exitoso.");
                location.href = "/views/login.html";
            }
            else {
                alert(`Error: ${data.message || "No se pudo realizar el registro."}`);
            }
        }
        catch (error) {
            console.error("Error al registrarse:", error);
            alert("Error al registrarse");
        }
    });
});
