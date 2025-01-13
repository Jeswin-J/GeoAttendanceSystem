package api.gateway.apiGateway.routes;

import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.*;

@Configuration
public class Routes {

    @Bean
    public RouterFunction<ServerResponse> authServiceRoute(){
        return GatewayRouterFunctions.route("authService")
                .route(RequestPredicates.path("/api/auth/**"), HandlerFunctions.http("http://localhost:8084"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> attendanceServiceRoute(){
        return GatewayRouterFunctions.route("attendanceService")
                .route(RequestPredicates.path("/api/attendance/**"), HandlerFunctions.http("http://localhost:8081"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> employeeServiceRoute(){
        return GatewayRouterFunctions.route("employeeService")
                .route(RequestPredicates.path("/api/emp/**"), HandlerFunctions.http("http://localhost:8083"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> locationServiceRoute(){
        return GatewayRouterFunctions.route("locationService")
                .route(RequestPredicates.path("/api/locations/**"), HandlerFunctions.http("http://localhost:8082"))
                .build();
    }
}
