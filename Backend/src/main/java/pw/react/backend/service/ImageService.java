package pw.react.backend.service;

import org.springframework.web.multipart.MultipartFile;
import pw.react.backend.model.CompanyLogo;
import pw.react.backend.model.FlatImage;

import java.util.List;

public interface ImageService
{
    FlatImage storeImage(long flatId, MultipartFile file);
    List<FlatImage> getFlatImages(long flatId);
    boolean deleteFlatImage(long flatId, String imageId);
}
