import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/service/auth.service';
import { I18nService } from '../core/service/i18n.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  readonly agentName = environment.chatTitle;

  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    public readonly i18n: I18nService,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['carlos.gardel', [Validators.required, Validators.minLength(3)]],
      password: ['123456', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([environment.routeChat]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const username = this.loginForm.get('username')?.value?.trim() as string;
    const password = this.loginForm.get('password')?.value as string;

    this.isSubmitting = true;
    this.errorMessage = null;

    this.authService
      .login(username, password)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate([environment.routeChat]);
        },
        error: () => {
          this.errorMessage = this.i18n.t('login.invalidCredentials');
        },
      });
  }
}
