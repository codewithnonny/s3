import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';
import { UsersService } from 'src/resource/users/users.service';

@ValidatorConstraint({ name: 'unique-user-constraint', async: true })
@Injectable()
export class UniqueUserConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UsersService) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    try {
      return this.userService.isUniqueUser(value);
    } catch (error) {
      return true;
    }
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `${args.property} associate with another account use different email !`;
  }
}
