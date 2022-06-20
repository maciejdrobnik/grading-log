package pl.dmcs.springbootjsp_iwa.message.response;

import org.springframework.security.core.GrantedAuthority;
import pl.dmcs.springbootjsp_iwa.model.Subject;

import java.util.Collection;
import java.util.List;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private String username;
    private long id;
    private List<Subject> subjects;
    private String firstname;

    public String getLastname() {
        return lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    private String lastname;

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private Collection<? extends GrantedAuthority> authorities;

    public JwtResponse(String token, String username, Collection<? extends GrantedAuthority> authorities, long id, String firstname, String lastname) {
        this.token = token;
        this.username = username;
        this.authorities = authorities;
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
