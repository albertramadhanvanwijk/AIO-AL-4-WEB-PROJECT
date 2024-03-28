import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quiz-master-list',
  templateUrl: './quiz-master-list.component.html',
  styleUrls: ['./quiz-master-list.component.scss'],
})
export class QuizMasterListComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  questions!: any;
  areas!: any;

  // PAGINATION
  index: number = 1;
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  displayQuestions: any;
  entires: any;
  question!: any;
  constructor(
    private sopService: SopService,
    private fb: FormBuilder,
    private route: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getBreadCrumbItems();
    this.getAllQuestion();
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: `QUESTIONS LIST` }];
  }

  getAllQuestion() {
    this.sopService.getAllQuestions().subscribe((res: any) => {
      this.questions = res.data;
      // console.log(this.questions);
      this.entires = this.questions.length;
      this.calculateTotalPages();
      this.updateDisplayQuestions();
    });
  }

  // MODAL DELETE
  centerModal(dataQuestion: any, removeModal: any) {
    this.question = dataQuestion;
    // console.log(this.question_id);
    this.modalService.open(removeModal, { centered: true });
  }
  softDelete() {
    const data = {
      is_deleted: 1,
    };
    // console.log(this.question.question_id, data);
    this.sopService
      .updateQuestion(this.question.question_id, data)
      .subscribe((res: any) => {
        console.log('Delete successfully', res);
        this.modalService.dismissAll();
        this.getAllQuestion();
      });
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayQuestions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayQuestions = this.questions.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayQuestions();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayQuestions();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
}
