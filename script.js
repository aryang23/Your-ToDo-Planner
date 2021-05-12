'use strict';
let filterOptions=document.querySelectorAll(".filter-colors__container");
let mainContainer=document.querySelector(".main-container");
let modalContainer=document.querySelector(".modal_container");
let modalFilters = document.querySelectorAll(".modal_filters");
let addBtn=document.querySelector(".add");
let descBox=document.querySelector(".desc-box");
let colors=["lightpink","lightblue","lightgreen","black"];
// let idElem=document.querySelector(".id");
// let textElem=document.querySelector(".text");
let allTasks=document.querySelector(".allTasks");
// let ticketColor=document.querySelector(".ticket-color");
let ticketContainer=document.querySelector(".ticket")
// let allTickets=document.querySelector(".allTickets");
let removeBtn=document.querySelector(".action-container__icons.remove");
// let smallAdd=document.querySelectorAll(".small-tool-add");
let lockBtn=document.querySelector(".lock");
let lockState=false;
let unlockBtn=document.querySelector(".unlock");
let unlockState=false;
let deleteState=false;
let ticketsArr=[];
let helpBtn=document.querySelector(".icon");
let helpState=false;
let helpContainer=document.querySelector(".help-container");
let dueDate=document.querySelector(".duedate");

let smallContainer1=document.querySelector(".small-container.one");
let smallContainer2=document.querySelector(".small-container.two");
let smallContainer3=document.querySelector(".small-container.three");
let smallContainer4=document.querySelector(".small-container.four");

//Getting all the elements from allTasks from LocalStorage
if(localStorage.getItem("allTasks"))
{
    let strArr=localStorage.getItem("allTasks");
    ticketsArr=JSON.parse(strArr);
    for(let i=0;i<ticketsArr.length;i++)
    {
        let id=ticketsArr[i][0];
        let task=ticketsArr[i][1];
        let color=ticketsArr[i][2];
        // let date=ticketsArr[i][3];

        let ticketContainer=document.createElement("div");
        ticketContainer.setAttribute("class","ticker-container");

        //Getting Individual Items and making tickets of each and every task
        ticketContainer.innerHTML=`
        <div class="ticket-color ${color}"></div>
        <div class="ticket_sub-container">
            <h3 class="ticket-id">#${id}</h3>
            <p class="task-desc" contenteditable="true">${task}</p>
        </div>
        `;

        // <p class="date" contenteditable="true">Date: - ${date}</p>

        // mainContainer.appendChild(ticketContainer);
        if(color=='lightpink')
        {
            smallContainer1.appendChild(ticketContainer);
        }
        else if(color=='lightblue')
        {
            smallContainer2.appendChild(ticketContainer);
        }
        else if(color=='lightgreen')
        {
            smallContainer3.appendChild(ticketContainer);
        }
        else
        {
            smallContainer4.appendChild(ticketContainer);
        }
        let colorStripElement=ticketContainer.querySelector(".ticket-color");
        handleColorContainer(colorStripElement,ticketsArr[i])
        handleDeleteContainer(ticketContainer,ticketsArr);
        handleLockContainer(ticketContainer);
        handleUnlockContainer(ticketContainer);
        handleTextEdit(ticketContainer,id);
    }
}


