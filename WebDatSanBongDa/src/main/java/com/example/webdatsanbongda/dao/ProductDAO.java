package com.example.webdatsanbongda.dao;

import com.example.webdatsanbongda.entity.Product;

import java.util.List;

public interface ProductDAO {
    List<Product> findAll();
    Product findById(int id);
    Product save(Product product);
    void deleteById(int id);
}
