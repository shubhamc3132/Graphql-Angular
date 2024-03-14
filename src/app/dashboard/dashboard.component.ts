import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/service/dataserives.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data :any[]=[]
constructor(private service:DataService){
    this.getData();
    debugger
}
  getData(){
    this.service.getData().subscribe((data)=>{
      debugger
      this.data = data
    })
  }

  ngOnInit() {
  }

}
