import { Injectable, OnDestroy } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AutoUnsubscribe extends Observable<void> implements OnDestroy {
    private readonly destroySubject$ = new ReplaySubject<void>(1)
    constructor() {
        // emit destroy event to all subscribers when destroy subject emits
        super((subscriber) => this.destroySubject$.subscribe(subscriber))
    }
    ngOnDestroy(): void {
        // emit destroy event when component that injects
        // `Destroy` provider is destroyed
        this.destroySubject$.next()
        this.destroySubject$.complete()
    }
}
