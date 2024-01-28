import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { Schema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: Schema) {}
    transform(value: any) {
        const { error, value: validatedValue } = this.schema.validate(value);
        if (error) {
            console.log(error);
            throw new HttpException(`api-messages:invalid-field`, HttpStatus.BAD_REQUEST);
        }
        return validatedValue;
    }
}
