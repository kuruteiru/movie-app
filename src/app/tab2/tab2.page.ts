import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../services/movie.service';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class Tab2Page {
  favoriteMovies: Movie[] = [];
  imageBaseUrl: string = "https://image.tmdb.org/t/p/w500";

  constructor(private movieService: MovieService) {
    addIcons({ heart });
  }

  // runs every time tab2 is opened
  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.favoriteMovies = await this.movieService.getFavorites();
  }

  async removeFavorite(movie: Movie) {
    await this.movieService.removeFromFavorites(movie);
    await this.loadFavorites();
  }
}
