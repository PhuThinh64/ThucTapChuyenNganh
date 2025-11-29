package com.example.webdatsanbongda.service;

import com.example.webdatsanbongda.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();
    Product findById(int id);
    Product save(Product product);
    void delete(int id);
}
