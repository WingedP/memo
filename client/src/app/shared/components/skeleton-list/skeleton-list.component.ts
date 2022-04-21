import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  templateUrl: './skeleton-list.component.html',
  styleUrls: ['./skeleton-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonListComponent implements OnInit {
  @Input() gridMode: any;

  constructor() {
    // empty
  }

  ngOnInit() { }

}
