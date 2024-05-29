import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SopService } from 'src/app/core/services/sop.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  formAddQuestion!: FormGroup;
  areas!: any;
  receivedData: any = {};

  constructor(
    private fb: FormBuilder,
    private sopService: SopService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.getBreadCrumbItems();
    this.getDataParams();
    // this.getForm();
    this.getAreas();
  }
  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: `EDIT QUESTION` }];
  }

  getDataParams() {
    this.routeActive.queryParamMap.subscribe((params) => {
      this.receivedData = {
        question_id: params.get('question_id'),
        question_text: params.get('question_text'),
        id_area: params.get('id_area'),
        nama_area: params.get('nama_area'),
      };
      this.creatForm(this.receivedData);
      // console.log('Received Data:', this.receivedData);
    });
  }

  getForm() {
    this.formAddQuestion = this.fb.group({
      question_text: ['', Validators.required],
      id_area: ['', Validators.required],
    });
  }

  creatForm(data: any) {
    this.formAddQuestion = this.fb.group({
      question_text: [data.question_text, Validators.required],
      id_area: [parseInt(data.id_area), Validators.required],
    });
    // console.log(this.formAddQuestion.value);
  }

  getAreas() {
    this.sopService.getAllAreas().subscribe((res: any) => {
      // console.log(res.data);
      this.areas = res.data;
    });
  }

  onSubmit() {
    this.updateQuestion();
    // console.log(this.formAddQuestion.value);
  }

  updateQuestion() {
    const id = parseInt(this.receivedData.question_id);
    this.sopService
      .updateQuestion(id, this.formAddQuestion.value)
      .subscribe((res: any) => {
        console.log('Update Successfully', res.data);
        this.route.navigate(['/master-list-quiz']);
      });
  }
}
