import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, filter, map, } from 'rxjs/operators';

import { RouterEnum } from 'src/app/enums/router.enum';
import { loadStudents } from '../pages_store/actions/student.actions';
import { ExampleFlatNode, TREE_DATA } from './menu';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  sideNavToggleCommander: boolean = true;
  currentSelectedNode: any = {};
  loading$: Observable<boolean> = of(false);

  constructor(private router: Router,private store:Store) {}

  ngOnInit(): void {
    this.initToDashboard();
    this.initAllStudentDetails();
    this.loading$ = this.router.events.pipe(
      delay(1000),
      filter(
        (e) =>
          e instanceof NavigationStart ||
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
      ),
      map((e) => e instanceof NavigationStart)
    );
  }

  initToDashboard() {
    this.currentSelectedNode = { ...TREE_DATA[0] };
    // this.router.navigateByUrl(
    //   `${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}`
    // );
  }

  eventForSideNavToggle(event: any) {
    this.sideNavToggleCommander = event;
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA[i].level === node.level - 1) {
        return TREE_DATA[i];
      }
    }
    return null;
  }

  logNode(node: any) {
    this.currentSelectedNode = { ...node };
    node.isExpanded = !node.isExpanded;
    if(node?.url)this.router.navigateByUrl(node?.url);
  }
  shouldRender(node: ExampleFlatNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

  initAllStudentDetails(){
    this.store.dispatch((loadStudents()))
  }
}
