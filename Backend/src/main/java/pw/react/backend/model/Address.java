package pw.react.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Setter
@Getter
@Table(name = "addresses")
public class Address implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String country;
    @Column
    private String city;
    @Column
    private String streetName;
    @Column
    private String postCode;
    @Column
    private String buildingNumber;
    @Column
    private String flatNumber;

    @OneToOne(mappedBy = "address")
    private transient Flat flat;
}
