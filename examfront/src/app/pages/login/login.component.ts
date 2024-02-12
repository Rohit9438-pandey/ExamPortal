import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit
{

  loginData = {
    username:'',
    password:'',
  };


  constructor(private snack:MatSnackBar , private login:LoginService ,private router : Router){}

  ngOnInit(): void {}

  formSubmit()
  {
    console.log("login button clicked");
    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
                this.snack.open("Username is required !! " , '' ,{

                  duration:3000,
                });

                return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
                this.snack.open("Password is required !! " , '' ,{

                  duration:3000,
                });

                return;
    }

    //request server to generate token 
    this.login.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log('Success');
        console.log(data);
      
        //Login

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any) =>{
            this.login.setUser(user);
            console.log(user);

            //redirect..Admin: admin-dashboard
            //redirect..Normal: normal-dashboard
             
            if(this.login.getUserRole() == "ADMIN")
            {
                   //admin dashboard
                  // window.location.href ='/admin'
                  this.router.navigate(['admin']);
                  this.login.loginStatusSubject.next(true);
            }
            else if(this.login.getUserRole() == "NORMAL")
            {
              //window.location.href = '/user-dashboard'
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);  
            }

            else{
              this.login.logOut();
            
            }

          });
      },

      error: (error: any) => {
        console.log('Error!');
        console.log(error);
        this.snack.open("Invalid Details  !! Try again", '' ,{

          duration: 3000,
        });
      }
    });
    
    
  }

}
