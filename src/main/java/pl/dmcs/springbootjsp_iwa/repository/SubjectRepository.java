package pl.dmcs.springbootjsp_iwa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.springbootjsp_iwa.model.Subject;


@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Subject findById(long id);
}