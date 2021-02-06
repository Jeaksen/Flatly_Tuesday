package pw.react.backend.service;

import org.springframework.data.util.Pair;

import java.util.List;

public interface AddressService
{
    List<String> getCountries();
    List<Pair<String, String>> getCities(String country);
    List<Pair<String, String>> getCities();
}
