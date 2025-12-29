import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Mesh;
  private particlesMesh!: THREE.Points;
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initThree();
      this.animate();
      window.addEventListener('resize', this.onWindowResize);
      window.addEventListener('mousemove', this.onMouseMove);
    }
  }

  onMouseMove = (event: MouseEvent) => {
    this.mouseX = (event.clientX - window.innerWidth / 2) / 100;
    this.mouseY = (event.clientY - window.innerHeight / 2) / 100;
  }

  initThree() {
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Main 3D Shape
    const geometry = new THREE.DodecahedronGeometry(2.8, 0);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00E676, 
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    // Inner Glow
    const innerGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00E676,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.mesh.add(innerMesh);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x00E676,
      transparent: true,
      opacity: 0.4
    });
    this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particlesMesh);
  }

  animate() {
    if (!this.renderer || !this.scene || !this.camera) return;

    this.animationId = requestAnimationFrame(() => this.animate());

    this.targetX = this.mouseX * 0.5;
    this.targetY = this.mouseY * 0.5;

    if (this.mesh) {
      this.mesh.rotation.y += 0.003;
      this.mesh.rotation.x += (this.targetY - this.mesh.rotation.x) * 0.05;
      this.mesh.rotation.y += (this.targetX - this.mesh.rotation.y) * 0.05;
    }

    if (this.particlesMesh) {
      this.particlesMesh.rotation.y += 0.001;
      this.particlesMesh.position.x = -this.targetX * 0.2;
      this.particlesMesh.position.y = this.targetY * 0.2;
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize = () => {
    if (!this.rendererContainer || !this.camera || !this.renderer) return;
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onWindowResize);
      window.removeEventListener('mousemove', this.onMouseMove);
      
      cancelAnimationFrame(this.animationId);
      
      // Dispose of resources
      if (this.scene) {
        this.scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(m => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }

      if (this.renderer) {
        this.renderer.dispose();
        if (this.renderer.domElement && this.renderer.domElement.parentNode) {
           this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
      }
    }
  }
}
