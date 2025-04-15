import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ServicesService } from './services.service';
import { CommonModule } from '@angular/common';
import { Icon2Component } from './icon2/icon2.component';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    Icon2Component,
    RegistrationComponent,
    RouterOutlet,
    CommonModule,
    RouterModule,
    SigninComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSigninModalOpen = false; // состояние для модалки входа
  isRegistrationModalOpen = false; // состояние для модалки регистрации
  isLoggedIn = false;
  vols: Array<{ title: string; desc: string; image: string }> = [];

  // Использование inject для внедрения зависимостей
  private api = inject(ServicesService);

  constructor() {
    // Загружаем данные волонтеров сразу при инициализации компонента
    this.getVols();
  }

  ngOnInit() {
    // Проверяем токен в localStorage и сразу обновляем состояние
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  // Метод для выхода
  handleLogout() {
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    this.isLoggedIn = false; // Обновляем статус
    location.reload(); // Перезагружаем страницу
  }

  // Открытие модалки входа
  openModal() {
    this.isSigninModalOpen = true;
    this.isRegistrationModalOpen = false;  // Закрываем регистрацию при открытии входа
  }

  // Открытие модалки регистрации
  openModal2() {
    this.isRegistrationModalOpen = true;
    this.isSigninModalOpen = false;  // Закрываем вход при открытии регистрации
  }

  // Закрытие модалки входа
  closeSigninModal() {
    this.isSigninModalOpen = false;
  }

  // Закрытие модалки регистрации
  closeRegistrationModal() {
    this.isRegistrationModalOpen = false;
  }

  // Запрос для получения волонтеров
  getVols(): void {
    this.api.getAllVols().subscribe(
      (data) => this.vols = data,  // Если успешный ответ, сохраняем данные
      (error) => console.error('Error occurred while fetching volunteers:', error)
    );
  }

  // Обработчик для успешного входа
  handleLoginSuccess() {
    this.isLoggedIn = true; // После успешного входа обновляем состояние
    location.reload(); // Перезагружаем страницу

  }
}
