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
if (localStorage.getItem("token") === null) {
    alert("No has iniciado sesión.");
    window.location.href = "login.html";
    throw new Error("No has iniciado sesión.");
}
// Selección de elementos HTML
const exercixseTableBody = document.getElementById("exercise-table-body");
const logoutButton = document.getElementById("logout-button");
const createExerciseForm = document.getElementById("createExerciseForm");
const editExerciseForm = document.getElementById("editExerciseForm");
const filterInput = document.getElementById("filterInput");
const downloadButton = document.getElementById("downloadButton");
let ejerciciosData = [];
// Función para obtener las ejercicios desde el backend
// Función para obtener las ejercicios desde el backend
function fetchejercicios() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3002/ejercicio", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            });
            if (!response.ok) {
                throw new Error("Error al obtener al obtener rutinas");
            }
            ejerciciosData = yield response.json(); // Guardar datos globalmente
            renderEjercicios(ejerciciosData);
        }
        catch (error) {
            console.error("Error al obtener las ejercicios:", error);
            alert("No se pudieron cargar las ejercicios.");
        }
    });
}
// Función para renderizar las ejercicios en la tabla
function renderEjercicios(ejercicios) {
    exercixseTableBody.innerHTML = ""; // Limpiar la tabla
    ejercicios.forEach((ejercicio) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${ejercicio.Nombre}</td>
            <td>${ejercicio.Peso}</td>
            <td>${ejercicio.ZonaMuscular}</td>
            <td>${ejercicio.Repeticiones}</td>
            <td>${ejercicio.Fecha}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-button" data-id="${ejercicio._id}" data-bs-toggle="modal" data-bs-target="#editExerciseModal">Editar</button>
                <button class="btn btn-danger btn-sm delete-button" data-id="${ejercicio._id}">Eliminar</button>
            </td>
        `;
        exercixseTableBody.appendChild(row);
    });
    // Añadir eventos a los botones de editar y eliminar
    setupActionButtons();
}
// Función para configurar eventos en los botones de acción
function setupActionButtons() {
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            if (id) {
                handleEditejercicio(id);
            }
        });
    });
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            if (id && confirm("¿Estás seguro de eliminar esta ejercicio?")) {
                handleDeleteejercicio(id);
            }
        });
    });
}
// Funcionalidad: Filtrar ejercicios por nombre
if (filterInput) {
    filterInput.addEventListener("input", () => {
        const query = filterInput.value.toLowerCase();
        const filteredEjercicios = ejerciciosData.filter((ejercicio) => ejercicio.Nombre.toLowerCase().includes(query));
        renderEjercicios(filteredEjercicios);
    });
}
// Funcionalidad: Ordenar ejercicios por fecha de creacion
function sortByFecha() {
    const sortedejercicios = [...ejerciciosData].sort((a, b) => new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime());
    renderEjercicios(sortedejercicios);
}
// Funcionalidad: Descargar en formato JSON
if (downloadButton) {
    downloadButton.addEventListener("click", () => {
        const dataStr = JSON.stringify(ejerciciosData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "ejercicios.json";
        link.click();
        URL.revokeObjectURL(url);
    });
}
// Función para manejar el cierre de sesión
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token"); // Eliminar el token
        alert("Sesión cerrada.");
        window.location.href = "login.html"; // Redirigir al login
    });
}
// Funcionalidad: Filtrar ejercicios por Nombre
if (filterInput) {
    filterInput.addEventListener("input", () => {
        const query = filterInput.value.toLowerCase();
        const filteredEjercicios = ejerciciosData.filter((ejercicio) => ejercicio.Nombre.toLowerCase().includes(query));
        renderEjercicios(filteredEjercicios);
    });
}
// Función para manejar el formulario de creación
if (createExerciseForm) {
    createExerciseForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const Nombre = document.getElementById("createNombre").value;
        const Peso = document.getElementById("createPeso").value;
        const ZonaMuscular = document.getElementById("createZonaMuscular").value;
        const Repeticiones = document.getElementById("createRepeticiones").value;
        const Fecha = document.getElementById("createFecha").value;
        try {
            const response = yield fetch("http://localhost:3002/ejercicio", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ Nombre, Peso, ZonaMuscular, Repeticiones, Fecha }),
            });
            if (response.ok) {
                alert("ejercicio creada con éxito.");
                fetchejercicios(); // Recargar la tabla
                const modalElement = document.querySelector("#createExerciseModal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance === null || modalInstance === void 0 ? void 0 : modalInstance.hide();
            }
            else {
                throw new Error("Error al crear la ejercicio.");
            }
        }
        catch (error) {
            console.error("Error al crear la ejercicio:", error);
            alert("No se pudo crear la ejercicio.");
        }
    }));
}
// Función para manejar la edición de una ejercicio
function handleEditejercicio(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Obtener los datos de la ejercicio seleccionada
            const response = yield fetch(`http://localhost:3002/ejercicio/${id}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            });
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la ejercicio.");
            }
            const ejercicio = yield response.json();
            // Rellenar el formulario con los datos de la ejercicio
            document.getElementById("editNombre").value = ejercicio.Nombre;
            document.getElementById("editPeso").value = ejercicio.Peso.toString();
            document.getElementById("editZonaMuscular").value = ejercicio.ZonaMuscular;
            document.getElementById("editRepeticiones").value = ejercicio.Repeticiones.toString();
            document.getElementById("editFecha").value = ejercicio.Fecha;
            // Guardar el ID en un atributo oculto
            document.getElementById("editExerciseForm").setAttribute("data-id", id);
        }
        catch (error) {
            console.error("Error al cargar los datos de la ejercicio:", error);
            alert("No se pudieron cargar los datos de la ejercicio.");
        }
    });
}
// Función para manejar el formulario de edición
if (editExerciseForm) {
    editExerciseForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        // Obtener los datos del formulario
        const id = editExerciseForm.getAttribute("data-id");
        const Nombre = document.getElementById("editNombre").value;
        const Peso = document.getElementById("editPeso").value;
        const ZonaMuscular = document.getElementById("editZonaMuscular").value;
        const Repeticiones = document.getElementById("editRepeticiones").value;
        const Fecha = document.getElementById("editFecha").value;
        try {
            // Realizar la solicitud al backend para actualizar los datos
            const response = yield fetch(`http://localhost:3002/ejercicio/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ Nombre, Peso, Fecha, ZonaMuscular, Repeticiones }),
            });
            if (response.ok) {
                alert("ejercicio actualizada con éxito.");
                fetchejercicios(); // Recargar la tabla
            }
            else {
                throw new Error("Error al actualizar la ejercicio.");
            }
        }
        catch (error) {
            console.error("Error al actualizar la ejercicio:", error);
            alert("No se pudo actualizar la ejercicio.");
        }
        // Cerrar el modal y resetear el formulario
        const modalElement = document.querySelector("#editExerciseModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance === null || modalInstance === void 0 ? void 0 : modalInstance.hide();
        editExerciseForm.reset();
    }));
}
// Resetear el formulario al cerrar el modal de edición
const editExerciseModal = document.getElementById("editExerciseModal");
if (editExerciseModal) {
    editExerciseModal.addEventListener("hidden.bs.modal", () => {
        editExerciseForm.reset();
    });
}
// Función para manejar la eliminación de una ejercicio
function handleDeleteejercicio(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3002/ejercicio/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            if (response.ok) {
                alert("ejercicio eliminada con éxito.");
                fetchejercicios(); // Recargar la tabla
            }
            else {
                throw new Error("Error al eliminar la ejercicio.");
            }
        }
        catch (error) {
            console.error("Error al eliminar la ejercicio:", error);
            alert("No se pudo eliminar la ejercicio.");
        }
    });
}
// Inicializar la tabla al cargar la página
fetchejercicios();
