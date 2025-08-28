import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '../../generated/prisma';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    const normalizedRole = normalizeRole(createEmployeeDto.role);
    const data: Prisma.EmployeeCreateInput = {
      ...createEmployeeDto,
      ...(normalizedRole ? { role: normalizedRole } : {}),
    };
    return this.databaseService.employee.create({ data });
  }

  async findAll(role?: string) {
    const normalizedRole = normalizeRole(role);
    return this.databaseService.employee.findMany({
      where: normalizedRole ? { role: normalizedRole } : {},
    });
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    const normalizedRole = normalizeRole(updateEmployeeDto.role);
    const data: Prisma.EmployeeUpdateInput = {
      ...updateEmployeeDto,
      ...(normalizedRole ? { role: normalizedRole } : {}),
    };
    return this.databaseService.employee.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: { id },
    });
  }
}

function normalizeRole(role: unknown): Role | undefined {
  if (role === undefined || role === null) return undefined;
  if (typeof role === 'string') {
    const upper = role.toUpperCase();
    if (upper === 'ADMIN' || upper === 'USER' || upper === 'GUEST') {
      return upper as Role;
    }
    return undefined;
  }
  return role as Role;
}