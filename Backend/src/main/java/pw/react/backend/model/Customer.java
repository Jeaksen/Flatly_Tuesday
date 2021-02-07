package pw.react.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "customers")
public class Customer implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    /*@NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private String phoneNo;*/

    @NotNull
    private String name = "Krzysztof";
    @NotNull
    private String surname = "Jarzyna";
    @NotNull
    private String phoneNo = "555 555 555";
}