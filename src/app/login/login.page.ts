import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ''; // Input username dari form
  password: string = ''; // Input password dari form

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  // Fungsi Register
  async onRegister() {
    if (!this.username || !this.password) {
      alert('Please enter a username and password to register.');
      return;
    }

    try {
      await this.authService.register(this.username, this.password);
      alert('Registration successful. You can now log in.');
    } catch (error: any) {
      alert(error.message || 'Error registering user.');
    }
  }

  // Fungsi Login
  async onLogin() {
    if (!this.username || !this.password) {
      alert('Please enter your username and password to log in.');
      return;
    }

    try {
      const success = await this.authService.login(
        this.username,
        this.password
      );
      if (success) {
        alert('Login successful! Redirecting to the home page.');
        this.router.navigate(['/home']); // Navigasi ke halaman home
      }
    } catch (error: any) {
      alert(error.message || 'Error logging in. Please try again.');
    }
  }

  // Fungsi Menampilkan Data Tersimpan
  async showStoredData() {
    try {
      const data = await this.authService.getAllData();
      console.log('Stored Data:', data);
      alert(`Stored Data:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('Error fetching stored data:', error);
      alert('Unable to fetch stored data. Please try again later.');
    }
  }

  // Fungsi Lupa Password
  onForgotPassword() {
    alert('Forgot password functionality is currently under development.');
    // Tambahkan logika atau navigasi ke halaman reset password jika diperlukan
  }

  // Fungsi Menjelajahi Berita Tanpa Login
  browseNews() {
    alert('Redirecting to news feed...');
    this.router.navigate(['/news']); // Navigasi ke halaman berita
  }
}
