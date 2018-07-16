import * as Toast from 'nativescript-toast';
import { Injectable } from '@angular/core';
import { ToastDuration } from '~/core/toast-duration.enum';

@Injectable()
export class ToastMessageService {
    showMessage(message: string, duration?: ToastDuration) {
        if(duration) {
            this.showMessageWithDuration(message, duration);
        }
        else {
            this.showMessageWithoutDuration(message);
        }
    }

    private showMessageWithDuration(message: string, duration: ToastDuration) {
        Toast.makeText(message, duration).show();
    }

    private showMessageWithoutDuration(message: string) {
        Toast.makeText(message).show();
    }
}