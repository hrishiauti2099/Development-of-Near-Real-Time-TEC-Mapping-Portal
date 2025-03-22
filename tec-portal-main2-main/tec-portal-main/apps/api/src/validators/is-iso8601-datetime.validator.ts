import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ async: false })
class IsISO8601DateTimeValidator implements ValidatorConstraintInterface {
  validate(
    datetime: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: ValidationArguments
  ): boolean {
    // Regular expression to match ISO 8601 datetime format with timezone
    // (YYYY-MM-DDThh:mm:ssZ or YYYY-MM-DDThh:mm:ss+hh:mm or YYYY-MM-DDThh:mm:ss-hh:mm)
    const iso8601DateTimeRegex =
      /^\d{4}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])T([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](Z|([+-](0[0-9]|1[0-3]):[0-5][0-9]))$/;

    if (!iso8601DateTimeRegex.test(datetime)) {
      console.log('Invalid datetime format');
      return false;
    }

    // Validate date using dayjs
    const datePart = datetime.split('T')[0];
    return dayjs(datePart, 'YYYY-MM-DD', true).isValid();
  }

  defaultMessage(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: ValidationArguments
  ): string {
    return (
      'Datetime must be valid in ISO 8601 format' +
      ' (YYYY-MM-DDThh:mm:ssZ or YYYY-MM-DDThh:mm:ss+hh:mm or YYYY-MM-DDThh:mm:ss-hh:mm)'
    );
  }
}

export function IsISO8601DateTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsISO8601DateTimeValidator,
    });
  };
}