let flag=false;
let cColor=colors[colors.length-1];
let pFilterColor=null;
// let cFilterCount=0;
for(let i=0;i<filterOptions.length;i++)
{
    filterOptions[i].addEventListener("click",function(e){
        let arr=filterOptions[i].children;
        let chclassesArr=arr[0].classList;
        console.log(chclassesArr[0]);
        

        //Changing BGC by directly clicking on the color
        // mainContainer.style.backgroundColor=chclassesArr[0];

        let strArr=localStorage.getItem("allTasks");
        ticketsArr=JSON.parse(strArr);

        let mainColor=chclassesArr[0];
        let reqArr=[];

        if(pFilterColor!=null && pFilterColor==mainColor)
        {
            reqArr=ticketsArr;
            pFilterColor=null;
        }
        else
        {
            //Getting all elements with the same color that I clicked in reqArr
            for(let i=0;i<ticketsArr.length;i++)
            {
                let color=ticketsArr[i][2];
                //Getting all elements in reqArr
                
                if(color==mainColor)
                {
                    // mainContainer.appendChild(ticketContainer);
                    reqArr.push(ticketsArr[i]);
                }
            }

            pFilterColor=mainColor;
        }

        //Clearing the UI by removing all elements
        //Here it is removed from ui because I have directly selected ticket-containenr
        //So Direct, It will gonna remove all the tasks from the main container only
        let ticketElemsArr=document.querySelectorAll(".ticker-container");
        let length=ticketElemsArr.length;
        for(let i=0;i<length;i++)
        {
            ticketElemsArr[i].remove();
        }

            
        // console.log(reqArr);
        for(let i=0;i<reqArr.length;i++)
        {
            let id=reqArr[i][0];
            let task=reqArr[i][1];
            let color=reqArr[i][2];

            let ticketContainer=document.createElement("div");
            ticketContainer.setAttribute("class","ticker-container");

            //reqArr se new tickets bnaayi
        
            ticketContainer.innerHTML=`
            <div class="ticket-color ${color}"></div>
            <div class="ticket_sub-container">
            <h3 class="ticket-id">#${id}</h3>
            <p class="task-desc">${task}</p>
            </div>
            `;

            //Direct Push those ticketContainers in mainContainer
            if(color=='lightpink')
            {
                smallContainer1.appendChild(ticketContainer);
            }
            else if(color=='lightblue')
            {
                smallContainer2.appendChild(ticketContainer);
            }
            else if(color=='lightgreen')
            {
                smallContainer3.appendChild(ticketContainer);
            }
            else
            {
                smallContainer4.appendChild(ticketContainer);
            }
            }
    });
}


//BEST WAY: -
//1. createTicket ko har baar use kro, as Sir used in that
//2. filterColors se direct remove, add krne ki bjaaye, css display:none krdo(BEST WAY)

//For Modal, It is there, but when not required, just display=none
addBtn.addEventListener("click",function(e){
    if(flag==false)
    {
        modalContainer.style.display="flex";
    }
    else
    {
        modalContainer.style.display="none";
    }
    flag=!flag;
    descBox.value="";
})

// console.log(helpState);
helpBtn.addEventListener("click",function(){
    console.log(helpState);
    if(helpState==false)
    {
        helpContainer.style.display="block";
    }
    else
    {
        helpContainer.style.display="none";
    }
    helpState=!helpState;
})


//Adding Border to the prev element
for(let i=0;i<modalFilters.length;i++)
{
    modalFilters[i].addEventListener("click", function (){
        modalFilters.forEach(function (modalFilter) {
            // classList remove-> 
            modalFilter.classList.remove("border");
        })
        modalFilters[i].classList.add("border");
        cColor=modalFilters[i].classList[1];
    })   
}

//Creating Tickets when press enter
descBox.addEventListener("keydown", function (e) {

    if (e.key == "Enter") {
        let task = descBox.value;
        // console.log("task is ", task, "cColor ", cColor);
        // tiket create 
        // ticket create 
        //  clean up 
        // let date=dueDate.value;
        // console.log(date);
        createTicket(task,cColor);
        // cColor = colors[colors.length - 1];
        modalContainer.style.display = "none";
        flag = false;
        descBox.value = "";
    }
})

// let flag2=false;
// smallAdd.addEventListener("click",function(){
//     if(flag2==false)
//     {
//         modalContainer.style.display="flex";
//     }
//     else
//     {
//         modalContainer.style.display="none";
//     }
//     flag2=!flag2;
//     descBox.value="";
// })

