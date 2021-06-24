import { Task } from './../task.model';
import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-read',
  templateUrl: './task-read.component.html',
  styleUrls: ['./task-read.component.css']
})

export class TaskReadComponent implements OnInit {
  tasks!: Task[];
  task: Task = new Task();
  displayedColumns = ['id', 'descricao', 'data', 'concluida', 'action']

  constructor(
      private router: Router,
      private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.tasks = []
    this.taskService.read().subscribe(tasks => {
      this.tasks = tasks
      console.log(this.tasks)
    })
  }

  update(id: string): void {
    this.taskService.findById(id).subscribe(
      result => {
        this.task = result;
        this.task.concluida = !this.task.concluida;
        console.log(this.task);
        this.taskService.update(this.task).subscribe(() => {
          this.router.navigate(['/tasks']);
        }); 
      }
    );
  }

  deleteTask(id: string): void {
      this.taskService.delete(id).subscribe(() => {
      this.taskService.showMessage('Tarefa excluída com sucesso!');
      this.taskService.read()
        .subscribe(tasks => this.tasks = tasks)
     });
  }

  orderByData(){
    this.taskService.readByParameter("orderByData")
      .subscribe(tasks => {
        this.tasks = tasks
        console.log(this.tasks)
      })
  }

  orderByDescricao(){
    this.taskService.readByParameter("orderByDescricao")
      .subscribe(tasks => {
        this.tasks = tasks
        console.log(this.tasks)
      })
  }
}
