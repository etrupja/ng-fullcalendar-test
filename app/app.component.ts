import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  calendarOptions: Options;
 displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventSesrvice) { }

  ngOnInit(){

    this.eventService.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: data,
        selectable: true
      };
    });
  }

     dayRender (date, cell) {
      //console.log(date, cell);
      //cell.css('background-color', 'red');
      let btn = document.createElement( "button" );
      btn.textContent = 'myButton';
      cell.append(btn);
    }

//@ericmartinezr btw, how did you figure out you needed to place dayRender() inside ngViewAfterInit()?

// Eric Martinez @ericmartinezr 18:53
// Because of the ViewChild
// https://angular.io/api/core/ViewChild#description
// if I used ucCalendar in ngOnInit it was undefined

  ngAfterViewInit() { // dayClick() works with dayRender() if you place in ngAfterViewInit:

  //   this.ucCalendar.fullCalendar({
  //           dayRender: (date, cell) => {
  //       //console.log(date, cell);
  //       //cell.css('background-color', 'red');
  //       let btn = document.createElement( "button" );
  //       btn.textContent = 'myButton';
  //       cell.append(btn);
  //     },

  //       dayClick: (event) => {
  //       console.log('dayClick', event);
  //     }
  // });

}

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

  dayClick(event) {
    console.log('dayClick', event);
  }
 
}
