import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Movie } from '../models/movie.model';
// import { AppState } from './../app.state';
import * as MovieActions from '../actions/movie.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  invalidYear: boolean = false;
  invalidRuntime: boolean = false;
  dup: boolean = false;
  movies: Observable<Movie[]>;
  updateIndex: number = -1;
  currentMovie: Movie = {
    "Id": null,
    "Title": "",
    "Year": null,
    "Runtime": null,
    "Genre": "",
    "Director": ""

  };


  constructor(
    private store: Store<any>,
    private modalService: NgbModal
  ) {
    this.movies = store.select('movie');

  }

  toAdd(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.addMovie();
    }, (reason) => {
      this.currentMovie = {
        "Id": null,
        "Title": "",
        "Year": null,
        "Runtime": null,
        "Genre": "",
        "Director": ""

      };
      this.dup = false;
      this.updateIndex = -1;
    });
  }

  toUpdate(content: any, index: number, movie: Movie) {
    this.updateIndex = index;
    this.currentMovie = JSON.parse(JSON.stringify(movie));// assignment by value
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.updateMovie();
    }, (reason) => {
      this.currentMovie = {
        "Id": null,
        "Title": "",
        "Year": null,
        "Runtime": null,
        "Genre": "",
        "Director": ""

      };
      this.dup = false;
      this.updateIndex = -1;

    });
  }

  toDelete(content: any, index: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.store.dispatch(new MovieActions.RemoveMovie(index));
    }, (reason) => { });

  }


  addMovie() {
    this.store.dispatch(new MovieActions.AddMovie(this.currentMovie));
    this.reset();
  }

  updateMovie() {
    this.store.dispatch(new MovieActions.UpdateMovie({ movie: this.currentMovie, index: this.updateIndex }));
    this.reset();
  }


  reset() {
    this.currentMovie = {
      "Id": null,
      "Title": "",
      "Year": null,
      "Runtime": null,
      "Genre": "",
      "Director": ""

    };
    this.dup = false;
    this.updateIndex = -1;
  }

  checkDup(term: string) {
    // "../node_modules/jquery/dist/jquery.min.js"
    this.dup = false;
    let self = this;
    let count = 0;
    $(".title").each(function () {
      if (term.trim() === $(this).html().trim() && $(this).attr("id") !== self.updateIndex.toString()) {
        count++;
      }
      if (count >= 1) {
        self.dup = true;
      }
    })
  }

  checkYear(term: number) {
    this.invalidYear=false;
    if(term>2019 || term<1900)
    this.invalidYear=true;

  }

  checkRuntime(term: number){
    this.invalidRuntime=false;
    if(term>999 || term<1)
    this.invalidRuntime=true;
  }

  ngOnInit() {
  }


}
