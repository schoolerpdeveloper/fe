import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { LocalstorageService } from '@shared/services/localstorage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(private storage: LocalstorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
   
    return this.runGaurd(route?.data?.['roles']);
  }
  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return this.runGaurd(childRoute?.data?.['role']);
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return this.runGaurd();
  // }

  // private isAdmin(passedRoles: string[]) {
  //   console.log(passedRoles)
  //   let isAdmin =
  //     this.storage.get('role') === 'FULL_ADMIN' &&
  //     passedRoles.includes('FULL_ADMIN')
  //       ? true
  //       : false;
  //   if (!isAdmin) this.router.navigateByUrl('/notAccess');
  //   return isAdmin;
  // }
  // private isNaiveUser(passedRoles: string[]) {
  //   let isStudents =
  //     this.storage.get('role') === 'NAIVE_USER' &&
  //     passedRoles.includes('NAIVE_USER')
  //       ? true
  //       : false;
  //   if (!isStudents) this.router.navigateByUrl('/notAccess');
  //   return isStudents;
  // }

  private runGaurd(passedRoles: string[]) {
    let roles = this.storage.get('role');
  
    if(passedRoles.includes(roles)){

      return true;
    }
    else{
      this.router.navigateByUrl('/noAccess')
      return false;
    }
    // switch (roles) {
    //   case 'FULL_ADMIN':
    //     return this.isAdmin(passedRoles);
    //   case 'NAIVE_USER':
    //     return this.isNaiveUser(passedRoles);
    //   default:
    //     return this.router.navigateByUrl('/notAccess');
    // }
  }
}
