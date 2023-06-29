import { Component, OnInit } from '@angular/core';
import { Apple } from '../interfaces/apple.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppleDialogComponent } from '../apple-dialog/apple-dialog.component';
import { ApplesService } from '../services/apples.service';
import { Observable, filter, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-apple-display',
  templateUrl: './apple-display.component.html',
  styleUrls: ['./apple-display.component.css'],
})
export class AppleDisplayComponent implements OnInit {
  badApples$: Observable<Apple[]> = of([]);
  goodApples$: Observable<Apple[]> = of([]);

  constructor(
    private applesService: ApplesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const apples$: Observable<Apple[]> = this.applesService.getApples();
    this.badApples$ = apples$.pipe(
      map((apples) => apples.filter((apple) => apple.isBad))
    );
    this.goodApples$ = apples$.pipe(
      map((apples) => apples.filter((apple) => !apple.isBad))
    );
  }

  editApple(apple: Apple) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = apple;
    const dialogRef = this.dialog.open(AppleDialogComponent, dialogConfig);
  }
}
