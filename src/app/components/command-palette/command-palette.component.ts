import { Component, HostListener, Signal, signal, computed, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Command {
  id: string;
  title: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss'
})
export class CommandPaletteComponent {
  isOpen = signal(false);
  searchQuery = signal('');
  selectedIndex = signal(0);
  @ViewChild('searchInput') searchInput!: ElementRef;

  commands: Command[] = [
    { 
      id: 'home', 
      title: 'Go to Home', 
      icon: '🏠', 
      action: () => this.scrollTo('hero') 
    },
    { 
      id: 'projects', 
      title: 'View Projects', 
      icon: '🚀', 
      action: () => this.scrollTo('projects'),
      shortcut: 'P'
    },
    { 
      id: 'skills', 
      title: 'Check Skills', 
      icon: '⚡', 
      action: () => this.scrollTo('skills'),
      shortcut: 'S'
    },
    { 
      id: 'experience', 
      title: 'See Experience', 
      icon: '💼', 
      action: () => this.scrollTo('experience') 
    },
    { 
      id: 'contact', 
      title: 'Contact Me', 
      icon: '✉️', 
      action: () => this.scrollTo('contact') 
    },
    { 
      id: 'cv', 
      title: 'Download CV', 
      icon: '📄', 
      action: () => window.open('Le_Tran_Thai_Nhan_CV.pdf', '_blank') 
    },
    {
      id: 'github',
      title: 'Visit GitHub (Coming Soon)',
      icon: '🐙',
      action: () => alert('GitHub link to be added!')
    }
  ];

  filteredCommands = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.commands.filter(cmd => 
      cmd.title.toLowerCase().includes(query)
    );
  });

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Toggle Palette with Ctrl+K or Cmd+K
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.isOpen.update(v => !v);
      if (this.isOpen()) {
        setTimeout(() => this.searchInput.nativeElement.focus(), 100);
        this.searchQuery.set('');
        this.selectedIndex.set(0);
      }
    }

    // Close with Escape
    if (event.key === 'Escape' && this.isOpen()) {
      this.isOpen.set(false);
    }

    if (!this.isOpen()) return;

    // Navigation
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.update(i => Math.min(i + 1, this.filteredCommands().length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.update(i => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.executeCommand(this.filteredCommands()[this.selectedIndex()]);
    }
  }

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.selectedIndex.set(0);
  }

  executeCommand(command: Command) {
    if (command) {
      command.action();
      this.isOpen.set(false);
    }
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}