package api.authService.service;

import api.authService.model.CredentialsEntity;
import api.authService.model.UserPrincipal;
import api.authService.repository.CredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CredentialsService implements UserDetailsService {

    @Autowired
    private CredentialsRepository credentialsRepository;

    @Override
    public UserDetails loadUserByUsername(String employeeId) throws UsernameNotFoundException {

        CredentialsEntity credential = credentialsRepository.findByEmployeeId(employeeId);

        if(credential == null){
            throw new UsernameNotFoundException("Employee Not Found!");
        }

        return new UserPrincipal(credential);
    }

}
