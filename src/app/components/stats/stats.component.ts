import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import * as CanvasJS from '../../../assets/canvasjs.min';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  project;
  tasksDone;
  tasksAmount;
  progress;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = '';
    this.route.queryParams.pipe(
      tap(param => id = param.id),
      switchMap(() => this.projectService.getProject(id)),
      tap(data => {
        this.project = data;
        this.updateProgress();
        this.makeChart();
      })
    ).subscribe();
  }

  updateProgress() {
    this.tasksDone = this.project.tasks.filter(task => task.status === 'done').length;
    this.tasksAmount = this.project.tasks.length;
    this.progress = (this.tasksDone / this.tasksAmount * 100).toFixed(2).toString();
  }

  makeChart() {
    const chartData = [];
    this.project.tasks.forEach((item) => {
      if (item.status === 'done') {
        if (chartData.find(data => data.name === item.person.name)) {
          const index = chartData.findIndex(data => data.name === item.person.name);
          chartData[index] = {
            y: chartData[index].y + 1,
            name: item.person.name
          };
        } else {
          chartData.push({
            y: 1,
            name: item.person.name
          });
        }
      }
    });
    const chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Tasks'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: {y} task has done(#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: chartData
      }]
    });
    chart.render();
  }
}
