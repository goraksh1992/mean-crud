import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  base_url = "http://localhost:3000/employees"

  constructor(private _http: HttpClient) { }

  getEmployees(){
    return this._http.get(this.base_url)
  }

  addEmployeeService(employee: any){
    return this._http.post(this.base_url, employee)
  }

  deleteEmployee(id: any){
    return this._http.delete(`${this.base_url}/${id}`)
  }

  getEmployee(id: any){
    return this._http.get(`${this.base_url}/${id}`)
  }

  updateEmployee(id: any, empData: any){
    return this._http.put(`${this.base_url}/${id}`, empData)
  }
}
