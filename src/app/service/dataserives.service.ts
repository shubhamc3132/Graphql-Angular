import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { PersonQuery } from 'app/enum/person-query.rnum';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private apollo: Apollo) {}

  getData(): Observable<any[]> {
    return this.apollo
      .query({
        query: gql(PersonQuery.GET_PERSON)
      })
      .pipe(
        map((result: any) => result.data.allPeople.people)
      );
  }
}
