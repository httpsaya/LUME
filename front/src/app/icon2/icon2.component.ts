import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicesService } from '../services.service';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-icon2',
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './icon2.component.html',
  styleUrl: './icon2.component.scss'
})
export class Icon2Component implements OnInit{
  vol2s: Array<{ title: string; desc: string; image: string }> = [];
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    this.isLoggedIn = !!token;
  }

  // Использование inject вместо конструктора
  private api = inject(ServicesService);

  constructor() {
    this.getVol2s();
  }

  getVol2s(): void {
    this.api.getAllVol2s().subscribe(
      (data) => {
        this.vol2s = data; // Set the data fetched from the API
      },
      (error) => {
        console.error('Error occurred while fetching volunteers:', error);
        // Handle error, maybe set a message or fallback value
      }
    );
    console.log(this.vol2s);

  }
}
