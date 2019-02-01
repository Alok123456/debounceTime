import { Component, OnInit } from '@angular/core';
import { User, IUserResponse } from '../service/user.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  filteredUsers: User[] = [];
  usersForm: FormGroup;
  isLoading = false;
  bind: string;

  constructor(private fb: FormBuilder, private searchService: SearchService) { }

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: ''
    });

    this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.searchService.search({ name: value }, 1)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => this.filteredUsers = users.results);
  }

  displayFn(user: User) {
    if (user) {
      let word: any = user.name.match(/\{([^}]+)\}/g);
      word = word[0].substring(1, word[0].length - 1);
      const arr = user.name.split(`${word}`);
      const output = document.getElementById('js-output');
      let htmlButton = `<a href="#" id="button">${word}</a>`;
      output.innerHTML = arr[0] + htmlButton + arr[1];
      document.getElementById('button').addEventListener('click', () => {
        htmlButton = `<mat-form-field class="example-full-width">
                          <input matInput (change)="test()" [(ngModel)]="word">
                      </mat-form-field>`;
        output.innerHTML = arr[0] + htmlButton + arr[1];
        return output;
      });
      return output;
    }
  }

  test() {
    alert();
  }

}

