package pw.react.backend.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


@Setter
@Getter
@Entity
@Table(name = "flats")
public class Flat implements Serializable
{
    private static final long serialVersionUID = -6783504532088859179L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String name;

    @Column
    private int maxGuests;

    @Column
    private int price;

    @Enumerated(EnumType.STRING)
    private FlatType flatType;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

}
