import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [
    FormsModule, // Add FormsModule here
    HttpClientModule
  ],
})
export class RegistrationComponent implements OnInit {
  register!: { username: string; surname: string; password: string; email: string };

  constructor(private userService: ServicesService) {}

  ngOnInit(): void {
    this.register = {
      username: '',
      surname: '',
      password: '',
      email: '',
    };
  }

  registerUser(): void {
    console.log('Registering user:', this.register);

    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.userService.registerNewUser(this.register, headers).subscribe(
      (response) => {
        console.log('User created successfully', response);
        alert('User ' + this.register.username + ' has been created');
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  @Output() close = new EventEmitter<void>();

  // Закрытие модального окна
  closeModal2() {
    this.close.emit(); // Отправка события для закрытия родительскому компоненту
  }
}