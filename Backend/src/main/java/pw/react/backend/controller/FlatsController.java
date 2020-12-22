package pw.react.backend.controller;


import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.dao.FlatsRepository;
import pw.react.backend.model.Flat;

import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping("/flats")
public class FlatsController
{

    private final FlatsRepository repository;

    public  FlatsController(FlatsRepository repository)
    {
        this.repository = repository;
    }


    @GetMapping(path = "")
    public ResponseEntity<Collection<Flat>> getFlats()
    {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createFlat(@RequestHeader HttpHeaders headers, @RequestBody List<Flat> flats)
    {
        List<Flat> result = repository.saveAll(flats);
        return ResponseEntity.ok(result.stream().map(c -> String.valueOf(c.getId())).collect(joining(",")));

    }
}
