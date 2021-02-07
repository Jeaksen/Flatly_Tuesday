package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.BookingsRepository;
import pw.react.backend.dao.specifications.BookingDatesSpecification;
import pw.react.backend.model.Booking;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.Boolean.FALSE;

@Service
class BookingsMainService implements BookingsService {
    private final Logger logger = LoggerFactory.getLogger(BookingsMainService.class);

    private BookingsRepository repository;

    BookingsMainService() { /*Needed only for initializing spy in unit tests*/}

    @Autowired
    BookingsMainService(BookingsRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<Booking> getBookings(Specification<Booking> bookingSpecification, Pageable pageable) {
        logger.info("Bookings requested.");
        return repository.findAll(bookingSpecification, pageable);
    }

    @Override
    public Booking postBooking(Booking booking) {
        Booking result = new Booking();
        Booking toSave = booking;
        try {
            toSave.setCustomerId(booking.getCustomer().getId());
            result = repository.save(toSave);
        } catch (DataIntegrityViolationException e) {
            logger.error(String.format("Failed to save booking %s", e.getMessage()));
        }
        return result;
    }

    @Override
    public Booking getBooking(Long bookingId) {
        Booking result = null;
        if (repository.existsById(bookingId)) {
            logger.info("Booking with id {} requested.", bookingId);
            result = repository.getOne(bookingId);
        }
        else logger.info("Booking with id {} requested, but no such booking was found.", bookingId);
        return result;
    }

    @Override
    public boolean cancelBooking(Long bookingId) {
        boolean result = false;
        if (repository.existsById(bookingId)) {
            Booking booking = repository.getOne(bookingId);
            booking.setActive(FALSE);
            repository.save(booking);
            logger.info("Booking with id {} cancelled.", bookingId);
            result = true;
        }
        else logger.info("Booking with id {} requested to be cancelled, but no such booking was found.", bookingId);
        return result;
    }

    @Override
    public List<Booking> getBookingsInDateRange(BookingDatesSpecification bookingDatesSpecification)
    {
        return repository.findAll(bookingDatesSpecification);
    }
}
