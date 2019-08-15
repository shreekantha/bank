import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BankService } from './bank.service';

export class BankDetail {
  fav: boolean;
  bank_id: string;
  bank_name: string;
  ifsc: string;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;

}


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  cities: string[] = ['BANGALORE', 'DELHI', 'HYDERABAD', 'KOLKATTA', 'PUNE', 'DEVADURGA'];
  favorites: string[] = [];
  selectedCity: string = "DEVADURGA";
  filter: string = '';

  displayedColumns: string[] = [
    'fav',
    'bank_id',
    'bank_name',
    'ifsc',
    'branch',
    'address',
    'city',
    'district',
    'state',
  ];

  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.getBanks('DEVADURGA');

  }

  getBanks(city: string) {

    this.filter = '';
    this.bankService.getBankDetails(city).subscribe(banks => {

      const favBanks = this.getFav();
      if (favBanks)
        favBanks.forEach(fav => {

          banks.filter(f => f.ifsc === fav.ifsc).map(fav => fav.fav = true);
        })

      this.dataSource = new MatTableDataSource<BankDetail>(banks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(' ', banks);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  viewFavs() {
    this.dataSource = new MatTableDataSource<BankDetail>(this.getFav());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  markFav(fav: BankDetail) {
    fav.fav = true;
    console.log('fav ', fav)
    this.storeFav(fav);
  }
  unmarkFav(fav: BankDetail) {
    this.removeFav(fav);
  }


  storeFav(fav: BankDetail) {
    let favorites = JSON.parse(localStorage.getItem('favs'));
    if (!favorites) {
      console.log("fav in if")
      favorites = [];
    }
    console.log('fav after if')
    favorites.push(fav);

    localStorage.setItem('favs', JSON.stringify(favorites));

  }

  removeFav(fav: BankDetail) {
    let favorites: BankDetail[] = JSON.parse(localStorage.getItem('favs'));
    console.log('remove ', favorites);
    const index = favorites.findIndex(f => f.ifsc === fav.ifsc);
    console.log('remove index ', index);
    favorites.splice(index, 1);

    localStorage.setItem('favs', JSON.stringify(favorites));
  }

  getFav() {
    return JSON.parse(localStorage.getItem('favs'));
  }

}
