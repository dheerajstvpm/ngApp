import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from "../model/eventModel";

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent {

  specialEvents: Event[] = []

  constructor(private _eventService: EventService, private _router: Router) {
  }

  ngOnInit() {
    this._eventService.getSpecial()
      .subscribe({
        next: (res) => this.specialEvents = res,
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            } 
          }
          console.log(err)
        }
      })
  }
}
