package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long>
{
}