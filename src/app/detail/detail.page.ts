import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../models/article.model'; // Import tipe data

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  article: Article | undefined; // Gunakan tipe data Article

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.article = navigation?.extras.state?.['article']; // Akses dengan notasi indeks
  }

  ngOnInit() {
    if (!this.article) {
      this.router.navigate(['/home']);
    }
  }
}
