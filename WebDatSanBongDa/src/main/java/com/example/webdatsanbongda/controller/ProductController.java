package com.example.webdatsanbongda.controller;


import com.example.webdatsanbongda.entity.Category;
import com.example.webdatsanbongda.entity.Product;
import com.example.webdatsanbongda.service.CategoryService;
import com.example.webdatsanbongda.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    private CategoryService categoryService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("products")
    public String list(Model model) {
        List<Product> products = productService.findAll();
        model.addAttribute("products", products);
        return "admin/product/products";
    }

    @GetMapping("/add")
    public String addForm(Model model) {
        return null;
    }

    @PostMapping("/add")
    public String save(@ModelAttribute Product product) {
        return null;
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable("id") int id, Model model) {
        return null;
    }

    @PostMapping("/edit")
    public String update(@ModelAttribute("product") Product product) {
        return null;
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable int id) {return  null;
    }
}
