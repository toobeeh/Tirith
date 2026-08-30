import { Component } from '@angular/core';
import {BehaviorSubject, combineLatestWith, debounceTime, map, switchMap} from 'rxjs';
import {AdminService, MemberDto, MembersService} from 'src/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import {ChartConfiguration, ChartData} from "chart.js";
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-drop-history',
  templateUrl: './drop-history.component.html',
  styleUrls: ['./drop-history.component.css']
})
export class DropHistoryComponent {

  public scatterChartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: true,

    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'PPpp'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },

      y: {
        title: {
          display: true,
          text: 'Catch time (ms)',
        },
        beginAtZero: true
      }
    }
  };

  public now = new Date();
  colors = [
    '#36A2EB80',
    '#FF638480',
    '#FFCE5680',
    '#4BC0C080',
    '#9966FF80',
    '#FF9F4080',
    '#C9CBCF80'
  ];

  public members$ = new BehaviorSubject<MemberDto[]>([]);
  public rangeStart$ = new BehaviorSubject<number>(0);
  public rangeEnd$ = new BehaviorSubject<number>(this.now.getTime());
  public history$ = this.members$.pipe(
    combineLatestWith(
      this.rangeStart$,
      this.rangeEnd$
    ),
    debounceTime(500),
    switchMap(([members, start, end]) => this.adminService.getDropHistory({
      logins: members.map(m => m.typoId.toString()),
      historyStart: start.toString(),
      historyEnd: end.toString()
    }).pipe(
      map(history => history.map(h => ({
        data: h,
        member: members.find(m => m.typoId === h.login)
      })))
    )),
    map(history => {
      const data: ChartData<'scatter'> = {
        datasets: []
      };

      data.datasets = history.map((memberSet, index) => ({
        label: `${memberSet.member?.userName ?? "Unknown"} (${memberSet.data.history.length})`,
        data: memberSet.data.history.map(memberDatapoint => ({
          x: Number(memberDatapoint.timestamp),
          y: memberDatapoint.catchMs
        })),
        borderColor: "#00000000",
        backgroundColor: this.colors[index % this.colors.length]
      }));

      return data;
    })
  );

  constructor(
    private memberService: MembersService,
    private toast: ToastService,
    private adminService: AdminService
  ) { }

  protected async addMemberLogin(login: number) {
    const member = await this.memberService.getMemberByLogin(login).toPromise();

    if(this.members$.value.some(member => member.typoId === login)){
      this.toast.show({message: {title: `Member ${member?.userName} is already added`}});
      return;
    }

    if (member) {
      this.members$.next([...this.members$.getValue(), member]);
    } else {
      this.toast.show({message: {title: `No member found with login: ${login}`}});
    }
  }

  protected async addMemberDiscordId(discordId: string) {
    const member = await this.memberService.getMemberByDiscordID(discordId).toPromise();

    if(this.members$.value.some(member => member.discordID === discordId)){
      this.toast.show({message: {title: `Member ${member?.userName} is already added`}});
      return;
    }

    if (member) {
      this.members$.next([...this.members$.getValue(), member]);
    } else {
      this.toast.show({message: {title: `No member found with Discord ID: ${discordId}`}});
    }
  }
}
