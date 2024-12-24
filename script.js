document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        tasks = storedTasks; 
        updateTasksList(); 
        updateState();  
    }
})

let tasks = []
 
// save task to local storage

const savetasks = () =>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
// addTask fun
const addTask = () =>{
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim()

    if(text){
        tasks.push({text:text, completed: false})
        taskInput.value =  "";
        updateTasksList()
        updateState()
        savetasks()
    }

    // console.log(tasks);
}
// toggelefuntion

const toggeleTaskComplete = (Index) =>{
    tasks[Index].completed = !tasks[Index].completed
    updateTasksList()
    // console.log({tasks});
    updateState()
    savetasks()
}

// delete task
const delTask = (indes) =>{
    tasks.splice(indes,1)
    updateTasksList()
    updateState()
    savetasks()
}

// edit task

const editTask = (index) =>{
    const taskinput = document.getElementById('taskInput')
    taskinput.value = tasks[index].text

    tasks.splice(index,1)
    updateTasksList()
    updateState()
    savetasks()
}

// update state

const updateState = () => {
    const completedTasks = tasks.filter((tasks) => tasks.completed).length
    const totalTasks = tasks.length
    const progress =(completedTasks/totalTasks)*100
    const progressBar = document.getElementById('progress')

    progressBar.style.width = `${progress}%`
    document.getElementById('number').innerText = `${completedTasks} / ${totalTasks}`

    if (tasks.length && completedTasks === totalTasks) {
        blast()
    }
}
// updateTask function

const updateTasksList = () =>{
    const tasklist = document.getElementById('task-list')
    tasklist.innerHTML = ''

    tasks.forEach((task, Index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = `

        <div class="taskItem">
            <div class="task ${task.completed ? "completed": " "}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked": "" }>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="img/edit.png" alt="edit" onClick = "editTask(${Index})">
                <img src="img/bin.png" alt="bin" onClick = "delTask(${Index})">
            </div>
        </div>`


        listItem.addEventListener('change', () => toggeleTaskComplete(Index))
        tasklist.append(listItem)
    })
}

// removing default behaviour
document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault()

    addTask();
})

const blast = () => {
    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}