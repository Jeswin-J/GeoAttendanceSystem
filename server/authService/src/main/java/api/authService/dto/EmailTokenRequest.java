package api.authService.dto;

public class EmailTokenRequest {

    private String employeeId;
    private String employeeEmail;
    private String senderEmployeeId;

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getSenderEmployeeId() {
        return senderEmployeeId;
    }

    public void setSenderEmployeeId(String senderEmployeeId) {
        this.senderEmployeeId = senderEmployeeId;
    }
}
