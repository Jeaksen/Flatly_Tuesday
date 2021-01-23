package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>
{
}