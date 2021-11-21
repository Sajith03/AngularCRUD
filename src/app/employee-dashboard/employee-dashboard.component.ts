import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
formValue!: FormGroup;
employeeModelObject : EmployeeModel = new EmployeeModel();
employeeData !: any;
showAdd !: boolean;
showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder , private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getEmployeeList();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
postEmployeeDetails(){
  this.employeeModelObject.firstName = this.formValue.value.firstName;
  this.employeeModelObject.lastName = this.formValue.value.lastName;
  this.employeeModelObject.email = this.formValue.value.email;
  this.employeeModelObject.mobile = this.formValue.value.mobile;
  this.employeeModelObject.salary = this.formValue.value.salary;

  this.api.postEmployee(this.employeeModelObject)
  .subscribe(res =>{
    console.log(res);
    alert("Employee Added Successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getEmployeeList();
  },
  err=>{
    alert("Something went wrong");
  })
}
getEmployeeList(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData = res;
  })

}
deleteEmployees(row : any){
  // console.log(row.id,"Sajith")
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("Employee Deleted")
    this.getEmployeeList();
  })
  
}
onEdit(row : any){
  this.showAdd = false;
  this.showUpdate = true;
  this.formValue.controls['salary'].setValue(row.salary);
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.employeeModelObject.id = row.id;
  

  // console.log("Sajith", row.id);
}
updateEmployeeDetails(){
  this.employeeModelObject.firstName = this.formValue.value.firstName;
  this.employeeModelObject.lastName = this.formValue.value.lastName;
  this.employeeModelObject.email = this.formValue.value.email;
  this.employeeModelObject.mobile = this.formValue.value.mobile;
  this.employeeModelObject.salary = this.formValue.value.salary;
  // console.log(this.id,"Sajith")
  this.api.updateEmployee(this.employeeModelObject, this.employeeModelObject.id)
  .subscribe(res=>{
    alert("Updated Successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getEmployeeList();
  })
}
}
