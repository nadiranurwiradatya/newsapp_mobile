import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsArticlesService } from '../api/news-articles.service';
import { AuthService } from '../services/auth.service'; // Pastikan AuthService diimport

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = '';
  articles: any[] = [];
  categories: string[] = [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  constructor(
    private newsService: NewsArticlesService,
    private router: Router,
    private authService: AuthService // Injeksi AuthService
  ) {}

  ngOnInit() {
    this.fetchNews();
  }

  // Fungsi untuk mengambil berita
  fetchNews() {
    this.newsService.getTopHeadLines().subscribe((data) => {
      this.articles = data.articles;
    });
  }

  // Fungsi untuk mencari berita berdasarkan query
  searchNews() {
    if (this.searchQuery.trim()) {
      this.newsService.searchNews(this.searchQuery).subscribe((data) => {
        this.articles = data.articles;
      });
    } else {
      this.fetchNews();
    }
  }

  // Fungsi untuk filter berita berdasarkan kategori
  filterByCategory() {
    if (this.selectedCategory) {
      this.newsService
        .getArticleByCategory(this.selectedCategory)
        .subscribe((data) => {
          this.articles = data.articles;
        });
    } else {
      this.fetchNews();
    }
  }

  // Fungsi untuk membuka detail artikel
  openDetail(article: any) {
    this.router.navigate(['/detail'], { state: { article } });
  }

  // Fungsi untuk log out
  async onLogout() {
    try {
      await this.authService.logout(); // Logout user menggunakan service
      alert('You have logged out successfully.');
      this.router.navigate(['/login']); // Navigasi kembali ke halaman login
    } catch (error) {
      alert('Error logging out. Please try again.');
    }
  }

  // Fungsi untuk menuju halaman berita
  navigateToNews() {
    this.router.navigate(['/news']); // Navigasi ke halaman news
  }
}
