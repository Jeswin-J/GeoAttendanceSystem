package api.authService.dto;

public class AuthResponse {

    private String token;
    private boolean success;

    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='" + token + '\'' +
                ", success=" + success +
                '}';
    }

    public AuthResponse(String jwt) {
        setSuccess(true);
        setToken(jwt);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
