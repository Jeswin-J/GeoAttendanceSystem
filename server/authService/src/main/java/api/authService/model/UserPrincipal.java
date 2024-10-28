package api.authService.model;

import jakarta.persistence.Entity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class UserPrincipal implements UserDetails {

    private CredentialsEntity credentials;

    public UserPrincipal(CredentialsEntity credentials){
        this.credentials = credentials;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }


    @Override
    public String getPassword() {
        return credentials.getPassword();
    }


    @Override
    public String getUsername() {
        return credentials.getEmployeeId();
    }
}
