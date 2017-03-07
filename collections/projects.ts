
declare let _;
declare let Graviton;
declare let moment;

import {Hours} from './hours';

export let ProjectModel = Graviton.Model.extend({

  hasMany: {
    hours: {
      klass: 'hours',
      foreignKey: 'hourId',
    },
  },

}, {

  name: function(name: string) {
    if (_.isUndefined(name)) {
      return this.get('name') || '';
    }
    else {
      this.set('name', name);
    }
  },

  pic: function(pic: string) {
    if (_.isUndefined(pic)) {
      return this.get('pic') || '/project-dummy.png';
    }
    else {
      this.set('pic', pic);
    }
  },

  totalHours: function() {
    let hours = this.hours.find(),
        sum = 0
        ;
    hours.forEach((hour) => {
      sum += hour.hours();
    });

    return sum;
  },

  getHoursClusteredByWeek: function() {
    let out = {},
        hours = this.hours.find().fetch()
        ;

    hours.forEach((hour) => {
      let m = moment(hour.get('date')),
          key = `${m.year()}#${m.isoWeek()}`
          ;

      out[key] = out[key] || 0;

      out[key] += hour.hours();
    });

    out = _.map(out, function(item, key) {
      return { week: key, hours: item };
    });

    out = _.sortBy(out, function(o) {
      return parseInt(o.week.split('#')[1], 10);
    })

    return out;
  },

  addHours: function(hours: number) {
    let hoursObj = Hours.build();
    hoursObj.addHours(hours);
    this.hours.add(hoursObj);
  },

});


export var Projects = Graviton.define('projects', {
  modelCls: ProjectModel,
});

