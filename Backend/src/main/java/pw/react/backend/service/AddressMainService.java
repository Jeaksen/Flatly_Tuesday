package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.AddressRepository;
import pw.react.backend.model.Address;

import java.util.List;

@Service
public class AddressMainService implements AddressService
{
    private final Logger logger = LoggerFactory.getLogger(AddressMainService.class);

    AddressRepository repository;

    @Autowired
    AddressMainService(AddressRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public List<String> getCountries()
    {
        return null;
    }

    @Override
    public List<Pair<String, String>> getCities(Specification<Address> addressSpecification)
    {
        return null;
    }
}
