package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.AddressRepository;

import java.util.ArrayList;
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
        return repository.getCountries();
    }

    @Override
    public List<Pair<String, String>> getCities(String country)
    {
        var cities = repository.getCities(country);
        return createPairs(cities);
    }

    @Override
    public List<Pair<String, String>> getCities()
    {
        var cities = repository.getCities();
        return createPairs(cities);
    }

    private List<Pair<String, String>> createPairs(List<Object[]> cityCountryList)
    {
        List<Pair<String, String>> output = new ArrayList<>();
        for (var array:cityCountryList)
        {
            output.add(Pair.of(array[0].toString(), array[1].toString()));
        }
        return output;
    }
}
