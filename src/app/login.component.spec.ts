import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'saveToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should login and navigate on success', () => {
    const fakeToken = { token: 'test123' };
    authServiceSpy.login.and.returnValue(of(fakeToken));

    component.email = 'test@example.com';
    component.password = '123456';
    component.onLogin();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(authServiceSpy.saveToken).toHaveBeenCalledWith('test123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });
});