import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@core/services/storage/storage.service';
import { RouterEnum } from 'src/app/enums/router.enum';

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
  '';
    // 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
  @Input() greetText: string = 'Welcome';
  @Output() menuButtonAction = new EventEmitter();
  @Input() profileDetails:{username?:string,id?:number};
  test() {}
  _headerToogleButton: boolean = false;

  toggleDropDownSheet: boolean = false;

  constructor(private storage:StorageService,private router:Router) {
    this.profileDetails = this.storage.get('session');
  }

  ngOnInit(): void {
  }

  profile() {
    console.log(`clicked profile`);
  }
  logout() {
    this.storage.removeAll();
    console.log('logout')
    this.router.navigate([RouterEnum.AUTH])
  }

  toggleEvent() {
    this._headerToogleButton = !this._headerToogleButton;
    this.menuButtonAction.emit(this._headerToogleButton);
  }

  toggleDropDown() {
    this.toggleDropDownSheet = !this.toggleDropDownSheet;
  }
}
