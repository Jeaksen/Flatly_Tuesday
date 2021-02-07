package pw.react.backend.model;

import lombok.Data;

import javax.persistence.*;

@Table(name = "apiKeys")
@Data
@Entity
public class ApiKey
{
    private static final long serialVersionUID = -6783504532088859179L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false)
    private String key;
}
