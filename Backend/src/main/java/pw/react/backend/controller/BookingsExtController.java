package pw.react.backend.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.appException.UnauthorizedException;
import pw.react.backend.dao.specifications.BookingSpecification;
import pw.react.backend.model.Booking;
import pw.react.backend.model.Flat;
import pw.react.backend.service.BookingsService;
import pw.react.backend.service.FlatsService;
import pw.react.backend.service.general.SecurityProvider;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping("/ext/bookings")
public class BookingsExtController
{
    private final Logger logger = LoggerFactory.getLogger(BookingsController.class);
    private final SecurityProvider securityService;
    private final BookingsService bookingsService;
    private final FlatsService flatsService;

    @Autowired
    public BookingsExtController(SecurityProvider securityService, BookingsService bookingsService, FlatsService flatsService)
    {
        this.securityService = securityService;
        this.bookingsService = bookingsService;
        this.flatsService = flatsService;
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    @GetMapping(path = "")
    public ResponseEntity<Page<Booking>> getBookings(@RequestHeader HttpHeaders headers,
                                                     @RequestParam(value = "apiKey", required = false) String apiKey,
                                                     BookingSpecification bookingSpecification,
                                                     @PageableDefault(size = 10) Pageable pageable) {
        logHeaders(headers);
        if (securityService.isApiKeyValid(apiKey)) {
            return ResponseEntity.ok(bookingsService.getBookings(bookingSpecification, pageable));
        }
        throw new UnauthorizedException("Get Bookings request is unauthorized");
    }

    @PostMapping(path = "")
    public ResponseEntity<Booking> postBookings(@RequestHeader HttpHeaders headers,
                                                @RequestParam(value = "apiKey", required = false) String apiKey,
                                                @RequestParam(value = "customerId", required = true) Long customerId,
                                                @RequestParam(value = "flatId", required = true) Long flatId,
                                                @RequestBody Booking booking) {
        logHeaders(headers);
        if (securityService.isApiKeyValid(apiKey)) {
            Booking result = bookingsService.postBooking(booking, customerId, flatId);
            if (result.getId() == 0) {
                return ResponseEntity.badRequest().body(result);
            }
            long id = result.getFlat().getId();
            result.setFlat(flatsService.getFlat(id).get());
            return ResponseEntity.ok(result);
        }
        throw new UnauthorizedException("Unauthorized access to resources.");
    }

    @GetMapping(path = "/{bookingId}")
    public ResponseEntity<Booking> getBooking(@RequestHeader HttpHeaders headers,
                                              @RequestParam(value = "apiKey", required = false) String apiKey,
                                              @PathVariable Long bookingId) {
        logHeaders(headers);
        if (securityService.isApiKeyValid(apiKey)) {
            Booking booking = bookingsService.getBooking(bookingId);
            if (booking == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Booking.EMPTY);
            }
            //Customer customer = tutaj wlepic request po customera do api bookly
            // NIE trzeba bo bookly ma dane o customerze
            //booking.setCustomer(customer);
            return ResponseEntity.ok(booking);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Booking.EMPTY);
    }

    @DeleteMapping(path = "/{bookingId}")
    public ResponseEntity<String> deleteBooking(@RequestHeader HttpHeaders headers,
                                                @RequestParam(value = "apiKey", required = false) String apiKey,
                                                @PathVariable Long bookingId) {
        logHeaders(headers);
        if (securityService.isApiKeyValid(apiKey)) {
            boolean deleted = bookingsService.cancelBooking(bookingId);
            if (!deleted) {
                return ResponseEntity.badRequest().body(String.format("Booking with id %s does not exist.", bookingId));
            }
            return ResponseEntity.ok(String.format("Booking with id %s cancelled.", bookingId));
        }
        throw new UnauthorizedException("Unauthorized access to resources.");
    }
}
