const tableBodyTrs = document.querySelector(".tablebody").
querySelectorAll(".tr");
/*console.log(tableBodyTrs);*/

function createForm() {
  let form = document.createElement("form");

  form.innerHTML = `
  <th>
  <input type="text" placeholder="Enter Day" >
</th>
<td> <input type="time" id="start-hours" ></td>
<td><input type="time" id="start-break" ></td>
<td> <input type="time" id="end-break" ></td>
<td><input type="time" id="end-hours" ></td>
<td><input class = "workedhours"  value="00:00" disabled></td>
<td><button type="submit" value="Add">Add</button></td>
  
  
  `;
  return form;
}
//console.log(createForm());

(async () =>{
tableBodyTrs.forEach((tr) => tr.appendChild(createForm()));

})();

const forms = document.querySelectorAll("form");

forms.forEach((form) => form.addEventListener("submit",function(e){
e.preventDefault();

const day = e.target.children[0].value;
const startwork = e.target.children[1].value;
const startbreak = e.target.children[2].value;
const endbreak = e.target.children[3].value;
const endwork = e.target.children[4].value;
let worked = e.target.children[5];
let submitbtn = e.target.children[6];


validateSubmission(day,startwork,endwork,submitbtn);

worked.value = calcDailyWorkedHours(startwork,startbreak,endbreak,endwork);

calctotalworkedHours();
}
));

function validateSubmission(day,startwork,endwork,submitbtn){
    if(day === "" || startwork === "" || endwork === ""){
        alert("Enter day, Start and End hours");
    }else{
      return true;
    }
}

function calcDailyWorkedHours(startwork,startbreak,endbreak,endwork){

startwork = startwork.split(":");
startbreak = startbreak.split(":");
endbreak = endbreak.split(":");
endwork = endwork.split(":");

const startWorkDate = new Date(0,0,0, startwork[0],startwork[1],0);
const endWorkDate = new Date(0,0,0, endwork[0],endwork[1],0);

const diffWork = endWorkDate.getTime() - startWorkDate.getTime();
console.log(diffWork);


const startbreakTime = new Date(0,0,0, startbreak[0],startbreak[1],0);
const endbreakTime = new Date(0,0,0, endbreak[0],endbreak[1],0);

const diffBreak = endbreakTime.getTime() - startbreakTime.getTime();

let diffFinal = (isNaN(diffWork) ? 0 : diffWork) - (isNaN(diffBreak) ? 0 : diffBreak);

let hours = Math.floor(diffFinal / 1000 / 60 / 60);
diffFinal -= hours * 1000 * 60 * 60;

let min = diffFinal / 1000 / 60 / 60;
console.log(min);
if(hours < 0){
    hours = hours + 24;
}
return (
    (hours < 0 ? 0 : "")+ hours + ":" +
    /*(min < -1 ? 0 : "")+*/ min
);
}

function calctotalworkedHours(){
    const totalhours = document.querySelectorAll(".workedhours");
   

    let arrayOfWorkedHours = Array.from(totalhours);
    let newWorkedHours = arrayOfWorkedHours.map((workedhour) => workedhour.value);
    
   
    let arr = [];
    arr.push(newWorkedHours);
    console.log(arr);
   let convertedHours = newWorkedHours.map((el) =>{
       
        const[hours,min] = el.split(":");
        return (parseInt(hours) * 60) + (parseFloat(min)*60) ;
    }
    );
console.log(convertedHours);
    let calculatedWorkHours = convertedHours.reduce(
        (partialSum,a) => parseInt(partialSum +a),
         0
    );
    console.log(calculatedWorkHours);
    document.getElementById("totalworkedhours").value = minutesToHours(calculatedWorkHours);
}

function minutesToHours(min) {
    const hours = min/60;
   /* const mins = parseFloat((min / 60) - hours);*/
    return(
        (hours + "").padStart(1, "0")  
        /*+":" +
        (mins + "").padStart(2, "0")*/
    );
}