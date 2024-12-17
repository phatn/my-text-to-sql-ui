import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'splitCamelCasePipe'
})
export class SplitCamelCasePipePipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return '';
        }

        return value.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lower and uppercase
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle uppercase sequences
            .replace(/\b\w/g, char => char.toUpperCase());
    }

}

