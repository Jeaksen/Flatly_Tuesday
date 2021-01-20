package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.BookingsRepository;
import pw.react.backend.model.Booking;

import java.util.Collection;

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
    public Collection<Booking> getBookings() {
        logger.info("Bookings requested.");
        return repository.findAll();
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
            repository.deleteById(bookingId);
            logger.info("Booking with id {} cancelled.", bookingId);
            result = true;
        }
        else logger.info("Booking with id {} requested to be cancelled, but no such booking was found.", bookingId);
        return result;
    }
}
