import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { JournalRoutingModule } from './journal-routing.module';
import { ListComponent } from './list/list.component';
import { TagComponent } from './tag/tag.component';
import { WriteComponent } from './write/write.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';
import { PeerlistComponent } from './peerlist/peerlist.component';
import { SelectpeerComponent } from './selectpeer/selectpeer.component';
import { ModalModule } from './_modal';

import { DataTablesModule } from 'angular-datatables';
import { RegisterpeerComponent } from './registerpeer/registerpeer.component';


@NgModule({
  declarations: [ListComponent, TagComponent, WriteComponent, DetailComponent, EditComponent, ReviewComponent, PeerlistComponent, SelectpeerComponent, RegisterpeerComponent],
  imports: [
    CommonModule,
    JournalRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    DataTablesModule
  ],
  bootstrap: [ListComponent]
})
export class JournalModule { }
