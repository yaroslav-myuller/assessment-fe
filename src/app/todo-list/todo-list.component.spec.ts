import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {MOCK_TODOS} from '../mock-data/mock-todos';
import {TodoService} from '../services/todo.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  const TODOS = MOCK_TODOS;
  let mockTodoService;
  // let todoService: TodoService;

  beforeEach(async(() => {
    mockTodoService = jasmine.createSpyObj('TodoService',
      ['getData', 'postData', 'putData', 'deleteData']);

    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [
        {provide: TodoService, useValue: mockTodoService},
        {provide: HttpClient, useValue: HttpClient}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    mockTodoService.getData.and.returnValue(of(TODOS));

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    // todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set todos correctly from the service', () => {
    mockTodoService.getData.and.returnValue(of(TODOS));
    fixture.detectChanges();
    expect(fixture.componentInstance.todoList.length).toBe(3);
  });
});
