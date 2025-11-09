package com.example.webdatsanbongda.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping({"", "/dashboard"})
    public String viewDashboard() {
        return "admin/dashboard";
    }
    @GetMapping("/bookings")
    public String viewBookings() {
        return "admin/bookings";
    }
    @GetMapping("/users")
    public String viewUsers() {
        return "admin/users";
    }
    @GetMapping("/venues")
    public String viewVenues() {
        return "admin/venues";
    }
}
