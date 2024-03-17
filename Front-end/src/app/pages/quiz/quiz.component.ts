import { AuthService } from 'src/app/core/services/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SopService } from 'src/app/core/services/sop.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

interface Answer {
  answer_id: number;
  answer_text: string;
  status: number;
}

interface QuizQuestion {
  question_id: number;
  question_text: string;
  answers: Answer[];
  score: number;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  quizForm!: FormGroup;
  questionsWithAnswers: QuizQuestion[] = [];
  totalScore: number = 0;
  userId!: number;
  @ViewChild('succesModal') succesModal!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private sopService: SopService,
    private authService: AuthService,
    private modalService: NgbModal,
    private route: Router
  ) {}
  ngOnInit() {
    this.createForm();
    this.getAreaID();
  }

  getAreaID() {
    const areaName = this.authService.getAreaName();
    const user_id = this.authService.getUserId();

    if (user_id) {
      this.userId = parseInt(user_id);
    }

    // console.log(areaName);
    if (areaName === 'IBF') {
      let id = 1;
      this.getQuestions(id);
    }
    if (areaName === 'PREPARASI') {
      let id = 2;
      this.getQuestions(id);
    }
    if (areaName === 'PACKING') {
      let id = 3;
      this.getQuestions(id);
    }
  }
  createForm(): void {
    const group: Record<string, any> = {};
    this.questionsWithAnswers.forEach((question, index) => {
      group['question' + index] = '';
    });
    this.quizForm = this.fb.group(group);
  }

  getQuestions(id: number) {
    this.sopService.getQuestionByAreaID(id).subscribe((res: any) => {
      this.questionsWithAnswers = res.data.questionsWithAnswers;
      this.createForm(); // Panggil createForm setelah mendapatkan data
    });
  }

  submitQuiz(): void {
    const questionData = this.quizForm.value;

    // Memeriksa apakah ada pertanyaan yang belum dijawab
    const unansweredQuestions = Object.values(questionData).filter(
      (answer: any) => !answer
    );

    // Jika ada pertanyaan yang belum dijawab, tampilkan pesan kesalahan
    if (unansweredQuestions.length > 0) {
      alert('Silahkan isi semua pertanyaan sebelum mengirimkan kuis.');
      return;
    }

    // Jika semua pertanyaan telah dijawab, lanjutkan dengan mengirimkan jawaban
    this.addResult();
  }

  addResult() {
    let dataAnswer: any = this.quizForm.value;

    let answerUsers: { [key: string]: any } = {}; // Objek kosong untuk menyimpan jawaban
    let score: number = 0;

    // Mengambil kunci-kunci pertanyaan dari dataAnswer
    let questionKeys = Object.keys(dataAnswer);

    // Iterasi melalui kunci-kunci pertanyaan
    questionKeys.forEach((key, index) => {
      let questionNumber = index + 1;
      let answerKey = `question_${questionNumber}`;

      // Menambahkan jawaban ke dalam objek answerUsers
      answerUsers[answerKey] = dataAnswer[key];

      // Melakukan logging untuk memeriksa
      // console.log(answerKey, dataAnswer[key]);
      let question: any = dataAnswer[key][0];
      let answer: any = dataAnswer[key][1].status;

      // AKUMULASI SCORE
      if (answer === 1) {
        score = score + question.score;
        if (this.userId) {
          this.sopService
            .addResultUser({
              id_user: this.userId,
              score: question.score,
              question_id: question.question_id,
            })
            .subscribe((res: any) => {
              console.log('Add Answer Successfully', res.data);
            });
        }
      }
      if (answer === 0) {
        score = score + 0;
        if (this.userId) {
          this.sopService
            .addResultUser({
              id_user: this.userId,
              score: 0,
              question_id: question.question_id,
            })
            .subscribe((res: any) => {
              console.log('Add Answer Successfully', res.data);
            });
        }
      }
    });

    console.log(score);
    this.openModal(this.succesModal, score);
  }

  openModal(content: any, score: number) {
    this.totalScore = score;
    this.modalService.open(content, { centered: true });
  }
  back() {
    this.modalService.dismissAll();
    this.route.navigate(['/sop']);
  }
}
