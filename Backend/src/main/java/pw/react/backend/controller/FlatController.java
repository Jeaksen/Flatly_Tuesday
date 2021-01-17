package pw.react.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.model.Flat;
import pw.react.backend.service.FlatsService;
import pw.react.backend.service.ImageService;

import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping("/flats")
public class FlatController
{

    private final FlatsService flatsService;
    private final ImageService imageService;

    @Autowired
    public FlatController(FlatsService flatsService, ImageService imageService)
    {
        this.flatsService = flatsService;
        this.imageService = imageService;
    }


    @GetMapping(path = "")
    public ResponseEntity<Collection<Flat>> getFlats()
    {
        return ResponseEntity.ok(flatsService.getFlats());
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createFlat(@RequestBody List<Flat> flats)
    {
        List<Flat> result = flatsService.saveFlats(flats);
        if (result.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save the flats");
        else
            return ResponseEntity.ok(result.stream().map(c -> String.valueOf(c.getId())).collect(joining(",")));
    }

    @DeleteMapping(path = "/{flatId}")
    public ResponseEntity<String> deleteFlat(@PathVariable Long flatId)
    {
        boolean result = flatsService.deleteFlat(flatId);
        if (result)
            return ResponseEntity.ok(String.format("Flat with id %s deleted.", flatId));
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(String.format("Flat with id %s not found.", flatId));
    }

    @GetMapping(path = "/{flatId}")
    public ResponseEntity<Flat> getFlatDetails(@PathVariable Long flatId)
    {
        return flatsService.getFlat(flatId).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Flat.Empty()));
    }
}
