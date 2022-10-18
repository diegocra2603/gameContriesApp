import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contries: {[key:string]:string} = {};

  constructor(private _homeService:HomeService){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this._homeService.getPaisesPorContinente('americas').subscribe( (contries) => {
      this.contries = contries;
    });
  }

}
