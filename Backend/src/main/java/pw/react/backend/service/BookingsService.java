package pw.react.backend.service;

import pw.react.backend.model.Booking;
import pw.react.backend.model.Company;

import java.util.Collection;

public interface BookingsService {
    Collection<Booking> getBookings();
    Booking getBooking(Long bookingId);
    boolean cancelBooking(Long bookingId);
}
