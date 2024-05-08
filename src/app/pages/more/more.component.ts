import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirlineService } from '../../shared/services/airline.service';
import { AircraftService } from '../../shared/services/aircraft.service';
import { FlightService } from '../../shared/services/flight.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Airline } from '../../shared/models/Airline';
import { Aircraft } from '../../shared/models/Aircraft';
import { Flight } from '../../shared/models/Flight';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {
  aircraftOptions: Aircraft[] = [];
  airlineOptions: Airline[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedOption: string = 'airline';
  addAirlineForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required])
  });
  addAircraftForm = new FormGroup({
    model: new FormControl<string>('', [Validators.required]),
    firstClassSeats: new FormControl<number>(1, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(1), Validators.max(150)]),
    secondClassSeats: new FormControl<number>(1, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(1), Validators.max(500)])
  });
  addFlightForm = new FormGroup({
    departureCity: new FormControl<string>('', [Validators.required]),
    destinationCity: new FormControl<string>('', [Validators.required]),
    date: new FormControl<Date>(new Date(), [Validators.required]),
    departureTime: new FormControl<string>('', [Validators.required]),
    arrivalTime: new FormControl<string>('', [Validators.required]),
    aircraft: new FormControl<Aircraft>(this.aircraftOptions[0], [Validators.required]),
    airline: new FormControl<Airline>(this.airlineOptions[0], [Validators.required]),
    price: new FormControl<number>(1, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(1), Validators.max(2500)])
  });

  constructor(private router: Router, private airlineService: AirlineService, 
    private aircraftService: AircraftService, private flightService: FlightService) { }

  ngOnInit() {
    const storedOption = localStorage.getItem('selectedOption');
    this.selectedOption = storedOption || 'airline';

    this.aircraftService.getAll().subscribe(options => {
      this.aircraftOptions = options;
    });

    this.airlineService.getAll().subscribe(options => {
      this.airlineOptions = options;
    });
  }

  addAirline() {
    if (this.addAirlineForm.valid) {
      const name = this.addAirlineForm.get('name')?.value as string;
      const airline: Airline = {
        airlineId: this.airlineService.generateId(),
        name: name
      };
      this.airlineService.create(airline).then(_ => {
        this.successMessage = 'Airline created successfully.';
        this.addAirlineForm.reset();
      }).catch(error => {
        console.error(error);
        this.errorMessage = 'An error occurred during airline creation.';
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
    this.messageTimeout();
  }

  addAircraft() {
    if (this.addAircraftForm.valid) {
      const firstClassSeats = this.addAircraftForm.get('firstClassSeats')?.value as number;
      const model = this.addAircraftForm.get('model')?.value as string;
      const secondClassSeats = this.addAircraftForm.get('secondClassSeats')?.value as number;
      const aircraft: Aircraft = {
        aircraftId: this.aircraftService.generateId(),
        firstClassSeats: firstClassSeats,
        model: model,
        secondClassSeats: secondClassSeats
      };
      this.aircraftService.create(aircraft).then(_ => {
        this.successMessage = 'Aircraft created successfully.';
        this.addAircraftForm.reset();
      }).catch(error => {
        console.error(error);
        this.errorMessage = 'An error occurred during aircraft creation.';
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
    this.messageTimeout();
  }

  addFlight() {
    if (this.addFlightForm.valid) {
      const departureCity = this.addFlightForm.get('departureCity')?.value as string;
      const destinationCity = this.addFlightForm.get('destinationCity')?.value as string;
      const date = this.addFlightForm.get('date')?.value as Date;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const fullDate = month + '.' + day + '.' + year;
      const departureTime = this.addFlightForm.get('departureTime')?.value as string;
      const arrivalTime = this.addFlightForm.get('arrivalTime')?.value as string;
      const aircraft = this.addFlightForm.get('aircraft')?.value;
      const airline = this.addFlightForm.get('airline')?.value;
      const price = this.addFlightForm.get('price')?.value as number;

      const flight: Flight = {
        aircraft: aircraft?.model as string,
        airline: airline?.name as string,
        arrivalTime: arrivalTime,
        date: fullDate,
        departureCity: departureCity,
        departureTime: departureTime,
        destinationCity: destinationCity,
        flightDuration: this.calculateFlightDuration(departureTime, arrivalTime),
        flightId: this.flightService.generateId(),
        price: price,
        vacantFirstClassSeats: aircraft?.firstClassSeats as number,
        vacantSecondClassSeats: aircraft?.secondClassSeats as number
      };
      this.flightService.create(flight).then(_ => {
        this.successMessage = 'Flight created successfully.';
        this.addFlightForm.reset();
      }).catch(error => {
        console.error(error);
        this.errorMessage = 'An error occurred during flight creation.';
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
    this.messageTimeout();
  }

  updateSelectedOption(option: string) {
    this.errorMessage = null;
    this.selectedOption = option;
    localStorage.setItem('selectedOption', option);
  }

  messageTimeout() {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
    }, 2000);
  }

  calculateFlightDuration(departureTime: string, arrivalTime: string): string {
    const [departureHour, departureMinute] = departureTime.split(':');
    const [arrivalHour, arrivalMinute] = arrivalTime.split(':');
    const departureHourNum = parseInt(departureHour);
    const departureMinuteNum = parseInt(departureMinute);
    const arrivalHourNum = parseInt(arrivalHour);
    const arrivalMinuteNum = parseInt(arrivalMinute);

    let flightDurationHour = arrivalHourNum - departureHourNum;
    let flightDurationMinute = arrivalMinuteNum - departureMinuteNum;

    if (flightDurationHour < 0) {
      flightDurationHour = 24 - Math.abs(flightDurationHour);
    }

    if (flightDurationMinute < 0) {
      flightDurationMinute = 60 - Math.abs(flightDurationMinute);
    }

    let flightDuration: string = flightDurationHour + ' hour';

    if (flightDurationMinute !== 0) {
      flightDuration += ' ' + flightDurationMinute + ' minutes';
    }

    return flightDuration;
  }
}
