package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pw.react.backend.model.Booking;

public interface BookingsRepository extends JpaRepository<Booking, Long>, JpaSpecificationExecutor<Booking>
{
}