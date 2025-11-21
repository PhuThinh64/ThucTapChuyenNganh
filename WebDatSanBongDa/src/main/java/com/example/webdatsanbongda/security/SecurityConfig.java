package com.example.webdatsanbongda.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public InMemoryUserDetailsManager userDetailsManager(){
        UserDetails thinh = User.builder()
                .username("thinh")
                .password("{noop}123")
                .roles("EMPLOYEE")
                .build();
        return new InMemoryUserDetailsManager(thinh);

    }
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests(configurer->
                configurer
                        .requestMatchers("/css/**", "/js/**", "/vendor/**", "/images/**").permitAll()
                        .requestMatchers("/login2").permitAll()
                        .anyRequest().authenticated())
                .formLogin(
                form->
                        form
                                .loginPage("/login2")
                                .loginProcessingUrl("/authenticateTheUser")
                                .permitAll()
        )
                .logout(logout->logout.permitAll()
        );
        return http.build();
    }

}
