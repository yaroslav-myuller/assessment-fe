import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Todo} from '../models/todo-model';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

/** http header options */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * Rest service for communication with back-end api.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Backend API url
   */
  apiUrl: string;

  constructor(private readonly http: HttpClient, private messageService: MessageService) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // can send the error to remote logging infrastructure
      // log to console instead
      console.error(operation, error);
      this.messageService.setResponseMessage(error, 'danger');
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  /**
   * get data from backend api
   * @param urlParam: additionally host url data like item id
   * @param defaultResult: default result object if an error occupants
   * @returns: Observable<any[] | List[]>
   */
  getData(urlParam: string, defaultResult = []) {
    return this.http.get(this.apiUrl + urlParam, httpOptions)
      .pipe(
        map((response: any | Todo) => {
          return response;
        }),
        catchError(this.handleError('getData', defaultResult))
      );
  }

  /**
   * Post data to backend
   * @param urlParam: addition Url param to base url apiUrl
   * @param data: JSON body to send
   * @param defaultResult: default object, that should be return on error
   */
  postData(urlParam: string, data: any, defaultResult = {}) {
    return this.http.post(this.apiUrl + urlParam, data, httpOptions)
      .pipe(
        map((response: any) => {
          if (response.error) {
            this.messageService.setResponseMessage(response, 'warning');
          }
          return response;
        }),
        catchError(this.handleError('postData', defaultResult))
      );
  }

  /**
   * Put data to backend
   * @param urlParam: addition Url param to base url apiUrl
   * @param data: JSON body to send
   * @param defaultResult: default object, that should be return on error
   */
  putData(urlParam: string, data: any, defaultResult = {}) {
    return this.http.put(this.apiUrl + urlParam, data, httpOptions)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError('putData', defaultResult))
      );
  }

  /**
   * delete request to backend
   * @param urlParam: addition Url param to base url apiUrl
   * @param defaultResult: default object, that should be return on error
   */
  deleteData(urlParam: string, defaultResult = {}) {
    return this.http.delete(this.apiUrl + urlParam, httpOptions)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError('deleteData', defaultResult))
      );
  }

}
