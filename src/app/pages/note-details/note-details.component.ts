 import { Component, OnInit } from '@angular/core';
 import {NgForm} from "@angular/forms";
 import {Note} from "../../shared/note.model";
 import {NotesService} from "../../shared/notes.service";
 import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note!: Note;
  noteId!: number;
  new!: boolean;

  constructor(
    private noteService: NotesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // find out new note or existing

    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      if(params['id']) {
        console.log(typeof params['id'], params['id'])
        this.note = this.noteService.get(+params['id']);
        console.log(this.note);
        this.noteId = +params['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    });



  }

  onSubmit(form: NgForm) {
    if(this.new) {
      // Save the note
      this.noteService.add(form.value);
    } else {
      this.noteService.update(this.noteId, form.value.title, form.value.body)
    }
    this.router.navigateByUrl('/')
  }

  cancel() {
    this.router.navigateByUrl('/')
  }

}
