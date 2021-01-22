package pw.react.backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.Nullable;
import pw.react.backend.dao.specifications.FlatSpecification;
import pw.react.backend.model.Flat;
import org.springframework.lang.NonNull;
import javax.validation.constraints.NotNull;

public interface FlatRepository extends JpaRepository<Flat, Long>, JpaSpecificationExecutor<Flat>
{

}
