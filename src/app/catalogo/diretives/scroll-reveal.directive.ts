import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[scrollReveal]',
  standalone: true
})
export class ScrollRevealDirective {

  @Output() reveal = new EventEmitter<void>();

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.reveal.emit();
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.2 });

    this.observer.observe(this.el.nativeElement);
  }
}
