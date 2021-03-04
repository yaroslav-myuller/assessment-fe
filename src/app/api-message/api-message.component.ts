import {Component, OnInit} from '@angular/core';
import {MessageService} from '../services/message.service';

/**
 * central message component for displaying the messages in alert component
 */
@Component({
  selector: 'app-api-message',
  templateUrl: './api-message.component.html',
  styleUrls: ['./api-message.component.scss']
})
export class ApiMessageComponent implements OnInit {

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  getMessage() {
    return this.messageService.getMessage();
  }

  getType() {
    return this.messageService.getType();
  }

  closeMessage() {
    this.messageService.resetMessage();
  }
}
