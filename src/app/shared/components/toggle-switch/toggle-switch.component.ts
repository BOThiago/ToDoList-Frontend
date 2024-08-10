import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
})
export class ToggleSwitchComponent {
  @Input() inputId!: string;
  @Input() title!: string;
  @Input() isChecked: boolean = false;
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSwitch() {
    this.isChecked = !this.isChecked;
    this.onChange.emit(this.isChecked);
  }
}
