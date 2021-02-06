package pw.react.backend.service;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.util.Pair;
import pw.react.backend.model.Address;

import java.util.List;

public interface AddressService
{
    List<String> getCountries();
    List<Pair<String, String>> getCities(Specification<Address> addressSpecification);
}
