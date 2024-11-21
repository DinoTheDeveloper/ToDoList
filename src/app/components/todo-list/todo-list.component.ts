import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{
  todos: Todo[] = [];
  newTodoTitle: string = '';

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void{
    this.todoService.getTodos().subscribe({
      next:(data:Todo[]) =>{
        this.todos = data;
      },
      error: (error: Error) =>{
        console.error('Loading Todo Error', error)
      }
    });
  }

  addTodo(): void{
    if (this.newTodoTitle.trim()){
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '',
      this.loadTodos();
    }
  }

  toggleTodo(id:number): void{
    this.todoService.toggleTodo(id);
    this.loadTodos();
  }

  deleteTodo(id: number): void{
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }

}
