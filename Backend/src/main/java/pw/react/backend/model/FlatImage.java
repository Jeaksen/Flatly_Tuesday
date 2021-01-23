package pw.react.backend.model;

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
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private String fileType;
    @Column(nullable = false)
    private long flatId;
    @Column(nullable = false)
    private boolean isHeaderImage;
    @Column(nullable = false) @Lob
    private byte[] data;

    public FlatImage(String fileName, String fileType, long flatId, boolean isHeaderImage, byte[] data)
    {
        this.fileName = fileName;
        this.fileType = fileType;
        this.flatId = flatId;
        this.isHeaderImage = isHeaderImage;
        this.data = data;
    }
}
