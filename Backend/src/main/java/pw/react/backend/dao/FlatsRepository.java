package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.model.Flat;

public interface FlatsRepository extends JpaRepository<Flat, Long>
{

}
