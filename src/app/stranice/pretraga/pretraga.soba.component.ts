import { Component, OnInit } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';


@Component({
  selector: 'pretraga-component',
  templateUrl: './pretraga.soba.component.html',
  styleUrls: ['../../../assets/scss/base.scss'],
  
})



export class PretragaSobaComponent{
  
  private sobe:Array<any> = [];
  private kvadrati = 0;
  private kreveti = 0;
  

  constructor(private _http: Http, private _router: Router) { }

 
  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost:8080/IT255-DZ13/getrooms.php', {headers: headers})
      .subscribe(data => {
          this.sobe = JSON.parse(data['_body']).rooms;
        },
        err => {
          this._router.navigate(['']);
        }
      );
  }


  public removeRoom(event: Event, item: Number) { 
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
     this._http.get('http://localhost:8080/IT255-DZ13/deleteroom.php?id='+item, {headers:headers})  .subscribe( data => {
        event.srcElement.parentElement.parentElement.remove();
        //data => this.postResponse = data;
      }); 
    }


    public viewRoom(item: Number){
       this._router.navigate(['../room', item]);
       }



}