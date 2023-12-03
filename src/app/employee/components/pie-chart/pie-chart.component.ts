import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chart, Color} from 'chart.js';
import {Employee} from "../../model/employee.model";

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements OnChanges {
  @Input() employees: Employee[] = [];
  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDataLabels: any[] = [];
  isDataLoaded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employees'] && changes['employees'].currentValue) {
      this.prepareChartData();
      this.renderChart();
    }
  }

  private prepareChartData() {
    // Clear existing data
    this.chartData = [];
    this.chartDataLabels = [];

    // Calculate work time sum
    let totalWorkTimeSum = 0;
    this.employees.forEach(employee => totalWorkTimeSum += employee.totalTimeWorked);

    // Populate chartData and chartDataLabels from employees list
    this.employees.forEach(employee => {
      const percentageValue = (employee.totalTimeWorked / totalWorkTimeSum) * 100;
      this.chartData.push(Number(percentageValue.toFixed(3)));
      this.chartDataLabels.push(percentageValue.toFixed(3) + '% ' + employee.employeeName);
    });

    // Set the flag to indicate that data is loaded
    this.isDataLoaded = true;
  }

  private renderChart() {
    if (this.isDataLoaded) {
      if (this.ctx) {
        // Check if the chart is already created before destroying it
        const existingChart = Chart.getChart(this.ctx);
        if (existingChart) {
          existingChart.destroy();
        }
      }

      this.ctx = document.getElementById('pieChart');
      this.config = {
        type: 'pie',
        options: {},
        data: {
          labels: this.chartDataLabels,
          datasets: [{
            label: 'Employee contribution',
            data: this.chartData,
            borderWidth: 1,
            borderColor: '#000',
            backgroundColor: this.generateRandomColors(this.chartData.length)
          }],
        }
      };

      // Render pie chart
      new Chart(this.ctx, this.config);
    }
  }

  private generateRandomColors(count: number): Color[] {
    const colors: Color[] = [];
    const max_6_digitHexNumber = 16777215;

    for (let i = 0; i < count; i++) {
      const randomColor = '#' + Math.floor(Math.random() * max_6_digitHexNumber).toString(16);
      colors.push(randomColor);
    }
    return colors;
  }
}
