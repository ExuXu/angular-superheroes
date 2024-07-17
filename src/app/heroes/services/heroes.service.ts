import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})

export class HeroesService {

  private baseUrl: string = environments.baseURL
  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroById( id: string ): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>( `${ this.baseUrl }/heroes/${id}` )
      .pipe(
        catchError( err => of( undefined ))
      )
  }

  getSuggestions( query: String): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>( `${ this.baseUrl }/heroes?q=${query}&_limit=6` );;
  }

  addHero( hero: Hero ): Observable<Hero> {
    return this.httpClient.post<Hero>( `${ this.baseUrl }/heroes`, hero )
  }

  updateHero( hero: Hero ): Observable<Hero> {
    if ( !hero.id ) throw Error( 'Hero Id is required' );
    return this.httpClient.patch<Hero>( `${ this.baseUrl }/heroes/${ hero.id }`, hero )
  }

  deleteHero( id: string ): Observable<boolean> {
    return this.httpClient.delete<Hero>( `${ this.baseUrl }/heroes/${ id }` )
      .pipe(
        map( () => true),
        catchError(err => of(false)),
      );
  }

}
