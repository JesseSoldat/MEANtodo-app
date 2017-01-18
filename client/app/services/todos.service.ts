import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TodoService {
	constructor(public http:Http){

	}

	getTodos(){
		return this.http.get('/api/todos');
	}

}