// Interfaz para definir el tipo de datos de una ejercicio
interface Ejercicio {
    _id: string;
    Nombre: string;
    Peso: number;
    ZonaMuscular: string;
    Repeticiones: number;
    Fecha: string;
}

if(localStorage.getItem("token") === null) {
    alert("No has iniciado sesión.");
    window.location.href = "login.html";
    throw new Error("No has iniciado sesión.");
}

// Selección de elementos HTML
const exercixseTableBody = document.getElementById("exercise-table-body") as HTMLElement;
const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;
const createExerciseForm = document.getElementById("createExerciseForm") as HTMLFormElement;
const editExerciseForm = document.getElementById("editExerciseForm") as HTMLFormElement;
const filterInput = document.getElementById("filterInput") as HTMLInputElement;
const downloadButton = document.getElementById("downloadButton") as HTMLButtonElement;

let ejerciciosData: Ejercicio[] = [];

// Función para obtener las ejercicios desde el backend
// Función para obtener las ejercicios desde el backend
async function fetchEjercicios() {
    console.log('hjgfghfgjj');
    
    try {
        const response = await fetch("http://localhost:3002/ejercicio", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("API Response Status:", response);
        console.log("API Response Body:", await response.clone().text());
        if (!response.ok) {
            throw new Error("Error al obtener rutinas");
        }
        ejerciciosData = await response.json();
        renderEjercicios(ejerciciosData);
    } catch (error) {
        console.error("Error al obtener las ejercicios:", error);
        alert("No se pudieron cargar las ejercicios.");
    }
}


// Función para renderizar las ejercicios en la tabla
function renderEjercicios(ejercicios: Ejercicio[]) {
    exercixseTableBody.innerHTML = ""; // Limpiar la tabla
    console.log('Ejer', ejercicios);
    
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
            const id = (button as HTMLElement).getAttribute("data-id");
            if (id) {
                handleEditejercicio(id);
            }
        });
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = (button as HTMLElement).getAttribute("data-id");
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
        const filteredEjercicios = ejerciciosData.filter((ejercicio) =>
            ejercicio.Nombre.toLowerCase().includes(query)
        );
        renderEjercicios(filteredEjercicios);
    });
}

// Funcionalidad: Ordenar ejercicios por fecha de creacion
function sortByFecha() {
    const sortedejercicios = [...ejerciciosData].sort((a, b) =>
        new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime()
    );
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
        const filteredEjercicios = ejerciciosData.filter((ejercicio) =>
            ejercicio.Nombre.toLowerCase().includes(query)
        );
        renderEjercicios(filteredEjercicios);
    });
}

// Función para manejar el formulario de creación
if (createExerciseForm) {
    createExerciseForm.addEventListener("submit", async (event) => {
        const Nombre = (document.getElementById("createNombre") as HTMLInputElement).value;
        const Peso = (document.getElementById("createPeso") as HTMLInputElement).value;
        const ZonaMuscular = (document.getElementById("createZonaMuscular") as HTMLInputElement).value;
        const Repeticiones = (document.getElementById("createRepeticiones") as HTMLInputElement).value;
        const Fecha = (document.getElementById("createFecha") as HTMLInputElement).value;
        try {
            const response = await fetch("http://localhost:3002/ejercicio", {
                method: "POST",
                headers: { "Content-Type": "application/json" ,
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ Nombre, Peso, ZonaMuscular, Repeticiones, Fecha }),
            });

            if (response.ok) {
                alert("ejercicio creada con éxito.");
                fetchEjercicios(); // Recargar la tabla
                const modalElement = document.querySelector("#createExerciseModal") as HTMLElement;
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance?.hide();
            } else {
                throw new Error("Error al crear la ejercicio.");
            }
        } catch (error) {
            console.error("Error al crear la ejercicio:", error);
            alert("No se pudo crear la ejercicio.");
        }
    });
}

// Función para manejar la edición de una ejercicio
async function handleEditejercicio(id: string) {
    try {
        // Obtener los datos de la ejercicio seleccionada
        const response = await fetch(`http://localhost:3002/ejercicio/${id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos de la ejercicio.");
        }

        const ejercicio: Ejercicio = await response.json();

        // Rellenar el formulario con los datos de la ejercicio
        (document.getElementById("editNombre") as HTMLInputElement).value = ejercicio.Nombre;
        (document.getElementById("editPeso") as HTMLInputElement).value = ejercicio.Peso.toString();
        (document.getElementById("editZonaMuscular") as HTMLInputElement).value = ejercicio.ZonaMuscular;
        (document.getElementById("editRepeticiones") as HTMLInputElement).value = ejercicio.Repeticiones.toString();
        (document.getElementById("editFecha") as HTMLInputElement).value = ejercicio.Fecha;

        // Guardar el ID en un atributo oculto
        (document.getElementById("editExerciseForm") as HTMLFormElement).setAttribute("data-id", id);
    } catch (error) {
        console.error("Error al cargar los datos de la ejercicio:", error);
        alert("No se pudieron cargar los datos de la ejercicio.");
    }
}

// Función para manejar el formulario de edición
if (editExerciseForm) {
    editExerciseForm.addEventListener("submit", async (event) => {

        // Obtener los datos del formulario
        const id = editExerciseForm.getAttribute("data-id");
        const Nombre = (document.getElementById("editNombre") as HTMLInputElement).value;
        const Peso = (document.getElementById("editPeso") as HTMLInputElement).value;
        const ZonaMuscular = (document.getElementById("editZonaMuscular") as HTMLInputElement).value;
        const Repeticiones = (document.getElementById("editRepeticiones") as HTMLInputElement).value;
        const Fecha = (document.getElementById("editFecha") as HTMLInputElement).value;

        try {
            // Realizar la solicitud al backend para actualizar los datos
            const response = await fetch(`http://localhost:3002/ejercicio/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ Nombre, Peso, Fecha, ZonaMuscular, Repeticiones }),
            });

            if (response.ok) {
                alert("ejercicio actualizada con éxito.");
                fetchEjercicios(); // Recargar la tabla
            } else {
                throw new Error("Error al actualizar la ejercicio.");
            }
        } catch (error) {
            console.error("Error al actualizar la ejercicio:", error);
            alert("No se pudo actualizar la ejercicio.");
        }

        // Cerrar el modal y resetear el formulario
        const modalElement = document.querySelector("#editExerciseModal") as HTMLElement;
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
        editExerciseForm.reset();
    });
}

// Resetear el formulario al cerrar el modal de edición
const editExerciseModal = document.getElementById("editExerciseModal");
if (editExerciseModal) {
    editExerciseModal.addEventListener("hidden.bs.modal", () => {
        editExerciseForm.reset();
    });
}


// Función para manejar la eliminación de una ejercicio
async function handleDeleteejercicio(id: string) {
    try {
        const response = await fetch(`http://localhost:3002/ejercicio/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });

        if (response.ok) {
            alert("ejercicio eliminada con éxito.");
            fetchEjercicios(); // Recargar la tabla
        } else {
            throw new Error("Error al eliminar la ejercicio.");
        }
    } catch (error) {
        console.error("Error al eliminar la ejercicio:", error);
        alert("No se pudo eliminar la ejercicio.");
    }
}

// Inicializar la tabla al cargar la página
fetchEjercicios();
