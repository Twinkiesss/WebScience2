package programming.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;
import java.util.logging.Logger;

@WebFilter("/*")
public class LoggingFilter implements Filter {
    private static final Logger logger = Logger.getLogger(LoggingFilter.class.getName());

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String requestInfo = String.format(
                "Request: %s %s from %s",
                httpRequest.getMethod(),
                httpRequest.getRequestURI(),
                request.getRemoteAddr()
        );
        logger.info(requestInfo);

        Enumeration<String> parameterNames = httpRequest.getParameterNames();
        StringBuilder params = new StringBuilder("Parameters: ");
        while (parameterNames.hasMoreElements()) {
            String paramName = parameterNames.nextElement();
            String paramValue = httpRequest.getParameter(paramName);
            params.append(paramName).append("=").append(paramValue).append("; ");
        }
        if (params.length() > "Parameters: ".length()) {
            logger.info(params.toString());
        }

        Enumeration<String> headerNames = httpRequest.getHeaderNames();
        StringBuilder headers = new StringBuilder("Headers: ");
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = httpRequest.getHeader(headerName);
            headers.append(headerName).append("=").append(headerValue).append("; ");
        }
        logger.info(headers.toString());

        chain.doFilter(request, response);

        logger.info("Response completed for: " + httpRequest.getRequestURI());
    }

    @Override
    public void init(FilterConfig filterConfig){
        logger.info("LoggingFilter initialized");
    }

    @Override
    public void destroy() {
        logger.info("LoggingFilter destroyed");
    }
}