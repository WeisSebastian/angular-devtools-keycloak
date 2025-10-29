import { Component, provideAppInitializer, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    provideAppInitializer(() => {
      const authService = inject(OAuthService);
      authService.configure({
        issuer: 'https://idsvr4.azurewebsites.net',
        redirectUri: window.location.origin + '/index.html',
        clientId: 'spa',
        responseType: 'code',
        scope: 'openid profile email offline_access api',
        showDebugInformation: true,
      })
      return authService.loadDiscoveryDocumentAndLogin()
    }),
  ],
});
