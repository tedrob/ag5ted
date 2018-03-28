import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        DropdownDirective
    ],
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        ReactiveFormsModule
    ]
})
export class SharedModule {}
