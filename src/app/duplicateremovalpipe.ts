import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({ name: 'duplicate' })

export class duplicateremovalpipe implements PipeTransform {

    transform(providers: any[]) {
        let result = [];
        providers.forEach(provider => {
         if (!providers.find(fEle => fEle.attributes.name === provider.attributes.name)) {
           result.push(provider);
         }
       });
     return result;
     }

}

