package pw.react.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pw.react.backend.model.FlatImage;

import java.util.List;

@Service
public class FlatImageService implements ImageService
{

    @Override
    public FlatImage storeImage(long flatId, MultipartFile file)
    {
        return null;
    }

    @Override
    public List<FlatImage> getFlatImages(long flatId)
    {
        return null;
    }

    @Override
    public boolean deleteFlatImage(long flatId, String imageId)
    {

        return false;
    }
}
