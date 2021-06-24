import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { Observable } from 'rxjs';
import { Task } from './task.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = 'http://localhost:3001/tarefas'
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X',   {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(task: Task): Observable<Task> {
    let novaData: moment.Moment = moment.utc(task.data).local();
    task.data = novaData.format("YYYY-MM-DD") + 'T' + task.hora;
    console.log(task.data);
    return this.http.post<Task>(this.baseUrl, task)
  }

  read(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl)
  }

  findById(id: string): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  update(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`
    return this.http.put<Task>(url, task)
  }

  delete(id: string): Observable<Task> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Task>(url)
  }
}
