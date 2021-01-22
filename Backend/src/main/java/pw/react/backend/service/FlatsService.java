package pw.react.backend.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import pw.react.backend.dao.specifications.FlatSpecification;
import pw.react.backend.model.Flat;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface FlatsService
{
    Flat updateFlat(Long id, Flat updatedFlat);
    boolean deleteFlat(Long flatId);
    List<Flat> saveFlats(List<Flat> flats);
    Page<Flat> getFlats(Specification<Flat> flatSpecification, Pageable pageable);
    Optional<Flat> getFlat(Long flatId);
}
