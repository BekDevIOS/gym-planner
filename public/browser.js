
console.log("Frontend qismi");

let input1 = document.getElementById("pathot-item");
let input2 = document.getElementById("soni-item");
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();
    axios.post("/qoshish", {pathot: input1.value, son: input2.value})
    .then(response => {
        console.log(response.data)
    })
    
});