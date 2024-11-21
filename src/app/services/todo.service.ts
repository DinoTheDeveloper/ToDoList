import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, of } from 'rxjs'; //handles async operations

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] =[
    {id: 1, title: "How to create to do list", completed:false},
    {id: 2, title: "Learn", completed: true},
    {id: 3, title: "Bettson Interview", completed: true}
  ];

  getTodos(): Observable<Todo[]>{
    return of(this.todos);
  }

  addTodo(title: string):void{
    const newTodo: Todo ={
      id: this.todos.length + 1,
      title,
      completed:false
    };
    this.todos.push(newTodo);
  }

  toggleTodo(id:number):void{
    const todo = this.todos.find(t => t.id === id);
    if(todo){
      todo.completed = !todo.completed
    }
  }

  deleteTodo(id: number): void{
    const index = this.todos.findIndex(t => t.id === id);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
  }

  constructor() { }
}
