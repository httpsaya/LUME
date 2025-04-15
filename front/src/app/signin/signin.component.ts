import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-signin',
  imports: [
    CommonModule, FormsModule, HttpClientModule
  ],
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  register!: { username: string; password: string; email: string };
  

  constructor(private userService: ServicesService) {}

  ngOnInit(): void {
    this.register = {
      username: '',
      password: '',
      email: '',
    };
  }

  @Output() loginSuccess = new EventEmitter<void>();

  signinUser(): void {
    console.log('Signing in the user:', this.register);
  
    // Проверяем, что все поля заполнены
    if (!this.register.username || !this.register.password || !this.register.email) {
      alert('Please fill out all fields');
      return;
    }
  
    const userData = {
      username: this.register.username,
      password: this.register.password,
      email: this.register.email,  // добавляем email
    };
  
    this.userService.signinNewUser(userData).subscribe(
      (response) => {
        console.log('User signed in successfully', response);
  
        // Сохраняем токен в localStorage
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
  
        alert('User ' + this.register.username + ' has been signed in');
        
        // Перезагружаем страницу, чтобы обновить интерфейс
        location.reload();
      },
      (error) => {
        console.error('Error', error);
        if (error.status === 400) {
          alert('Invalid credentials or missing fields');
        } else {
          alert('Error signing in user');
        }
      }
    );
  }
  
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); // Event emitter to close the modal in the parent component
  }
}
