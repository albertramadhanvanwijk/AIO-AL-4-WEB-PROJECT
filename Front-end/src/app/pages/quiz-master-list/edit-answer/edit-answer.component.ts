import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SopService } from 'src/app/core/services/sop.service';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.scss'],
})
export class EditAnswerComponent {
  formEditAnswer!: FormGroup;
  answerId!: number;
  questionId!: number;

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  constructor(
    private fb: FormBuilder,
    private sopService: SopService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit() {
    this.breadCrumbItems = [{ label: `ADD QUESTIONS` }];
    this.getParams();
    this.formEditAnswer = this.fb.group({
      answer_text: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  creatForm(data: any) {
    // console.log('createForm: ', data);
    this.formEditAnswer = this.fb.group({
      answer_text: [data.answer_text, [Validators.required]],
      status: [data.status, [Validators.required]],
    });
  }
  getParams() {
    this.activeRoute.paramMap.subscribe((params) => {
      const parameter = params.get('id');
      const questionID = params.get('idQuestion');

      if (parameter && questionID) {
        const id = parseInt(parameter);
        this.questionId = parseInt(questionID);
        this.answerId = id;
        this.getAnswer(this.answerId);
      } else {
        this.route.navigate(['/master-list-quiz']);
      }
    });
  }

  getAnswer(id: number) {
    // console.log('Get Answer', id);
    this.sopService.getAnswerById(id).subscribe((res: any) => {
      // console.log(res.data[0]);
      const data = res.data[0];
      this.creatForm(data);
    });
  }

  onSubmit() {
    // console.log(this.formEditAnswer.value);
    const data = this.formEditAnswer.value;
    this.sopService.updateAnswer(this.answerId, data).subscribe((res: any) => {
      console.log('Update Successfully', res);
      this.route.navigate(['/detail-question', this.questionId]);
    });
  }
}
