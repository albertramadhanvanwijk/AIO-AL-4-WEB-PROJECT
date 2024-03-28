import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

import {
  NgbToastModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { LightboxModule } from 'ngx-lightbox';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ToastsContainer } from './dashboards/dashboard/toasts-container.component';
import { DashboardsModule } from './dashboards/dashboards.module';
import { MasterComponent } from './master/master.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { EditSupplyComponent } from './supplies/editsupply/editsupply.component';
import { DetailSupplyComponent } from './supplies/detailsupply/detailsupply.component';
import { AddSupplyComponent } from './supplies/addsupply/addsupply.component';
import { SopUtamaComponent } from './sop-utama/sop-utama.component';
import { WiGeneralComponent } from './listWI/wi-general/wi-general.component';
import { AddGeneralComponent } from './listWI/layouts/wiGeneral/add/add.component';
import { UpdateGeneralComponent } from './listWI/layouts/wiGeneral/update/update.component';
import { ViewGeneralComponent } from './listWI/layouts/wiGeneral/view/view.component';
import { ViewIbfComponent } from './listWI/layouts/wiIBF/view/view.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListpageComponent } from './listpage/listpage.component';
import { MasterListComponent } from './listWI/master-list/master-list.component';
import { ListUserProgressComponent } from './list-user-progress/list-user-progress.component';
import { RegisterProgressComponent } from './list-user-progress/register-progress/register-progress.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AddPartComponent } from './maintenance/layouts/add-part/add-part.component';
import { UpdatePartComponent } from './maintenance/layouts/update-part/update-part.component';
import { DetailPartComponent } from './maintenance/layouts/detail-part/detail-part.component';
import { AddOutputComponent } from './maintenance/layouts/detail-part/add-output/add-output.component';
import { ExportAsModule } from 'ngx-export-as';
import { AddmasterComponent } from './master/addmaster/addmaster.component';
import { EditmasterComponent } from './master/editmaster/editmaster.component';
import { DashboardGroupComponent } from './list-user-progress/dashboard-group/dashboard-group.component';
import { FirstPageComponent } from './maintenance/first-page/first-page.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizMasterListComponent } from './quiz-master-list/quiz-master-list.component';
import { AddQuestionComponent } from './quiz-master-list/add-question/add-question.component';
import { OplComponent } from './maintenance/opl/opl.component';
import { EditQuestionComponent } from './quiz-master-list/edit-question/edit-question.component';
import { DetailQuestionComponent } from './quiz-master-list/detail-question/detail-question.component';
import { EditAnswerComponent } from './quiz-master-list/edit-answer/edit-answer.component';
import { ViewFilterSuppliesComponent } from './supplies/view-filter-supplies/view-filter-supplies.component';
import { MaintenancePetComponent } from './maintenance-part/maintenance-pet/maintenance-pet.component';
import { FirstPagePetComponent } from './maintenance-part/maintenance-pet/first-page-pet/first-page-pet.component';
import { AddPartPetComponent } from './maintenance-part/maintenance-pet/layouts-pet/add-part-pet/add-part-pet.component';
import { DetailPartPetComponent } from './maintenance-part/maintenance-pet/layouts-pet/detail-part-pet/detail-part-pet.component';
import { UpdatePartPetComponent } from './maintenance-part/maintenance-pet/layouts-pet/update-part-pet/update-part-pet.component';
import { AddOutputPetComponent } from './maintenance-part/maintenance-pet/layouts-pet/detail-part-pet/add-output-pet/add-output-pet.component';
import { MaintenanceCanComponent } from './maintenance-part/maintenance-can/maintenance-can.component';
import { FirstPageCanComponent } from './maintenance-part/maintenance-can/first-page-can/first-page-can.component';
import { AddPartCanComponent } from './maintenance-part/maintenance-can/layout-can/add-part-can/add-part-can.component';
import { DetailPartCanComponent } from './maintenance-part/maintenance-can/layout-can/detail-part-can/detail-part-can.component';
import { UpdatePartCanComponent } from './maintenance-part/maintenance-can/layout-can/update-part-can/update-part-can.component';
import { AddOutputCanComponent } from './maintenance-part/maintenance-can/layout-can/detail-part-can/add-output-can/add-output-can.component';
import { MaintenanceGblComponent } from './maintenance-part/maintenance-gbl/maintenance-gbl.component';
import { FirstPageGblComponent } from './maintenance-part/maintenance-gbl/first-page-gbl/first-page-gbl.component';
import { AddPartGblComponent } from './maintenance-part/maintenance-gbl/layout-gbl/add-part-gbl/add-part-gbl.component';
import { DetailPartGblComponent } from './maintenance-part/maintenance-gbl/layout-gbl/detail-part-gbl/detail-part-gbl.component';
import { UpdatePartGblComponent } from './maintenance-part/maintenance-gbl/layout-gbl/update-part-gbl/update-part-gbl.component';
import { AddOutputGblComponent } from './maintenance-part/maintenance-gbl/layout-gbl/detail-part-gbl/add-output-gbl/add-output-gbl.component';
import { MaintenanceOc3Component } from './maintenance-part/maintenance-oc3/maintenance-oc3.component';
import { FirstPageOc3Component } from './maintenance-part/maintenance-oc3/first-page-oc3/first-page-oc3.component';
import { AddPartOc3Component } from './maintenance-part/maintenance-oc3/layout-oc3/add-part-oc3/add-part-oc3.component';
import { DetailPartOc3Component } from './maintenance-part/maintenance-oc3/layout-oc3/detail-part-oc3/detail-part-oc3.component';
import { UpdatePartOc3Component } from './maintenance-part/maintenance-oc3/layout-oc3/update-part-oc3/update-part-oc3.component';
import { AddOutputOc3Component } from './maintenance-part/maintenance-oc3/layout-oc3/detail-part-oc3/add-output-oc3/add-output-oc3.component';
import { MaintenanceEnmixComponent } from './maintenance-part/maintenance-enmix/maintenance-enmix.component';
import { FirstPageEnmixComponent } from './maintenance-part/maintenance-enmix/first-page-enmix/first-page-enmix.component';
import { AddPartEnmixComponent } from './maintenance-part/maintenance-enmix/layout-enmix/add-part-enmix/add-part-enmix.component';
import { DetailPartEnmixComponent } from './maintenance-part/maintenance-enmix/layout-enmix/detail-part-enmix/detail-part-enmix.component';
import { UpdatePartEnmixComponent } from './maintenance-part/maintenance-enmix/layout-enmix/update-part-enmix/update-part-enmix.component';
import { AddOutputEnmixComponent } from './maintenance-part/maintenance-enmix/layout-enmix/detail-part-enmix/add-output-enmix/add-output-enmix.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ToastsContainer,
    MasterComponent,
    SuppliesComponent,
    AddSupplyComponent,
    EditSupplyComponent,
    DetailSupplyComponent,
    SopUtamaComponent,
    WiGeneralComponent,
    AddGeneralComponent,
    UpdateGeneralComponent,
    ViewGeneralComponent,
    ViewIbfComponent,
    ListpageComponent,
    MasterListComponent,
    ListUserProgressComponent,
    RegisterProgressComponent,
    MaintenanceComponent,
    AddPartComponent,
    UpdatePartComponent,
    DetailPartComponent,
    AddOutputComponent,
    AddmasterComponent,
    EditmasterComponent,
    DashboardGroupComponent,
    FirstPageComponent,
    QuizComponent,
    QuizMasterListComponent,
    AddQuestionComponent,
    OplComponent,
    EditQuestionComponent,
    DetailQuestionComponent,
    EditAnswerComponent,
    ViewFilterSuppliesComponent,
    MaintenancePetComponent,
    FirstPagePetComponent,
    AddPartPetComponent,
    DetailPartPetComponent,
    UpdatePartPetComponent,
    AddOutputPetComponent,
    MaintenanceCanComponent,
    FirstPageCanComponent,
    AddPartCanComponent,
    DetailPartCanComponent,
    UpdatePartCanComponent,
    AddOutputCanComponent,
    MaintenanceGblComponent,
    FirstPageGblComponent,
    AddPartGblComponent,
    DetailPartGblComponent,
    UpdatePartGblComponent,
    AddOutputGblComponent,
    MaintenanceOc3Component,
    FirstPageOc3Component,
    AddPartOc3Component,
    DetailPartOc3Component,
    UpdatePartOc3Component,
    AddOutputOc3Component,
    MaintenanceEnmixComponent,
    FirstPageEnmixComponent,
    AddPartEnmixComponent,
    DetailPartEnmixComponent,
    UpdatePartEnmixComponent,
    AddOutputEnmixComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,
    NgbProgressbarModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    NgxUsefulSwiperModule,
    LightboxModule,
    DashboardsModule,
    CKEditorModule,
    NgbPaginationModule,
    ExportAsModule,
    CommonModule,
    MatMenuModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
