import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, AfterViewInit  {

  @Input() title!: string;
  @Input() body!: string;
  @Input() link!: string;

  @Output('delete') deleteEvent = new EventEmitter<void>();

  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;
  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    //  work out if there is a text overflow and if not, then hide truncator

    let style = window.getComputedStyle(this.bodyText.nativeElement);

    let viewAbleHeight = parseInt(style.getPropertyValue('height'), 10)

    if(this.bodyText.nativeElement.scrollHeight > viewAbleHeight) {
      //  if there is no text overflow, show fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      // else (there is a text overflow), hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick() {
      this.deleteEvent.emit();
  }

}
