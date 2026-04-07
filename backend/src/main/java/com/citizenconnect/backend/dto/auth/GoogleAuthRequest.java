package com.citizenconnect.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record GoogleAuthRequest(
        @NotBlank String idToken,
        @Pattern(regexp = "citizen|politician|moderator|admin") String role
) {
}
