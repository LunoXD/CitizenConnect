package com.citizenconnect.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CompleteOnboardingRequest(
        @NotBlank @Email String email,
        @NotBlank String name,
        @NotBlank @Pattern(regexp = "citizen|politician|moderator|admin") String role
) {
}
