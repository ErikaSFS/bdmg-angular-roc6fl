import { Component, OnInit, VERSION } from '@angular/core';
import { End } from './model/end.model';
import { AppService } from './services/app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  end: End;

  constructor(public service: AppService) {}

  ngOnInit(): void {
    this.getEnd();
  }

  getEnd(): void {
    this.service.getEnd().subscribe((res: End) => {
      this.end = res;
      console.log(res);
    });
  }
}
