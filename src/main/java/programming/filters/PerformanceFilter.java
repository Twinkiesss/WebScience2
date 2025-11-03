package programming.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

@WebFilter("/*")
public class PerformanceFilter implements Filter {
    private static final Logger logger = Logger.getLogger(PerformanceFilter.class.getName());

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        long startTime = System.currentTimeMillis();

        try {
            chain.doFilter(request, response);
        } finally {
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;

            String performanceInfo = String.format(
                    "Performance: %s %s - %d ms - Status: %d",
                    httpRequest.getMethod(),
                    httpRequest.getRequestURI(),
                    duration,
                    httpResponse.getStatus()
            );
            logger.info(performanceInfo);

            httpResponse.setHeader("X-Execution-Time", duration + "ms");
        }
    }

    @Override
    public void init(FilterConfig filterConfig){
        logger.info("PerformanceFilter initialized");
    }

    @Override
    public void destroy() {
        logger.info("PerformanceFilter destroyed");
    }
}