import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {HitEntryService} from "../HitEntry.service";
import {HitEntry} from "../HitEntry";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthEntryService} from "../AuthEntry.service";
import {AuthEntry} from "../AuthEntry";

@Component({
  selector: 'app-root',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent{
  public isUserExist: boolean = true;
  isPasswordWalid: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthEntryService
  ) {}
  onSubmit(f: NgForm) {
    // @ts-ignore
    document.getElementById('loginInfo').innerText ="";
    console.log("sub button")
    console.log(f.value);
    this.authService.login(f.value).subscribe({
      next:
        (response: AuthEntry) => {
          window.sessionStorage.setItem("login",response.login)
          this.router.navigate(['/main']);
         console.log(response.login);
        },
      error:
        (error: HttpErrorResponse) => {
          // this.isUserExist = false;
          // @ts-ignore
          document.getElementById('loginInfo').innerText = "Invalid login or password";
          console.log(error.message)
        }
    });
  }

  // onRegister(f: NgForm) {
  //   console.log("reg button")
  //   console.log(f.value);
  //   console.log((f.controls['password'].value) === (f.controls['rePassword'].value))
  //   if ((f.controls['password'].value) === (f.controls['rePassword'].value)){
  //     console.log("Registration link used")
  //     this.authService.registration(f.value)
  //   }
  // }
  goToReg() {
    this.router.navigate(['/reg']);
  }
}
