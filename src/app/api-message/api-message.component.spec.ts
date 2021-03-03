import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMessageComponent } from './api-message.component';

describe('ApiMessageComponent', () => {
  let component: ApiMessageComponent;
  let fixture: ComponentFixture<ApiMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
