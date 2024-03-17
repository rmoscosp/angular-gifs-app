import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

constructor(
  private gifsService: GifsService
) {

}


 searchTag(): void{
    const newTag = this.tagInput.nativeElement.value;
    console.log({newTag});

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

    //console.log(this.gifsService.tagsHistory);

  }


}
