package api.authService.dto;

public class LoginResponse extends Response{

    private String token;


    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }
}
