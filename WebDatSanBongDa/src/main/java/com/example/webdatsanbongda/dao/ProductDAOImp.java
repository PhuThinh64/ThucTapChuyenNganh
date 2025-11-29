package com.example.webdatsanbongda.dao;

import com.example.webdatsanbongda.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductDAOImp implements ProductDAO {
    private EntityManager em;

    @Autowired
    public ProductDAOImp(EntityManager em) {
        this.em = em;
    }
    public List<Product> findAll(){
        TypedQuery<Product> query = em.createQuery("from Product",
                Product.class);
        return query.getResultList();
    }
    public Product findById(int id)
    {
        return null;
    }
    public Product save(Product product)
    {
        return null;
    }

    public void deleteById(int id)
    {

    }

}
