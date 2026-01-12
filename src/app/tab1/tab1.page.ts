import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MovieService, Movie } from '../services/movie.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class Tab1Page {
  favoriteIds: number[] = [];
  searchQuery: string = "";
  imageBaseUrl: string = "https://image.tmdb.org/t/p/w500";
  movies: Movie[] = [];
  private currentPage = 1;

  constructor(private movieService: MovieService) {
    addIcons({ heart, heartOutline });
  }

  // runs every time tab1 is opened
  async ionViewWillEnter() {
    await this.loadFavoriteIds();
  }

  async loadFavoriteIds() {
    const favs = await this.movieService.getFavorites();
    this.favoriteIds = favs.map(m => m.id);
  }

  isFavorite(movie: Movie): boolean {
    return this.favoriteIds.includes(movie.id);
  }

  async toggleFavorite(movie: Movie) {
    if (this.isFavorite(movie)) {
      await this.movieService.removeFromFavorites(movie);
    } else {
      await this.movieService.addToFavorites(movie);
    }
    await this.loadFavoriteIds();
  }

  search() {
    this.currentPage = 1;
    this.movieService.search(this.searchQuery, this.currentPage).subscribe((result) => {
      this.movies = result.results;
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.movieService.search(this.searchQuery, this.currentPage).subscribe((result) => {
      this.movies = [...this.movies, ...result.results];
      event.target.complete();
      if (this.currentPage >= result.total_pages) {
        event.target.disabled = true;
      }
    });
  }
}
