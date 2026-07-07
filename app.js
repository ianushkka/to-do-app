let addBtn=document.getElementById("add"); 
let userInput=document.getElementById("user-task"); 
let mainBox=document.getElementById("main-box");  
let total=document.querySelector(".total"); 
let completed=document.querySelector(".completed"); 
let remaining=document.querySelector(".remaining"); 




let records=[]; //array of objects(to be) 

function countStats(){ 
    
    let incompleteCounter=0;
    let completeCounter=0;  

    for(let record of records){
        if(record.status=="incomplete"){
            incompleteCounter+=1;
        }else{
            completeCounter+=1;
        }
    } 
    let returnObj={
        inc:incompleteCounter,
        cmp:completeCounter
    } ;

    total.innerText=`Tasks : ${records.length}`;
    remaining.innerText=`Remaining : ${returnObj.inc}`; 
    completed.innerText=`Completed : ${returnObj.cmp}`;
            
}

function addTask(){
    console.log("Add button is pressed!");   
    let userTask=userInput.value.trim();  
    if(userTask){ 
        let newTask=document.createElement("div");  
        const time=Date.now()
        newTask.classList.add("task-div");
        newTask.innerHTML=
        `<div class="left-edge"> 
            <input type="checkbox" id="${time}-id">
            <label for="${time}-id" class="demo-task-content">${userTask}</label>
        </div> 
        <div class="cross-icon" id="cross-icon-${time}"><i class="fa-solid fa-xmark"></i></div>  
        ` ;   

        let taskSection=document.querySelector(".task-section");
        taskSection.append(newTask);  //task append on page  
        
        
        records.push({name:`${userTask}`,uniqueLocator:`${time}`,status:"incomplete"}); //obj info  

        countStats(); 

        let cross=document.getElementById(`cross-icon-${time}`);  


        cross.addEventListener("click",()=>{ 
            
            newTask.classList.add("deleting")   
            setTimeout(() => {
                newTask.remove(); 
                for(let task of records){
                if(task.uniqueLocator==time){    
                    let index=records.indexOf(task); 
                    records.splice(index,1);
                    break;
                }
            } 
            
            countStats();     
            }, 250);
            
            
            

        })  


        userInput.value = "";
        userInput.focus();  

        let taskCheckbox=document.getElementById(`${time}-id`);
        let taskContent=newTask.querySelector(".demo-task-content");
        
        taskCheckbox.addEventListener("change",()=>{
            if(taskCheckbox.checked){ 
                taskContent.style.color="#ccc";  
                
                 
                for(let task of records){
                    if(task.uniqueLocator==time){ 
                    task.status="complete";
                    }
                }  
                countStats();  
                
 
            }else{
                taskContent.style.color="#334155"; 
                for(let task of records){
                    if(task.uniqueLocator==time){ 
                    task.status="incomplete";
                    }
                }    

                countStats();  
                
            }
        })

    }    
    
} 

addBtn.addEventListener("click",addTask);

userInput.addEventListener("keydown",(e)=>{ 
    console.log("enter execution");
    if(e.key=="Enter"){
        addTask()
    }
})

