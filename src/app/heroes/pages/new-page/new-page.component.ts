import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter, switchMap, tap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:        new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  })

  public publisers = [
    { id: 'DC Comics', value: 'DC - Comics'},
    { id: 'Marvel Comics', value: 'Marvel - Comics'},
  ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
     if ( !this.router.url.includes('edit') ) return;

     this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById(id) )
      ).subscribe( hero => {
        if ( !hero ) return this.router.navigateByUrl('/');

        this.heroForm.reset( hero );
        return
      })
  }

  get currentHero( ): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit(): void {

    if ( this.heroForm.invalid ) return

    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackbar( `${ hero.superhero } updated` )
        })
      return
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        this.showSnackbar( `${ hero.superhero } created` )
        this.router.navigate(['/heroes/edit', hero.id])
      })
  }

  onDeleteHero(): void {
    if ( !this.currentHero.id ) throw Error('Hero id is required')

    const dialogRef = this.dialog.open( ConfirmDialogComponent , {
      data: this.currentHero,
    })

    dialogRef.afterClosed()
      .pipe(
        filter( (response: boolean) => response ),
        switchMap( () => this.heroesService.deleteHero( this.currentHero.id ) ),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
    .subscribe( () => {
      this.showSnackbar( `Deleted succeed!` )
      this.router.navigate(['/heroes'])
    })

  }


  showSnackbar( mesagge: string ): void {
    this.snackBar.open( mesagge, 'done', {
      duration: 2500
    })
  }

}
