import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddTodoComponent} from './add-todo.component';
import {TodoService} from '../services/todo.service';
import {HttpClient} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let mockTodoService;

  beforeEach(async(() => {
    mockTodoService = jasmine.createSpyObj(['getData', 'postData', 'putData', 'deleteData']);

    TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: TodoService, useValue: mockTodoService},
        {provide: HttpClient, useValue: HttpClient}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
