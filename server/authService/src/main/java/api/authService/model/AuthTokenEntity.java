package api.authService.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "authToken")
public class AuthTokenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "credentialId", nullable = false)
    private CredentialsEntity credentials;

    @Column(nullable = false)
    private String accessToken;

    @Column(nullable = false)
    private Timestamp issuedTimestamp;

    @Column(nullable = false)
    private Timestamp expiryTimestamp;

    @Column(nullable = false)
    private boolean isRevoked;


    public Long getTokenId() {
        return tokenId;
    }

    public void setTokenId(Long tokenId) {
        this.tokenId = tokenId;
    }

    public CredentialsEntity getCredentials() {
        return credentials;
    }

    public void setCredentials(CredentialsEntity credentials) {
        this.credentials = credentials;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Timestamp getIssuedTimestamp() {
        return issuedTimestamp;
    }

    public void setIssuedTimestamp(Timestamp issuedTimestamp) {
        this.issuedTimestamp = issuedTimestamp;
    }

    public Timestamp getExpiryTimestamp() {
        return expiryTimestamp;
    }

    public void setExpiryTimestamp(Timestamp expiryTimestamp) {
        this.expiryTimestamp = expiryTimestamp;
    }

    public boolean isRevoked() {
        return isRevoked;
    }

    public void setRevoked(boolean revoked) {
        isRevoked = revoked;
    }
}
