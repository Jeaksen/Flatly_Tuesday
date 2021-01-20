package pw.react.backend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.Data;
import org.hibernate.annotations.NotFound;

import java.util.List;
import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "flats")
public class Flat implements Serializable
{
    private static final long serialVersionUID = -6783504532088859179L;

    public static Flat Empty() {return new Flat();}

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    private String name;
    @NotNull
    private int maxGuests;
    @NotNull
    private int price;
    @NotNull @Enumerated(EnumType.STRING)
    private FlatType flatType;
    @NotNull @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @OneToMany(mappedBy = "flat")
    @JsonBackReference
    private List<Booking> bookings;
}