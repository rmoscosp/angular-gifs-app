import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchResponse, Gif } from './../interfaces/gifs.interfaces';
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'm7LA1jgtYOoHyQwkafY9pLW3vS9vLuau';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor(
    private http: HttpClient,
  ) {
    this.loadLocalStorage();
    console.log("git service ready");
  }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string){

    tag = tag.toLowerCase()

    if ( this._tagsHistory.includes(tag) ){
      this._tagsHistory = this._tagsHistory.filter( (olTag) => olTag !== tag )
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0,10);

    this.saveLocalStorage();

  }


  async searchTag1(tag: string ): Promise<void> {

    if(tag.length===0) return;
    this.organizeHistory(tag);

    fetch('https://api.giphy.com/v1/gifs/search?api_key=m7LA1jgtYOoHyQwkafY9pLW3vS9vLuau&q=valorant&limit=10')
    .then( resp=> resp.json() )
    .then(data => console.log(data));

    //this._tagsHistory.unshift(tag)

  }

  async searchTag2(tag: string ): Promise<void> {

    if(tag.length===0) return;
    this.organizeHistory(tag);

    const resp = await  fetch('https://api.giphy.com/v1/gifs/search?api_key=m7LA1jgtYOoHyQwkafY9pLW3vS9vLuau&q=valorant&limit=10');
    const data = await resp.json();
    console.log(data);

    //this._tagsHistory.unshift(tag)

  }


  searchTag(tag: string ): void {

    if(tag.length===0) return;
    this.organizeHistory(tag);

    const params =  new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit','10')
    .set('q',tag)



    this.http.get<SearchResponse>( `${this.serviceUrl}/search`,{params: params})
    .subscribe( resp => {
      this.gifList = resp.data;

      console.log({gifs: this.gifList} );


    } );

      /***********************
       *
       *
       * para convertir en clases los resultados de un http api
       * https://app.quicktype.io/
       */


  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }

  private loadLocalStorage():void {
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! )

    if(this._tagsHistory.length>0){
      this.searchTag(this._tagsHistory[0]);
    }
    //const temporal = localStorage.getItem('history')

  }

}
