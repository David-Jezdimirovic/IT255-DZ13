import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'; 
import {Router} from '@angular/router';


@Component({
  selector: 'app-allroomtypes',
  templateUrl: './allroomtypes.component.html',
  styleUrls: ['./allroomtypes.component.css']
})
export class AllroomtypesComponent implements OnInit {

 
  private room_types : any[]; 
 // private router: Router;
  constructor(private _http: Http, private _router: Router) {
  }
  ngOnInit() {
    this._getRoomTypes();
  }

  private _getRoomTypes() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost:8080/IT255-DZ13/getroomtypes.php', {headers: headers}).subscribe((data): any => {
          this.room_types = JSON.parse(data['_body']).room_types;
        },
        err => {
          this._router.navigateByUrl('');
        }
      );
  }

  public removeRoomType(event: Event, item: Number) { 
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
     this._http.get('http://localhost:8080/IT255-DZ13/deleteroomtype.php?id='+item, {headers:headers})  .subscribe( data => {
        event.srcElement.parentElement.parentElement.remove();
        //data => this.postResponse = data;
      }); 
    }




}
