import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css'],
})
export class SectionCardComponent {
  @Input() section: string = '';
  @Input() backgroundImageUrl: string = '';
}
