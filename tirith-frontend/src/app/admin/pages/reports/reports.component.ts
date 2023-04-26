import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  reports$;

  constructor(private service: AdminService) {
    this.reports$ = service.getReports();
  }
}
