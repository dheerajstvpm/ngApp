import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from "../model/eventModel";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  events: Event[]=[]

  constructor(private _eventService: EventService) {}

  ngOnInit() {
    this._eventService.getEvents()
      .subscribe({
        next: (res) => this.events = res,
        error: (err) => console.log(err)
      })
  }
}
