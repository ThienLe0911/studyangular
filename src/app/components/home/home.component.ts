import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { APIResponse, Game } from 'src/app/module';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  public sort: string='';
  public games: Array<Game>=[];
  private routeSub:Subscription | undefined;
  private gameSub: Subscription = new Subscription;
  constructor(
    private httpService:HttpService,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      if(params['game-search']){
        console.log('oninit1')
        this.searchGames('metacrit',params['game-search'])
      }
      else{
        console.log('oninit2')
        this.searchGames('metacrit')
      }
    })
  }
  searchGames(sort:string,search?:string){
    console.log('oninit3',sort)
    this.httpService.getGameList(sort,search).subscribe((gameList: APIResponse<Game>)=>{
      this.games=gameList.results;
      console.log(gameList)
    })
  }
  openGameDetails(id:string)
  {
    this.router.navigate(['detail',id]);
  }

  ngOnDestroy():void{
    if(this.gameSub)
    {
      this.gameSub.unsubscribe();
    }
    if(this.routeSub)
    {
      this.routeSub.unsubscribe();
    }
  }

}
