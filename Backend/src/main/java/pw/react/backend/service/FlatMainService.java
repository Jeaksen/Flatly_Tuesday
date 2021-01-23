package pw.react.backend.service;

import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.FlatRepository;
import pw.react.backend.model.Flat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class FlatMainService implements FlatsService
{
    private final Logger logger = LoggerFactory.getLogger(FlatMainService.class);

    FlatRepository repository;

    @Autowired
    FlatMainService(FlatRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public Flat updateFlat(Long flatId, Flat updatedFlat)
    {
        Flat result = Flat.Empty;
        if (repository.existsById(flatId))
        {
            updatedFlat.setId(flatId);
            result = repository.save(updatedFlat);
            logger.info("Flat with id {} updated.", flatId);
        }
        return result;
    }

    @Override
    public boolean deleteFlat(Long flatId)
    {
        boolean result = false;
        if (repository.existsById(flatId))
        {
            repository.deleteById(flatId);
            logger.info("Flat with id {} deleted.", flatId);
            result = true;
        }
        return result;
    }

    @Override
    public List<Flat> saveFlats(List<Flat> flats)
    {
        List<Flat> results = new ArrayList<>();
        try {
            results = repository.saveAll(flats);
        } catch (DataIntegrityViolationException e) {
            logger.error(String.format("Failed to save flats %s", e.getMessage()));
        }

        return results;
    }

    @Override
    public Page<Flat> getFlats(Specification<Flat> flatSpecification, Pageable pageable)
    {
        return repository.findAll(flatSpecification, pageable);
    }

    @Override
    public Optional<Flat> getFlat(Long flatId)
    {
        return repository.findById(flatId);
    }
}
