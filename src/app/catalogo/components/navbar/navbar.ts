import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  menuOpen = false;
  searchOpen = false;

  toggleMenu()  { this.menuOpen  = !this.menuOpen; }
  toggleSearch(){ this.searchOpen = !this.searchOpen; }
}