// for(let i=0;i<smallAdd.length;i++)
// {
//     let flag2=false;
//     smallAdd[i].addEventListener("click",function(){
//         if(flag2==false)
//         {
//             modalContainer.style.display="flex";
//         }
//         else
//         {
//             modalContainer.style.display="none";
//         }
//         flag2=!flag2;
//         descBox.value="";
//     })
// }

let abc;


//Creating Individual Tickets
function createTicket(task,cColor){

    let ticketContainer=document.createElement("div");
    ticketContainer.setAttribute("class","ticker-container");

    //Getting id from uid
    let id=uid();
    //Creating HTML elements
    ticketContainer.innerHTML=`
    <div class="ticket-color ${cColor}"></div>
    <div class="ticket_sub-container">
        <h3 class="ticket-id">#${id}</h3>
        <p class="task-desc" contenteditable="true">${task}</p>
    </div>
    `;
    // <p class="date">Date: - ${date}</p>
    //Pushing in Local Storage
    let singleArr=[id,task,cColor];
    ticketsArr.push(singleArr);
    let strArr=JSON.stringify(ticketsArr);
    localStorage.setItem("allTasks",strArr);


    if(cColor=='lightpink')
    {
        smallContainer1.appendChild(ticketContainer);
    }
    else if(cColor=='lightblue')
    {
        smallContainer2.appendChild(ticketContainer);
    }
    else if(cColor=='lightgreen')
    {
        smallContainer3.appendChild(ticketContainer);
    }
    else
    {
        smallContainer4.appendChild(ticketContainer);
    }

    // mainContainer.appendChild(ticketContainer);
    let colorStripElement=ticketContainer.querySelector(".ticket-color");
    handleColorContainer(colorStripElement,singleArr);
    handleDeleteContainer(ticketContainer,singleArr);
    handleLockContainer(ticketContainer);
    handleUnlockContainer(ticketContainer);
    handleTextEdit(ticketContainer,id);
    //handleedit
    // deleteTicketFn(ticketContainer);
    // deleteTicket.addEventListener("click",function(){
    //     deleteState=true;
    //     deleteTicket();
    // })
}

function handleTextEdit(ticketContainer,mainId)
{
    console.log("Hello");
    let taskDesc=ticketContainer.querySelector(".task-desc");
    console.log(taskDesc);
    // taskDesc.addEventListener("keydown",function(e)
    ticketContainer.addEventListener("click",function(){

        // console.log(e);
        let newText=taskDesc.innerText;
        console.log(newText);
        // newText+=e.key;
        let strArr=localStorage.getItem("allTasks");
        ticketsArr=JSON.parse(strArr);
        for(let i=0;i<ticketsArr.length;i++)
        {
            let id=ticketsArr[i][0];
            let task=ticketsArr[i][1];
            console.log(mainId,id);
            if(mainId==id)
            {
                console.log("Iffffff");
                console.log(newText);
                task=newText;
                console.log(task);
            }
            console.log(task);
            ticketsArr[i][1]=task;
        }
        console.log(ticketsArr);
        strArr=JSON.stringify(ticketsArr);
        localStorage.setItem("allTasks",strArr);
    

    })
}

//When removeBtn Clicked
removeBtn.addEventListener("click",function(){
    if(deleteState==false)
    {
        removeBtn.style.backgroundColor="#606060";
    }
    else
    {
        removeBtn.style.backgroundColor="rgb(85, 82, 82)";
    }
    deleteState=!deleteState;
})

//When lockBtn clicked
lockBtn.addEventListener("click",function(){
    if(lockState==false)
    {
        lockBtn.style.backgroundColor="#606060";
    }
    else
    {
        lockBtn.style.backgroundColor="rgb(85, 82, 82)";
    }
    lockState=!lockState;
})

//When unlockbtn clicked
unlockBtn.addEventListener("click",function(){
    if(unlockState==false)
    {
        unlockBtn.style.backgroundColor="#606060";
    }
    else
    {
        unlockBtn.style.backgroundColor="rgb(85, 82, 82)";
    }
    unlockState=!unlockState;
})

