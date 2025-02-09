import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  constructor(private loggingService: LoggingService) {}

  addTask(title: string, description: string) {
    const task: Task = {
      id: Math.random().toString(),
      title: title,
      description: description,
      status: 'OPEN'
    };

    this.tasks.update((oldTasks) => [...oldTasks, task]);
    this.loggingService.log(`Added Task with title: "${title}"`);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map((t) => t.id === taskId ? {...t, status: newStatus } : t))
  }
}
