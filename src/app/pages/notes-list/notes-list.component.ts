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

  filteredNotes: Note[] = new Array<Note>();

  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
  //  We want to retrieve all notes from note Service
    this.notes = this.noteService.getAll();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number) {
    this.noteService.delete(id);
  }

  filter(query: string) {
      query = query.toLowerCase().trim();

      let allResults = new Array<Note>();
      //  split up the search query into individual words
      let terms: string[] = query.split(' ') // split on spaces
      //   remove duplicate search terms
      terms = this.removeDuplicates(terms);
      //  compile all relevant results into allResults array
      terms.forEach(term => {
        let results: Array<Note> = this.relevantNotes(term);
        //  append results to the AllResults array
        allResults = [...allResults, ...results];
      });

      //  allResults will include duplicate notes
      //  because a particular note can be result of many search terms
      //  but we don't want to show the same note multiple times on the UI
      //  so we first must remove duplicates
      let uniqueResults = this.removeDuplicates(allResults);

      this.filteredNotes = uniqueResults;
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults = new Set<any>();
  //  loop trough the input array and add the items to the set
    arr.forEach(e => uniqueResults.add(e));
    return  Array.from(uniqueResults)
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if(note.title && note.title.toLowerCase().includes(query)) return true;
      if(note.body && note.body.toLowerCase().includes(query)) return true;
      return false;
    });

    return relevantNotes;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

}
