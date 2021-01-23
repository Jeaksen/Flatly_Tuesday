package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>
{

}
