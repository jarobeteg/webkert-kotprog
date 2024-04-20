import { AfterViewInit, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit{

  @Input() currentPage: string = '';
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  constructor(){

  }

  ngOnInit(): void {
      
  }

  ngAfterViewInit(): void {
      
  }

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }
}
