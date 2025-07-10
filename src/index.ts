import './styles/main.scss';

export interface Todo {
    id: number;
    text: string;
    done: boolean;
  }

class TodoApp {
  private todos: Todo[] = [];
  private idCounter = 0;

  constructor(private app: HTMLElement) {
    this.render();
  }

  private render() {
    this.app.innerHTML = `
      <h1>ToDo List</h1>
      <input id="todo-input" />
      <button id="add-btn">추가</button>
      <ul>
        ${this.todos.map(todo => `
          <li data-id="${todo.id}" class="${todo.done ? 'done' : ''}">
            ${todo.text}
            <button class="toggle-btn">✓</button>
            <button class="delete-btn">✕</button>
          </li>
        `).join('')}
      </ul>
    `;

    this.bindEvents();
  }

  private bindEvents() {
    document.getElementById('add-btn')?.addEventListener('click', () => this.addTodo());
    document.querySelectorAll('.toggle-btn').forEach(btn =>
      btn.addEventListener('click', (e) => this.toggleTodo(e))
    );
    document.querySelectorAll('.delete-btn').forEach(btn =>
      btn.addEventListener('click', (e) => this.deleteTodo(e))
    );
  }

  private addTodo() {
    const input = document.getElementById('todo-input') as HTMLInputElement;
    const text = input.value.trim();
    if (!text) return;
    this.todos.push({ id: this.idCounter++, text, done: false });
    input.value = '';
    this.render();
  }

  private toggleTodo(e: Event) {
    const li = (e.target as HTMLElement).closest('li')!;
    const id = Number(li.dataset.id);
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      this.render();
    }
  }

  private deleteTodo(e: Event) {
    const li = (e.target as HTMLElement).closest('li')!;
    const id = Number(li.dataset.id);
    this.todos = this.todos.filter(t => t.id !== id);
    this.render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) new TodoApp(app);
});