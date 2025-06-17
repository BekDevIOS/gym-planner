
console.log("Frontend qismi");

const form_workout = document.getElementById('form_workout');
form_workout.addEventListener('submit', function(e){
    e.preventDefault();
    const workoutPlan = document.getElementById('input_workout');
    const workoutDay = document.getElementById('select_workout_day');
    const workoutType = document.getElementById('select_workout_type');
    axios.post('/create-item', {
        workoutPlan: workoutPlan.value,
        workoutDay: workoutDay.value,
        workoutType: workoutType.value
    })
    .then(response => {
        workoutPlan.value = "";
        workoutPlan.focus();
    })
})