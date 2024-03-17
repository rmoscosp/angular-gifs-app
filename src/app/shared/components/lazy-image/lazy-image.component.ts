import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error ('url property is required')
  }

  onLoad(){
    // setTimeout(() => {
    //   console.log('image loaded');
    //   this.hasLoaded = true;
    // }, 1000)
       console.log('image loaded');
      this.hasLoaded = true;

  }

}
