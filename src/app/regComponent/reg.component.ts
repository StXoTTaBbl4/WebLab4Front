import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthEntryService} from "../AuthEntry.service";
import {AuthEntry} from "../AuthEntry";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})

export class RegComponent {
  isPasswordWalid: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthEntryService
  ) {}

  onRegister(f: NgForm) {
    // @ts-ignore
    document.getElementById('regInfo').innerText = "";
    console.log("reg button")
    console.log(f.value);
    if ((f.controls['password'].value) === (f.controls['rePassword'].value)) {
      this.authService.registration(f.value).subscribe({
        next:
          (response: AuthEntry) => {
            window.sessionStorage.setItem("login", response.login)
            this.router.navigate(['/main']);
            console.log(response.login);
          },
        error:
          (error: HttpErrorResponse) => {
            console.log(error.message);
            // @ts-ignore
            document.getElementById('regInfo').innerText = "User with this login already exist";
          }
      });
    }else {
      // @ts-ignore
      document.getElementById('regInfo').innerText = "Password fields must be identical";
    }
  }

  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
