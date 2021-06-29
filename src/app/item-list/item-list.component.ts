import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemByCategory, ItemCategory, ItemCategoryList, ItemDetails, ItemResults } from '../item';
import { PokedexService } from '../pokedex.service';
import { pageLimit } from '../pokemon';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public itemDetails: ItemDetails[] = [];
  public allItemDetails: ItemDetails[] = [];
  public searchedItems: ItemDetails[] =[];
  public itemCategories: ItemCategory[] = [];
  public searchAll: ItemResults[] = [];
  public initialOffset = 0;
  public screenWidth = 0;
  public column = 0;
  public pageLimit = pageLimit;
  public currentPage = 1;
  public currentOffset = 0;
  public limit = 10;
  public totalNumberOfItems = 0;
  public filterByCategory = '';
  public allItems = 954;
  public search = '';
  public isSearch = false;

  control = new FormControl();
  itemNames: string[] = [];
  filteredItems: Observable<string[]> | undefined;

  constructor(
    private itemService: PokedexService
  ) { }

  ngOnInit(): void {
    this.setColumn();
    this.filter();
    this.getItemList();
    this.getAllItemList();
    this.getCategories();
  }

  // WILL SEARCH FOR THE ITEMS THAT MATCHES THE LETTERS IN INPUT BOX
  itemSearch(){
    this.totalNumberOfItems = 0;
    const itemObservable: Observable<ItemDetails>[] = [];

    if(this.search.length > 2){
      this.isSearch = true;
      const filteredItems = this.searchAll.filter((result) =>{
        return result.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
      });

      filteredItems.map((item) =>{
        this.totalNumberOfItems++;
        itemObservable.push(this.itemService.getItemDetails(item.url));
      });

      forkJoin([...itemObservable]).subscribe((item) =>{
        this.itemDetails = [...item];
      });

      this.searchedItems = this.itemDetails;
    } else {
      this.totalNumberOfItems = this.allItems
      this.isSearch = false;
      this.getItemList();
    }
  }

  // WILL ONLY GET LIST OF ITEMS BASED ON LIMIT
  getItemList(){
    const itemObservable: Observable<ItemDetails>[] = [];

    this.itemService.getItems(this.limit, (this.limit * (this.currentPage - 1))).subscribe((response) =>{
      response.results.map((item) =>{
        itemObservable.push(this.itemService.getItemDetails(item.url));
      });

    forkJoin([...itemObservable]).subscribe((results) =>{
      this.itemDetails = [...results];
    });
    });
  }

  // WILL GET ALL THE ITEMS
  getAllItemList(){
    const itemObservable: Observable<ItemDetails>[] = [];

    this.itemService.getItems(this.allItems, this.initialOffset).subscribe((response) =>{
      response.results.map((item) =>{
        this.totalNumberOfItems++;
        this.itemNames.push(item.name);
        this.searchAll.push(item);
      });
    });
  }

  // WILL GET ALL THE CATEGORIES
  getCategories(){
    this.itemService.getItemCategoryList().subscribe((response) =>{
      this.itemCategories = response.results;
    });
  }

  // WILL SET THE LIMIT TO BE DISPLAYED
  limiter(limit: number) {
    this.currentPage = 1;
    this.pageLimit.forEach((limiter) =>{
      if(limit == limiter){
        if(this.filterByCategory == ''){
          this.limit = limit;
          this.itemDetails = [];
          this.pageChange();
        }
        else {
          this.limit = limit;
          this.pageChange();
        }
      }
    });
  }

  // WILL FILTER ITEMS BY CATEGORY
  filterCategory(category: string){
    this.itemDetails = [];
    this.totalNumberOfItems = 0;

    if(category == 'clear'){
      this.totalNumberOfItems = this.allItems;
      this.filterByCategory = '';
      this.getItemList();
    }
    else{
      this.filterByCategory = category;
      const itemObservable: Observable<ItemDetails>[] = [];

      this.itemService.getItemByCategory(category).subscribe((item) =>{
        item.items.map((result) =>{
          itemObservable.push(this.itemService.getItemDetails(result.url));
        });

        forkJoin([...itemObservable]).subscribe((item) =>{
          this.itemDetails = [...item];
        });
      });
    }
  }

  // WILL BE TRIGGERED ONCE USER CLICKED PAGINATION
  pageChange(){
    if(this.filterByCategory != ''){
      this.itemDetails = this.itemDetails.slice(this.currentOffset, this.limit);
      this.filterCategory(this.filterByCategory);
    }
    else if(this.isSearch == true){
      this.itemDetails = this.itemDetails.slice(this.currentOffset, this.currentOffset + this.limit);
      this.itemSearch();
    }
    else{
      this.getItemList();
    }
  }

  //Auto Complete Forms
  filter(){
    this.filteredItems = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.itemNames.filter(itemNames => itemNames.toLocaleLowerCase().includes(filterValue));
  }


  // WILL CHECK IF THE WINDOW SIZE CHANGED
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1324) {
      this.column = 5;
    }
    else if (this.screenWidth <= 1324 && this.screenWidth >= 1222) {
      this.column = 4;
    }
    else if (this.screenWidth <= 1221 && this.screenWidth >= 802) {
      this.column = 3;
    }
    else if (this.screenWidth <= 801 && this.screenWidth >= 640) {
      this.column = 2;
    }
    else if (this.screenWidth <= 641 && this.screenWidth >= 390) {
      this.column = 1;
    }
  }

  // WILL SET THE COLUMN BASE ON THE WINDOW SIZE ON LOADHirap naman kasi non hahah kahaba ng code hahahah
  setColumn() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1324) {
      this.column = 5;
    }
    else if (this.screenWidth <= 1324 && this.screenWidth >= 1222) {
      this.column = 4;
    }
    else if (this.screenWidth <= 1221 && this.screenWidth >= 802) {
      this.column = 3;
    }
    else if (this.screenWidth <= 803 && this.screenWidth >= 640) {
      this.column = 2;
    }
    else if (this.screenWidth <= 641 && this.screenWidth >= 390) {
      this.column = 1;
    }
  }

}
