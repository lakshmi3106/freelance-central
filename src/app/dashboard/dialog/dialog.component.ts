import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserService } from 'src/app/services/use.service';


@Component({
    selector: 'dialog-content',
    templateUrl: 'dialog.content.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogContent {

    userForm: FormGroup;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
        private userService: UserService,
        ) {
        let user = data.user;
        this.userForm = this.fb.group({
            email: [user?.email, [Validators.required, Validators.email]],
            name: [user?.name, [Validators.required, Validators.minLength(6)]],
            phoneNo: [user?.phoneNo, [Validators.required]],
            address: [user?.address],

        });

    }

    submit() {
        if (this.userForm.valid) {
            if (this.data.action == 'edit') {
                this.editUser();
            }
            else {
                this.addUser();
            }
        }
    }
    editUser() {
        let data = this.userForm.value;
        data.id = this.data.user.id
        this.userService.updateUser(data).then((res: any) => {

        })
    }

    addUser() {
        this.userService.addUser(this.userForm.value).then((res: any) => {

        }).catch(error => {
            // this.dbService
            //     .add('contractors', this.userForm.value)
            //     .subscribe((key) => {
            //         console.log('key: ', key);
            //     });
        })
    }


    getErrorMessage() {
        if (this.userForm.controls['email'].hasError('required') || this.userForm.controls['name'].hasError('required')) {
            return 'You must enter a value';
        }

        return this.userForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
    }
}