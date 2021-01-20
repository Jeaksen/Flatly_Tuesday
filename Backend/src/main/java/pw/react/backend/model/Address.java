package pw.react.backend.model;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "addresses")
public class Address implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String country;
    @NotNull
    private String city;
    @NotNull
    private String streetName;
    @NotNull
    private String postCode;
    @NotNull
    private String buildingNumber;
    private String flatNumber;

    @OneToOne(mappedBy = "address")
    private transient Flat flat;
}