import { map, shareReplay } from 'rxjs/operators';
import { Course } from './../model/course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient){
  }
  loadAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>('/api/courses')
      .pipe(
        map(res => res['payload']),
        // Share source and replay specified number of emissions on subscription.
        // So prevent repeited http calls to retreive the same stream
        shareReplay()
      );
  }
}
