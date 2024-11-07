package api.employeeService.util;

import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

public class EmployeeIdGenerator implements IdentifierGenerator {

    private static final String PREFIX = "EMP";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {
        String query = "SELECT e.employeeId FROM EmployeeEntity e ORDER BY e.employeeId DESC";
        Query nativeQuery = session.createQuery(query);
        nativeQuery.setMaxResults(1);
        String lastId = (String) nativeQuery.getSingleResult();

        if (lastId != null && lastId.startsWith(PREFIX)) {
            int id = Integer.parseInt(lastId.substring(PREFIX.length())) + 1;
            return PREFIX + String.format("%06d", id);
        } else {
            return PREFIX + "000001";
        }
    }
}
