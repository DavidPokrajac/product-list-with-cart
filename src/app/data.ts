import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private dataUrl = 'assets/data.json';

  http = inject(HttpClient);

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
}
