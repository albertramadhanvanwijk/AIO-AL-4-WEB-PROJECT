import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api-service.service';
import { SopService } from 'src/app/core/services/sop.service';

@Component({
  selector: 'app-list-score-quiz',
  templateUrl: './list-score-quiz.component.html',
  styleUrls: ['./list-score-quiz.component.scss'],
})
export class ListScoreQuizComponent {
  breadCrumbItems!: Array<{}>;
  dataScores!: any;
  // PAGINATION
  index: number = 1;
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  displayScore: any;
  entires: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private sopService: SopService
  ) {}
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Score Quiz' }];
    this.getParamsId();
  }

  getParamsId() {
    this.activeRoute.params.subscribe((params) => {
      let areaID = +params['id'];
      this.fecthUserScore(areaID);
      console.log(areaID);
    });
  }

  fecthUserScore(areaID: number) {
    this.sopService.getResultByAreaId(areaID).subscribe((res: any) => {
      console.log(res.data);
      this.dataScores = res.data;
      this.entires = this.dataScores.length;
      this.calculateTotalPages();
      this.updateDisplayScores();
    });
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayScores() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayScore = this.dataScores.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayScores();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayScores();
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
