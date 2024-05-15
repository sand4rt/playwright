import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button',
  template: `
  <button (click)="click.emit('hello')">{{title}}</button>
  `
})
export class ButtonComponent {
  @Input({required: true}) title!: string;
  @Output('submit') click = new EventEmitter();
}
