package com.example.webdatsanbongda.dao;

import com.example.webdatsanbongda.entity.Category;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryDAOImp implements CategoryDAO {
    private EntityManager em;
    @Autowired
    public CategoryDAOImp(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Category> findAll() {
        TypedQuery<Category> query = em.createQuery("from Category",
                Category.class);
        return query.getResultList();
    }

    @Override
    public Category findById(int id) {
        return null;
    }

    @Override
    @Transactional
    public Category save(Category category) {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(int id) {

    }
}
