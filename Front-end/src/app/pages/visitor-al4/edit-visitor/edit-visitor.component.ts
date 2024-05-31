import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-visitor',
  templateUrl: './edit-visitor.component.html',
  styleUrls: ['./edit-visitor.component.scss']
})
export class EditVisitorComponent implements OnInit {

  date!: string;
  nama_tamu!: string;
  nama_vendor!: string;
  id_card_hijau!: number;
  id_card_merah!: number;
  keperluan!: string;
  pic!: string;
  jam_masuk!: string;
  jam_keluar!: string;
  visitorId!: number;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.visitorId = this.route.snapshot.params['id'];
    this.apiService.getVisitor(this.visitorId).subscribe((data: any) => {
      this.date = data.date;
      this.nama_tamu = data.nama_tamu;
      this.nama_vendor = data.nama_vendor;
      this.id_card_hijau = data.id_card_hijau;
      this.id_card_merah = data.id_card_merah;
      this.keperluan = data.keperluan;
      this.pic = data.pic;
      this.jam_masuk = data.jam_masuk;
      this.jam_keluar = data.jam_keluar;
    });
  }

  updateVisitor(): void {
    const updatedVisitor = {
      date: this.date,
      nama_tamu: this.nama_tamu,
      nama_vendor: this.nama_vendor,
      id_card_hijau: this.id_card_hijau,
      id_card_merah: this.id_card_merah,
      keperluan: this.keperluan,
      pic: this.pic,
      jam_masuk: this.jam_masuk,
      jam_keluar: this.jam_keluar
    };

    this.apiService.updateVisitor(this.visitorId, updatedVisitor).subscribe(
      (response: any) => {
        this.router.navigate(['/visitor']);
      },
      (error: any) => {
        console.error('Error updating visitor:', error);
      }
    );
  }
}
