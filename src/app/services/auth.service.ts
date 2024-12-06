import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // Ganti dengan import yang benar
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private router: Router,
    private alertController: AlertController
  ) {
    this.init();
  }

  // Inisialisasi Hive Storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Fungsi untuk registrasi pengguna
  async register(username: string, password: string): Promise<void> {
    if (!this._storage) {
      throw new Error('Storage not initialized');
    }

    // Periksa apakah username sudah ada
    const existingUser = await this._storage.get(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Enkripsi password menggunakan CryptoJS
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      'secret-key' // Kunci enkripsi
    ).toString();

    // Simpan username dan password terenkripsi ke Hive
    await this._storage.set(username, encryptedPassword);
    console.log(`User '${username}' registered successfully`);
  }

  // Fungsi untuk login pengguna
  async login(username: string, password: string): Promise<boolean> {
    if (!this._storage) {
      throw new Error('Storage not initialized');
    }

    // Ambil password terenkripsi berdasarkan username
    const encryptedPassword = await this._storage.get(username);

    if (!encryptedPassword) {
      throw new Error('User not found');
    }

    // Dekripsi password menggunakan CryptoJS
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      'secret-key' // Kunci enkripsi
    ).toString(CryptoJS.enc.Utf8);

    // Validasi password
    if (decryptedPassword === password) {
      console.log('Login successful');
      return true;
    } else {
      throw new Error('Invalid password');
    }
  }

  // Fungsi untuk mendapatkan semua data dari Hive
  async getAllData(): Promise<any> {
    if (!this._storage) {
      throw new Error('Storage not initialized');
    }

    const keys = await this._storage.keys();
    const allData: any = {};

    for (const key of keys) {
      allData[key] = await this._storage.get(key);
    }

    return allData;
  }
  async logout() {
    // Proses log out, seperti menghapus token atau data sesi
    localStorage.removeItem('user_token'); // Menghapus token dari localStorage sebagai contoh
    return Promise.resolve(); // Mengembalikan promise sebagai tanda berhasil
  }
}
