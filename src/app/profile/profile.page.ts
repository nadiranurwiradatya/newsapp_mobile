import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Pastikan AuthService diimport

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  // Fungsi untuk log out
  async onLogout() {
    try {
      await this.authService.logout(); // Log out menggunakan AuthService
      alert('You have logged out successfully.');
      this.router.navigate(['/login']); // Arahkan ke halaman login
    } catch (error) {
      alert('Error logging out. Please try again.');
    }
  }
}
