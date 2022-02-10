import { Component, OnInit } from '@angular/core';
import {Note} from "../../shared/note.model";
import {NotesService} from "../../shared/notes.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
    //  Entry animation
      transition('void => *', [
      //  Initial states
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          marginBottom: 0,

        //  expand out padding properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
      //  we first want to animate the spacing (which includes height and margin)
        animate('50ms', style({
          height: '*',
          marginBottom: '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(68)
      ]),

      transition('* => void', [
      //  scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
      //  then scale down back to norm size
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
      //  scale down and fade out
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
      //  then animate spacing
        animate('15ms ease-out', style({
          height: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }))
      ])
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0,
          }),
          stagger(100, [
            animate('0.2s ease')
          ]),
        ], { optional: true })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();

  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
  //  We want to retrieve all notes from note Service
    this.notes = this.noteService.getAll();
  }

  deleteNote(id: number) {
    this.noteService.delete(id);
  }

}
