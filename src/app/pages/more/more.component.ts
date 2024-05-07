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
    firstClassSeats: new FormControl<number>(1, [Validators.required, Validators.pattern("^[1-9]+$"), Validators.min(1), Validators.max(150)]),
    secondClassSeats: new FormControl<number>(1, [Validators.required, Validators.pattern("^[1-9]+$"), Validators.min(1), Validators.max(500)])
  });
  addFlightForm = new FormGroup({
    departureCity: new FormControl<string>('', [Validators.required]),
    destinationCity: new FormControl<string>('', [Validators.required]),
    date: new FormControl<string>('', [Validators.required]),
    departureTime: new FormControl<string>('', [Validators.required]),
    arrivalTime: new FormControl<string>('', [Validators.required]),
    aircraft: new FormControl<string>('', [Validators.required]),
    airline: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(1, [Validators.required, Validators.pattern("^[1-9]+$"), Validators.min(1), Validators.max(2500)])
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
    this.errorMessage = 'finish the airline form';
  }

  addAircraft() {
    this.errorMessage = 'finish the aircraft form';
  }

  addFlight() {
    this.errorMessage = 'finish the flight form';
    const date = this.addFlightForm.get('date')?.value as string;
    const departureTime = this.addFlightForm.get('departureTime')?.value as string;
    const arrivalTime = this.addFlightForm.get('arrivalTime')?.value as string;
    console.log('date: ' + date);
    console.log('departureTime: ' + departureTime);
    console.log('arrivalTime: ' + arrivalTime);
  }

  updateSelectedOption(option: string) {
    this.errorMessage = null;
    this.selectedOption = option;
    localStorage.setItem('selectedOption', option);
  }
}
