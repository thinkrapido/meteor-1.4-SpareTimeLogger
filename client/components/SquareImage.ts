
import {Component, View, ElementRef, Inject, AfterViewInit, ViewChild} from 'angular2/core';

declare var $: any;

@Component({
  selector: 'square-image',
  inputs: ['src'],
})

@View({
  template: `
    <div #square
      class="square"
      [style.backgroundImage]="url"
      [style.height.px]="height"
      (window:resize)="onResize($event)"
    ></div>
  `,
  styles: [`
      .square {
      background-position: center center;
      background-size: cover;
      height: 300px;
    }
  `],
})

export class SquareImage implements AfterViewInit {
  private src: string;
  private url: string;
  private width: number;
  private height: number;
  @ViewChild('square') el: ElementRef;

  ngAfterViewInit() {
    setTimeout(_ => this.url = `url('${this.src}')`);
    this.setHeight();
  }

  onResize(e) {
    this.setHeight();
  }

  setHeight() {
    let $el = $(this.el.nativeElement);
    $el.height($el.width());
  }
}
