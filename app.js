import { gymDays } from './modules/gymDays.js'

const gymList = document.getElementById("exercises-list");
const todayRoutine = document.getElementById("today-routine");

// main menu para seleccionar el dia (LUNES, MARTES...)

function selectRoutine(){

    // iniciamos el div de la rutina de hoy apagado
    todayRoutine.style.display = "none";
    let app = document.getElementById("app");
    const days = Object.keys(gymDays).map(day => day.toUpperCase()); //transformamos los dias a uppercase para estilizarlo
    let daysDiv = document.createElement('div');
    daysDiv.id = "days-container";

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
    app.appendChild(daysDiv);
}

// Una vez seleccionado el dia, se dibuja en pantalla
function drawExercises(day){
    let Exercises = gymDays[day];
    let titleDay = document.getElementById("title-day");
    titleDay.innerHTML += ` ${day.toUpperCase()}` // añadimos al titulo el dia.

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
        exerciseDiv.className = "exercise-box";
        exerciseName.className = "exercise-name";
        exerciseRepetitions.className = "exercise-repetitions";
    
        li.appendChild(exerciseCheck);
        exerciseDiv.appendChild(exerciseName);
        exerciseDiv.appendChild(exerciseRepetitions);
        li.appendChild(exerciseDiv);
        gymList.appendChild(li);
    
    });
}

document.addEventListener('DOMContentLoaded', () => {
    selectRoutine();
    let dayButtons = document.querySelectorAll(".day-button");
    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            todayRoutine.style.display = "flex"; // hacemos visible de nuevo el div de la rutina
            drawExercises(button.value);
            let daysContainer = document.getElementById("days-container");
            daysContainer.style.display = "none"; // hacemos invisible la seleccion de los dias
        })
    });
})



