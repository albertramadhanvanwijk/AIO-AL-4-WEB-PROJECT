import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detailsupply',
  templateUrl: './detailsupply.component.html',
  styleUrls: ['./detailsupply.component.scss']
})
export class DetailSupplyComponent implements OnInit {
  stok!: number;
  supply: any = {};
  area: any = {};
  selectedArea: string = '';
  supplyTransactions: any[] = [];
  startDateFilter: string = '';
  endDateFilter: string = '';
  selectAllDates: boolean = false;
  transactionTitle: string = 'Riwayat Transaksi';
  exportInProgress: boolean = false;
  breadCrumbItems!: Array<{}>;
  sortDescending: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedArea = params['area'];
    });
    const supplyId = this.route.snapshot.paramMap.get('id');
    this.fetchSupplyById(Number(supplyId));
    this.fetchSupplyTransactions(Number(supplyId));
    this.updateTransactionTitle();
    this.getBreadCrumbItems();
  }

  calculateStokAwal(): void {
    let currentStock = 0;
    this.filteredTransactions.forEach(transaction => {
      const supplyKey = `${transaction.nama_supply}_${transaction.nama_area}`;
      transaction.stok_awal = currentStock;
      if (transaction.tipe_category === 'Masuk') {
        currentStock += transaction.jumlah;
      } else if (transaction.tipe_category === 'Keluar') {
        currentStock -= transaction.jumlah;
      }
    });
  }

  fetchSupplyById(supplyId: number): void {
    this.apiService.getSupplyById(supplyId).subscribe(
      (res: any) => {
        this.supply = res.data[0];
        this.stok = this.supply.stok
        this.updateTransactionTitle();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  fetchSupplyTransactions(supplyId: number): void {
    this.apiService.getSupplyTransactions(supplyId).subscribe(
      (res: any) => {
        this.supplyTransactions = res.data[0];
        this.filteredTransactions = this.supplyTransactions;
        this.calculateStokAwal();
        this.calculateStockTerkini();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  calculateStockTerkini(): void {
    let currentStock = 0;
    this.supplyTransactions.forEach(transaction => {
      if (transaction.tipe_category === 'Masuk') {
        currentStock += transaction.jumlah;
      } else if (transaction.tipe_category === 'Keluar') {
        currentStock -= transaction.jumlah;
      }
      transaction.stock_terkini = currentStock;
    });
  }

  goBackWithArea(): void {
    if (this.selectedArea) {
      this.router.navigate(['/supplies'], { queryParams: { area: this.selectedArea } });
    } else {
      this.router.navigate(['/supplies']);
    }
  }

  filteredTransactions: any[] = [];

  applyDateFilter(): void {

    if (this.selectAllDates) {
      this.startDateFilter = '';
      this.endDateFilter = '';
    }

    this.filteredTransactions = this.supplyTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.tanggal);

      if (this.startDateFilter) {
        const startFilterDate = new Date(this.startDateFilter);
        startFilterDate.setHours(0, 0, 0, 0);
        if (transactionDate < startFilterDate) {
          return false;
        }
      }

      if (this.endDateFilter) {
        const endFilterDate = new Date(this.endDateFilter);
        endFilterDate.setHours(23, 59, 59, 999);
        if (transactionDate > endFilterDate) {
          return false;
        }
      }

      return true;
    });

    this.sortTransactions();
  }

  exportToPDF() {
    this.exportInProgress = true;

    this.hideActionColumn();

    const element = document.getElementById('tableToExport');

    if (element) {
      const pdf = new jsPDF('p', 'pt', 'letter');
      const options = { background: 'white', scale: 2 };

      html2canvas(element, options).then((canvas) => {
        this.exportInProgress = false;

        this.showActionColumn();

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 595;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let y = 40;
        pdf.setFontSize(18);
        pdf.text(this.transactionTitle, 40, y);
        y += 20;

        pdf.setFontSize(12);
        const today = new Date().toLocaleDateString();
        pdf.text('Tanggal: ' + today, 40, y);
        y += 20;

        pdf.addImage(imgData, 'PNG', 20, y, imgWidth - 40, imgHeight - 40);

        pdf.save('tabel_transaksi.pdf');
      });
    } else {
      console.error('Elemen dengan ID "tableToExport" tidak ditemukan.');
    }
  }

  hideActionColumn() {
    const actionColumn = document.querySelector('#tableToExport th:last-child');

    if (actionColumn) {
      actionColumn.classList.add('d-none');
    }

    const actionCells = document.querySelectorAll('#tableToExport td:last-child');
    actionCells.forEach((cell) => {
      cell.classList.add('d-none');
    });
  }

  showActionColumn() {
    const actionColumn = document.querySelector('#tableToExport th:last-child');

    if (actionColumn) {
      actionColumn.classList.remove('d-none');
    }

    const actionCells = document.querySelectorAll('#tableToExport td:last-child');
    actionCells.forEach((cell) => {
      cell.classList.remove('d-none');
    });
  }

  updateTransactionTitle(): void {
    if (this.supply && this.selectedArea) {
      this.transactionTitle = `Riwayat Transaksi - ${this.supply.nama_supply} (${this.selectedArea})`;
    } else if (this.supply) {
      this.transactionTitle = `Riwayat Transaksi - ${this.supply.nama_supply}`;
    } else if (this.selectedArea) {
      this.transactionTitle = `Riwayat Transaksi - ${this.selectedArea}`;
    } else {
      this.transactionTitle = 'Riwayat Transaksi';
    }
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: "DETAIL SUPPLIES" }];
  }

  toggleSortOrder(): void {
    this.sortDescending = !this.sortDescending;
    this.sortTransactions();
  }

  sortTransactions(): void {
    const sortOrder = this.sortDescending ? -1 : 1;
    this.filteredTransactions.sort((a, b) => {
      const dateA = new Date(a.tanggal).getTime();
      const dateB = new Date(b.tanggal).getTime();
      return sortOrder * (dateB - dateA);
    });
  }

  deleteTransaction(id: number, stokTransaksi: number, tipeCategory: string): void {
    const isOut = tipeCategory === 'Keluar';
  
    const deltaStok = isOut ? stokTransaksi : -stokTransaksi;
    const newStok = this.stok + deltaStok;
  
    const newData = {
      "stok": newStok
    };
  
  
    this.apiService.updateSupply(this.supply.id_supply, newData).subscribe(
      (res: any) => {
   
  
        if (res.status === true) {
         
          this.supply.stok = newStok;
        } else {
          console.error('Update failed:', res.error);
        }
      },
      (error: any) => {
        console.error('Error updating supply:', error);
      }
    );
  
    const confirmation = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

    if (confirmation) {
      this.apiService.deleteTransaction(id).subscribe(
        (res: any) => {
  
          this.goBackWithArea();

        },
        (error: any) => {
          console.error('Gagal menghapus data', error);
        }
      );
    }
  }
}
