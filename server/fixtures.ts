
import {Hours} from '../collections/hours';
import {Projects} from '../collections/projects';

declare let moment: any;

export function loadFixtures() {
  if (Projects.find().count() === 0) {
    let projects = [{
      name: 'Hundekuchen',
      //pic: 'http://www.dogforum.de/userpix3/11705_img_2820_1.jpg',
    },{
      name: 'Hintertupfingen',
      //pic: 'https://3.bp.blogspot.com/-CZfxqcxa4Sk/UG8Yb7IHMLI/AAAAAAAAAok/HgTIbZZRbVU/s1600/hintertupfingen.jpg',
    },];

    let getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    for(let project of projects) {
      let p = Projects.create(project),
          maxIdxHours = getRandomInt(50, 100) + 1
          ;


      for (let i = 0; i < maxIdxHours; i++) {
        let h = Hours.create({ hours: getRandomInt(1, 4) + 1});
        h.date(moment().subtract(getRandomInt(0, 60), 'days').toDate());
        h.save();
        p.hours.add(h);
      }

    }
  }
}