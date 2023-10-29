package com.orka.springapi;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

//
// this article documents method-level role authorization in Spring
//
// https://www.baeldung.com/spring-security-method-security
//
@RestController
@RequestMapping("/api")
public class WelcomeController {
    @PreAuthorize("hasAuthority('Admin')")
    @GetMapping("/welcomeAdmin")
    public String welcomeAdmin(){
        return "Admin! Welcome to the Spring Boot Azure Active Directory Protected API";
    }
    @PreAuthorize("hasAuthority('User')")
    @GetMapping("/welcomeUser")
    public String welcomeUser(){
        return "User! Welcome to the Spring Boot Azure Active Directory Protected API";
    }
    @GetMapping("/authorities")
    public List<String> getAuthorities(Authentication authentication) {
        return authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }
}