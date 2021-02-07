package pw.react.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import pw.react.backend.model.Booking;

import java.util.List;

public interface BookingsService {
    Page<Booking> getBookings(Specification<Booking> bookingSpecification, Pageable pageable);
    Booking postBooking(Booking booking);
    Booking getBooking(Long bookingId);
    boolean cancelBooking(Long bookingId);
}
