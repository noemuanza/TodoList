
let taskTab = [];
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const blob = document.querySelector('.blob');
let count = 0 ;




$('.add-task-form').on('submit', (e)=>{//ajouter une tache
    e.preventDefault();
    let testTime = new Date($('.task-time').val());
    let minute = testTime.getMinutes();
    let hour = testTime.getHours();
    let year = testTime.getFullYear();
    let month = testTime.getMonth()+1;
    let day = testTime.getDate();

    let taskName = $('.task-name').val();
    let taskDate = {day, month, year}
    let taskTime = {hour, minute};
    let task = {taskName,taskTime,taskDate};


    //if the taskname contain special characters or is empty we don't send it and send an error message
    if(taskName.match(/[^a-zA-Z0-9]/) || taskName == ''){
        $('.error').text('Please enter a valid task name');
        return;
    }

    $('.task-name').val('');
    $('.task-time').val('');

    //send the task to the server
    socket.emit('taskAdd',task);

});



//shorter sort method fo the tasktab using new Date
const triTaskDate = (tab)=> {
    tab.sort((a, b) => {
        let dateA = new Date(a.date__.year,a.date__.month,a.date__.day,a.time__.hour,a.time__.minute);
        let dateB = new Date(b.date__.year,b.date__.month,b.date__.day,b.time__.hour,b.time__.minute);
        return dateA - dateB;
    });
}


socket.on('connect', () => {
    console.log('connected');
});

socket.on('tasks', (tasks) => {
    console.log(tasks);
    $('.list-content').empty();
    //empty the list
    taskTab = [];
    tasks.forEach((task)=>{
        taskTab.push(task);
    });
    console.log(taskTab);
    triTaskDate(taskTab);
    console.log("trié "+ taskTab);
    taskTab.forEach((task)=>{//on parcoure la liste des taches et on les affiche
        let li = document.createElement('li');
        if(task.time__.hour < 10) task.time__.hour = '0' + task.time__.hour;
        if(task.time__.minute < 10) task.time__.minute = '0' + task.time__.minute;
        if(task.time__.hour == 0) task.time__.hour = '00';
        if(task.time__.minute == 0) task.time__.minute = '00';
        li.textContent = task.name + ' ' + task.date__.day + '/' + task.date__.month + '/' + task.date__.year+ ' ' + task.time__.hour + ':' + task.time__.minute;
        //append it
        $('.list-content').append(li);
    });
});


document.body.onpointermove = (e) => {//animation du blob qui suit la souris
    const {clientX, clientY} = e;
    blob.animate({
        left :` ${clientX}px`,
        top: `${clientY}px`
    },{duration:3000,fill:'forwards'});

};

let titleRoll = ()=>{
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

titleRoll();
