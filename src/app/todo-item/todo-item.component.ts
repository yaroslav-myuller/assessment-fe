import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  /** fleck if the loading is in process for showing the load layer */
  loading = false;

  @Input() todoItem;
  @Output() getTodoList = new EventEmitter();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  /**
   * send delete item to api and emit get list function of parent TodoList component
   */
  deleteTodo() {
    this.loading = true;
    if (this.todoItem.id) {
      this.todoService.deleteData('todo/' + this.todoItem.id).subscribe(
        () => {
          this.loading = false;
          this.getTodoList.emit();
        },
        error => console.error('deleteTodo', error)
      );
    }
  }

  /**
   * send change done to api and emit get list function of parent TodoList component
   * @private
   */
  changeTodoDone() {
    this.loading = true;
    // change todoItem done status before sending update to backend
    this.todoItem.done = !this.todoItem.done;

    if (this.todoItem.id) {
      this.todoService.putData('todo/' + this.todoItem.id, this.todoItem).subscribe(
        () => {
          this.loading = false;
          this.getTodoList.emit();
        },
        error => console.error('callChangeTodoDone', error)
      );
    }
  }

  getLineThroughClassIfDoneIsTrue() {
    return this.todoItem.done ? 'line-through' : '';
  }

  /**
   * get title for checkbox if the item is done or not
   */
  changeTitle() {
    return (this.todoItem.done) ? 'Set this todo on not done' : 'Set this todo on done';
  }

}
