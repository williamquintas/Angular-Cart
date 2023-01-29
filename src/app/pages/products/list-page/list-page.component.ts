import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { ErrorService } from "../../../core/services";

@Component({
  selector: "app-list-page",
  templateUrl: "./list-page.component.html",
  styleUrls: ["./list-page.component.scss"],
})
export class ListPage {
  isComponentDestroyed$ = new Subject<boolean>();
  category!: string;

  constructor(
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe({
        next: (params) => {
          this.category = params["category"];
        },
        error: (err) => {
          this.errorService.open(err);
        },
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }
}
