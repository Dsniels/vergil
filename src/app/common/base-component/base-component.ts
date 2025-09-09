import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-base-component',
  imports: [],
  templateUrl: './base-component.html',
  styleUrl: './base-component.css'
})
export class BaseComponent implements OnDestroy {
  protected Subs: Subscription[]
  private destroy!: Subject<void>
  destroy$: Observable<void>

  constructor() {
    this.Subs = [];
    this.destroy = new Subject<void>();
    this.destroy$ = this.destroy.asObservable()
  }


  ngOnDestroy(): void {
    this.destroy.next()
    this.Subs.forEach(x => x.unsubscribe())
  }

}
