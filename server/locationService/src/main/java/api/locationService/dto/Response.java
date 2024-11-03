package api.locationService.dto;

public class Response {
    private String message;
    private Boolean success;
    private Object data;

    public String getMessage() {
        return message;
    }

    public Boolean getSuccess() {
        return success;
    }

    public Object getData() {
        return data;
    }

    public Response setMessage(String message) {
        this.message = message;
        return this;
    }

    public Response setSuccess(Boolean success) {
        this.success = success;
        return this;
    }

    public Response setData(Object data) {
        this.data = data;
        return this;
    }
}
