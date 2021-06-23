import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { Observable } from 'rxjs';
import { Task } from './task.model';
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
    return this.http.post<Task>(this.baseUrl, task)
  }
}
