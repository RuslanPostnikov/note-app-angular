import { Component, OnInit } from '@angular/core';
import {Note} from "../../shared/note.model";
import {NotesService} from "../../shared/notes.service";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
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
