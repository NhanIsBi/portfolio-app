import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightDirective } from '../../directives/spotlight.directive';

interface Project {
  name: string;
  period: string;
  role: string;
  tech: string;
  description: string;
  fullDescription: string;
  features: string[];
  tags: string[];
  category: 'Angular' | 'React' | 'Vanilla JS' | 'All';
  link?: string;
  repo?: string;
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
  selectedProject = signal<Project | null>(null);

  projectsList = signal<Project[]>([
    {
      name: 'E-HIRING',
      period: '07/2022 - Present',
      role: 'Frontend Developer',
      tech: 'Angular 14+, LESS, Figma',
      description: 'An enterprise-level recruitment platform designed to streamline the hiring process for employers and candidates.',
      fullDescription: 'E-Hiring is a comprehensive recruitment solution that simplifies the complex workflow of hiring. As a core Frontend Developer, I was responsible for building a scalable UI architecture and implementing complex business logic to handle thousands of candidate profiles efficiently.',
      features: [
        'Designed scalable component-based UI architecture following Angular best practices.',
        'Implemented real-time candidate tracking and status updates.',
        'Developed a custom form builder for dynamic job application requirements.',
        'Optimized application performance, reducing load times by 40%.'
      ],
      tags: ['TypeScript', 'RxJS', 'Angular Material', 'LESS'],
      category: 'Angular'
    },
    {
      name: 'BUS HẢI PHÒNG',
      period: '07/2024 - 10/2024',
      role: 'Frontend Developer',
      tech: 'Angular 15+, JSONATA, Ant Design',
      description: 'Smart city transportation app for tracking bus routes and predicting arrival times in Hai Phong city.',
      fullDescription: 'A public transportation utility application serving the citizens of Hai Phong. The app provides real-time bus tracking, route planning, and accurate arrival predictions.',
      features: [
        'Implemented interactive maps for route visualization.',
        'Utilized JSONATA for complex data transformation and filtering of route data.',
        'Integrated real-time GPS data for accurate bus tracking.',
        'Built a responsive UI optimized for mobile devices using Ant Design.'
      ],
      tags: ['Docker', 'Ant Design', 'Google Maps API', 'JSONATA'],
      category: 'Angular'
    },
    {
      name: 'ESS (Employee Self Service)',
      period: '07/2023 - 03/2024',
      role: 'Frontend Developer',
      tech: 'Angular 15+, Ant Design',
      description: 'Internal HR system for personnel management, leave requests, and performance evaluation.',
      fullDescription: 'ESS is a centralized HR platform that empowers employees to manage their personal information, request leaves, and view performance reviews, while providing managers with tools for team oversight.',
      features: [
        'Developed complex data grids and dashboards for HR analytics.',
        'Implemented role-based access control (RBAC) for data security.',
        'Created intuitive workflows for leave approval and performance reviews.',
        'Handled complex form validations and data processing.'
      ],
      tags: ['TypeScript', 'Ant Design', 'NgRx', 'Chart.js'],
      category: 'Angular'
    },
    {
      name: 'SVG-VIEWER',
      period: '04/2025 - Present',
      role: 'Frontend Developer',
      tech: 'Vanilla JS, HTML/CSS',
      description: 'High-performance viewer for interacting with large-scale 2D technical drawings (SVG).',
      fullDescription: 'A specialized tool designed for the construction and shipbuilding industry to view, zoom, pan, and annotate massive SVG technical drawings without performance lag.',
      features: [
        'Optimized rendering performance for large SVG files (100MB+).',
        'Implemented pan, zoom, and layer control functionality.',
        'Built with Vanilla JS to ensure maximum lightweight performance and compatibility.',
        'Added measurement tools for on-screen technical drawings.'
      ],
      tags: ['SVG', 'Canvas API', 'Performance Optimization'],
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

  openModal(project: Project) {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal() {
    this.selectedProject.set(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}
