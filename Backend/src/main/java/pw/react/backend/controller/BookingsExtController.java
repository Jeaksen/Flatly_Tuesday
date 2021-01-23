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
import pw.react.backend.service.BookingsService;
import pw.react.backend.service.general.SecurityProvider;

import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping("/ext/bookings")
public class BookingsExtController
{
    private final Logger logger = LoggerFactory.getLogger(BookingsController.class);
    private final SecurityProvider securityService;
    private final BookingsService bookingsService;

    @Autowired
    public BookingsExtController(SecurityProvider securityService, BookingsService bookingsService)
    {
        this.securityService = securityService;
        this.bookingsService = bookingsService;
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
                                                     BookingSpecification bookingSpecification,
                                                     @PageableDefault(size = 10) Pageable pageable) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(bookingsService.getBookings(bookingSpecification, pageable));
        }
        throw new UnauthorizedException("Get Bookings request is unauthorized");
    }

    /*@PostMapping(path = "")
    public ResponseEntity<String> postBooking(@RequestHeader HttpHeaders headers,
                                              @RequestBody Booking booking) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            boolean deleted = bookingsService.postBooking(booking);
            if (!deleted) {
                return ResponseEntity.badRequest().body(String.format("Booking with id %s already exists.", booking.getId()));
            }
            return ResponseEntity.ok(String.format("Booking with id %s posted.", booking.getId()));
        }
        throw new UnauthorizedException("Unauthorized access to resources.");
    }*/

    @PostMapping(path = "")
    public ResponseEntity<String> postBookings(@RequestHeader HttpHeaders headers,
                                               @RequestBody List<Booking> bookings) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            List<Booking> result = bookingsService.postBookings(bookings);
            if (result.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save the bookings");
            }
            return ResponseEntity.ok(result.stream().map(c -> String.valueOf(c.getId())).collect(joining(",")));
        }
        throw new UnauthorizedException("Unauthorized access to resources.");
    }

    @GetMapping(path = "/{bookingId}")
    public ResponseEntity<Booking> getBooking(@RequestHeader HttpHeaders headers,
                                              @PathVariable Long bookingId) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(bookingsService.getBooking(bookingId));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Booking.EMPTY);
    }

    @DeleteMapping(path = "/{bookingId}")
    public ResponseEntity<String> deleteBooking(@RequestHeader HttpHeaders headers,
                                                @PathVariable Long bookingId) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            boolean deleted = bookingsService.cancelBooking(bookingId);
            if (!deleted) {
                return ResponseEntity.badRequest().body(String.format("Booking with id %s does not exist.", bookingId));
            }
            return ResponseEntity.ok(String.format("Booking with id %s cancelled.", bookingId));
        }
        throw new UnauthorizedException("Unauthorized access to resources.");
    }
}
