package com.example.webdatsanbongda.service;


import com.example.webdatsanbongda.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CategoryService {
    List<Category> findAll();
    Category findById(int id);
    Category save(Category category);
    void delete(int id);
}
