package pl.dmcs.springbootjsp_iwa.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.springbootjsp_iwa.model.GradedTask;

import java.util.Optional;

@Repository
public interface GradedTaskRepository extends JpaRepository<GradedTask, Long> {
    GradedTask findByTaskName(String taskName);
    void deleteByTaskName(String taskName);
    Optional<GradedTask> findById(long id);
}
