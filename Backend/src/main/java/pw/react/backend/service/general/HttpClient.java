package pw.react.backend.service.general;

import pw.react.backend.web.Quote;

public interface HttpClient {
    Quote consume(String url);
}
