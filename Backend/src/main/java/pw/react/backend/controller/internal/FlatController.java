package pw.react.backend.controller.internal;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.appException.UnauthorizedException;
import pw.react.backend.dao.specifications.FlatSpecification;
import pw.react.backend.model.Flat;
import pw.react.backend.service.FlatsService;
import pw.react.backend.service.ImageService;
import pw.react.backend.service.general.SecurityProvider;

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
    public ResponseEntity<Page<Flat>> getFlats(@RequestHeader HttpHeaders headers,
                                               FlatSpecification flatSpecification,
                                               @PageableDefault(size = 10) Pageable pageable)
    {
        logHeaders(headers);
        if (securityService.isAuthorized(headers))
        {
            return ResponseEntity.ok(flatsService.getFlats(flatSpecification, pageable));
        } else
            throw new UnauthorizedException("Unauthorized access to resources.");
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createFlat(@RequestHeader HttpHeaders headers,
                                             @RequestBody List<Flat> flats)
    {
        logHeaders(headers);
        if (securityService.isAuthorized(headers)) {
            List<Flat> result = flatsService.saveFlats(flats);
            if (result.isEmpty())
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save the flats");
            else
                return ResponseEntity.ok(result.stream().map(c -> String.valueOf(c.getId())).collect(joining(",")));
        } else
            throw new UnauthorizedException("Unauthorized access to resources.");
    }

    @DeleteMapping(path = "/{flatId}")
    public ResponseEntity<String> deleteFlat(@RequestHeader HttpHeaders headers,
                                             @PathVariable Long flatId)
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
            throw new UnauthorizedException("Unauthorized access to resources.");
    }

    @GetMapping(path = "/{flatId}")
    public ResponseEntity<Flat> getFlatDetails(@RequestHeader HttpHeaders headers,
                                               @PathVariable Long flatId)
    {
        logHeaders(headers);
        if (securityService.isAuthorized(headers))
        {
            return flatsService.getFlat(flatId).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Flat.Empty));
        }
        throw new UnauthorizedException("Unauthorized access to resources.");
    }

    @PutMapping(path = "/{flatId}")
    public ResponseEntity<Flat> updateCompany(@RequestHeader HttpHeaders headers,
                                              @PathVariable Long flatId,
                                              @RequestBody Flat updatedFlat) {
        logHeaders(headers);
        if (securityService.isAuthorized(headers))
        {
            Flat result = flatsService.updateFlat(flatId, updatedFlat);
            if (Flat.Empty.equals(result))
                return ResponseEntity.badRequest().body(updatedFlat);
            return ResponseEntity.ok(result);
        } else
            throw new UnauthorizedException("Unauthorized access to resources.");
    }

}