//Handling the Lock Container
function handleLockContainer(ticketContainer)
{
    ticketContainer.addEventListener("click",function(){
        if(lockState==true)
        {
            let taskDesc=ticketContainer.querySelector(".task-desc");
            taskDesc.removeAttribute("contenteditable");
        }
    })
}

//Handling the Unlock Container
function handleUnlockContainer(ticketContainer)
{
    ticketContainer.addEventListener("click",function(){
        if(unlockState==true)
        {
            let taskDesc=ticketContainer.querySelector(".task-desc");
            taskDesc.setAttribute("contenteditable","true");
        }
    })
}


function handleColorContainer(colorStripElement,ticketArr)
{
    
    // let classes=colorStripElement.getAttribute("class");
    colorStripElement.addEventListener("click",function(){
        let classes=colorStripElement.classList;
        let initColor=classes[1];

        let idx=colors.indexOf(initColor);
        let newIdx=(idx+1)%4;
        let newColor=colors[newIdx];

        colorStripElement.classList.remove(initColor);

        colorStripElement.classList.add(newColor);

        finalColorChange(newColor,ticketArr);
    })
    
}

function finalColorChange(color,singleArr)
{
    // console.log("Hello");
    // console.log(singleArr,"New Color",color);
    let strArr=localStorage.getItem("allTasks");
    ticketsArr=JSON.parse(strArr);
    for(let i=0;i<ticketsArr.length;i++)
    {
        // console.log(ticketsArr[i],",,,,,,,",singleArr);
        if(ticketsArr[i][0]==singleArr[0])
        {
            console.log("Changing the color");
            // let initColor=singleArr[2];
            ticketsArr[i][2]=color;
            break;
        }
    }
    strArr=JSON.stringify(ticketsArr);
    localStorage.setItem("allTasks",strArr);
}

function handleDeleteContainer(ticketContainer,singleArr)
{
    ticketContainer.addEventListener("click",function(){
        if(deleteState==true)
        {
            let arr=singleArr;
            let idx=ticketsArr.indexOf(arr);
            ticketsArr.splice(idx,1);
            let strArr=JSON.stringify(ticketsArr);
            localStorage.setItem("allTasks",strArr);
            //ui
            ticketContainer.remove();
        
        }
    })
}

// function deleteTicket(ticketContainer)
// {
//     if(deleteState==true)
//     {
//         delete ticketContainer;
//     }
// }

// function deleteTicket(){

// }






// descBox.addEventListener("keydown",function(e){
//     if(e.key=="Enter"){
//         let task=descBox.value;
//         //ticket create
//         let taskElem=document.createElement("div");
        
//         taskElem.setAttribute("class","task");

//         let bgColorElem=document.createElement("div");
//         bgColorElem.setAttribute("class","bgcolor");
//         bgColorElem.style.backgroundColor=cColor;
//         taskElem.append(bgColorElem);

//         let idElem=document.createElement("div");
//         idElem.setAttribute("class","id");
//         idElem.innerText="#exampleId";
//         taskElem.append(idElem);

//         let textElem=document.createElement("div");
//         textElem.setAttribute("class","text");
//         textElem.innerText=task;
//         taskElem.append(textElem);

        
//         // textElem.innerText=task;
//         // taskElem.id="#exampleid";
//         allTasks.append(taskElem);
//         //clean up

        

//         cColor=colors[colors.length-1];
//         modalContainer.style.display="none";
//         flag=false;
//         descBox.value="";
//     }
// })

// function deleteTicketFn(ticketContainer)
// {
//     deleteTicket.addEventListener("click",function(){
//         if(deleteState==true)
//         deleteState=false;
//         else
//         deleteState=true;
//     })
//     ticketContainer.addEventListener("click",function(){
//         if(deleteState==true)
//         {
//             mainContainer.remove(ticketContainer);
//         }
//     })
// }


//Text Save
//Fixed
//Github Deploy