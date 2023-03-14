import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {HitEntryService} from "../HitEntry.service";
import {HitEntry} from "../HitEntry";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthEntry} from "../AuthEntry";


@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit{
  public hitEntries: HitEntry[] = [];
  // @ts-ignore
  public authEntry: AuthEntry = {login:window.sessionStorage.getItem("login"),password:""};
  // @ts-ignore
  // public hitEntry: HitEntry = {login: window.sessionStorage.getItem("login"),
  // xvalue:0,
  // yvalue:0,
  // rvalue:0,
  // hit:false};
  title: string ='WebLab4Main';
  constructor(private hitEntryService: HitEntryService ,private router: Router) {}
  @ViewChild('canvas',{static:true}) myCanvas!:ElementRef;


  public getHitEntries(): void{
    // @ts-ignore
    this.hitEntryService.getHitEntry(window.sessionStorage.getItem("login")).subscribe({
      next:
        (response: HitEntry[]) => {
          this.hitEntries = response;
          const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
          this.drawDots(canvas);

        },
      error:
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
    });
  }



  ngOnInit(){
    if(window.sessionStorage.getItem("login") == null)
      this.router.navigate(['/auth']);

    this.getHitEntries();
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const ctx = canvas.getContext("2d");
    if(ctx){
      this.drawPlot(ctx,canvas.width,canvas.height);
    }

    canvas.addEventListener("click",function (evt) {
      let elemLeft = canvas.offsetLeft + canvas.clientLeft,
        elemTop = canvas.offsetTop + canvas.clientTop;
      let x = evt.x-elemLeft;
      let y = evt.y - elemTop;
      // @ts-ignore
      let r = document.getElementById("r").value;
      console.log("x: " + (evt.x-elemLeft)  + " y: " + (evt.y - elemTop));
      // @ts-ignore
      if ( r !== ""){
        // @ts-ignore
        document.getElementById("mainInfo").innerText ="";
        // @ts-ignore
        document.getElementById("login").value =window.sessionStorage.getItem("login");

        if(x/300 > 0.5)
          x = (x-150)/150*r + Number.EPSILON;
        else
          x = -(1-x/150)*r +Number.EPSILON;

        if (y/300 <= 0.5)
          y = Math.round(-(y-150)/150*r + Number.EPSILON);
        else
          y = Math.round((1-y/150)*r + Number.EPSILON);

        // @ts-ignore
        document.getElementById("x").value = x;
        // @ts-ignore
        document.getElementById("y").value = y;

        // @ts-ignore
        // document.getElementById("Hx").value = x;
        // // @ts-ignore
        // document.getElementById("Hy").value = y;
        //
        // // @ts-ignore
        // document.getElementById("Hr").value = r;
        //
        document.getElementById("submitButton").click();




      }else
        {
          // @ts-ignore
          document.getElementById("mainInfo").innerText = "Enter the R value!"
        }
    });
  }

  onSubmit(f: NgForm) :void{
    console.log("clicked")
    f.controls['login'].setValue(window.sessionStorage.getItem("login"));

    this.hitEntryService.checkHitEntry(f.value).subscribe({
      next:
        () => {
          this.getHitEntries();
        },
      error:
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
    });
    this.getHitEntries();

  }

  public drawPlot(ctx : CanvasRenderingContext2D,w: number,h: number) :void{

    let x = w;
    let y = h;
    let rval = "R";
    ctx.fillStyle = '#0080FF';
    ctx.clearRect(0, 0, w, h);

    // //1 сектор
    ctx.beginPath();
    ctx.moveTo(w/2,h/2);
    ctx.lineTo(w/2,h/2+y/4);
    ctx.lineTo(0,h/2);
    ctx.lineTo(w/2,h/2);
    ctx.lineTo(w/2+x/4,h/2);
    ctx.fill();

    // //3 сектор
    ctx.moveTo(w/2,h/2);
    ctx.arc(w/2,h/2,x/4,0,Math.PI/2);
    ctx.fill();

    // //4 сектор
    ctx.beginPath();
    ctx.fillRect(0,h/4,x/2,y/4);
    ctx.fill();

    //Направляющие оси
    //Y
    ctx.beginPath();
    ctx.moveTo(w/2,h);
    ctx.lineTo(w/2,0);
    ctx.moveTo(w/2,0);
    ctx.lineTo(w/2-5,10);
    ctx.moveTo(w/2,0);
    ctx.lineTo(w/2+5,10);
    ctx.stroke();
    //X
    ctx.beginPath();
    ctx.moveTo(0,h/2);
    ctx.lineTo(w,h/2);
    ctx.moveTo(w,h/2);
    ctx.lineTo(w-10,h/2+5);
    ctx.moveTo(w,h/2);
    ctx.lineTo(w-10,h/2-5);
    //риски для делений
    //X
    ctx.moveTo(w/2+x/4,h/2+5);
    ctx.lineTo(w/2+x/4,h/2-5);
    ctx.moveTo(w/2+x/2,h/2+5);
    ctx.lineTo(w/2+x/2,h/2-5);
    ctx.moveTo(w/2-x/4,h/2+5);
    ctx.lineTo(w/2-x/4,h/2-5);
    ctx.moveTo(w/2-x/2,h/2+5);
    ctx.lineTo(w/2-x/2,h/2-5);
    //Y
    ctx.moveTo(w/2+5,h/2-y/4);
    ctx.lineTo(w/2-5,h/2-y/4);
    ctx.moveTo(w/2+5,h/2-y/2);
    ctx.lineTo(w/2-5,h/2-y/2);
    ctx.moveTo(w/2+5,h/2+y/4);
    ctx.lineTo(w/2-5,h/2+y/4);
    ctx.moveTo(w/2+5,h/2+y/2);
    ctx.lineTo(w/2-5,h/2+y/2);
    ctx.stroke();

    //Легенда
    ctx.fillStyle = '#000';
    ctx.font = '15px serif';
    ctx.fillText('x',w-10,h/2+15);
    ctx.fillText('y',w/2-15,10);

    ctx.font = '16px serif';
    ctx.fillText(rval+'/2',w/2 + x/4 - 10,h/2 - 10);
    ctx.fillText(rval,w/2 + x/2 - 15,h/2 - 10);
    ctx.fillText('-'+rval+'/2',w/2 - x/4 - 14,h/2 - 10);
    ctx.fillText('-'+rval,w/2 - x/2,h/2 - 10);
    ctx.fillText(rval+'/2',w/2+10,h/2-y/4 + 5);
    ctx.fillText(rval,w/2+10,h/2-y/2 + 15);
    ctx.fillText('-'+rval+'/2',w/2+10,h/2+y/4 + 5);
    ctx.fillText('-'+rval,w/2+10,h/2+y/2 - 5);
  }

  Logout() {
    console.log("logging out" + this.authEntry.login);
    this.hitEntryService.logout(this.authEntry);
    window.sessionStorage.removeItem("login");
    this.router.navigate(['/auth']);
  }

  drawDots(canvas: HTMLCanvasElement){
    // if(this.hitEntries != null) {
      for (let i = 1; i < this.hitEntries.length; i++) {
        this.drawDot(
          this.hitEntries[i].xvalue,
          this.hitEntries[i].yvalue,
          this.hitEntries[i].rvalue,
          this.hitEntries[i].hit,
          canvas);

      }
    // }
  }

  drawDot(x: number, y: number, r: number, isHit: boolean, canvas: HTMLCanvasElement){
    const ctx = canvas.getContext("2d");
    let w = canvas.width;
    let h = canvas.height;
    console.log(x, y, r, isHit)

    if (x<0){
      if((Math.abs(x)/r) > 1)
        x = 0;
      else
        x = 150 - Math.abs(x)/r * w/2;
    }else if(x >= 0){
      if(x/r > 1)
        x = w;
      else
        x = 150 + Math.abs(x)/r * w/2;
    }

    if (y >= 0){
      if(y/r > 1)
        y = 0;
      else
        y = 150 - y/r * h/2;
    }else if(y < 0){
      if(Math.abs(y)/r > 1)
        y = h;
      else
        y = 150 + Math.abs(y)/r * w/2;
    }

    console.log("DotPX x " + x + " y " + y);
    console.log("hit check" + !isHit)

    // @ts-ignore
    ctx.beginPath();
    // @ts-ignore
    isHit ?  ctx.fillStyle = 'green' : ctx.fillStyle = 'red';
    // @ts-ignore
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    // @ts-ignore
    ctx.stroke();
    // @ts-ignore
    ctx.fill();

    console.log("Dot set!")
  }


  clear() {
    // @ts-ignore
    this.hitEntryService.clearAll(this.authEntry).subscribe({
      next:
        () => {
          const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
          const ctx = canvas.getContext("2d");
          this.getHitEntries();
          // @ts-ignore
          this.drawPlot(ctx,canvas.width,canvas.height);
        },
      error:
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
    });

  }

  @HostListener('window:unload', ['$event'])
  unloadHandler() {
    this.Logout();
  }

  // sendFromCanvas(x:number,y:number,r:number){
  //
  // }
}
