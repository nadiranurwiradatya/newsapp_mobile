import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackgroundMode } from '@ionic-native/background-mode/ngx'; // Import BackgroundMode

@Injectable({
  providedIn: 'root',
})
export class NewsArticlesService {
  constructor(private httpClient: HttpClient) {
    // Enable background mode when the service is initialized
    console.log('Background mode enabled');
  }

  // Fetch top headlines from API
  getTopHeadLines(): Observable<any> {
    return this.httpClient.get(
      `${environment.url_base}top-headlines?country=us&apiKey=${environment.api_key}`
    );
  }

  // Fetch articles by category
  getArticleByCategory(category: string): Observable<any> {
    return this.httpClient.get(
      `${environment.url_base}top-headlines?category=${category}&apiKey=${environment.api_key}`
    );
  }

  // Search news articles based on a query
  searchNews(query: string): Observable<any> {
    return this.httpClient.get(
      `${environment.url_base}everything?q=${query}&apiKey=${environment.api_key}`
    );
  }

  /**
   * Get the latest news with optional filters.
   * @param filters Object containing optional parameters for filtering results.
   *   - from: (string) ISO date (e.g., '2024-12-01')
   *   - category: (string) Category of news
   *   - query: (string) Search query
   */
  getLatestNews(filters?: {
    from?: string;
    category?: string;
    query?: string;
  }): Observable<any> {
    let params = new HttpParams()
      .set('apiKey', environment.api_key)
      .set('sortBy', 'publishedAt'); // Sort by publish date (latest first)

    // Apply filters if provided
    if (filters?.from) {
      params = params.set('from', filters.from);
    }
    if (filters?.category) {
      params = params.set('category', filters.category);
    }
    if (filters?.query) {
      params = params.set('q', filters.query);
    }

    return this.httpClient.get(`${environment.url_base}everything`, { params });
  }
  async logout() {
    // Proses log out, seperti menghapus token atau data sesi
    localStorage.removeItem('user_token'); // Menghapus token dari localStorage sebagai contoh
    return Promise.resolve(); // Mengembalikan promise sebagai tanda berhasil
  }
}
