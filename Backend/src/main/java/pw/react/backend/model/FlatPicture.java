package pw.react.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "flat_pictures")
@Data
@NoArgsConstructor
public class FlatPicture
{
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String fileName;
    private String fileType;
    private long flatId;
    @Lob
    private byte[] data;

    public FlatPicture(String fileName, String fileType, long flatId, byte[] data)
    {
        this.fileName = fileName;
        this.fileType = fileType;
        this.flatId = flatId;
        this.data = data;
    }
}
