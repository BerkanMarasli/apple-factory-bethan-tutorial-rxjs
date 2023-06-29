import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Apple } from '../interfaces/apple.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplesService {
  constructor(private http: HttpClient) {}
  getApples() {
    return this.http.get('/api/apples').pipe(
      map((res) => {
        const response: any = res;
        const apples: Apple[] = response.payload;
        return apples;
      }),
      shareReplay()
    );
  }

  editApple(appleId: number, changes: Partial<Apple>): Observable<any> {
    return this.http.put(`/api/apples/${appleId}}`, changes)
  }
}
