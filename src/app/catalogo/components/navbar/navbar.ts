import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(private router:Router){}

  menuOpen = false;
  searchOpen = false;

  toggleMenu()  { this.menuOpen  = !this.menuOpen; }
  toggleSearch(){ this.searchOpen = !this.searchOpen; }

  searchByKeyword(search:string){
    this.router.navigate(['/c/buscar'],{
      queryParams: {
        keyWord:search
      }
    })
  }
}
