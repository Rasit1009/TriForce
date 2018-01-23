import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AuthService } from '../../../auth/auth.service';
import { AgeService, Age } from '../ChartService/AgeService';
import { Observable, BehaviorSubject } from 'rxjs';



@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  age: Age = new Age(null,null,null,null,null);
   
  isPersonSource = new BehaviorSubject<Age>(null);
  _currentSellerList: Observable<Age> = this.isPersonSource.asObservable().first();
 
  

  constructor(private theme: NbThemeService, public auth: AuthService, public ageService: AgeService ) {
    
    
    this.ageService.getAge(this.auth.id).subscribe(res => { 
      this.age = res;
      this.setAge(this.age);
      console.log(this.age.age2);
      console.log(this.age);
    });


  }

  setAge(age : Age){
    this.isPersonSource.next(age);
  }
  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;
      
      this.isPersonSource.subscribe(()=>{ 
        console.log(this.age);
        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['0 - 18', '18 - 25', '26 - 35', '36 - 50', '50 +'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Alter',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
               
                { value: this.age.age1, name: '0 - 18' },
                { value: this.age.age2, name: '18 - 25' },
                { value: this.age.age3, name: '26 - 35' },
                { value: this.age.age4, name: '36 - 50' },
                { value: this.age.age5, name: '50 +' },
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };

      })


    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
