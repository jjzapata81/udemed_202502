# InstaPicApp - Documentación de Pruebas Unitarias

Este documento explica en detalle las pruebas unitarias implementadas para el componente `Followers`, incluyendo conceptos de mocks, spies, y un análisis completo de cada prueba.

## Tabla de Contenidos

1. [Conceptos Fundamentales](#conceptos-fundamentales)
2. [Configuración de las Pruebas](#configuración-de-las-pruebas)
3. [Análisis Línea por Línea](#análisis-línea-por-línea)
4. [Análisis de Pruebas Unitarias](#análisis-de-pruebas-unitarias)

---

## Conceptos Fundamentales

### ¿Qué son los Mocks?

Los **mocks** son objetos simulados que replican el comportamiento de objetos reales en un entorno controlado. En pruebas unitarias, se utilizan para:

- **Aislar el componente bajo prueba**: No dependemos de servicios reales que podrían fallar o tener dependencias externas
- **Controlar el comportamiento**: Definimos exactamente qué debe retornar cada método
- **Evitar efectos secundarios**: No se realizan llamadas HTTP reales, no se guarda en base de datos, etc.

**Ejemplo de Mock en nuestro código:**
```typescript
const mockUser: User = {
  id: '1',
  username: 'testuser',
  name: 'Test User',
  email: 'test@example.com',
  url: 'https://example.com/avatar.jpg'
};
```

Este mock representa un usuario de prueba con datos ficticios pero estructurados que simulan un usuario real.

### ¿Qué son los Spies?

Los **spies** (espías) son funciones especiales que permiten:

- **Interceptar llamadas a métodos**: Saber si un método fue llamado, cuántas veces, y con qué argumentos
- **Simular respuestas**: Hacer que un método retorne un valor específico sin ejecutar su lógica real
- **Verificar interacciones**: Confirmar que el componente interactúa correctamente con sus dependencias

**Ejemplo de Spy en nuestro código:**
```typescript
const userServiceSpy = jasmine.createSpyObj('UserService', ['getFollowers']);
```

Esto crea un objeto spy que tiene un método `getFollowers` que podemos controlar y monitorear.

### Dependencias que se Deben Inyectar

En el componente `Followers`, se utilizan las siguientes dependencias que deben ser mockeadas:

1. **UserService**: Servicio para obtener los seguidores del usuario
2. **Auth**: Servicio de autenticación para obtener el usuario logueado
3. **Router**: Servicio de Angular para navegación entre rutas

Estas dependencias se inyectan usando el sistema de inyección de dependencias de Angular (`inject()`), por lo que en las pruebas necesitamos proporcionar versiones mockeadas.

---

## Configuración de las Pruebas

### Estructura de Imports

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Followers } from './followers';
import { UserService } from '../../../shared/services/user-service';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
```

**Explicación:**
- `ComponentFixture`: Permite crear y manipular una instancia del componente en el contexto de pruebas
- `TestBed`: Herramienta de Angular para configurar el entorno de pruebas
- `Router`: Servicio de navegación de Angular
- `of`: Operador de RxJS que crea un Observable que emite un valor inmediatamente
- `Followers`: El componente que estamos probando
- `UserService`, `Auth`, `User`: Dependencias e interfaces necesarias

---

## Análisis Línea por Línea

### Declaración de Variables

```typescript
describe('Followers', () => {
  let component: Followers;
  let fixture: ComponentFixture<Followers>;
  let userService: jasmine.SpyObj<UserService>;
  let authService: jasmine.SpyObj<Auth>;
  let router: jasmine.SpyObj<Router>;
```

**Explicación:**
- `component`: Instancia del componente que se está probando
- `fixture`: Wrapper que permite acceder al componente y su DOM
- `userService`, `authService`, `router`: Spies tipados que reemplazan los servicios reales

### Datos Mock

```typescript
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
  // ... más seguidores
];
```

**Explicación:**
- `mockUser`: Usuario simulado que representa al usuario logueado
- `mockFollowers`: Array de usuarios que simula la lista de seguidores
- Estos datos son consistentes y predecibles para las pruebas

### Configuración del Entorno de Pruebas (beforeEach)

```typescript
beforeEach(async () => {
  // 1. Crear spies para cada servicio
  const userServiceSpy = jasmine.createSpyObj('UserService', ['getFollowers']);
  const authServiceSpy = jasmine.createSpyObj('Auth', ['getUserLogged']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  // 2. Configurar el módulo de pruebas
  await TestBed.configureTestingModule({
    imports: [Followers],
    providers: [
      { provide: UserService, useValue: userServiceSpy },
      { provide: Auth, useValue: authServiceSpy },
      { provide: Router, useValue: routerSpy }
    ]
  }).compileComponents();

  // 3. Crear el componente y obtener las instancias
  fixture = TestBed.createComponent(Followers);
  component = fixture.componentInstance;
  userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  authService = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;
  router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
});
```

**Explicación línea por línea:**

1. **Creación de Spies:**
   ```typescript
   const userServiceSpy = jasmine.createSpyObj('UserService', ['getFollowers']);
   ```
   - Crea un objeto spy con el método `getFollowers` que podemos controlar

2. **Configuración del Módulo de Pruebas:**
   ```typescript
   TestBed.configureTestingModule({...})
   ```
   - Configura Angular para pruebas, similar a `@NgModule` pero para testing
   - `imports: [Followers]`: Importa el componente a probar
   - `providers`: Reemplaza los servicios reales con nuestros spies

3. **Compilación:**
   ```typescript
   .compileComponents()
   ```
   - Compila los componentes y templates (necesario para componentes standalone)

4. **Creación del Componente:**
   ```typescript
   fixture = TestBed.createComponent(Followers);
   ```
   - Crea una instancia del componente en el contexto de pruebas

5. **Obtención de Instancias:**
   ```typescript
   component = fixture.componentInstance;
   ```
   - Accede a la instancia del componente para pruebas

6. **Inyección de Spies:**
   ```typescript
   userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
   ```
   - Obtiene la instancia del spy que configuramos en los providers

---

## Análisis de Pruebas Unitarias

### 1. Prueba de Creación del Componente

```typescript
it('should create', () => {
  expect(component).toBeTruthy();
});
```

**Análisis:**
- **Propósito**: Verifica que el componente se instancia correctamente
- **Arrange**: No necesario, el componente ya está creado en `beforeEach`
- **Act**: No hay acción, solo verificamos la existencia
- **Assert**: Confirma que `component` no es `null` ni `undefined`
- **Importancia**: Prueba básica que valida la configuración del entorno de pruebas

---

### 2. Pruebas de ngOnInit

#### 2.1. Carga de Seguidores al Inicializar

```typescript
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
```

**Análisis:**
- **Arrange**: 
  - Configura el spy de `authService` para retornar `mockUser`
  - Configura el spy de `userService` para retornar un Observable con `mockFollowers`
- **Act**: 
  - `fixture.detectChanges()` dispara el ciclo de detección de cambios de Angular, ejecutando `ngOnInit`
- **Assert**: 
  - Verifica que `getUserLogged` fue llamado
  - Verifica que `getFollowers` fue llamado con el ID correcto del usuario
  - Verifica que `followers` contiene los datos correctos
  - Verifica que `followersFiltered` (signal) contiene los mismos datos

**Importancia**: Valida que el componente carga correctamente los datos al inicializar.

#### 2.2. No Mostrar Mensaje cuando Hay Seguidores

```typescript
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
```

**Análisis:**
- **Arrange**: Configura los spies para retornar datos
- **Act**: Dispara el ciclo de detección de cambios
- **Assert**: 
  - `fixture.nativeElement`: Accede al DOM renderizado del componente
  - `querySelector('#no-followers')`: Busca el elemento con id `no-followers`
  - `toBeFalsy()`: Verifica que el elemento NO existe cuando hay seguidores

**Importancia**: Valida que la UI no muestra el mensaje de "sin seguidores" cuando hay datos.

#### 2.3. Inicialización con Array Vacío

```typescript
it('should initialize followersFiltered as empty array', () => {
  // Arrange
  authService.getUserLogged.and.returnValue(mockUser);
  userService.getFollowers.and.returnValue(of([]));

  // Act
  fixture.detectChanges();

  // Assert
  expect(component.followersFiltered()).toEqual([]);
});
```

**Análisis:**
- **Arrange**: Configura `getFollowers` para retornar un array vacío
- **Act**: Dispara la inicialización
- **Assert**: Verifica que el signal `followersFiltered` está vacío

**Importancia**: Valida el manejo del caso cuando el usuario no tiene seguidores.

#### 2.4. Mostrar Mensaje cuando el Array está Vacío

```typescript
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
```

**Análisis:**
- **Arrange**: Configura para retornar array vacío
- **Act**: Dispara la inicialización
- **Assert**: 
  - Verifica que el elemento `#no-followers` existe
  - Verifica que el texto del mensaje es exactamente "Aún no tienes seguidores"
  - `?.` (optional chaining): Evita errores si el elemento no existe

**Importancia**: Valida que la UI muestra correctamente el mensaje cuando no hay seguidores.

---

### 3. Pruebas de Navegación (onFind)

```typescript
it('should navigate to user profile', () => {
  // Arrange
  const username = 'testuser';

  // Act
  component.onFind(username);

  // Assert
  expect(router.navigateByUrl).toHaveBeenCalledWith(`home/${username}`);
});
```

**Análisis:**
- **Arrange**: Define un username de prueba
- **Act**: Llama al método `onFind` del componente
- **Assert**: Verifica que `router.navigateByUrl` fue llamado con la ruta correcta

**Importancia**: Valida que la navegación funciona correctamente al hacer clic en "Ver perfil".

**Nota sobre el Spy**: No necesitamos configurar un valor de retorno porque `navigateByUrl` no retorna un valor útil en nuestro caso. Solo verificamos que fue llamado.

---

### 4. Pruebas de Chat (onChat)

```typescript
it('should navigate to chat with user', () => {
  // Arrange
  const userId = '123';

  // Act
  component.onChat(userId);

  // Assert
  expect(router.navigateByUrl).toHaveBeenCalledWith(`chat/${userId}`);
});
```

**Análisis:**
- Similar a la prueba anterior, pero para navegación al chat
- Verifica que la ruta incluye el `userId` correcto

**Importancia**: Valida la navegación al chat con un usuario específico.

---

### 5. Pruebas de Filtrado (onFilter)

#### 5.1. Configuración del beforeEach para Filtrado

```typescript
describe('onFilter', () => {
  beforeEach(() => {
    authService.getUserLogged.and.returnValue(mockUser);
    userService.getFollowers.and.returnValue(of(mockFollowers));
    fixture.detectChanges();
    component.followers = mockFollowers;
    component.followersFiltered.set(mockFollowers);
  });
```

**Análisis:**
- Configura el componente con datos de prueba antes de cada prueba de filtrado
- Inicializa tanto `followers` como `followersFiltered` con los mismos datos
- Esto asegura un estado consistente para todas las pruebas de filtrado

#### 5.2. Filtrar por Nombre

```typescript
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
```

**Análisis:**
- **Arrange**: 
  - Crea un elemento input simulado
  - Establece el valor "John"
  - Crea un evento mock con el input como target
- **Act**: Llama a `onFilter` con el evento simulado
- **Assert**: 
  - Verifica que el array filtrado tiene 1 elemento
  - Verifica que el nombre del elemento es "John Doe"

**Importancia**: Valida que el filtrado por nombre funciona correctamente.

#### 5.3. Filtrar por Email

```typescript
it('should filter followers by email', () => {
  // Similar estructura a la anterior
  inputElement.value = 'follower1@example.com';
  // ...
});
```

**Análisis:**
- Similar a la prueba anterior, pero prueba el filtrado por email
- Valida que el filtrado funciona con diferentes campos

#### 5.4. Filtrar por Username

```typescript
it('should filter followers by username', () => {
  inputElement.value = 'follower2';
  // Verifica que se filtra correctamente por username
});
```

**Análisis:**
- Valida el tercer campo de búsqueda (username)
- Asegura que todos los campos de búsqueda funcionan

#### 5.5. Filtrado Case-Insensitive

```typescript
it('should filter case-insensitively', () => {
  inputElement.value = 'JOHN';
  // ...
  expect(component.followersFiltered()[0].name).toBe('John Doe');
});
```

**Análisis:**
- Prueba con mayúsculas aunque el dato esté en formato mixto
- Valida que la búsqueda no es sensible a mayúsculas/minúsculas

**Importancia**: Mejora la experiencia de usuario permitiendo búsquedas sin importar el formato.

#### 5.6. Restaurar Todos los Seguidores

```typescript
it('should return all followers when input is empty', () => {
  inputElement.value = '';
  // ...
  expect(component.followersFiltered()).toEqual(mockFollowers);
});
```

**Análisis:**
- Prueba el caso cuando el usuario borra el texto de búsqueda
- Valida que se restauran todos los seguidores

**Importancia**: Asegura que el usuario puede "limpiar" el filtro fácilmente.

#### 5.7. Sin Resultados

```typescript
it('should return empty array when no matches found', () => {
  inputElement.value = 'nonexistent';
  // ...
  expect(component.followersFiltered().length).toBe(0);
});
```

**Análisis:**
- Prueba el caso cuando no hay coincidencias
- Valida que el array se vacía correctamente

**Importancia**: Valida el manejo de búsquedas sin resultados.

#### 5.8. Mostrar Mensaje cuando el Filtro está Vacío

```typescript
it('should display "Aún no tienes seguidores" message when filter returns empty array', () => {
  inputElement.value = 'nonexistent';
  component.onFilter(event);
  fixture.detectChanges(); // Importante para actualizar el DOM

  const compiled = fixture.nativeElement as HTMLElement;
  const noFollowersMessage = compiled.querySelector('#no-followers');
  expect(noFollowersMessage).toBeTruthy();
  expect(noFollowersMessage?.textContent?.trim()).toBe('Aún no tienes seguidores');
});
```

**Análisis:**
- **Importante**: `fixture.detectChanges()` es necesario para actualizar el DOM después del filtrado
- Verifica que el mensaje aparece cuando el filtro no encuentra resultados
- Valida tanto la existencia del elemento como su contenido

**Importancia**: Valida la UX cuando una búsqueda no tiene resultados.

#### 5.9. Coincidencias Parciales

```typescript
it('should handle partial matches', () => {
  inputElement.value = 'follower';
  // ...
  expect(component.followersFiltered().length).toBe(2);
  expect(component.followersFiltered().every(f => f.username.includes('follower'))).toBe(true);
});
```

**Análisis:**
- Prueba con un término parcial que coincide con múltiples usuarios
- `every()`: Verifica que todos los elementos filtrados cumplen la condición

**Importancia**: Valida que la búsqueda funciona con coincidencias parciales (no requiere coincidencia exacta).

---

### 6. Pruebas del Método Privado (validateMatch)

#### 6.1. Coincidencia Exitosa

```typescript
it('should return true when value contains term', () => {
  expect(component['validateMatch']('Test User', 'test')).toBe(true);
  expect(component['validateMatch']('Test User', 'user')).toBe(true);
});
```

**Análisis:**
- `component['validateMatch']`: Accede a un método privado usando bracket notation
- Prueba múltiples casos de coincidencia en una sola prueba
- Valida que el método retorna `true` cuando encuentra el término

**Importancia**: Valida la lógica interna del filtrado.

#### 6.2. Sin Coincidencia

```typescript
it('should return false when value does not contain term', () => {
  expect(component['validateMatch']('Test User', 'xyz')).toBe(false);
});
```

**Análisis:**
- Valida el caso negativo: cuando no hay coincidencia
- Asegura que el método retorna `false` correctamente

#### 6.3. Case-Insensitive

```typescript
it('should be case-insensitive', () => {
  expect(component['validateMatch']('Test User', 'test')).toBe(true);
  expect(component['validateMatch']('TEST USER', 'test')).toBe(true);
});
```

**Análisis:**
- Valida que el método convierte ambos valores a minúsculas antes de comparar
- Prueba múltiples combinaciones de mayúsculas/minúsculas

#### 6.4. Valores Null/Undefined

```typescript
it('should return false when value is null or undefined', () => {
  expect(component['validateMatch']('', 'test')).toBe(false);
  expect(component['validateMatch'](null as any, 'test')).toBe(false);
  expect(component['validateMatch'](undefined as any, 'test')).toBe(false);
});
```

**Análisis:**
- `as any`: Cast de TypeScript para permitir valores null/undefined en la prueba
- Valida el manejo de casos edge (valores nulos)
- Previene errores en tiempo de ejecución

**Importancia**: Valida la robustez del código ante datos inválidos.

#### 6.5. Término Vacío

```typescript
it('should handle empty term', () => {
  expect(component['validateMatch']('Test User', '')).toBe(true);
});
```

**Análisis:**
- Valida que un término vacío coincide con cualquier valor
- Esto tiene sentido porque un string vacío está contenido en cualquier string

**Importancia**: Valida el comportamiento cuando el término de búsqueda está vacío.

---

## Patrón Arrange-Act-Assert (AAA)

Todas las pruebas siguen el patrón **Arrange-Act-Assert**:

1. **Arrange**: Configura el estado inicial (mocks, datos, spies)
2. **Act**: Ejecuta la acción que se está probando
3. **Assert**: Verifica que el resultado es el esperado

Este patrón hace que las pruebas sean:
- **Legibles**: Fácil de entender qué se está probando
- **Mantenibles**: Fácil de modificar si cambia el código
- **Organizadas**: Estructura consistente en todas las pruebas

---

## Conceptos Clave Adicionales

### Signals de Angular

```typescript
followersFiltered = signal<User[]>([]);
```

- Los **signals** son una nueva característica de Angular para reactividad
- `signal()`: Crea un signal con valor inicial
- `signal()`: Para leer el valor (se llama como función)
- `signal.set()`: Para actualizar el valor

### Observables y RxJS

```typescript
userService.getFollowers.and.returnValue(of(mockFollowers));
```

- `of()`: Crea un Observable que emite un valor inmediatamente y se completa
- Útil para simular respuestas de servicios HTTP en pruebas

### TestBed y ComponentFixture

- **TestBed**: Configura el entorno de pruebas de Angular
- **ComponentFixture**: Wrapper que proporciona acceso al componente y su DOM
- `fixture.nativeElement`: Accede al DOM real del componente
- `fixture.detectChanges()`: Dispara el ciclo de detección de cambios

---

## Resumen

Las pruebas unitarias del componente `Followers` cubren:

✅ **Inicialización**: Carga de datos y manejo de estados vacíos  
✅ **Navegación**: Rutas a perfil y chat  
✅ **Filtrado**: Por nombre, email, username, case-insensitive, parcial  
✅ **UI**: Mensajes cuando no hay datos  
✅ **Métodos privados**: Validación de coincidencias  
✅ **Edge cases**: Valores nulos, términos vacíos, sin resultados  

**Total de pruebas**: 20 pruebas unitarias que validan completamente la funcionalidad del componente.

---

## Ejecutar las Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test
```

Para ejecutar las pruebas unitarias incluyendo la cobertura de código:

```bash
npm test --code-coverage
```

Para ejecutar solo las pruebas del componente Followers:

```bash
npm test -- --include='**/followers.spec.ts'
```

Para ejecutar sin modo watch:

```bash
npm test -- --watch=false
```
