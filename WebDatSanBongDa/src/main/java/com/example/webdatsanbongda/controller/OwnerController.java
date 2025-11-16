package com.example.webdatsanbongda.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/owner")
public class OwnerController {

    @GetMapping({"", "/dashboard"})
    public String viewDashboard() {
        return "owner/dashboard";
    }
    @GetMapping("/bookings")
    public String viewBookings() {
        return "owner/bookings";
    }
    @GetMapping("/revenue")
    public String viewUsers() {
        return "owner/revenue";
    }
    @GetMapping("/venues")
    public String viewVenues() {
        return "owner/venues";
    }


}
