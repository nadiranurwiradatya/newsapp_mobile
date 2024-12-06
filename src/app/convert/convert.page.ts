import { Component } from '@angular/core';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.page.html',
  styleUrls: ['./convert.page.scss'],
})
export class ConvertPage {
  conversionType: string = ''; // Jenis konversi (money/time)

  // Variabel untuk konversi uang
  amount: number = 0;
  selectedCurrency: any = null;
  convertedAmount: number | null = null;
  currencies = [
    { name: 'Rupiah', code: 'IDR', rate: 15200 },
    { name: 'Euro', code: 'EUR', rate: 0.94 },
    { name: 'Pound Sterling', code: 'GBP', rate: 0.79 },
    { name: 'Japanese Yen', code: 'JPY', rate: 146 },
    { name: 'Australian Dollar', code: 'AUD', rate: 1.5 },
  ];

  // Variabel untuk konversi waktu
  selectedTimezone: any = null;
  convertedTime: string | null = null;
  timezones = [
    { name: 'WIB (UTC+7)', offset: 7 },
    { name: 'WITA (UTC+8)', offset: 8 },
    { name: 'WIT (UTC+9)', offset: 9 },
    { name: 'London (UTC)', offset: 0 },
    { name: 'New York (UTC-5)', offset: -5 },
  ];

  constructor() {}

  // Fungsi untuk konversi uang
  convertMoney() {
    if (this.amount && this.selectedCurrency) {
      this.convertedAmount = this.amount * this.selectedCurrency.rate;
    } else {
      this.convertedAmount = null;
      alert('Mohon masukkan jumlah dan pilih mata uang tujuan!');
    }
  }

  // Fungsi untuk konversi waktu
  convertTime() {
    if (this.selectedTimezone) {
      const currentTime = new Date();
      const utcTime =
        currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
      const targetTime = new Date(
        utcTime + this.selectedTimezone.offset * 3600000
      );
      this.convertedTime = targetTime.toLocaleTimeString();
    } else {
      this.convertedTime = null;
      alert('Mohon pilih zona waktu!');
    }
  }
}
