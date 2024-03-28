import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  areas!: any;
  formAddQuestion!: FormGroup;

  constructor(
    private sopService: SopService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    this.getBreadCrumbItems();
    this.getAreas();
    this.getForm();
  }

  getForm() {
    this.formAddQuestion = this.fb.group({
      question_text: ['', Validators.required],
      id_area: ['', Validators.required],
      score: ['', Validators.required],
    });
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: `ADD QUESTIONS` }];
  }

  getAreas() {
    this.sopService.getAllAreas().subscribe((res: any) => {
      // console.log(res.data);
      this.areas = res.data;
    });
  }

  onSubmit() {
    // console.log(this.formAddQuestion.value);
    this.addQuestion(this.formAddQuestion.value);
  }

  addQuestion(data: any) {
    this.sopService.addQuestion(data).subscribe((res: any) => {
      console.log('Add Question Success');
      this.route.navigate(['/master-list-quiz']);
    });
  }
}
