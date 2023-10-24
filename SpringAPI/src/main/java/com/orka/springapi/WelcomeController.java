package com.orka.springapi;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class WelcomeController {
    @GetMapping("/welcome")
    public String welcome(){
        return "Welcome to the Spring Boot Azure Active Directory Protected API";
    }
}