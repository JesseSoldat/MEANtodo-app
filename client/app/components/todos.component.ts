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

	addTodo($event, todoText:string){
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

	updateStatus(todo){
		var _todo = {
			_id: todo._id,
			title: todo.title,
			isCompleted: !todo.isCompleted
		};

		this.todoService.updateTodo(_todo)
			.map(res => res.json())
			.subscribe(data => {
				todo.isCompleted = !todo.isCompleted;
			});
	}

	deleteTodo(todo:Todo){
		console.log(todo);
		var todos = this.todos;

		this.todoService.deleteTodo(todo._id)
			.map(res => res.json())
			.subscribe(data => {
				if(data.n ==1){
					for(var i = 0; i < todos.length; i++){
						if(todos[i]._id == todo._id){
							todos.splice(i, 1);
						}
					}
				}
			})
	}

	setEditState(todo, state:boolean){
		if(state){
			todo.isEditMode = state;
			console.log(todo);
		} else {
			delete todo.isEditMode;
		}
	}

	updateTodoText($event, todo){
		if($event.which === 13){
			todo.title = $event.target.value;
			var _todo = {
				_id: todo._id,
				title: todo.title,
				isCompleted: todo.isCompleted
			};
			console.log(_todo);

			this.todoService.updateTodo(_todo)
				.map(res => res.json())
				.subscribe(data => {
					this.setEditState(todo, false);
				});
		};

	}
}