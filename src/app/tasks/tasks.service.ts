import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(title: string, description: string) {
    const task: Task = {
      id: Math.random().toString(),
      title: title,
      description: description,
      status: 'OPEN'
    };

    this.tasks.update((oldTasks) => [...oldTasks, task]);
  }
}
