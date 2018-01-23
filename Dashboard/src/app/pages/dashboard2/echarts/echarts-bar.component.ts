import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DayService, Day } from '../ChartService/DayService';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  day: Day = new Day(null,null,null,null,null, null);
  
 isPersonSource = new BehaviorSubject<Day>(null);
 _currentSellerList: Observable<Day> = this.isPersonSource.asObservable().first();
  constructor(private theme: NbThemeService, public auth: AuthService, public dayService: DayService) {
    this.dayService.getDay(this.auth.id).subscribe(res => { 
      this.day= res;
      this.setDay(this.day);
      
      console.log(this.day);
      console.log(this.day.tuesday);
    });
    
  }
  setDay(day : Day){
    this.isPersonSource.next(day);
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

this.isPersonSource.subscribe(()=>{
      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Euro: ',
            type: 'bar',
            barWidth: '60%',
            data: [this.day.monday, this.day.tuesday, this.day.wednesday, this.day.thursday, this.day.friday, this.day.saturday],
          },
        ],
      };
    });
  })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
