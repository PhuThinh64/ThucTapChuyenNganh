package com.example.webdatsanbongda.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String index(){
        return "index";
    }
    @GetMapping("/booking")
    public String booking(){
        return "home/booking";
    }
    @GetMapping("/checkout")
    public String checkout(){
        return "home/checkout";
    }
    @GetMapping("/contact")
    public String contact(){
        return "home/contact";
    }
    @GetMapping("/venue-detail")
    public String venueDetail(){
        return "home/venue-detail";
    }
    @GetMapping("/venues")
    public String venues(){
        return "home/venues";
    }
    @GetMapping("home/account")
    public String account(){
        return "home/account";
    }
    @GetMapping("/about")
    public String about(){
        return "home/about";
    }
    @GetMapping("/login")
    public String login(){
        return "home/login";
    }
    @GetMapping("/forgot-password")
    public String forgotPassword(){
        return "home/forgot-password";
    }
    @GetMapping("/register")
    public String register(){
        return "home/register";
    }



}
