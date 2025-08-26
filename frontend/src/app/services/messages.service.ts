import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    constructor(private messageService: MessageService) { }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
    info(title: string, message: string){
        this.messageService.add({severity: 'info', summary: title, detail: message});
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
    warn(title: string, message: string){
        this.messageService.add({severity: 'warn', summary: title, detail: message});
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
    success(title: string, message: string){
        this.messageService.add({severity: 'success', summary: title, detail: message});
    }
}
