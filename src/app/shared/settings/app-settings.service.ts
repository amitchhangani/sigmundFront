import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppSettingsService {
  public getBaseUrl(): string {
    return environment.baseUrl;
  }
}

export const SETTINGS_PROVIDERS = [
  { provide: AppSettingsService, useClass: AppSettingsService }
];
