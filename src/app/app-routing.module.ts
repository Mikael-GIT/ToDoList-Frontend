import { TasksCrudComponent } from './views/tasks-crud/tasks-crud.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TaskCreateComponent } from './components/task/task-create/task-create.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "tasks",
    component: TasksCrudComponent
  },
  {
    path: "task/create",
    component: TaskCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
