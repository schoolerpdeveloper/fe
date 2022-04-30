import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-erp-dropdown',
  templateUrl: './erp-dropdown.component.html',
  styleUrls: ['./erp-dropdown.component.scss']
})
export class ErpDropdownComponent implements OnInit {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
  @Output() closed = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
