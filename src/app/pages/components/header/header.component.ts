import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostListener('scroll')
  scrollStrategy($event:any){
    if(this.toggleDropDownSheet) this.toggleDropDownSheet = false;
  }

  @Input() profilePhotoURL: string =
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
  @Input() greetText: string = 'Welcome';
  @Output() menuButtonAction = new EventEmitter();
  @Input() profileDetails = {
    name: 'Srini',
    id: 20212021,
  };
  test() {}
  _headerToogleButton: boolean = false;

  toggleDropDownSheet: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  profile() {
    console.log(`clicked profile`);
  }
  logout() {
    console.log(`clicked logout`);
  }

  toggleEvent() {
    this._headerToogleButton = !this._headerToogleButton;
    this.menuButtonAction.emit(this._headerToogleButton);
  }

  toggleDropDown() {
    this.toggleDropDownSheet = !this.toggleDropDownSheet;
  }
}
