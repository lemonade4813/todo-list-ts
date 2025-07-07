import './styles/main.scss';

export interface Todo {
    id: number;
    text: string;
    done: boolean;
  }

  const app = document.getElementById('app')!;
  
  let todos: Todo[] = [];
  let idCounter = 0;
  
  function render() {
    app.innerHTML = `
      <h1>ToDo List</h1>
      <input id="todo-input" placeholder="할 일을 입력하세요" />
      <button id="add-btn">추가</button>
      <ul id="todo-list">
        ${todos.map(todo => `
          <li data-id="${todo.id}" class="${todo.done ? 'done' : ''}">
            ${todo.text}
            <button class="toggle-btn">✓</button>
            <button class="delete-btn">✕</button>
          </li>
        `).join('')}
      </ul>
    `;
  
    document.getElementById('add-btn')?.addEventListener('click', addTodo);
    document.querySelectorAll('.toggle-btn').forEach(btn =>
      btn.addEventListener('click', toggleTodo)
    );
    document.querySelectorAll('.delete-btn').forEach(btn =>
      btn.addEventListener('click', deleteTodo)
    );
  }
  
  function addTodo() {
    const input = document.getElementById('todo-input') as HTMLInputElement;
    const text = input.value.trim();
    if (text === '') return;
  
    todos.push({ id: idCounter++, text, done: false });
    input.value = '';
    render();
  }
  
  function toggleTodo(e: Event) {
    const li = (e.target as HTMLElement).closest('li')!;
    const id = Number(li.getAttribute('data-id'));
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      render();
    }
  }
  
  function deleteTodo(e: Event) {
    const li = (e.target as HTMLElement).closest('li')!;
    const id = Number(li.getAttribute('data-id'));
    todos = todos.filter(t => t.id !== id);
    render();
  }
  
  render();