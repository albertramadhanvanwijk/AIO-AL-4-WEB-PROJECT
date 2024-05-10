export interface MenuItem {
  id?: number;
  label?: string;
  icon?: string;
  link?: string;
  subItems?: MenuItem[];
  isTitle?: boolean;
  badge?: any; // Perbaiki tipe data badge
  parentId?: number | undefined; // Perbaiki tipe data parentId
  isLayout?: boolean;
  role?: number;
  id_line?: number;
}

// Fungsi untuk menyesuaikan akses menu berdasarkan id_line
function customizeMenuAccess(menuItems: MenuItem[], userLineId: number): MenuItem[] {
  if (userLineId === 1) {
    // Jika id_line pengguna adalah 1, mereka dapat mengakses semua menu
    return menuItems;
  } else {
    // Jika id_line pengguna adalah 2, 3, 4, atau 5, hanya tampilkan menu 'Maintenance Part'
    return menuItems.filter(item => {
      if (item.label === 'Maintenance Part') {
        return true; // Tampilkan menu 'Maintenance Part' untuk semua id_line selain 1
      } else if (item.label === 'Supplies' || item.label === 'Standard Operating Procedure') {
        // Tampilkan 'Supplies' dan 'Standard Operating Procedure' hanya jika id_line-nya sesuai
        return item.id_line === userLineId;
      }
      return false;
    });
  }
}

// Contoh penggunaan
const menuItems: MenuItem[] = [
  { id: 1, label: "Home", link: "/home", id_line: 1 },
  { id: 2, label: "Dashboard", link: "/dashboard", id_line: 1 },
  { id: 3, label: "Maintenance Part", link: "/maintenance-part", parentId: undefined, id_line: 1 }, // Sesuaikan parentId jika perlu
  // asumsikan ada lebih banyak items dengan berbagai id_line
];

const userLineId: number = 2; // Pastikan tipe data userLineId adalah number
const accessibleMenuItems = customizeMenuAccess(menuItems, userLineId);

console.log(accessibleMenuItems); // Ini akan menampilkan menu 'Maintenance Part' saja untuk id_line 2, 3, 4, 5
