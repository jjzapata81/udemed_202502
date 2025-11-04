import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Followers } from './followers';
import { UserService } from '../../../shared/services/user-service';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';


describe('Followers', () => {
  let component: Followers;
  let fixture: ComponentFixture<Followers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Followers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Followers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
describe('Followers', () => {
  let component: Followers;
  let fixture: ComponentFixture<Followers>;
  let userService: jasmine.SpyObj<UserService>;
  let authService: jasmine.SpyObj<Auth>;
  let router: jasmine.SpyObj<Router>;

  const mockUser: User = {
    id: '1',
    username: 'testuser',
    name: 'Test User',
    email: 'test@example.com',
    url: 'https://example.com/avatar.jpg'
  };

  const mockFollowers: User[] = [
    {
      id: '2',
      username: 'follower1',
      name: 'Follower One',
      email: 'follower1@example.com',
      url: 'https://example.com/f1.jpg'
    },
    {
      id: '3',
      username: 'follower2',
      name: 'Follower Two',
      email: 'follower2@example.com',
      url: 'https://example.com/f2.jpg'
    },
    {
      id: '4',
      username: 'johndoe',
      name: 'John Doe',
      email: 'john@example.com',
      url: 'https://example.com/john.jpg'
    }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getFollowers']);
    const authServiceSpy = jasmine.createSpyObj('Auth', ['getUserLogged']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [Followers],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Auth, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Followers);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authService = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load followers when initialized', () => {
      // Arrange
      authService.getUserLogged.and.returnValue(mockUser);
      userService.getFollowers.and.returnValue(of(mockFollowers));

      // Act
      fixture.detectChanges();

      // Assert
      expect(authService.getUserLogged).toHaveBeenCalled();
      expect(userService.getFollowers).toHaveBeenCalledWith(mockUser.id);
      expect(component.followers).toEqual(mockFollowers);
      expect(component.followersFiltered()).toEqual(mockFollowers);
    });

    it('should not display "Aún no tienes seguidores" message when followers array has items', () => {
      // Arrange
      authService.getUserLogged.and.returnValue(mockUser);
      userService.getFollowers.and.returnValue(of(mockFollowers));

      // Act
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement as HTMLElement;
      const noFollowersMessage = compiled.querySelector('#no-followers');
      expect(noFollowersMessage).toBeFalsy();
    });

    it('should initialize followersFiltered as empty array', () => {
      // Arrange
      authService.getUserLogged.and.returnValue(mockUser);
      userService.getFollowers.and.returnValue(of([]));

      // Act
      fixture.detectChanges();

      // Assert
      expect(component.followersFiltered()).toEqual([]);
    });

    it('should display "Aún no tienes seguidores" message when followers array is empty', () => {
      // Arrange
      authService.getUserLogged.and.returnValue(mockUser);
      userService.getFollowers.and.returnValue(of([]));

      // Act
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement as HTMLElement;
      const noFollowersMessage = compiled.querySelector('#no-followers');
      expect(noFollowersMessage).toBeTruthy();
      expect(noFollowersMessage?.textContent?.trim()).toBe('Aún no tienes seguidores');
    });
  });

  describe('onFind', () => {
    it('should navigate to user profile', () => {
      // Arrange
      const username = 'testuser';

      // Act
      component.onFind(username);

      // Assert
      expect(router.navigateByUrl).toHaveBeenCalledWith(`home/${username}`);
    });
  });

  describe('onChat', () => {
    it('should navigate to chat with user', () => {
      // Arrange
      const userId = '123';

      // Act
      component.onChat(userId);

      // Assert
      expect(router.navigateByUrl).toHaveBeenCalledWith(`chat/${userId}`);
    });
  });

  describe('onFilter', () => {
    beforeEach(() => {
      authService.getUserLogged.and.returnValue(mockUser);
      userService.getFollowers.and.returnValue(of(mockFollowers));
      fixture.detectChanges();
      component.followers = mockFollowers;
      component.followersFiltered.set(mockFollowers);
    });

    it('should filter followers by name', () => {
      // Arrange
      const inputElement = document.createElement('input');
      inputElement.value = 'John';
      const event = { target: inputElement } as unknown as Event;

      // Act
      component.onFilter(event);

      // Assert
      expect(component.followersFiltered().length).toBe(1);
      expect(component.followersFiltered()[0].name).toBe('John Doe');
    });

    it('should filter followers by email', () => {
      // Arrange
      const inputElement = document.createElement('input');
      inputElement.value = 'follower1@example.com';
      const event = { target: inputElement } as unknown as Event;

      // Act
      component.onFilter(event);

      // Assert
      expect(component.followersFiltered().length).toBe(1);
      expect(component.followersFiltered()[0].email).toBe('follower1@example.com');
    });

    it('should filter followers by username', () => {
      // Arrange
      const inputElement = document.createElement('input');
      inputElement.value = 'follower2';
      const event = { target: inputElement } as unknown as Event;

      // Act
      component.onFilter(event);

      // Assert
      expect(component.followersFiltered().length).toBe(1);
      expect(component.followersFiltered()[0].username).toBe('follower2');
    });

    it('should filter case-insensitively', () => {
      // Arrange
      const inputElement = document.createElement('input');
      inputElement.value = 'JOHN';
      const event = { target: inputElement } as unknown as Event;

      // Act
      component.onFilter(event);

      // Assert
      expect(component.followersFiltered().length).toBe(1);
      expect(component.followersFiltered()[0].name).toBe('John Doe');
    });

    it('should return all followers when input is empty', () => {
      // Arrange
      const inputElement = document.createElement('input');
      inputElement.value = '';
      const event = { target: inputElement } as unknown as Event;

      // Act
      component.onFilter(event);

      // Assert
      expect(component.followersFiltered()).toEqual(mockFollowers);
    });

    it('should return empty array when no matches found', () => {
      // Arrange
      const inputElement = document.createElement('input');
      inputElement.value = 'nonexistent';
      const event = { target: inputElement } as unknown as Event;

      // Act
      component.onFilter(event);
      fixture.detectChanges();

      // Assert
      expect(component.followersFiltered().length).toBe(0);
    });

    it('should display "Aún no tienes seguidores" message when filter returns empty array', () => {
      // Arrange
      const inputElement = document.createElement('input');
      inputElement.value = 'nonexistent';
      const event = { target: inputElement } as unknown as Event;

      // Act
      component.onFilter(event);
      fixture.detectChanges();

      // Assert
      const compiled = fixture.nativeElement as HTMLElement;
      const noFollowersMessage = compiled.querySelector('#no-followers');
      expect(noFollowersMessage).toBeTruthy();
      expect(noFollowersMessage?.textContent?.trim()).toBe('Aún no tienes seguidores');
    });

    it('should handle partial matches', () => {
      // Arrange
      const inputElement = document.createElement('input');
      inputElement.value = 'follower';
      const event = { target: inputElement } as unknown as Event;

      // Act
      component.onFilter(event);

      // Assert
      expect(component.followersFiltered().length).toBe(2);
      expect(component.followersFiltered().every(f => f.username.includes('follower'))).toBe(true);
    });
  });

  describe('validateMatch', () => {
    it('should return true when value contains term', () => {
      // Act & Assert
      expect(component['validateMatch']('Test User', 'test')).toBe(true);
      expect(component['validateMatch']('Test User', 'user')).toBe(true);
    });

    it('should return false when value does not contain term', () => {
      // Act & Assert
      expect(component['validateMatch']('Test User', 'xyz')).toBe(false);
    });

    it('should be case-insensitive', () => {
      // Act & Assert
      // Note: term is already lowercased in onFilter method, so we test with lowercase terms
      expect(component['validateMatch']('Test User', 'test')).toBe(true);
      expect(component['validateMatch']('TEST USER', 'test')).toBe(true);
      expect(component['validateMatch']('Test User', 'user')).toBe(true);
    });

    it('should return false when value is null or undefined', () => {
      // Act & Assert
      expect(component['validateMatch']('', 'test')).toBe(false);
      expect(component['validateMatch'](null as any, 'test')).toBe(false);
      expect(component['validateMatch'](undefined as any, 'test')).toBe(false);
    });

    it('should handle empty term', () => {
      // Act & Assert
      expect(component['validateMatch']('Test User', '')).toBe(true);
    });
  });
});
*/
