import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService , private _snackBar: MatSnackBar){}

  public user ={

  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  };

  ngOnInit(): void {}

  formSubmit()
  {
    console.log(this.user);

    if(this.user.username =='' || this.user.username ==null)
    {
     this._snackBar.open('username is required !!' , '' ,{

      duration:5000,
     }) ;
     return;
    }

    //add user

     this.userService.addUser(this.user).subscribe(
       
      (data : any)=>{
        console.log(data);
       Swal.fire('SuccessFully Done !!' , 'User id is '  + data.id , 'success');
      },

      (error)=>{
        console.log(error);
        this._snackBar.open('something went wrong !!' , '' ,{
            duration:5000,
         }) ;
      }
    
     );
  }

}
