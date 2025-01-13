package api.employeeService.dto;

public class Response {
    private boolean success;
    private String message;
    private Object data;

    // Default constructor
    public Response() {}

    // Constructor for success/failure and message
    public Response(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // Constructor for success/failure and data
    public Response(boolean success, Object data) {
        this.success = success;
        this.data = data;
    }

    // Setters and Getters
    public boolean isSuccess() {
        return success;
    }

    public Response setSuccess(boolean success) {
        this.success = success;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public Response setMessage(String message) {
        this.message = message;
        return this;
    }

    public Object getData() {
        return data;
    }

    public Response setData(Object data) {
        this.data = data;
        return this;
    }
}
