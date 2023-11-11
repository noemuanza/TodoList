
let taskTab = [];
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const blob = document.querySelector('.blob');
let count = 0 ;


$('.add-task-form').on('submit', (e)=>{//ajouter une tache
    e.preventDefault();
    let testTime = new Date($('.task-time').val());
    let minutes = testTime.getMinutes();
    let hours = testTime.getHours();
    let year = testTime.getFullYear();
    let month = testTime.getMonth();
    let day = testTime.getDate();

    let taskName = $('.task-name').val();
    let taskTime = {day, month, year, hours, minutes};
    let task = {taskName, taskTime};
    taskTab.push(task);
    //console.log(taskTab);

    
   
    //console.log(taskName+' '+year+' '+month+' '+day+' '+hours+' '+minutes);
   
    $('.task-name').val('');
    $('.task-time').val('');
    tri(taskTab);
    console.log(taskTab);
    $('.list-content').empty();//on efface le contenu de la liste et on affiche après avoir trié



    taskTab.forEach((task)=>{//on parcoure la liste des taches et on les affiche
        let li = document.createElement('li');
        if (task.taskTime.minutes < 10) {//gestion des 0 devant les minutes et les heures etc...
            task.taskTime.minutes = '0' + task.taskTime.minutes;
        }
        if (task.taskTime.hours < 10) {
            task.taskTime.hours = '0' + task.taskTime.hours;
        }
        if (task.taskTime.day < 10) {
            task.taskTime.day = '0' + task.taskTime.day;
        }
        if (task.taskTime.month < 10) {
            task.taskTime.month = '0' + task.taskTime.month;
        }

//on affiche la tache
        li.textContent = task.taskName+' '+task.taskTime.day+'/'+task.taskTime.month+'/'+task.taskTime.year+' '+task.taskTime.hours+':'+task.taskTime.minutes;
        $('.list-content').append(li);
    });

});



let  tri = (tab)=> {//trier pour l'instant en fonction du jour
    tab.sort((a, b) => {
        // Convertir les dates en objets Date
        let dateA = new Date(a.taskTime.year, a.taskTime.month, a.taskTime.day, a.taskTime.hours, a.taskTime.minutes);
        let dateB = new Date(b.taskTime.year, b.taskTime.month, b.taskTime.day, b.taskTime.hours, b.taskTime.minutes);
        console.log(dateA-dateB);

        if( dateA-dateB <0){
            return -1;
        }

        if( dateA-dateB >0){
            return 1;
        }
        // Comparer les dates en
    });
}

document.body.onpointermove = (e) => {//animation du blob qui suit la souris
    const {clientX, clientY} = e;
    blob.animate({
        left :` ${clientX}px`,
        top: `${clientY}px`
    },{duration:3000,fill:'forwards'});
   
}


let test = ()=>{
    
document.querySelector("h1").onmouseover = (e) => {//animation du titre qui change de lettre au survol de la souris
    if(count <1){
    console.log(count);
    let i = 0;
    const interval  = setInterval(() => {
        e.target.innerText = e.target.innerText.split("").map((letter,index) => {
            if(index < i){
                return e.target.dataset.value[index];
            }
           return  letters[Math.floor(Math.random() * 26)]}).join("");

        if(i >= e.target.dataset.value.length )clearInterval(interval);
        i += 1 / 3;
    }, 20);
  
}
count++;//on ne laisse l'animation se faire qu'une seule fois
}
};

test();