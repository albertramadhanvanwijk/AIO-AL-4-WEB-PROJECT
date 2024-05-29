import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SuppliesService {
  private supplies: any[] = [];

  constructor() { }

  addSupply(supply: any) {
    this.supplies.push(supply);
  }

  updateStokMasuk(area: string, namaSupply: string, jumlah: number) {
    const supply = this.findSupply(area, namaSupply);
    if (supply) {
      supply.stok += jumlah;
    }
  }

  updateStokKeluar(area: string, namaSupply: string, jumlah: number) {
    const supply = this.findSupply(area, namaSupply);
    if (supply && supply.stok >= jumlah) {
      supply.stok -= jumlah;
    }
  }

  findSupply(area: string, namaSupply: string) {
    return this.supplies.find(
      (supply) => supply.nama_area === area && supply.nama_supply === namaSupply
    );
  }

  getAllSupplies() {
    return this.supplies;
  }

  getStokSupply(namaSupply: string): number {
    const supply = this.supplies.find((supply) => supply.nama_supply === namaSupply);
    return supply ? supply.stok : 0;
  }
}
