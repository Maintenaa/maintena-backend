import type { BaseSeeder } from "./base.seeder";
import { dataSource } from "../data-source";
import { Employee, EmployeeRole } from "../entities";

export class EmployeeSeeder implements BaseSeeder {
  name: string = "employee";

  async run(): Promise<void> {
    const employees: Array<Employee> = [];

    const roles = [
      EmployeeRole.ADMIN,
      EmployeeRole.LEADER,
      EmployeeRole.MANAGER,
      EmployeeRole.SUPERVISOR,
      EmployeeRole.MEMBER,
      EmployeeRole.WORKER,
    ];

    // Assign user 2 as owner of company 1
    employees.push({
      id: 1,
      role: EmployeeRole.OWNER,
      is_owner: true,
      is_active: true,
      user: { id: 2 } as any,
      company: { id: 1 } as any,
    } as Employee);

    let employeeId = 2;

    // Assign other users randomly to companies with varied roles
    for (let userId = 3; userId <= 30; userId++) {
      const companyId = Math.floor(Math.random() * 4) + 1; // 1-4
      const role = roles[Math.floor(Math.random() * roles.length)];

      employees.push({
        id: employeeId,
        role: role,
        is_owner: false,
        is_active: true,
        user: { id: userId } as any,
        company: { id: companyId } as any,
      } as Employee);

      employeeId++;
    }

    for (const employee of employees) {
      await dataSource.getRepository(Employee).save(employee);
    }
  }
}
