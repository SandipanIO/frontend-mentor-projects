const body = document.querySelector('body');
const toggleBtn = document.querySelector('#toggle-btn');

const form = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');

const todoFooter = document.querySelector('#todo-footer');
const itemsLeft = document.querySelector('#todo-items-left');

const todoFilter = document.querySelector('#todo-filter');
const clearCompletedTodos = document.querySelector('#clear-completed');

// allTodos is an array of objects for storing the todos
const allTodos = [];

// Create a Todo Class
class Todo {
   constructor(id, task, status) {
      this.id = id;
      this.task = task;
      this.status = status;
   }
}

/*********************************************************************************/
/* FUNCTIONS */
/*********************************************************************************/

/* ---------------------------------------------------------------------------- */
/* createTodo() - create new todos */
/* ---------------------------------------------------------------------------- */

const createTodo = (id, task, status) => {

   // Create a new li element
   const li = document.createElement('li');

   li.classList.add('todo__item');
   li.dataset.id = id;
   li.setAttribute('role', 'listitem');

   li.innerHTML = `
      <div class="todo__item-box">
         <label for="${id}" class="todo__label">
            <span class="sr-only">Mark todo as complete</span>
            <input type="checkbox" id="${id}" class="todo__input">
            <span class="todo__mark-as-complete"></span>
         </label>
         <p>${task}</p>
         <button class="todo__btn todo__delete" aria-label="Delete todo">
            <img class="todo__delete-icon" src="images/icon-cross.svg" alt="">
         </button>
      </div>
   `;

   // If a user adds a todo while the completed filter is active, then hide the new todo
   const completedButton = document.querySelector('#completed-todos');

   if(completedButton.className.includes('selected-button')) {
      li.classList.add('hide');
   }

   // Mark the todos with "status = completed" as complete (when data is fetched from localStorage)
   if(status === 'completed') {

      //if task was previously marked as complete, add checked to the input checkbox 
      // and line-through to that task

      li.querySelector('.todo__input').checked = true;
      li.querySelector('p').classList.add('todo__line-through');
   }

   // Append the new li element to the todoList ul element
   todoList.appendChild(li);
};

/* ---------------------------------------------------------------------------- */
/* storeTodosLocally() - function to store todos to localStorage */
/* ---------------------------------------------------------------------------- */

const storeTodosLocally = allTodos => {
   localStorage.setItem('todos', JSON.stringify(allTodos));
};

/* ---------------------------------------------------------------------------- */
/* todosLeft() - function to print the number of active tasks left */
/* ---------------------------------------------------------------------------- */

const todosLeft = () => {

   const count = allTodos.filter(todo => todo.status === 'active').length;

   itemsLeft.innerHTML = count === 1 ? `${count} item left` : `${count} items left`;
   
   if(!todoFooter.className.includes('show-footer')) {
      todoFooter.classList.add('show-footer');
   }
};

/* ---------------------------------------------------------------------------- */
/* removeTodo() - remove todo from the Todo array */
/* ---------------------------------------------------------------------------- */

const removeTodo = todo => {
   const index = allTodos.indexOf(todo);
   allTodos.splice(index, 1);
};

/* ---------------------------------------------------------------------------- */
/* showAllTodos() - show all the todos (active and completed) */
/* ---------------------------------------------------------------------------- */

const showAllTodos = () => {
   const todoItems = document.querySelectorAll('.todo__item');

   todoItems.forEach(item => {
      if(item.className.includes('hide')) {
         item.classList.remove('hide');
      }
   });
};

/* ---------------------------------------------------------------------------- */
/* filterTodos() - filters active and completed todos */
/* ---------------------------------------------------------------------------- */

const filterTodos = filter => {
   const todoItems = document.querySelectorAll('.todo__item');
   const arrayOfItems = Array.from(todoItems);
   
   allTodos.filter(todo => todo.status === filter).forEach(todo => {

      arrayOfItems.forEach(item => {

         if(item.dataset.id == todo.id) {
            item.classList.add('hide');

            const index = arrayOfItems.indexOf(item);
            arrayOfItems.splice(index, 1);

         } else {
            item.classList.remove('hide');
         }
      });
   });
};

/* ---------------------------------------------------------------------------- */
/* activeButton() - checks for the active filter button and adds class to it */
/* ---------------------------------------------------------------------------- */

const activeButton = id => {
   const filterButtons = document.querySelectorAll('#todo-filter button');

   Array.from(filterButtons).forEach(btn => {
      if(btn.id === id) {
         btn.classList.add('selected-button');
      } else {
         btn.classList.remove('selected-button');
      }
   });
};

/*********************************************************************************/
/* Event Listeners */
/*********************************************************************************/

/* ---------------------------------------------------------------------------- */
/* Fire the Eventlistener for creating a new todo on form submit */
/* ---------------------------------------------------------------------------- */

form.addEventListener('submit', e => {
   e.preventDefault();

   // Get the current timestamp and use it as ID
   const now = new Date();
   const id = now.getTime();

   const task = form.newTodo.value;
   let status = 'active'; // new todo will have a status of active

   const todo = new Todo(id, task, status);
   
   // Create a new todo
   createTodo(todo.id, todo.task, todo.status);

   // Store the todo object to the "allTodos" array
   allTodos.push(todo);

   // Store todo object in localStorage
   storeTodosLocally(allTodos);

   // Calculate the active todos
   todosLeft();

   // Reset the form
   form.reset();

});

