import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightDirective } from '../../directives/spotlight.directive';

interface Project {
  name: string;
  period: string;
  role: string;
  tech: string;
  description: string;
  tags: string[];
  category: 'Angular' | 'React' | 'Vanilla JS' | 'All';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SpotlightDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  filter = signal<'All' | 'Angular' | 'React' | 'Vanilla JS'>('All');

  projectsList = signal<Project[]>([
    {
      name: 'E-HIRING',
      period: '07/2022 - Present',
      role: 'Frontend',
      tech: 'Angular 14+',
      description: 'Online recruitment project helping employers shorten the recruitment process. Designed scalable component-based UI architecture following Angular best practices.',
      tags: ['TypeScript', 'LESS', 'Figma'],
      category: 'Angular'
    },
    {
      name: 'BUS HẢI PHÒNG',
      period: '07/2024 - 10/2024',
      role: 'Frontend',
      tech: 'Angular 15+',
      description: 'App for searching bus routes in Hai Phong, predicting arrival times. Utilized JSONATA and Ant Design library.',
      tags: ['Docker', 'Ant Design', 'JSONATA'],
      category: 'Angular'
    },
    {
      name: 'ESS',
      period: '07/2023 - 03/2024',
      role: 'Frontend',
      tech: 'Angular 15+',
      description: 'Personnel management and performance evaluation system. Implemented complex UI components and data handling.',
      tags: ['TypeScript', 'Ant Design'],
      category: 'Angular'
    },
    {
      name: 'SVG-VIEWER',
      period: '04/2025 - Present',
      role: 'Frontend',
      tech: 'Vanilla JS',
      description: 'Project developed to view and interact with 2D drawings (SVG) for construction and shipbuilding.',
      tags: ['HTML/CSS', 'Performance Optimization'],
      category: 'Vanilla JS'
    }
  ]);

  filteredProjects = computed(() => {
    const currentFilter = this.filter();
    if (currentFilter === 'All') {
      return this.projectsList();
    }
    return this.projectsList().filter(p => p.category === currentFilter);
  });

  setFilter(category: 'All' | 'Angular' | 'React' | 'Vanilla JS') {
    this.filter.set(category);
  }
}
