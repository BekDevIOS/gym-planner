
console.log("Frontend qismi");

const template = function(item){
    return ` <div class="workout-card ${item.completed ? 'completed' : ''}">
          <div class="info">
            <div class="title">${item.muscleGroup} – ${item.trainingType}</div>
            <div class="details">Sets: ${item.workoutSets}, Reps: ${item.workoutReps}</div>
          </div>
          <div class="actions">
            <input type="checkbox" class="complete-checkbox" data-id="${item._id}" ${item.completed ? 'checked' : ''}>
            <button data-id="${item._id}" class="delete-item btn btn-sm btn-outline-danger">Delete</button>
          </div>
        </div>`;
};

// Create item
const form_workout = document.getElementById('workout-form');
form_workout.addEventListener('submit', function(e){
    e.preventDefault();
    const muscleGroup = document.getElementById('muscleGroup');
    const trainingType = document.getElementById('trainingType');
    const workoutSets = document.getElementById('sets');
    const workoutReps = document.getElementById('reps');
    axios.post('/create-item', {
        muscleGroup: muscleGroup.value,
        trainingType: trainingType.value,
        workoutSets: workoutSets.value,
        workoutReps: workoutReps.value
    })
    .then(response => {
        document.getElementById('plan-list')
        .insertAdjacentHTML('beforeend', template(response.data))
        trainingType.value = "";
        workoutSets.value = "";
        workoutReps.value = "";
        trainingType.focus();
        console.log(response.data);
    })
     .catch(err => {"Iltimos qaytadan urinib koring"});
})

// Delete item
document.addEventListener('click', function(e){
   if(e.target.classList.contains('delete-item')){
    if(confirm("Are you sure to delete?")){
        axios.post('/delete-item', {id: e.target.getAttribute('data-id')})
        .then(response => {
            e.target.parentElement.parentElement.remove();
        })
    }
   }
})

// Checkbox oper
document.addEventListener('change', function(e){
    if (e.target.classList.contains('complete-checkbox')){
        const checkbox = e.target;
        const id = checkbox.getAttribute('data-id');
        const completed = checkbox.checked;
        axios
      .post("/checkbox-item", { id: id, completed: completed })
      .then((response) => {
        const card = checkbox.closest(".workout-card");

        if (completed) {
          card.classList.add("completed");
        } else {
          card.classList.remove("completed");
        }
      })
      .catch((err) => {
        alert("Somthing went wrong in checkbox part!");
      });
  }
});

// Delete all
document.getElementById('clear-all-btn').addEventListener('click', function(e){
    if(confirm('Are you sure te delete all items?')){
        axios.post('/delete-all')
        .then((response) => {
            document.getElementById('plan-list').innerHTML = "";
        })
        .catch((err) => {
            console.log('ERROR:', err);
        });
    }
})