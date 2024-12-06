import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Untuk navigasi

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async onRegister() {
    if (!this.username || !this.password) {
      alert('Please enter a username and password');
      return;
    }

    try {
      // Registrasi pengguna melalui AuthService
      await this.authService.register(this.username, this.password);
      alert('User registered successfully');
      // Redirect ke halaman login setelah registrasi sukses
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert(error.message || 'Error registering user');
    }
  }
}
