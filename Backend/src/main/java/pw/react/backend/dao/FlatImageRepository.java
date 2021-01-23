package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.model.FlatImage;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
public interface FlatImageRepository extends JpaRepository<FlatImage, String>
{
    Optional<FlatImage> findByFlatId(long flatId);
    void deleteByFlatId(long flatId);
}
