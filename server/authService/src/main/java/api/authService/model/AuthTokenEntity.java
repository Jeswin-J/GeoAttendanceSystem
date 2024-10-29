package api.authService.model;

import api.authService.service.Auth;
import groovy.transform.builder.Builder;
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

    @Column(nullable = false)
    private boolean isInvite = false;

    @Column(nullable = true)
    private String invitedBy;


    public Long getTokenId() {
        return tokenId;
    }

    public void setTokenId(Long tokenId) {
        this.tokenId = tokenId;
    }

    public CredentialsEntity getCredentials() {
        return credentials;
    }

    public AuthTokenEntity setCredentials(CredentialsEntity credentials) {
        this.credentials = credentials;
        return this;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public AuthTokenEntity setAccessToken(String accessToken) {
        this.accessToken = accessToken;
        return this;
    }

    public Timestamp getIssuedTimestamp() {
        return issuedTimestamp;
    }

    public AuthTokenEntity setIssuedTimestamp(Timestamp issuedTimestamp) {
        this.issuedTimestamp = issuedTimestamp;
        return this;
    }

    public Timestamp getExpiryTimestamp() {
        return expiryTimestamp;
    }

    public AuthTokenEntity setExpiryTimestamp(Timestamp expiryTimestamp) {
        this.expiryTimestamp = expiryTimestamp;
        return this;
    }

    public boolean isRevoked() {
        return isRevoked;
    }

    public AuthTokenEntity setRevoked(boolean revoked) {
        isRevoked = revoked;
        return this;
    }

    public boolean isInvite() {
        return isInvite;
    }

    public AuthTokenEntity setInvite(boolean invite) {
        isInvite = invite;
        return this;
    }

    public String getInvitedBy() {
        return invitedBy;
    }

    public AuthTokenEntity setInvitedBy(String invitedBy) {
        this.invitedBy = invitedBy;
        return this;
    }
}
