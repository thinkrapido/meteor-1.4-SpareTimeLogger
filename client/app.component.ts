
import {Component} from '@angular/core';

import {Projects} from '../collections/projects';

@Component({
  selector: 'app',
  templateUrl: './app.html',
})
export class AppComponent {

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
