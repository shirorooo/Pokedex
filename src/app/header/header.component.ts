import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../loader-services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public subMenuClicked = false;
  public search: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

  goToPokemonList(){
    this.router.navigate(['pokemon'], {relativeTo: this.route});
  }

  goToItemList(){
    this.router.navigate(['item'], {relativeTo: this.route});
  }

 
}
