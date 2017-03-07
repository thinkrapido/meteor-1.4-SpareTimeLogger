
declare let _;
declare let Graviton;

export let HourModel = Graviton.Model.extend({
}, {
  hours: function(hours: number) {
    if (_.isUndefined(hours)) {
      return this.get('hours') || 0;
    }
    else {
      this.set('hours', hours);
      this.date(new Date());
    }
  },
  date: function(date: Date) {
    if (_.isUndefined(date)) {
      return this.get('date') || 0;
    }
    else {
      this.set('date', date);
    }
  },
  addHours: function(hours: number) {
    this.hours(this.hours() + hours);
  },
});

export let Hours = Graviton.define('hours', {
  modelCls: HourModel,
})

