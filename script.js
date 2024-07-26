document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

   
    function addTask(taskText, save = true) {
        
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            removeTask(taskText); 
        };

        li.classList.add(removeBtn);
        taskList.appendChild(li);

        
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 

    
    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = ''; 
        } else {
            alert("Please enter a task.");
        }
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
                taskInput.value = ''; 
            } else {
                alert("Please enter a task.");
            }
        }
    });

   
    loadTasks();
});
