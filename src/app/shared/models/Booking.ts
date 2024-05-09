export interface Booking {
    bookingId: string;
    flight : {
        arrivalTime: string;
        date: string;
        departureCity: string;
        departureTime: string;
        destinationCity: string;
        price: number;
    };
    isFirstClassSeat: boolean;
    userId: string;
}