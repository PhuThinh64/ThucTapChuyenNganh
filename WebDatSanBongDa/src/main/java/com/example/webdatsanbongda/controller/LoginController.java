package com.example.webdatsanbongda.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    @GetMapping("/login2")
    public String login2(){
        return "login2";
    }
}
