package api.authService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "credentials")
public class CredentialsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long credentialId;

    @Column(nullable = false, unique = true)
    private String employeeId;

    @Column(nullable = true)
    private String password;

    @Column(nullable = false)
    private boolean isActive = false;



    public String getPassword() {
        return password;
    }

    public CredentialsEntity setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public CredentialsEntity setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public boolean isActive() {
        return isActive;
    }

    public CredentialsEntity setActive(boolean active) {
        isActive = active;
        return this;
    }

    public Long getCredentialId() {
        return credentialId;
    }

    public CredentialsEntity setCredentialId(Long credentialId) {
        this.credentialId = credentialId;
        return this;
    }
}
