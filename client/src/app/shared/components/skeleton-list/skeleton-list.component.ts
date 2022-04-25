import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  templateUrl: './skeleton-list.component.html',
  styleUrls: ['./skeleton-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonListComponent {
  @Input() gridMode: boolean;

  constructor() {
    // empty
  }

}
