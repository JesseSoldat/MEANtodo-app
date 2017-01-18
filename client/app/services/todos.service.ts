import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TodoService {
	constructor(public http: Http){

	}

	getTodos(){
		return this.http.get('/api/todos');
	}

	saveTodo(todo){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/todo', JSON.stringify(todo), {headers: headers})
			.map(res => res.json());
	}

}