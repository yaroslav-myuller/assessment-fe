import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../services/todo.service';
import {Todo} from '../models/todo-model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styles: []
})
export class AddTodoComponent implements OnInit {
  todoFormGroup: FormGroup;

  /** fleck if the loading is in process for showing the load layer */
  loading = false;

  @Output() addNewTodoToList = new EventEmitter();

  constructor(private fb: FormBuilder, private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * build form object with all elements and add validators for the form elements
   */
  createForm() {
    this.todoFormGroup = this.fb.group({});
    this.todoFormGroup.addControl('description', this.fb.control(null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)]));
  }

  /**
   * handle the response from backend to emit it to the parent component
   * @param todoItem
   */
  private handleSuccessfullyDataResponse(todoItem: Todo | any) {
    // set loading fleck to false for closing spinner layer.
    this.loading = false;
    if (todoItem && todoItem.description) {
      this.addNewTodoToList.emit(todoItem);
    }
  }

  /**
   * send data to TodoService for saving the new TodoItem
   * @private
   */
  private saveData() {
    // set loading fleck to true for showing spinner layer.
    this.loading = true;

    this.todoService.postData('todo/', this.todoFormGroup.value).subscribe(
      data => {
        this.handleSuccessfullyDataResponse(data);
      },
      error => console.log('addNewContentData', error)
    );
  }

  /**
   * trim todoDescription if the form data is valid and call save function
   */
  onSubmit() {
    if (this.todoFormGroup.valid) {
      this.todoFormGroup.get('description').setValue(this.todoFormGroup.get('description').value.trim());
      this.saveData();
    }
  }

  /**
   * check if the input field for description is invalid and touched
   * @param fieldName
   */
  fieldIsInvalid(fieldName: string) {
    const field = this.todoFormGroup.get(fieldName);
    return !field.valid && field.touched;
  }
}
