import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightDirective } from '../../directives/spotlight.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SpotlightDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
}
