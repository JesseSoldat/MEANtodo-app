import { Component } from '@angular/core';
import { TodoService } from '../services/todos.service';
import 'rxjs/add/operator/map';


@Component ({
	moduleId: module.id,
	selector: 'todos',
	templateUrl: 'todos.component.html'
})

export class TodosComponent {
	todos: any;

	constructor(private todoService: TodoService){

	}

	ngOnInit(){
		this.todos = [];
	}
}