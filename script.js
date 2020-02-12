let tasks = [{
		id: 3492384093859837498,
		title: "Task 1",
		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ipsum tempora sint, totam, dignissimos repudiandae accusamus harum nisi dicta est necessitatibus soluta accusantium ea odio dolorum corrupti? Expedita, voluptatum saepe?",
		completed: false
	},
	{
		id: 3045357983463334897,
		title: "Task 2",
		body: "Dicta est necessitatibus soluta accusantium ea odio dolorum corrupti? Expedita, voluptatum saepe?",
		completed: false
	}
];


(function (arrOfTasks) {
	const objOfTasks = arrOfTasks.reduce((acc, task) => {
		acc[task.id] = task;
		return acc;
	}, {});

	// UI elements
	const form = document.querySelector('.task-form');
	const taskTitle = form.querySelector('.task-title');
	const taskBody = form.querySelector('.task-body');
	const tasksContainer = document.querySelector('.cards-list .row');
	const addTaskBtn = document.querySelector('.add-task-btn');

	addTaskBtn.addEventListener('click', onSubmitHandler);

	function onSubmitHandler(e) {
		e.preventDefault();
		let titleValue = taskTitle.value;
		let bodyValue = taskBody.value;

		const taskObj = createTaskObj(titleValue, bodyValue);
		const el = createNewHtmlElement(taskObj)
		tasksContainer.insertAdjacentElement('afterbegin', el);
		form.reset();
	}

	function createTaskObj(title, body) {

		if (!title || !body) {
			alert('Введите название и описание задачи');
			return;
		}

		const task = {
			title,
			body,
			id: `item-${Math.random()}`,
			completed: false
		}

		objOfTasks[task.id] = task;
		return {
			...task
		}
	}

	let renderAllTasks = function (tasks) {
		const values = Object.values(objOfTasks).forEach(task => {
			const oneTask = createNewHtmlElement(task);
			tasksContainer.appendChild(oneTask);
		});
	}

	function createNewHtmlElement(task) {
		const taskWrapper = document.createElement('div');
		taskWrapper.classList.add('card', 'text-white', 'bg-primary', 'mb-3', 'w-100');

		const taskTitle = document.createElement('div');
		taskTitle.classList.add('card-header', 'bg-primary');
		taskTitle.textContent = task.title;

		const taskBody = document.createElement('div');
		taskBody.classList.add('card-body', 'bg-warning', 'text-dark');
		taskBody.textContent = task.body;

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Удалить задачу';
		deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'd-block', 'mt-4');

		taskWrapper.appendChild(taskTitle);
		taskBody.appendChild(deleteBtn);
		taskWrapper.appendChild(taskBody);


		return taskWrapper;
	}

	renderAllTasks(objOfTasks)



})(tasks);