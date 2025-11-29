package com.example.webdatsanbongda.controller;

import com.example.webdatsanbongda.dao.CategoryDAOImp;
import com.example.webdatsanbongda.entity.Category;
import com.example.webdatsanbongda.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("category-list")
    public String list(Model model) {
        List<Category> categories= categoryService.findAll();
       model.addAttribute("cate_gories",categories);
       return "admin/category/category-list";
    }

    @GetMapping("/add")
    public String addForm(Model model) {return null;
    }

    @PostMapping("/add")
    public String save(@ModelAttribute Category category) {return null;
    }

    @GetMapping("/edit/{id}")
    public String editForm(@PathVariable int id, Model model) {return null;
    }

    @PostMapping("/edit")
    public String update(@ModelAttribute Category category) {
        return null;
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable int id) {return null;
    }
}
