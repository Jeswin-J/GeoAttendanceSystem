package api.authService.dto;

public class EmailTokenRequest extends Request{

    private String employeeEmail;
    private String senderEmployeeId;

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public String getSenderEmployeeId() {
        return senderEmployeeId;
    }

    public void setSenderEmployeeId(String senderEmployeeId) {
        this.senderEmployeeId = senderEmployeeId;
    }
}
