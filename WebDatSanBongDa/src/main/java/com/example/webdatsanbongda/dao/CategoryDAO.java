package com.example.webdatsanbongda.dao;

import com.example.webdatsanbongda.entity.Category;

import java.util.List;

public interface CategoryDAO {
    List<Category> findAll();
    Category findById(int id);
    Category save(Category category);
    void deleteById(int id);

}
