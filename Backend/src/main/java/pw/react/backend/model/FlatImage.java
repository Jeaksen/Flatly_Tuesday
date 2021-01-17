package pw.react.backend.model;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "flat_pictures")
@Data
@NoArgsConstructor
public class FlatImage
{
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    @NotNull
    private String fileName;
    @NotNull
    private String fileType;
    @NotNull
    private long flatId;
    @NotNull @Lob
    private byte[] data;

    public FlatImage(String fileName, String fileType, long flatId, byte[] data)
    {
        this.fileName = fileName;
        this.fileType = fileType;
        this.flatId = flatId;
        this.data = data;
    }
}
