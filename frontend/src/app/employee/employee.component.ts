import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from './employee.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  showModal: boolean = false; 
  employee: any;
  employees: any;
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
    private employeeService: EmployeeService) { 

      this.employeeService.getEmployees().subscribe(res => {
        this.employees = res;
      })
  }

  ngOnInit(): void {
    this.employee = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      dept: ['', Validators.required]
    })
  }
  

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  addEmployee(){
    this.employeeService.addEmployeeService(this.employee.value).subscribe(
      res => {
        console.log(res)
        this.employeeService.getEmployees().subscribe(res => {
          this.employees = res;
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  ref_id: any;

  onUpdateEmployee(id: any, update){
    this.ref_id = id
    this.employeeService.getEmployee(id).subscribe(
      res => {
        this.employee.patchValue({
          name: res['name'],
          position: res['position'],
          dept: res['dept']
        });
        this.modalService.open(update, { size: 'lg' });
      },
      err => {
        console.log("No employee found");
      }
    )
  }

  editEmployee(){
    this.employeeService.updateEmployee(this.ref_id, this.employee.value).subscribe(
      res => {
        console.log(res);
        this.employeeService.getEmployees().subscribe(res => {
          this.employees = res;
        })
      },
      err => {
        console.log(err);
      }
    )
  }


  deleteEmployee(id: any){
    this.employeeService.deleteEmployee(id).subscribe(
      res => {
        console.log(res)
        this.employeeService.getEmployees().subscribe(res => {
          this.employees = res;
        })
      },
      err => {
        console.log(err)
      }
    )
  }

}
