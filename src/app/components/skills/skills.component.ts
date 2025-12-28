import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightDirective } from '../../directives/spotlight.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SpotlightDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  languages = ['TypeScript', 'JavaScript', 'Java', 'HTML', 'CSS', 'LESS', 'SVG File', 'JSONATA'];
  frameworks = ['Angular 17+', 'ReactJS', 'NgRx', 'RxJS'];
  tools = ['Docker', 'Git', 'MongoDB', 'Microsoft SQL', 'VS Code', 'Eclipse', 'Visual Studio 2019'];
}