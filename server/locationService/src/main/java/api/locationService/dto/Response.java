package api.locationService.dto;

public class Response {
    private String message;
    private Boolean success;

    public String getMessage() {
        return message;
    }

    public Boolean getSuccess() {
        return success;
    }

    public Response setMessage(String message) {
        this.message = message;
        return this;
    }

    public Response setSuccess(Boolean success) {
        this.success = success;
        return this;
    }
}