/* ---------------------------------------------------------------------------- */
/* when someone clicks on the Todo list elements like checkbox and 
   delete button (Event Listner) */
/* ---------------------------------------------------------------------------- */

todoList.addEventListener('click', e => {

   /* -------------------------------- */
   /* Mark todo as complete/incomplete */
   /* -------------------------------- */
   if(e.target.className.includes('todo__input')) {

   //Mark todo as complete
      if(e.target.checked) {
         e.target.parentElement.nextElementSibling.classList.add('line-through');

         // Change status of todo as "complete" in the allTodos array
         allTodos.forEach(todo => {
            if(e.target.id == todo.id) {
               todo.status = 'completed';
            }
         });
      }

   //Mark todo as incomplete
      else if(!e.target.checked) {
         e.target.parentElement.nextElementSibling.classList.remove('line-through');

         // Change status of todo as "active" in the allTodos array
         allTodos.forEach(todo => {
            if(e.target.id == todo.id) {
               todo.status = 'active';
            }
         });
      }

      // Update the active todos left
      todosLeft();

      // Update todo object in localStorage
      storeTodosLocally(allTodos);
   }

   /* ----------- */
   /* Delete Todo */
   /* ----------- */
   if(e.target.className.includes('todo__delete') || e.target.className.includes('todo__delete-icon')) {
      
      allTodos.forEach(todo => {
         if(e.target.closest('.todo__item').dataset.id == todo.id) {
            
            // Remove todo from the allTodos array
            removeTodo(todo);

            // Update the active todos left
            todosLeft();
         }
      });
      
      // Remove the todo item from the DOM
      e.target.closest('.todo__item').remove();

      // Update todo object in localStorage
      storeTodosLocally(allTodos);
   }
});

/* ---------------------------------------------------------------------------- */
/* Filter Todos (event listener) */
/* ---------------------------------------------------------------------------- */

todoFilter.addEventListener('click', e => {

   // All Todos
   if(e.target.id === 'all') { 
      showAllTodos(); 
      
      //Check for the active button
      activeButton('all');
   }

   // Filter Active todos
   if(e.target.id === 'active-todos') { 
      
      //Check for completed todos and remove them from the list - so only the active todos will remain
      filterTodos('completed');

      //Check for the active button
      activeButton('active-todos');
   }

   // Filter Completed todos
   if(e.target.id === 'completed-todos') { 
      
      //Check for completed todos and remove them from the list - so only the active todos will remain
      filterTodos('active');

      //Check for the active button
      activeButton('completed-todos');
   }
});

/* ---------------------------------------------------------------------------- */
/* Delete the completed todos when the "Clear Completed" 
   button is clicked (event listener) */
/* ---------------------------------------------------------------------------- */

clearCompletedTodos.addEventListener('click', () => {
   const todoItems = document.querySelectorAll('.todo__item');

   allTodos.filter(todo => todo.status === 'completed').forEach(todo => {

      todoItems.forEach(item => {
         if(item.dataset.id == todo.id) {
            
            item.remove();
            removeTodo(todo);
         }
      });

   });

   // update todos in localStorage
   storeTodosLocally(allTodos);

   // Show all the available todos
   showAllTodos();

   // Make the "all" filter button active
   activeButton('all');
});

/* ---------------------------------------------------------------------------- */
/* Toggle light and dark mode (event listener) */
/* ---------------------------------------------------------------------------- */

toggleBtn.addEventListener('click', () => {

   body.classList.toggle('dark-mode');
   
   if(body.className.includes('dark-mode')) {

      localStorage.setItem('theme', 'dark');
      toggleBtn.setAttribute('aria-label', 'Change to light mode');

   } else {

      localStorage.setItem('theme', 'light');
      toggleBtn.setAttribute('aria-label', 'Change to dark mode');

   }
});

/*********************************************************************************/
/* On page load */
/*********************************************************************************/

/* ---------------------------------------------------------------------------- */
/* Fetch the theme mode from localStorage (if any) */
/* ---------------------------------------------------------------------------- */

if(localStorage.getItem('theme')) {

   if(localStorage.getItem('theme') === 'dark') {
      
      body.classList.add('dark-mode');
      toggleBtn.setAttribute('aria-label', 'Change to light mode');

   } else {
      
      body.classList.remove('dark-mode');
      toggleBtn.setAttribute('aria-label', 'Change to dark mode');
   }
}

/* ---------------------------------------------------------------------------- */
/* Fetch todos from localStorage (if any) */
/* ---------------------------------------------------------------------------- */

if(JSON.parse(localStorage.getItem('todos')).length > 0) {
   const todos = JSON.parse(localStorage.getItem('todos'));

   todos.forEach(todo => {
      // create todo item and add it to the todoList ul element
      createTodo(todo.id, todo.task, todo.status);

      // Add todo to the "allTodos" array
      allTodos.push(todo);
   });

   // Update the active todos left
   todosLeft();

}