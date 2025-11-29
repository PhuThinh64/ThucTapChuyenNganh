package com.example.webdatsanbongda.service;

import com.example.webdatsanbongda.dao.CategoryDAO;
import com.example.webdatsanbongda.entity.Category;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceImp implements CategoryService {
    private CategoryDAO categoryDAO;
    @Autowired
    public CategoryServiceImp(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    @Override
    public List<Category> findAll() {

        return categoryDAO.findAll();
    }

    @Override
    public Category findById(int id) {
        return null;
    }

    @Override
    public Category save(Category category) {
        return null;
    }

    @Override
    public void delete(int id) {
    }
}
