
declare let lodash;
let _ = lodash;

import {Projects} from '../../collections/projects';

import {Component, View} from 'angular2/core';

@Component({

  selector: 'statistics',

})

@View({

  templateUrl: '/client/view/statistics.html',

})

export class Statistics {

  cells: Array<Array<Object>>;
  projects: Mongo.Cursor<Object>;

  constructor() {
    Tracker.autorun(() => {
      this.calculateCells();
    });
  }

  calculateCells() {
    let out = [];

    let projects = Projects.find().fetch();

    let header = [],
        headerFinished = false
        ;

    projects.forEach((project) => {
      let line = [],
          weekHours = _.slice(project.getHoursClusteredByWeek().reverse(), 0, 6).reverse(),
          total = 0
          ;

      line.push(project.name());

      while (line.length <= 6 - weekHours.length) {
        line.push(false);
      }

      _.forEach(weekHours, function(item) {
        if (!headerFinished) {
          header.push(item.week);
        }
        line.push(item);
        total += item.hours;
      });

      headerFinished = true;

      line.push(total);
      out.push(line);
    })

    let footer = out.length ? Array(out[0].length).fill(0) : [];
    footer[0] = 'Total';

    for (let row = 0; row < out.length; row++) {
      let project = out[row];
      for (let col = 1; col < project.length; col++) {
        footer[col] += _.isNumber(project[col]) ? project[col] : !project[col] ? 0 : project[col].hours;
      }
    }
    out.push(footer);

    while (header.length < 6) {
      header.unshift(false);
    }

    header.unshift('Projects');
    header.push('Total');
    out.unshift(header);

    this.cells = out;
  }

  header() {
    return _.slice(this.cells, 0, 1);
  }

  footer() {
    return _.slice(this.cells, this.cells.length - 1);
  }

  body() {
    return _.slice(this.cells, 1, this.cells.length - 1);
  }

  iterate(n) {
    return _.slice(Array(n).fill().map((x, i) => i), 1);
  }

  isString(value) {
    return _.isString(value);
  }

  hasHours(value) {
    return _.isNumber(value) && value;
  }

}