package pw.react.backend.service;

import pw.react.backend.model.Flat;

import java.util.List;
import java.util.Optional;

public interface FlatsService
{
    Flat updateFlat(Long id, Flat updatedFlat);
    boolean deleteFlat(Long flatId);
    List<Flat> saveFlats(List<Flat> flats);
    List<Flat> getFlats();
    Optional<Flat> getFlat(Long flatId);
}
