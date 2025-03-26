import { gymDays } from './modules/gymDays.js'

const gymList = document.getElementById("exercises-list"); // ul donde guardaremos cada dia de la rutina
const todayRoutine = document.getElementById("today-routine"); // la rutina de hoy

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
function selectRoutine(){
    let dayButtons = document.querySelectorAll(".day-button");

    if ([...dayButtons].every(button => button.disabled === true)){
        console.log("YIIIPIYAIYO");
    } else{
            dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            //buscamos el div que contiene todos los dias y lo ponemos visible
            let daysDiv = document.getElementById("days-menu");
            daysDiv.style.display = "none";
            //buscamos el div que contiene la rutina y lo apagamos
            todayRoutine.style.display = "flex";
            drawExercises(button.value);

            // si se presiona el boton de back cuando se dibuje la rutina del dia, se vuelve al estado de inicio.
            let backButton = document.getElementById("back-button");
            backButton.addEventListener('click', function () {
                //buscamos el div que contiene todos los dias y lo ponemos visible
                let daysDiv = document.getElementById("days-menu");
                daysDiv.style.display = "flex";
                //buscamos el div que contiene la rutina y lo apagamos
                todayRoutine.style.display = "none";
                selectRoutine();
                this.disabled = false;
            })
            
            // marcar como listo el dia de la semana
            const endDayButton = document.getElementById("end-button");
            endDayButton.addEventListener('click', () => {
                //buscamos el div que contiene todos los dias y lo ponemos visible
                let daysDiv = document.getElementById("days-menu");
                daysDiv.style.display = "flex";
                //buscamos el div que contiene la rutina y lo apagamos
                todayRoutine.style.display = "none";
                selectRoutine();
                button.disabled = true;
            })
        })
    });
    }

}

// Una vez seleccionado el dia, se dibuja en pantalla
function drawExercises(day){
    // limpiamos la vista de los ejercicios
    gymList.innerHTML = "";    
    let Exercises = gymDays[day];
    let titleDay = document.getElementById("title-day");
    titleDay.innerHTML = `RUTINA ${day}`.toUpperCase() // añadimos al titulo el dia.

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
    //inicializamos la app
    createDays();
    selectRoutine();
})



