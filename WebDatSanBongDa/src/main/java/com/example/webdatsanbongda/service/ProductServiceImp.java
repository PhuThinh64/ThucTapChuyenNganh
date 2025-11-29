package com.example.webdatsanbongda.service;

import com.example.webdatsanbongda.dao.ProductDAO;
import com.example.webdatsanbongda.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImp implements ProductService{
    private final ProductDAO productDAO;

    @Autowired
    public ProductServiceImp(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public List<Product> findAll(){
        return productDAO.findAll();
    }
    public Product findById(int id){
        return null;
    }

    public Product save(Product product){return null;
    }
    public void delete(int id){
    }
}
