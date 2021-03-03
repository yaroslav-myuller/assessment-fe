import {TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {Error} from '../models/error-model';

describe('MessageService', () => {
  let service: MessageService;
  const MOCK_ERROR: Error = {
    timestamp: '2021-03-02T20:38:14.9070487',
    status: 400,
    error: 'Bad Request',
    message: 'Malformed JSON request',
    path: '/todo'
  };
  const message = 'Malformed JSON request';
  const type = 'warning';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set response message', () => {
    service.setResponseMessage(MOCK_ERROR, type);
    expect(service.type).toBe(type);
    expect(service.message).toBe(message);
  });

  it('should get message', () => {
    service.setResponseMessage(MOCK_ERROR, type);
    expect(service.getMessage()).toBe(message);
  });

  it('should get type', () => {
    service.setResponseMessage(MOCK_ERROR, type);
    expect(service.getType()).toBe(type);
  });
});
