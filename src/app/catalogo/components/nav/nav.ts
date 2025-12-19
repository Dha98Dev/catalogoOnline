import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  constructor(private router:Router){}
mobileMenuVisible:boolean=false
  searchByKeyword(search:string){
    this.router.navigate(['/c/buscar'],{
      queryParams: {
        keyWord:search
      }
    })
  }
}
