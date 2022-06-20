//package pl.dmcs.springbootjsp_iwa.model;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import javax.persistence.*;
//import java.util.List;
//
//@Entity
//public class Student {
//
//    @Id
//    @GeneratedValue
//    private long id;
//    private String firstname;
//    private String lastname;
//    private String email;
//    private String telephone;
//
//    private String status;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private Payment payment;
//
//    @JsonBackReference
//    @ManyToOne(cascade = CascadeType.MERGE)
//    private Address address;
//
//    @ManyToMany(cascade = CascadeType.PERSIST)
//    private List<Subject> subjectsList;
//
//
//    public long getId() {
//        return id;
//    }
//
//    public void setId(long id) {
//        this.id = id;
//    }
//
//    public String getFirstname() {
//        return firstname;
//    }
//
//    public void setFirstname(String firstname) {
//        this.firstname = firstname;
//    }
//
//    public String getLastname() {
//        return lastname;
//    }
//
//    public void setLastname(String lastname) {
//        this.lastname = lastname;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getTelephone() {
//        return telephone;
//    }
//
//    public void setTelephone(String telephone) {
//        this.telephone = telephone;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public Payment getPayment() {
//        return payment;
//    }
//
//    public void setPayment(Payment payment) {
//        this.payment = payment;
//    }
//
//    public Address getAddress() {
//        return address;
//    }
//
//    public void setAddress(Address address) {
//        this.address = address;
//    }
//
//    public List<Subject> getSubjectsList() {
//        return subjectsList;
//    }
//
//    public void setSubjectsList(List<Subject> subjectsList) {
//        this.subjectsList = subjectsList;
//    }
//
//}
//
//
