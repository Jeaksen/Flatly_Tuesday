package pw.react.backend.controller.internal;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.model.Flat;
import pw.react.backend.service.FlatsService;
import pw.react.backend.service.ImageService;
import pw.react.backend.service.general.SecurityProvider;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping("/flats")
public class FlatController
{
    private final Logger logger = LoggerFactory.getLogger(FlatController.class);

    private final FlatsService flatsService;
    private final ImageService imageService;
    private final SecurityProvider securityService;

    @Autowired
    public FlatController(FlatsService flatsService, ImageService imageService, SecurityProvider securityService)
    {
        this.flatsService = flatsService;
        this.imageService = imageService;
        this.securityService = securityService;
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
    public ResponseEntity<Collection<Flat>> getFlats(@RequestHeader HttpHeaders headers)
    {
        logHeaders(headers);
        if (securityService.isAuthorized(headers))
        {
            return ResponseEntity.ok(flatsService.getFlats());
        } else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ArrayList<>());
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createFlat(@RequestHeader HttpHeaders headers, @RequestBody List<Flat> flats)
    {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            List<Flat> result = flatsService.saveFlats(flats);
            if (result.isEmpty())
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save the flats");
            else
                return ResponseEntity.ok(result.stream().map(c -> String.valueOf(c.getId())).collect(joining(",")));
        } else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
    }

    @DeleteMapping(path = "/{flatId}")
    public ResponseEntity<String> deleteFlat(@RequestHeader HttpHeaders headers, @PathVariable Long flatId)
    {
        logHeaders(headers);
        if (securityService.isAuthorized(headers))
        {
            boolean result = flatsService.deleteFlat(flatId);
            if (result)
                return ResponseEntity.ok(String.format("Flat with id %s deleted.", flatId));
            else
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(String.format("Flat with id %s not found.", flatId));
        } else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
    }

    @GetMapping(path = "/{flatId}")
    public ResponseEntity<Flat> getFlatDetails(@RequestHeader HttpHeaders headers, @PathVariable Long flatId)
    {
        logHeaders(headers);
        if (securityService.isAuthorized(headers))
        {
            return flatsService.getFlat(flatId).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Flat.Empty));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Flat.Empty);
    }

    @PutMapping(path = "/{flatId}")
    public ResponseEntity<Flat> updateCompany(@RequestHeader HttpHeaders headers, @PathVariable Long flatId, @RequestBody Flat updatedFlat) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers))
        {
            Flat result = flatsService.updateFlat(flatId, updatedFlat);
            if (Flat.Empty.equals(result))
                return ResponseEntity.badRequest().body(updatedFlat);
            return ResponseEntity.ok(result);
        } else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Flat.Empty);
    }

}
