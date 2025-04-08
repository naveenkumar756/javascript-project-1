document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskPriority = document.getElementById('taskPriority');
    const taskCategory = document.getElementById('taskCategory');
    const taskList = document.getElementById('taskList');
    const totalTasks = document.getElementById('totalTasks');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks=document.getElementById('completedTasks');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load tasks on page load
    function loadTasks() {
        taskList.innerHTML = '';
        let total = 0, pending = 0, completed = 0;
        storedTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            if (task.completed) taskItem.classList.add('completed');
            
            taskItem.innerHTML = `
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <p><small>Due: ${task.dueDate}</small></p>
                    <p>Priority: ${task.priority} | Category: ${task.category}</p>
                </div>
                <div>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})">
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
            total++;
            if (task.completed) completed++;
            else pending++;
        });
        
        totalTasks.innerText = total;
        pendingTasks.innerText = pending;
        completedTasks.innerText = completed;
    }

    // Add Task
    addTaskBtn.addEventListener('click', () => {
        if (!taskTitle.value || !taskDueDate.value) {
            alert('Title and Due Date are required');
            return;
        }

        const newTask = {
            id: Date.now(),
            title: taskTitle.value,
            description: taskDescription.value,
            dueDate: taskDueDate.value,
            priority: taskPriority.value,
            category: taskCategory.value,
            completed: false,
        };

        storedTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
        clearForm();
        loadTasks();
    });

    // Mark Task as Completed
    window.toggleComplete = function (id) {
        const task = storedTasks.find(task => task.id === id);
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
        loadTasks();
    };

    // Edit Task
    window.editTask = function (id) {
        const task = storedTasks.find(task => task.id === id);
        taskTitle.value = task.title;
        taskDescription.value = task.description;
        taskDueDate.value = task.dueDate;
        taskPriority.value = task.priority;
        taskCategory.value = task.category;
        
        editTask(id);
    };

    // Delete Task
    window.deleteTask = function (id) {
        if (confirm('Are you sure you want to delete this task?')) {
            const index = storedTasks.findIndex(task => task.id === id);
            storedTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            loadTasks();
        }
    };

    // Clear Form
    function clearForm() {
        taskTitle.value = '';
        taskDescription.value = '';
        taskDueDate.value = '';
        taskPriority.value = 'Low';
        taskCategory.value = '';
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    loadTasks();
});
