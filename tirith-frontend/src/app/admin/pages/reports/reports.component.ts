import { Component } from '@angular/core';
import { LobbiesService } from 'src/api';

@Component({
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  reports$;

  constructor(private service: LobbiesService) {
    this.reports$ = service.getAllReports();
  }
}
