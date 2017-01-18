import { Component } from '@angular/core';
import { TodoService } from '../services/todos.service';
import 'rxjs/add/operator/map';
import { Todo } from '../Todo';


@Component ({
	moduleId: module.id,
	selector: 'todos',
	templateUrl: 'todos.component.html'
})

export class TodosComponent {
	todos: Todo[];

	constructor(private todoService: TodoService){

	}

	ngOnInit(){
		this.todos = [];
		this.todoService.getTodos()
			.map(res => res.json())
			.subscribe(todos => this.todos = todos);
	}

	addTodo($event, todoText){
		if($event.which === 1){
			let result;
			let newTodo = {
				title: todoText.value,
				isCompleted: false
			};
			console.log(newTodo.title)
			result = this.todoService.saveTodo(newTodo);
			result.subscribe(x => {
				this.todos.push(newTodo);
				todoText.value = '';
				console.log(x);
			})
		}
	}
}