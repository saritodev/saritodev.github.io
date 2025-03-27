import { gymDays } from './modules/gymDays.js'

const gymList = document.getElementById("exercises-list"); // ul donde guardaremos cada dia de la rutina
const todayRoutine = document.getElementById("today-routine"); // la rutina de hoy
let selectedDayButton = null;
// main menu para seleccionar el dia (LUNES, MARTES...)
function createDays(){
        // iniciamos el div de la rutina de hoy apagado
        todayRoutine.style.display = "none";
        let app = document.getElementById("app");
        const days = Object.keys(gymDays).map(day => day.toUpperCase()); //transformamos los dias a uppercase para estilizarlo
        let daysDiv = document.createElement('div');
        daysDiv.id = "days-container";

        let daysMenu = document.createElement('div');
        daysMenu.id = "days-menu";
        let title = document.createElement('h1');
        title.innerText = "¿Qué entrenamiento eliges hoy?".toUpperCase();
        daysMenu.appendChild(title);
        daysMenu.appendChild(daysDiv);
        
        // dibujamos todos los dias validos que tenemos en la "api"
        days.forEach(day => {
            let dayDiv = document.createElement('div');
            let daySelect = document.createElement('button');
            dayDiv.className = "day-box";
            daySelect.className = "day-button";
            daySelect.value = day.toLowerCase();
            daySelect.innerText = day;
        
            dayDiv.appendChild(daySelect);
            daysDiv.appendChild(dayDiv);
        })
        app.appendChild(daysMenu);
    
}
// lógica de los botones de los días para poder elergirlos
function selectRoutine() {
    const dayButtons = document.querySelectorAll(".day-button");
    const daysDiv = document.getElementById("days-menu");
    const todayRoutine = document.getElementById("today-routine");
  
    // Asignar listener solo una vez a cada botón
    dayButtons.forEach(button => {
      if (!button.dataset.listenerAttached) {
        button.addEventListener("click", () => {
          daysDiv.style.display = "none";
          todayRoutine.style.display = "flex";
          drawExercises(button.value);
  
          // Guardar el botón seleccionado
          selectedDayButton = button;
          selectedDayButton.disabled = true;
        });
  
        // Marcar que ya tiene listener para no duplicar
        button.dataset.listenerAttached = "true";
      }
    });
  }

document.getElementById("back-button").addEventListener("click", () => {
    document.getElementById("days-menu").style.display = "flex";
    document.getElementById("today-routine").style.display = "none";
    
    if (selectedDayButton) {
        selectedDayButton.disabled = false;
    }
})
document.getElementById("end-button").addEventListener("click", () => {
    document.getElementById("days-menu").style.display = "flex";
    document.getElementById("today-routine").style.display = "none";
})

// Una vez seleccionado el dia, se dibuja en pantalla
function drawExercises(day){
    // limpiamos la vista de los ejercicios
    gymList.innerHTML = "";
    let Exercises =  gymDays[day];
    let titleDay = document.getElementById("title-day");
    titleDay.innerHTML = `RUTINA ${day}`.toUpperCase() // añadimos al titulo el dia.

    let checkedDiv = document.createElement('div'); // div donde se va a almacenar todos los ejercicios que ya están hechos.
    checkedDiv.className = "exercise-box";
  // creamos cada ejercicio de la rutina con su respectivo check
  Exercises.forEach(exercise => {

    let li = document.createElement('li');
    let exerciseCheck = document.createElement('input');
    let exerciseName = document.createElement('label');
    let exerciseRepetitions = document.createElement('label');
    let exerciseDiv = document.createElement('div');

    exerciseCheck.type = 'checkbox';
    exerciseName.innerText = `${exercise.nombre}`;
    exerciseRepetitions.innerHTML = `Repeticiones: <b>${exercise.repeticiones}</b>`;


    li.className = "exercise-container";
    exerciseCheck.className = "exercise-checkbox";
    exerciseDiv.className = "exercise-box";
    exerciseName.className = "exercise-name";
    exerciseRepetitions.className = "exercise-repetitions";

    li.addEventListener('click', () => {
        exerciseCheck.checked = exerciseCheck.checked ? false : true;
        if (exerciseCheck.checked) {
            checkedDiv.appendChild(li); // Mueve el li al final del contenedor
            gymList.appendChild(checkedDiv);
            li.classList.add("checked"); // visual opcional
          } else { 
            gymList.insertBefore(li,gymList.lastChild); // mueve el li arriba del todo
            li.classList.remove("checked");
          }
    })

    li.appendChild(exerciseCheck);
    exerciseDiv.appendChild(exerciseName);
    exerciseDiv.appendChild(exerciseRepetitions);
    li.appendChild(exerciseDiv);
    gymList.appendChild(li);
  });
}


document.addEventListener('DOMContentLoaded', () => {
    //inicializamos la app
    createDays();
    selectRoutine();

})