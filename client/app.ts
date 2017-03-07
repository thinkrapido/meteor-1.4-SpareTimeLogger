
import {Component, View} from 'angular2/core';

import {bootstrap} from 'angular2-meteor-auto-bootstrap/bootstrap';

import {SquareImage} from './components/SquareImage';
import {Statistics} from './components/Statistics';

import {Projects} from '../collections/projects';

@Component({
  selector: 'app',
})
@View({
  templateUrl: 'client/app.html',
  directives: [SquareImage, Statistics],
})
class SpareLogger {

  projects: Mongo.Cursor<Object>;

  constructor() {
    this.projects = Projects.find();
  }

  addProject(name) {
    let project = Projects.build();
    project.name(name);
    project.save();
  }

}

bootstrap(SpareLogger);
