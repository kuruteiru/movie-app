import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private accessToken: string = "";
  private baseUrl: string = "https://api.themoviedb.org/3";
  private storage: Storage | null = null;
  private FAVORITES_KEY = "favorites";

  constructor(private http: HttpClient, private _storage: Storage) {
    this.init();
  }

  private async init() {
    await this.getStorage();
  }

  private async getStorage(): Promise<Storage> {
    if (!this.storage) {
      this.storage = await this._storage.create();
    }
    return this.storage;
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
  }

  search(query: string, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  async addToFavorites(movie: Movie): Promise<Movie[]> {
    const storage = await this.getStorage();
    const current = await storage.get(this.FAVORITES_KEY) || [];
    current.push(movie);
    return await this.storage?.set(this.FAVORITES_KEY, current);
  }

  async getFavorites(): Promise<Movie[]> {
    const storage = await this.getStorage();
    return await storage.get(this.FAVORITES_KEY) || [];
  }

  async removeFromFavorites(movieToRemove: Movie): Promise<Movie[]> {
    let current = await this.storage?.get(this.FAVORITES_KEY) || [];
    current = current.filter((m: Movie) => m.id !== movieToRemove.id);
    return await this.storage?.set(this.FAVORITES_KEY, current);
  }
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
}
