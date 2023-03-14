import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HitEntry} from "./HitEntry";
import {HitEntryService} from "./HitEntry.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
       this.router.navigate(['/auth']);
    }
// export class AppComponent implements OnInit{
  title: string ='WebLab4Front';
//   public hitEnries: HitEntry[] = [];

//
//
// constructor(private hitEntryService: HitEntryService) {}
//   @ViewChild('canvas',{static:true}) myCanvas!:ElementRef;
//
//
//   public getHitEntries(): void{
//     this.hitEntryService.getHitEntry().subscribe({
//       next:
//       (response: HitEntry[]) => {
//         this.hitEnries = response;
//       },
//       error:
//       (error: HttpErrorResponse) => {
//         console.log(error.message)
//       }
//     });
//   }
//
//   ngOnInit(){
//   this.getHitEntries();
//   const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
//   const ctx = canvas.getContext("2d");
//   if(ctx){
//     this.drawPlot(ctx,canvas.width,canvas.height);
//   }
//     canvas.addEventListener("click",function (evt) {
//       let elemLeft = canvas.offsetLeft + canvas.clientLeft,
//         elemTop = canvas.offsetTop + canvas.clientTop;
//       console.log("x: " + (evt.x-elemLeft)  + " y: " + (evt.y - elemTop));
//       let doc = document.getElementById("x");
//     });
//   }
//
//   onSubmit(f: NgForm) :void{
//     console.log(f.value)
//     console.log(f.controls['X'].value)
//     console.log("u pressed me baka!")
//   }
//
//   public drawPlot(ctx : CanvasRenderingContext2D,w: number,h: number) :void{
//
//     let x = w;
//     let y = h;
//     let rval = "R";
//     ctx.fillStyle = '#0080FF';
//     ctx.clearRect(0, 0, w, h);
//
//     // //1 сектор
//     ctx.beginPath();
//     ctx.moveTo(w/2,h/2);
//     ctx.lineTo(w/2,h/2+y/4);
//     ctx.lineTo(0,h/2);
//     ctx.lineTo(w/2,h/2);
//     ctx.lineTo(w/2+x/4,h/2);
//     ctx.fill();
//
//     // //3 сектор
//     ctx.moveTo(w/2,h/2);
//     ctx.arc(w/2,h/2,x/4,0,Math.PI/2);
//     ctx.fill();
//
//     // //4 сектор
//     ctx.beginPath();
//     ctx.fillRect(0,h/4,x/2,y/4);
//     ctx.fill();
//
//     //Направляющие оси
//     //Y
//     ctx.beginPath();
//     ctx.moveTo(w/2,h);
//     ctx.lineTo(w/2,0);
//     ctx.moveTo(w/2,0);
//     ctx.lineTo(w/2-5,10);
//     ctx.moveTo(w/2,0);
//     ctx.lineTo(w/2+5,10);
//     ctx.stroke();
//     //X
//     ctx.beginPath();
//     ctx.moveTo(0,h/2);
//     ctx.lineTo(w,h/2);
//     ctx.moveTo(w,h/2);
//     ctx.lineTo(w-10,h/2+5);
//     ctx.moveTo(w,h/2);
//     ctx.lineTo(w-10,h/2-5);
//     //риски для делений
//     //X
//     ctx.moveTo(w/2+x/4,h/2+5);
//     ctx.lineTo(w/2+x/4,h/2-5);
//     ctx.moveTo(w/2+x/2,h/2+5);
//     ctx.lineTo(w/2+x/2,h/2-5);
//     ctx.moveTo(w/2-x/4,h/2+5);
//     ctx.lineTo(w/2-x/4,h/2-5);
//     ctx.moveTo(w/2-x/2,h/2+5);
//     ctx.lineTo(w/2-x/2,h/2-5);
//     //Y
//     ctx.moveTo(w/2+5,h/2-y/4);
//     ctx.lineTo(w/2-5,h/2-y/4);
//     ctx.moveTo(w/2+5,h/2-y/2);
//     ctx.lineTo(w/2-5,h/2-y/2);
//     ctx.moveTo(w/2+5,h/2+y/4);
//     ctx.lineTo(w/2-5,h/2+y/4);
//     ctx.moveTo(w/2+5,h/2+y/2);
//     ctx.lineTo(w/2-5,h/2+y/2);
//     ctx.stroke();
//
//     //Легенда
//     ctx.fillStyle = '#000';
//     ctx.font = '15px serif';
//     ctx.fillText('x',w-10,h/2+15);
//     ctx.fillText('y',w/2-15,10);
//
//     ctx.font = '16px serif';
//     ctx.fillText(rval+'/2',w/2 + x/4 - 10,h/2 - 10);
//     ctx.fillText(rval,w/2 + x/2 - 15,h/2 - 10);
//     ctx.fillText('-'+rval+'/2',w/2 - x/4 - 14,h/2 - 10);
//     ctx.fillText('-'+rval,w/2 - x/2,h/2 - 10);
//     ctx.fillText(rval+'/2',w/2+10,h/2-y/4 + 5);
//     ctx.fillText(rval,w/2+10,h/2-y/2 + 15);
//     ctx.fillText('-'+rval+'/2',w/2+10,h/2+y/4 + 5);
//     ctx.fillText('-'+rval,w/2+10,h/2+y/2 - 5);
//   }

}
