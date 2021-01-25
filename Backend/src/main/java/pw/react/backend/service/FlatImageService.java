package pw.react.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pw.react.backend.appException.InvalidFileException;
import pw.react.backend.appException.ResourceNotFoundException;
import pw.react.backend.dao.FlatImageRepository;
import pw.react.backend.model.CompanyLogo;
import pw.react.backend.model.FlatImage;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FlatImageService implements ImageService
{

    FlatImageRepository repository;

    @Autowired
    public FlatImageService(FlatImageRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public List<FlatImage> storeImages(long flatId, List<MultipartFile> files)
    {
        List<FlatImage> saved = new ArrayList<>();
        for (MultipartFile file : files)
        {
            String fileName = file.getOriginalFilename();
            if (fileName == null || fileName.isEmpty())
                continue;
            fileName = StringUtils.cleanPath(fileName);
            try
            {
                if (fileName.contains(".."))
                    throw new InvalidFileException("Sorry! Filename contains invalid path sequence " + fileName);
                FlatImage newImage = new FlatImage(fileName, file.getContentType(), flatId, false, file.getBytes());
//                repository.findByFlatId(flatId).ifPresent(flatImage -> newImage.setId(flatImage.getId()));
//                repository.findByCompanyId(companyId).ifPresent(companyLogo -> newCompanyLogo.setId(companyLogo.getId()));
                saved.add(repository.save(newImage));
            } catch (IOException ex) {
                throw new InvalidFileException("Could not store file " + fileName + ". Please try again!", ex);
            }
        }
        return saved;
    }

    @Override
    public List<FlatImage> getFlatImages(long flatId)
    {
        List<FlatImage> list = repository.getAllByFlatId(flatId);
        if (list.isEmpty())
            throw new ResourceNotFoundException("No file found for flat with id " + flatId);
        return list;
    }

    @Override
    public boolean deleteFlatImage(long flatId, String imageId)
    {
        repository.deleteById(imageId);
        logger.info("Logo for the company with id {} deleted.", companyId);
    }
}
