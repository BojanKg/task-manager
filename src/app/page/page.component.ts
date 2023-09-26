import { ToDo } from './../to-do.model';
import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  toDoes!: ToDo;
  toDo: number | undefined = 0;
  buttonBack: boolean;
  
  
  images: any[] = [
    {
      previewImageSrc: `https://picsum.photos/600/490?random=11${this.toDo}`,
      thumbnailImageSrc: `https://picsum.photos/100/70?random=11${this.toDo}`
    },
    {
      previewImageSrc: `https://picsum.photos/600/490?random=12${this.toDo}`,
      thumbnailImageSrc: `https://picsum.photos/100/70?random=12${this.toDo}`
    },
    {
      previewImageSrc: `https://picsum.photos/600/490?random=13${this.toDo}`,
      thumbnailImageSrc: `https://picsum.photos/100/70?random=13${this.toDo}`
    },
    {
      previewImageSrc: `https://picsum.photos/600/490?random=14${this.toDo}`,
      thumbnailImageSrc: `https://picsum.photos/100/70?random=14${this.toDo}`
    },
    {
      previewImageSrc: `https://picsum.photos/600/490?random=15${this.toDo}`,
      thumbnailImageSrc: `https://picsum.photos/100/70?random=15${this.toDo}`
    }
  ];

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService.getData().subscribe(data => {
      this.toDoes = data;
    });
    this.toDo = this.toDoes.id;

    this.pageService.getButtonBack().subscribe(data => {
      this.buttonBack = data;
    })
  }
}
