import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoItemComponent} from './todo-item.component';
import {TodoService} from '../services/todo.service';
import {HttpClient} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Todo} from '../models/todo-model';
import {of} from 'rxjs';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let mockTodoService;
  const TODO_ITEM: Todo = {
    id: 1,
    description: 'Test todo item 1',
    done: false
  };

  beforeEach(async(() => {
    mockTodoService = jasmine.createSpyObj('TodoService',
      ['getData', 'postData', 'putData', 'deleteData']);

    TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      providers: [
        {provide: TodoService, useValue: mockTodoService},
        {provide: HttpClient, useValue: HttpClient}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todoItem = TODO_ITEM;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change todo correctly', () => {
    const todoChanged = Object.assign({}, TODO_ITEM);
    mockTodoService.putData.and.returnValue(of(todoChanged));
    fixture.detectChanges();
    expect(fixture.componentInstance.todoItem.done).toBe(todoChanged.done);
  });

});
