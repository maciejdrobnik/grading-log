//package pl.dmcs.springbootjsp_iwa.model;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.OneToOne;
//
//@Entity
//public class Payment {
//
//    @Id
//    @GeneratedValue
//    private long id;
//    private String accountName;
//
//    @JsonIgnore
//    @OneToOne(mappedBy = "payment")
//    private Student student;
//
//    public long getId() {
//        return id;
//    }
//
//    public void setId(long id) {
//        this.id = id;
//    }
//
//    public String getAccountName() {
//        return accountName;
//    }
//
//    public void setAccountName(String accountName) {
//        this.accountName = accountName;
//    }
//
///*
//    // Commented out due to simplify http requests sent from angular app
//    public Student getStudent() {
//        return student;
//    }
//
//    public void setStudent(Student student) {
//        this.student = student;
//    }
//*/
//}
