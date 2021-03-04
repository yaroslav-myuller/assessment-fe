import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo-model';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  /** fleck if the loading is in process for showing the load layer */
  loading = false;

  /** list of all todoItems */
  todoList: Todo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  /**
   * get todoItem list from api
   */
  public getTodoList() {
    this.loading = true;
    this.todoService.getData('todo/').subscribe(
      newList => {
        this.loading = false;
        this.todoList = newList;
      },
      error => console.error('getTodoList', error)
    );
  }

  /**
   * add new item from AddTodoComponent event emitter
   * @param todoItem: new todoItem
   */
  addTodo(todoItem: Todo) {
    this.todoList.push(todoItem);
    this.getTodoList();
  }
}
