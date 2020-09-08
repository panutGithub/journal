import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TagComponent } from './tag/tag.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { WriteComponent } from './write/write.component';
import { ReviewComponent } from './review/review.component';
import { PeerlistComponent } from './peerlist/peerlist.component';
import { SelectpeerComponent } from './selectpeer/selectpeer.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent,
    children: [
      { path: 'admin/peerlist', component: PeerlistComponent }
    ]
  },
  {
    path: 'tag', component: TagComponent
  },
  {
    path: 'detail', component: DetailComponent
  }, {
    path: 'edit', component: EditComponent
  },
  {
    path: 'write', component: WriteComponent
  },
  {
    path: 'review', component: ReviewComponent
  },
  {
    path: 'admin/peerlist', component: PeerlistComponent
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
