package api.authService.dto;

public class AuthRequest {

    private String accessToken;
    private String employeeId;
    private String password;

    public AuthRequest(){

    }

    public AuthRequest(String accessToken, String employeeId, String password) {
        this.accessToken = accessToken;
        this.employeeId = employeeId;
        this.password = password;
    }

    public AuthRequest(String employeeId, String password) {
        this.employeeId = employeeId;
        this.password = password;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
}
