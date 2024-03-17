import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data, param } from 'jquery';
import { SopService } from 'src/app/core/services/sop.service';
import { FormGroup, Validators, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss'],
})
export class DetailQuestionComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  question!: any;
  formAddAnswer!: FormGroup;
  questionID!: number;

  constructor(
    private sopService: SopService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.getBreadCrumbItems();
    this.getIdParams();
  }

  getForm(id: number) {
    this.formAddAnswer = this.fb.group({
      question_id: [id, [Validators.required]],
      answer_1: ['', [Validators.required]],
      status_1: ['', [Validators.required]],
      answer_2: ['', [Validators.required]],
      status_2: ['', [Validators.required]],
      answer_3: ['', [Validators.required]],
      status_3: ['', [Validators.required]],
      answer_4: ['', [Validators.required]],
      status_4: ['', [Validators.required]],
    });
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: `Detail Question` }];
  }

  getIdParams() {
    this.activeRoute.paramMap.subscribe((params) => {
      const parameter = params.get('id');

      if (parameter) {
        const id = parseInt(parameter);
        this.questionID = id;
        // console.log(id);
        this.getDetailQuestion(id);
        this.getForm(id);
      } else {
        this.route.navigate(['/master-list-question']);
      }
    });
  }

  getDetailQuestion(id: any) {
    this.sopService.getQuestionDetail(id).subscribe((res: any) => {
      // console.log(res.data);
      this.question = res.data;
    });
  }

  onSubmit() {
    const dataForm = this.formAddAnswer.value;
    // console.log(dataForm);

    const dataAnswer = [
      {
        question_id: dataForm.question_id,
        answer_text: dataForm.answer_1,
        status: dataForm.status_1,
      },
      {
        question_id: dataForm.question_id,
        answer_text: dataForm.answer_2,
        status: dataForm.status_2,
      },
      {
        question_id: dataForm.question_id,
        answer_text: dataForm.answer_3,
        status: dataForm.status_3,
      },
      {
        question_id: dataForm.question_id,
        answer_text: dataForm.answer_4,
        status: dataForm.status_4,
      },
    ];

    this.sopService.addAnswer(dataAnswer).subscribe(
      (res: any) => {
        console.log('Add Answer Successfully', res);
        this.getIdParams();
      },
      (err: any) => {
        console.log('Error Add Answer', err);
        this.getIdParams();
      }
    );
    // console.log(dataAnswer);
  }
}
