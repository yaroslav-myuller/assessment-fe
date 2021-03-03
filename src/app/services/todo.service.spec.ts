import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  let mockTodoService;

  beforeEach(() => {
    mockTodoService = jasmine.createSpyObj('TodoService',
      ['getData', 'postData', 'putData', 'deleteData']);
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
