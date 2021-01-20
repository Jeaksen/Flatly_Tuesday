package pw.react.backend.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.appException.UnauthorizedException;
import pw.react.backend.model.Booking;
import pw.react.backend.service.BookingsService;
import pw.react.backend.service.SecurityProvider;

import java.util.Collection;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping("/bookings")
public class BookingsController
{
    private final Logger logger = LoggerFactory.getLogger(BookingsController.class);
    private final SecurityProvider securityService;
    private final BookingsService bookingsService;

    public BookingsController(SecurityProvider securityService, BookingsService bookingsService)
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
    public ResponseEntity<Collection<Booking>> getBookings(@RequestHeader HttpHeaders headers) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            return ResponseEntity.ok(bookingsService.getBookings());
        }
        throw new UnauthorizedException("Get Bookings request is unauthorized");
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
            return ResponseEntity.ok(String.format("Booking with id %s cancelled", bookingId));
        }
        throw new UnauthorizedException("Unauthorized access to resources.");
    }
}