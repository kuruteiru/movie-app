import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class Tab1Page {
  searchQuery: string = "";
  imageBaseUrl: string = "https://image.tmdb.org/t/p/w500";
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  search() {
    if (this.searchQuery.length > 2) {
      this.movieService.search(this.searchQuery).subscribe((result) => {
        this.movies = result.results;
      });
    }
  }

  addToFavorites(movie: Movie) {
    this.movieService.addToFavorites(movie);
    console.log("movie (", movie, ") added to favorites");
  }
}
