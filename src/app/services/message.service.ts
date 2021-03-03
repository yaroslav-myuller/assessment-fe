import {Injectable} from '@angular/core';

/**
 * Message service for central handling of messages
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  /** response message */
  message = '';

  /** alert type (error, warning etc...) */
  type = 'danger';

  constructor() {
  }

  /**
   * set message from param mes (error object).
   * @param messageObject: error object for message
   * @param type: alert type (error, warning etc...)
   */
  setResponseMessage(messageObject: any, type: string) {
    this.type = type;

    // filter witch object is to use for message text
    const messageError = (messageObject.error && messageObject.error.message) ? messageObject.error : messageObject;
    this.message = (messageError.message) ? messageError.message  // if message in error object, set message
      : (messageError.error) ? messageError.error                 // otherwise if error in error object, set error
        : messageError.status;                           // otherwise set status
  }

  /** reset message to empty */
  resetMessage() {
    this.message = '';
  }

  /** get message */
  getMessage() {
    return this.message;
  }

  getType() {
    return this.type;
  }

}
