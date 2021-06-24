import { Task } from './../task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  task: Task = {
    descricao: '',
    hora: '',
    data: '',
    concluida: false
  }


  constructor(
    private taskService: TaskService,
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.taskService.findById(id).subscribe(task => {
       this.task = task 
    }); 
  }

  updateTask(): void { 
    this.taskService.update(this.task).subscribe(() => {
      this.taskService.showMessage('Tarefa atualizada com sucesso!');
      this.router.navigate(['/tasks']);
    })
  }

  cancel(): void {
    this.router.navigate(['/tasks'])
  }
}
