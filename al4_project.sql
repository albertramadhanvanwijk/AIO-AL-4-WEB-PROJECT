-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2024 at 04:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `al4_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer_text` varchar(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `nama_area` varchar(255) NOT NULL,
  `id_line` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id_area`, `nama_area`, `id_line`) VALUES
(1, 'IBF', 1),
(2, 'PREPARASI', 1),
(3, 'PACKING', 1),
(4, 'GENERAL', 1),
(6, 'REFURBISHED', 1),
(7, 'PREPARATION & SGH', 3),
(8, 'INJECTION', 3),
(9, 'BLOW', 3),
(10, 'FILLING', 3),
(11, 'PACKING', 3),
(12, 'REFURBISHED', 3),
(13, 'GENERAL', 3),
(14, 'PREPARATION', 2),
(15, 'FILLING', 2),
(16, 'PACKING', 2),
(17, 'REFURBISHED', 2),
(18, 'GENERAL', 2),
(19, 'PREPARASI', 4),
(20, 'PACKING IN', 4),
(21, 'PACKING OUT', 4),
(22, 'FILLING', 4),
(23, 'ELECTRICAL', 4),
(24, 'REFURBISHED', 4),
(25, 'GENERAL', 4);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `nama_category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `nama_category`) VALUES
(1, 'Masuk'),
(2, 'Keluar');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `document_id` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `document_title` varchar(100) NOT NULL,
  `document_code` varchar(100) NOT NULL,
  `filename` varchar(1000) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`document_id`, `id_area`, `document_title`, `document_code`, `filename`, `is_deleted`) VALUES
(1, 2, 'CIP Alkali dan HWT', 'WI/P-1/PRD/PB-3/001', '1695003507302-968153057.pdf', 0),
(2, 2, 'Cleaning dan Sanitasi Area SGH', 'WI/P-1/PRD/PB-3/002', '1695003545710-651186666.pdf', 0),
(3, 2, 'Pengoperasian Cold Storage', 'WI/P-1/PRD/PB-3/003', '1695003589233-919237943.pdf', 0),
(4, 2, 'Operasional Crane Bag', 'WI/P-1/PRD/PB-3/004', '1695003622667-862812235.pdf', 0),
(5, 2, 'Pengoperasian Crane Portable', 'WI/P-1/PRD/PB-3/005', '1695003662328-527272539.pdf', 0),
(6, 2, 'Pengoperasian Lifter Material', 'WI/P-1/PRD/PB-3/006', '1695003718497-956619586.pdf', 0),
(7, 2, 'Pembersihan Chamber Mineral dan Juice', 'WI/P-1/PRD/PB-3/007', '1695003745066-951594210.pdf', 0),
(8, 2, 'Pembersihan Filter Mesh', 'WI/P-1/PRD/PB-3/008', '1695003796105-586304070.pdf', 0),
(9, 2, 'Pembersihan Preparasi selama proses', 'WI/P-1/PRD/PB-3/009', '1695003833545-666357153.pdf', 0),
(10, 2, 'Pembuatan Larutan Gula dan Syrup', 'WI/P-1/PRD/PB-3/010', '1695003855389-225390994.pdf', 0),
(11, 2, 'Penerimaan Penempatan Bahan Baku dari Gudang', 'WI/P-1/PRD/PB-3/011', '1695003880982-844565884.pdf', 0),
(12, 2, 'Pengambilan Sample Gula & Syrup', 'WI/P-1/PRD/PB-3/012', '1695003902450-432097343.pdf', 0),
(13, 2, 'Penggunaan dan Penimbangan Material Clarified GF', 'WI/P-1/PRD/PB-3/013', '1695003931159-177242116.pdf', 0),
(14, 2, 'Pengoperasian Clean Steam Generator', 'WI/P-1/PRD/PB-3/014', '1695003960430-278348321.pdf', 0),
(15, 2, 'Pengoperasian Contiflow', 'WI/P-1/PRD/PB-3/015', '1695003988865-693729271.pdf', 0),
(16, 2, 'Cleaning Methode & Handling Chemical', 'WI/P-1/PRD/PB-3/016', '1695004013544-146579778.pdf', 0),
(17, 2, 'Cleaning Methode & Handling Material', 'WI/P-1/PRD/PB-3/017', '1695004030240-104849381.pdf', 0),
(18, 2, 'Integrited Test (Out Line) Water Intrusion Test AL4', 'WI/P-1/PRD/PB-3/018', '1695004068444-890741873.pdf', 0),
(19, 2, 'pengoperasian Press Filter', 'WI/P-1/PRD/PB-3/020', '1695004098261-177269778.pdf', 0),
(20, 2, 'Pengoperasian Vario Asept Unit', 'WI/P-1/PRD/PB-3/021', '1695004120748-839321029.pdf', 0),
(21, 2, 'Pengoperasian Hydraulic Drum Stacker', 'WI/P-1/PRD/PB-3/022', '1695004151499-857266051.pdf', 0),
(22, 2, 'Penimbangan Bahan Baku Preparasi Dalam', 'WI/P-1/PRD/PB-3/023', '1695004174283-274596570.pdf', 0),
(23, 2, 'Proses Make Up Cautic (NaOH) CIP', 'WI/P-1/PRD/PB-3/024', '1695004205312-520228596.pdf', 0),
(24, 2, 'Proses Penuangan Mineral Preparasi', 'WI/P-1/PRD/PB-3/025', '1695004230657-577270603.pdf', 0),
(25, 2, 'Proses Penuangan Gula AL4', 'WI/P-1/PRD/PB-3/026', '1695004254068-238316788.pdf', 0),
(26, 2, 'Cleaning Hopper & Screw AL4', 'WI/P-1/PRD/PB-3/027', '1695004278486-770410891.pdf', 0),
(27, 2, 'Penggantian Filter Catridge', 'WI/P-1/PRD/PB-3/028', '1695004300140-173795175.pdf', 0),
(28, 2, 'Pengoperasian Vario Store Unit', 'WI/P-1/PRD/PB-3/029', '1695004320850-493875769.pdf', 0),
(29, 2, 'SIP Filter Gula & Juice AL4', 'WI/P-1/PRD/PB-3/030', '1695004343078-997868902.pdf', 0),
(30, 2, 'SIP Filter Soft Water', 'WI/P-1/PRD/PB-3/031', '1695004368454-348842444.pdf', 0),
(31, 2, 'Pengoperasian Forklift & Cleaning Methode Forklift', 'WI/P-1/PRD/PB-3/032', '1695004393827-87715264.pdf', 0),
(32, 1, 'Sanitasi Area IBF AL4', 'WI/P-2/PRD/PB-3/001', '1695004525434-266489236.pdf', 0),
(33, 1, 'CSIOP Filler Capper dan Cap Sterilisasi', 'WI/P-2/PRD/PB-3/002', '1695004558459-420454173.pdf', 0),
(34, 1, 'Pengecekan Jalur Solution IBF', 'WI/P-2/PRD/PB-3/003', '1695004587333-140987230.pdf', 0),
(35, 1, 'Pencatatan Abnormalitas Proses Filler', 'WI/P-2/PRD/PB-3/004', '1695004652707-967968292.pdf', 0),
(36, 1, 'Rekapitulasi Area Filling', 'WI/P-2/PRD/PB-3/009', '1695004690373-768371880.pdf', 0),
(37, 1, 'Penggunaan Passbox', 'WI/P-2/PRD/PB-3/010', '1695004707023-792268802.pdf', 0),
(38, 1, 'Persiapan Awal Proses Machine Filler', 'WI/P-2/PRD/PB-3/023', '1695004740356-867227888.pdf', 0),
(39, 1, 'Operasional CSIOP Machine Filler', 'WI/P-2/PRD/PB-3/024', '1695004775015-190428315.pdf', 0),
(40, 1, 'Cleaning PET View & Cleaning Mold Mode Blow Machine', 'WI/P-2/PRD/PB-3/032', '1695004921075-871978241.pdf', 0),
(41, 1, 'Persiapan awal Proses Machine Injecton', 'WI/P-4/PRD/PB-3/005', '1695005013160-147381002.pdf', 0),
(42, 1, 'Machine Purging Injection', 'WI/P-4/PRD/PB-3/006', '1695005051091-475849622.pdf', 0),
(43, 1, 'Pengoperasian Precharge Machine Injection', 'WI/P-4/PRD/PB-3/007', '1695005089447-896624237.pdf', 0),
(44, 1, 'Pengoperasian Free Drop Machine Injection', 'WI/P-4/PRD/PB-3/008', '1695005111927-89734813.pdf', 0),
(45, 1, 'Pengoperasian Running Machine Injection', 'WI/P-4/PRD/PB-3/011', '1695005139637-739658830.pdf', 0),
(46, 1, 'Menghentikan Machine Injection Ditengah Proses Produksi', 'WI/P-4/PRD/PB-3/012', '1695005180027-540454846.pdf', 0),
(47, 1, 'Shuting Down Machine Injection', 'WI/P-4/PRD/PB-3/013', '1695005202014-686718729.pdf', 0),
(48, 1, 'Cleaning & Sanitasi Area Hoper Resin & Dryer Machine Injection', 'WI/P-4/PRD/PB-3/014', '1695005233717-876106562.pdf', 0),
(49, 1, 'Pengoperasian Manua Daikin', 'WI/P-4/PRD/PB-3/015', '1695005264883-241648818.pdf', 0),
(50, 1, 'Drain Resin Menggunakan Drain System Dryer Inejction', 'WI/P-4/PRD/PB-3/016', '1695005308724-830080909.pdf', 0),
(51, 1, 'Prosedur Memasukan Material', 'WI/P-4/PRD/PB-3/017', '1695005332097-301259415.pdf', 0),
(52, 1, 'Operasional Persiapan Mesin Daikin', 'WI/P-4/PRD/PB-3/018', '1695005364445-188530923.pdf', 0),
(53, 1, 'Operaional Persiapan Sistem HVAC', 'WI/P-4/PRD/PB-3/019', '1695005391262-275799795.pdf', 0),
(54, 1, 'Operasional Sterilisasi Ruangan H202', 'WI/P-4/PRD/PB-3/020', '1695005430658-196189335.pdf', 0),
(55, 1, 'Treatment After Strerilisasi Ruangan H202', 'WI/P-4/PRD/PB-3/021', '1695005455378-108075568.pdf', 0),
(56, 1, 'Persiapan Awal Proses Mesin Blow', 'WI/P-4/PRD/PB-3/022', '1695005507937-11029914.pdf', 0),
(57, 1, 'Cleaning Mold & Streching Rod Mesin Blow', 'WI/P-4/PRD/PB-3/025', '1695005578941-319225652.pdf', 0),
(58, 1, 'Operasional Drain Preform Mesin Blow', 'WI/P-4/PRD/PB-3/026', '1695005657742-23888926.pdf', 0),
(59, 1, 'Intervensi Modul Strelisisasi Mesin Filler & Blow', 'WI/P-4/PRD/PB-3/027', '1695005692866-682382854.pdf', 0),
(60, 1, 'Intervensi Area Steril Mesin Filler & Blow', 'WI/P-4/PRD/PB-3/028', '1695005745252-229957431.pdf', 0),
(61, 1, 'Rekapitulasi Area Blow Moulder', 'WI/P-4/PRD/PB-3/029', '1695005778430-39772355.pdf', 0),
(62, 1, 'Prosedur End Prouction Pada Mesin filler & Blow', 'WI/P-4/PRD/PB-3/030', '1695005804380-347302224.pdf', 0),
(63, 1, 'Prosedur Pembuangan Waste Of Process', 'WI/P-4/PRD/PB-3/031', '1695005890163-308680821.pdf', 0),
(64, 1, 'Tata Cara Membuang Limbah B3 Area IBF', 'WI/P-2/PRD/PB-3/031', '1695005922722-751786928.pdf', 0),
(65, 1, 'Prosedur Masuk & Keluar Area IBF', 'WI/P-4/PRD/PB-3/032', '1695005961361-737439668.pdf', 0),
(66, 1, 'Rekapitulasi Area Injection', 'WI/P-4/PRD/PB-3/033', '1695005983526-845012101.pdf', 0),
(67, 1, 'Pencatatan Abnormalitasi Proses Blow', 'WI/P-4/PRD/PB-3/034', '1695006009682-870868099.pdf', 0),
(68, 1, 'Pemeriksaan Glassware Area IBF', 'WI/P-4/PRD/PB-3/035', '1695006031547-437867005.pdf', 0),
(69, 1, 'Prosedur Pengecekan Sterile Filter', 'WI/P-4/PRD/PB-3/036', '1695006057074-439644630.pdf', 0),
(70, 1, 'Pengecekan Awal LOT Area Blow IBF', 'WI/P-4/PRD/PB-3/037', '1695006089509-238670855.pdf', 0),
(71, 1, 'Cleanin Chamber Out Blow', 'WI/P-4/PRD/PB-3/039', '1695006113923-887388254.pdf', 0),
(72, 3, 'Pemeriksaan Area Packing AL4', 'WI/P-3/PRD/PB-3/001', '1695006289860-656130570.pdf', 0),
(73, 3, 'Pengukuran Caping Angle', 'WI/P-3/PRD/PB-3/002', '1695006339888-168433947.pdf', 0),
(74, 3, 'Pengambilan Sample Volume Filling', 'WI/P-3/PRD/PB-3/003', '1695006374232-808548462.pdf', 0),
(75, 3, 'Operasional Mesin Conveyor', 'WI/P-3/PRD/PB-3/004', '1695006411363-232571952.pdf', 0),
(76, 3, 'Pengoperasian Camera Inspection K731 DCV', 'WI/P-3/PRD/PB-3/005', '1695006454694-373761128.pdf', 0),
(77, 3, 'Operasional Mesin Multireel', 'WI/P-3/PRD/PB-3/006', '1695006497661-581096477.pdf', 0),
(78, 3, 'Operasional Mesin Labeller', 'WI/P-3/PRD/PB-3/007', '1695006530365-468026330.pdf', 0),
(79, 3, 'Pengoperasian camera Inspection K731 DCW', 'WI/P-3/PRD/PB-3/008', '1695006574802-614260185.pdf', 0),
(80, 3, 'Pengoperasian IJP Cap Domino A520i', 'WI/P-3/PRD/PB-3/009', '1695006618877-344747362.pdf', 0),
(81, 3, 'Pengoperasian Lubrication (ECOLAB)', 'WI/P-3/PRD/PB-3/010', '1695006670332-916114029.pdf', 0),
(82, 3, 'Operasional IJP VideoJet Caser', 'WI/P-3/PRD/PB-3/011', '1695006731002-291998240.pdf', 0),
(83, 3, 'Operasional Mesin Caser', 'WI/P-3/PRD/PB-3/012', '1695006762893-710609012.pdf', 0),
(84, 3, 'Pengoperasian Checkmat Caser', 'WI/P-3/PRD/PB-3/013', '1695006858353-6860550.pdf', 0),
(85, 3, 'Prosedur Memasukan Cap', 'WI/P-3/PRD/PB-3/014', '1695006896271-627160213.pdf', 0),
(86, 3, 'Pengoperasian Weight Checker', 'WI/P-3/PRD/PB-3/015', '1695006932154-497650309.pdf', 0),
(87, 3, 'Pengoperasian Palletizer', 'WI/P-3/PRD/PB-3/016', '1695006961829-973702956.pdf', 0),
(88, 3, 'Proses Memasukan Outer Box dan Hot Melt Glue dari Area Loading ke Caser', 'WI/P-3/PRD/PB-3/017', '1695007070667-265624307.pdf', 0),
(89, 3, 'Operasional Panel GASNER Cap', 'WI/P-3/PRD/PB-3/018', '1695007112885-961503382.pdf', 0),
(90, 3, 'Catatan Rekapitulasi Pengemasan', 'WI/P-3/PRD/PB-3/019', '1695007145732-573845945.pdf', 0),
(91, 3, 'Change Over Mesin Caser', 'WI/P-3/PRD/PB-3/020', '1695007180190-234612253.pdf', 0),
(92, 3, 'Pengoperasian Conveyor Caser', 'WI/P-3/PRD/PB-3/021', '1695007211915-167086578.pdf', 0),
(93, 3, 'Tata Cara Membuang Poroduk Reject', 'WI/P-3/PRD/PB-3/022', '1695007247356-961740166.pdf', 0),
(94, 3, 'Pengembalian Produk dari Palletizer', 'WI/P-3/PRD/PB-3/023', '1695007289652-956097859.pdf', 0),
(95, 3, 'Cleaning Area Packing', 'WI/P-3/PRD/PB-3/024', '1695007311578-595562465.pdf', 0),
(96, 3, 'Pengoperasian Bobin Shrink Film', 'WI/P-3/PRD/PB-3/025', '1695007337332-248068637.pdf', 0),
(97, 3, 'Pengambilan Sampel Hold dan Reject Loading', 'WI/P-3/PRD/PB-3/026', '1695007368234-989973309.pdf', 0),
(98, 3, 'Pergantian Lot Seksi Packing', 'WI/P-3/PRD/PB-3/027', '1695007397844-397002956.pdf', 0),
(99, 3, 'Perhitungan dan Penempelan Label FG', 'WI/P-3/PRD/PB-3/028', '1695007436662-392760186.pdf', 0),
(100, 3, 'Pengoperasian IJP Body Domino A520i', 'WI/P-3/PRD/PB-3/029', '1695007482203-490587067.pdf', 0),
(101, 3, 'Pemasukan Material Label, Glue Label dan Supplies ke Area Packing', 'WI/P-3/PRD/PB-3/030', '1695007524464-420934765.pdf', 0),
(102, 3, 'Pergantian Label Pada Mesin Multireel', 'WI/P-3/PRD/PB-3/032', '1695007635987-917311342.pdf', 0),
(103, 3, 'Tata Cara Masuk Area Packing & Caser', 'WI/P-3/PRD/PB-3/033', '1695007673493-399002545.pdf', 0),
(104, 3, 'Verifikasi Kamera Checkmat DCW', 'WI/P-3/PRD/PB-3/034', '1695007728635-991110718.pdf', 0),
(105, 3, 'Verifikasi Kamera Checkmat DCV', 'WI/P-3/PRD/PB-3/035', '1695007742474-571437996.pdf', 0),
(106, 3, 'Penghancuran Reject Material Di Line-4', 'WI/P-3/PRD/PB-3/036', '1695007767606-364855284.pdf', 0),
(107, 3, 'Verifikasi Camera Inspection Lot Box and Verifikasi Weight Checker', 'WI/P-3/PRD/PB-3/037', '1695007807361-904648822.pdf', 0),
(108, 3, 'Pengoperasian IJP Box Diagraph TJ1000', 'WI/P-3/PRD/PB-3/038', '1695007838119-282369760.pdf', 0),
(109, 3, 'Pengoperasian IJP Cap Link 8940', 'WI/P-3/PRD/PB-3/039', '1695007860785-270268.pdf', 0),
(110, 4, 'Laundry Baju OC-3 & Aseptic Line 4', 'WI/D-6/QA/014', '1695007984774-466493890.pdf', 0),
(111, 4, 'Operasional Machine Oven untuk Pengeringan Sepatu/Baju Loundry', 'WI/D-6/QA/023', '1695008029613-154206355.pdf', 0),
(112, 4, 'Operasional Mesin Auto Clave Loundry', 'WI/D-6/QA/024', '1695008052033-176376076.pdf', 0),
(113, 4, 'Penanganan Chemcial yang Digunakan di Produksi', 'WI/D-6/QA/025', '1695008075287-958330154.pdf', 0),
(114, 4, 'Penanganan Abnormalitas Proses Produksi PS AL4', 'WI/D-6/QA/028', '1695008099863-320478580.pdf', 0),
(115, 4, 'Penanganan Abnormalitasi Proses Produksi AL4', 'WI/A/PRD/PB-3/001', '1695008146847-113775949.pdf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `line`
--

CREATE TABLE `line` (
  `id_line` int(11) NOT NULL,
  `line` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `line`
--

INSERT INTO `line` (`id_line`, `line`) VALUES
(1, 'AL4'),
(2, 'CAN'),
(3, 'PET'),
(4, 'GBL'),
(5, 'OC3');

-- --------------------------------------------------------

--
-- Table structure for table `output_part`
--

CREATE TABLE `output_part` (
  `outputpart_id` int(11) NOT NULL,
  `part_id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `stock_in` int(11) NOT NULL,
  `stock_out` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `output_part`
--

INSERT INTO `output_part` (`outputpart_id`, `part_id`, `id_category`, `stock_in`, `stock_out`, `id_user`, `keterangan`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 0, 2, 62, 'Test', 0, '2024-03-11 14:25:24', '2024-03-11 14:25:24'),
(2, 5, 2, 0, 1, 62, 'Test', 0, '2024-03-12 04:11:10', '2024-03-12 04:11:10'),
(4, 7, 2, 0, 1, 66, 'Test', 0, '2024-03-12 06:39:46', '2024-03-12 06:39:46'),
(9, 3, 1, 12, 0, 66, 'Test', 0, '2024-03-12 07:21:59', '2024-03-12 07:21:59'),
(10, 3, 1, 1, 0, 66, 'Test', 0, '2024-03-12 07:22:37', '2024-03-12 07:22:37'),
(11, 5, 1, 2, 0, 66, 'Test', 0, '2024-03-12 07:26:17', '2024-03-12 07:26:17'),
(12, 5, 1, 1, 0, 66, 'Test', 0, '2024-03-12 07:26:53', '2024-03-12 07:26:53'),
(13, 3, 2, 0, 1, 62, 'ambil', 0, '2024-03-14 01:43:47', '2024-03-14 01:43:47'),
(16, 3, 2, 0, 3, 62, 'ambil', 0, '2024-03-18 02:47:49', '2024-03-18 02:47:49');

-- --------------------------------------------------------

--
-- Table structure for table `parts`
--

CREATE TABLE `parts` (
  `part_id` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `part_number` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `qty_stock` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL,
  `refurbished_at` date DEFAULT NULL,
  `line` varchar(250) NOT NULL,
  `image` varchar(250) DEFAULT NULL,
  `place` varchar(250) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parts`
--

INSERT INTO `parts` (`part_id`, `id_area`, `part_number`, `description`, `qty_stock`, `price`, `refurbished_at`, `line`, `image`, `place`, `is_deleted`, `created_at`, `update_at`) VALUES
(1, 1, 98989898, 'Test', 8, 400000, NULL, 'AL4', NULL, 'Rak', 1, '2024-03-10 07:29:55', '2024-03-12 02:48:11'),
(2, 2, 90909090, 'Test 1', 4, 10000, NULL, '', NULL, NULL, 0, '2024-03-11 04:09:13', '2024-03-11 12:40:38'),
(3, 1, 1, '1', 9, 21000, '2024-03-12', '', '1710206527363-474259546.png', 'Rak', 0, '2024-03-12 01:22:07', '2024-03-18 02:47:49'),
(4, 1, 10, 'Test fix', 2, 20000, NULL, 'AL4', '1710214418411-825664086.jpeg', 'Lemari', 0, '2024-03-12 01:37:46', '2024-03-12 03:33:38'),
(5, 7, 1, 'Test Pet', 9, 100000, NULL, 'PET', '1710216483084-546785154.png', 'Lemari', 0, '2024-03-12 04:08:03', '2024-03-12 07:26:53'),
(6, 12, 2, 'test injection (bekas)', 1, 100000, '2024-03-12', 'PET', '1710217081972-468878034.png', 'Rak', 0, '2024-03-12 04:18:02', '2024-03-13 00:44:38'),
(7, 9, 2, '2', 1, 10000, NULL, 'PET', '1710225525164-540382555.jpeg', 'Lemari', 0, '2024-03-12 06:38:45', '2024-03-12 06:39:46'),
(8, 14, 1, '1', 1, 100000, NULL, 'CAN', '1710231677800-799291706.jpeg', 'Rak', 0, '2024-03-12 08:21:17', '2024-03-12 08:21:17'),
(9, 19, 1212, 'test', 12, 12434, NULL, 'PET', '1710378101057-207409696.png', 'test', 0, '2024-03-14 01:01:41', '2024-03-14 01:01:41'),
(10, 20, 323, 'test', 12, 344434, NULL, 'PET', '1710378175602-898818422.png', 'tes', 0, '2024-03-14 01:02:55', '2024-03-14 01:02:55'),
(11, 24, 123, 'test', 12, 12000, '2024-03-14', 'PET', '1710380473020-204439858.png', 'test', 0, '2024-03-14 01:41:13', '2024-03-14 01:51:13'),
(12, 14, 2, 'test', 12, 1212, NULL, 'CAN', '1710381105473-500633979.png', 'test', 0, '2024-03-14 01:51:45', '2024-03-14 01:51:45'),
(13, 19, 23, '232', 34, 1212, NULL, 'PET', '1710383428967-594490248.png', 'eaeae', 0, '2024-03-14 02:30:29', '2024-03-14 02:30:29'),
(14, 19, 23, 'GB BF', 342, 232323, NULL, 'GBL', '1710383499988-819360395.png', 'tes', 0, '2024-03-14 02:31:40', '2024-03-14 02:31:40'),
(15, 14, 231, 'HHH', 23, 54545, NULL, 'CAN', '1710383575746-174164077.png', 'HHH', 0, '2024-03-14 02:32:55', '2024-03-14 02:32:55'),
(16, 21, 5, 'dd', 31, 131313, NULL, 'GBL', '1710383817921-827083070.png', 'dddd', 0, '2024-03-14 02:36:58', '2024-03-14 02:36:58'),
(17, 22, 34, 'dd', 31, 131313, NULL, 'PET', '1710575895239-475515614.png', 'dddd', 0, '2024-03-16 07:58:15', '2024-03-16 07:58:15'),
(18, 23, 1, 'test', 23, 2434, NULL, 'GBL', '1710576121467-345402744.png', 'fgfgfg', 0, '2024-03-16 08:02:01', '2024-03-16 08:02:01'),
(19, 3, 5, 'test', 23, 2434, NULL, 'AL4', '1710723476278-531131364.png', 'fgfgfg', 0, '2024-03-18 00:57:56', '2024-03-18 00:57:56'),
(20, 21, 3, 'qas', 12, 2323, NULL, 'GBL', '1710726868586-138826453.png', 'asd', 0, '2024-03-18 01:54:28', '2024-03-18 01:54:28'),
(21, 15, 1, 'aa', 12, 23323, NULL, 'CAN', '1710728884564-825897210.png', 'sdds', 0, '2024-03-18 02:28:04', '2024-03-18 02:28:04'),
(22, 17, 67, 'gh', 34, 23232, NULL, 'CAN', '1710731770584-796390102.png', 'gfggfgf', 0, '2024-03-18 03:16:10', '2024-03-18 03:16:10'),
(23, 6, 1, 'asss', 12, 34544, NULL, 'AL4', '1710812002952-429481701.png', 'wes', 0, '2024-03-19 01:33:23', '2024-03-19 01:33:23'),
(24, 1, 2, 'www', 221, 1213, NULL, 'AL4', '1710812131147-571602154.png', 'fdddd', 0, '2024-03-19 01:35:31', '2024-03-19 01:35:31'),
(25, 17, 4546, 'test', 34, 244333, NULL, 'CAN', '1710812210622-5912861.png', 'test', 0, '2024-03-19 01:36:50', '2024-03-19 01:36:50'),
(26, 6, 2, 'test', 13, 4455, '2024-03-19', 'AL4', '1710812359261-815046731.png', 'ggff', 0, '2024-03-19 01:38:28', '2024-03-19 01:39:19'),
(27, 12, 0, 'lll', 90, 9090, NULL, 'PET', '1710812483866-140288008.png', 'lll', 0, '2024-03-19 01:41:23', '2024-03-19 01:41:23'),
(28, 12, 123, 'pet', 123, 37, NULL, 'PET', '1710812739083-758162339.png', 'pet', 0, '2024-03-19 01:45:39', '2024-03-19 01:45:39'),
(29, 25, 12, 'fds', 23, 12, NULL, 'GBL', NULL, NULL, 0, '2024-03-19 01:57:20', '2024-03-19 01:57:20'),
(30, 24, 123323, 'sdassdas', 12, 3232, NULL, 'GBL', '1710813610784-100691935.png', 'ffff', 0, '2024-03-19 02:00:10', '2024-03-19 02:00:10');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `question_text` varchar(255) NOT NULL,
  `id_area` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `result_id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `update_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `score_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

CREATE TABLE `supply` (
  `id_supply` int(11) NOT NULL,
  `nama_supply` varchar(255) NOT NULL,
  `id_area` int(11) NOT NULL,
  `stok` int(11) NOT NULL,
  `no_material` varchar(255) NOT NULL,
  `eom` varchar(255) NOT NULL,
  `minimal_stok` int(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `max_stok` int(255) NOT NULL,
  `resv_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supply`
--

INSERT INTO `supply` (`id_supply`, `nama_supply`, `id_area`, `stok`, `no_material`, `eom`, `minimal_stok`, `is_deleted`, `max_stok`, `resv_date`) VALUES
(1, 'ayam', 2, 16, '7000009499', 'PC', 10, 0, 16, '0000-00-00'),
(2, 'a', 2, 5, '23', 'test', 12, 0, 32, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `group_id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`group_id`, `id_user`) VALUES
(1, 1),
(2, 3),
(3, 4),
(4, 5),
(5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id_transaction` int(11) NOT NULL,
  `id_supply` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_user` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `resv_date` date DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id_transaction`, `id_supply`, `id_category`, `tanggal`, `id_user`, `jumlah`, `id_area`, `resv_date`, `description`, `is_deleted`) VALUES
(1, 1, 1, '2024-03-12 17:00:00', 1, 12, 2, '2024-03-11', 'sd', 0),
(2, 1, 1, '2024-03-12 17:00:00', 1, 3, 2, '2024-03-11', 'masuk', 0),
(3, 2, 1, '2024-03-15 17:00:00', 1, 5, 2, '2024-03-13', 'dfdf', 0),
(4, 1, 1, '2024-03-17 17:00:00', 62, 8, 2, '2024-03-16', 'asa', 0),
(5, 1, 2, '2024-03-17 17:00:00', 62, 7, 2, NULL, 'ass', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(255) NOT NULL,
  `nik` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `id_line` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `nik`, `password`, `role_id`, `id_area`, `group_id`, `id_line`) VALUES
(1, 'Moh. Mohaimin', 1188, '123', 1, 4, 1, 1),
(2, 'Tatang Sunarya', 1280, '123', 1, 4, 1, 1),
(3, 'Andry Billy Wirawan', 1423, '123', 3, 4, 2, 1),
(4, 'TRIYATMOKO', 1477, '123', 3, 4, 3, 1),
(5, 'M. ULUL AL BAAB', 1226, '123', 3, 4, 4, 1),
(6, 'M. SYAROFUDDIN', 1641, '123', 3, 4, 5, 1),
(7, 'FEBRI ERWANTO', 1075, '123', 2, 2, 2, 1),
(8, 'M. FAISAL HERMAWAN', 4064, '123', 2, 2, 2, 1),
(9, 'DENDY RANGGA GUNTARA', 3801, '123', 2, 2, 2, 1),
(10, 'Opan Sopian', 4101, '123', 2, 2, 2, 1),
(11, 'Anggi Firman', 4199, '123', 2, 2, 2, 1),
(12, 'Natanael Hamonangan G.', 2298, '123', 2, 1, 2, 1),
(13, 'Heru Noveansyah', 4075, '123', 2, 1, 2, 1),
(14, 'Audy Ervan Gani', 4100, '123', 2, 1, 2, 1),
(15, 'Eris Riswandi', 1801, '123', 2, 3, 2, 1),
(16, 'Encep Saepul Rahman', 3977, '123', 2, 3, 2, 1),
(17, 'Aang Anggara', 3814, '123', 2, 3, 2, 1),
(18, 'Haristio Sanjaya', 4294, '123', 2, 3, 2, 1),
(19, 'M. Tasrip', 4188, '123', 2, 3, 2, 1),
(20, 'M. Mulya Taufiq', 4159, '123', 2, 3, 2, 1),
(21, 'Fiqih Adnan Mugia Majid', 3199, '123', 2, 2, 3, 1),
(22, 'Arif Hamdani', 4158, '123', 2, 2, 3, 1),
(23, 'Azis Rahman Siregar', 3882, '123', 2, 2, 3, 1),
(24, 'Badarudin', 4296, '123', 2, 2, 3, 1),
(25, 'Mulki Udhia Khatami', 3934, '123', 2, 2, 4, 1),
(26, 'Deza Ariffandy', 2083, '123', 2, 1, 3, 1),
(27, 'M. Latief', 4076, '123', 2, 1, 3, 1),
(28, 'Gilang Cahya', 4289, '123', 2, 1, 3, 1),
(29, 'Kinar Sunarya', 1808, '123', 2, 3, 3, 1),
(30, 'Kiki Aprillianto', 4032, '123', 2, 3, 3, 1),
(31, 'Sopyan Setiadi', 3792, '123', 2, 3, 3, 1),
(32, 'Irfan Faizal Cahya Persada', 4297, '123', 2, 3, 3, 1),
(33, 'M. Supandi Rifai', 4298, '123', 1, 3, 3, 1),
(34, 'Azkal Fauzan', 3802, '123', 2, 3, 3, 1),
(35, 'Deden Hendrawan', 2322, '123', 2, 2, 4, 1),
(36, 'Andika Wahyu Utomo', 4065, '123', 2, 2, 4, 1),
(37, 'Rian Alfiansyah', 4187, '123', 2, 2, 4, 1),
(38, 'Pepen Sukmawijaya', 4295, '123', 2, 2, 4, 1),
(39, 'Ade Rudiansyah', 3957, '123', 2, 2, 4, 1),
(40, 'M. Arif Syukur Darmiyanto', 2931, '123', 1, 1, 4, 1),
(41, 'Salman El Islam', 4094, '123', 2, 1, 4, 1),
(42, 'Yusuf Mubarok', 4203, '123', 2, 1, 4, 1),
(43, 'Ahmad Jaelani', 1825, '123', 2, 3, 4, 1),
(44, 'Bayu Nur Shodiq', 4034, '123', 2, 3, 4, 1),
(45, 'Rahman Hidayatullah', 3800, '123', 2, 3, 4, 1),
(46, 'Muhammad Riza Anugrah', 4066, '123', 2, 3, 4, 1),
(47, 'Muhibudin Siddik', 4161, '123', 2, 3, 4, 1),
(48, 'Fathul Majid', 3799, '123', 1, 3, 4, 1),
(49, 'Ruslan Arif Permana', 2337, '123', 2, 2, 5, 1),
(50, 'Irawan', 4080, '123', 2, 2, 5, 1),
(51, 'Fedwi Surya Asmita', 4162, '123', 2, 2, 5, 1),
(52, 'Aldi Dwi Rustandi', 4079, '123', 2, 2, 5, 1),
(53, 'Harun Ashari', 3935, '123', 2, 2, 5, 1),
(54, 'Sandi', 1803, '123', 2, 1, 5, 1),
(55, 'M. Iqbal Defryanto', 4036, '123', 2, 1, 5, 1),
(56, 'Ari Nopriyandoko', 4033, '123', 2, 1, 5, 1),
(57, 'Denny Firmansyah', 620, '123', 2, 3, 5, 1),
(58, 'Faizal Akmal Maulana', 4074, '123', 2, 3, 5, 1),
(59, 'Fajri Akhsan Maulana', 3777, '123', 2, 3, 5, 1),
(60, 'Dicky Jainul Bahar', 4059, '123', 2, 3, 5, 1),
(61, 'Rizki Ramadhan', 4160, '123', 2, 3, 5, 1),
(62, 'M. Fajar', 3956, '123', 4, 4, 1, 1),
(66, 'Test', 1111, '123', 4, 13, 1, 3),
(67, 'ZAKA', 3430, '123', 1, 25, 1, 1),
(68, 'Irniawan Ardiansyah', 1826, '123', 2, 19, NULL, 4),
(73, 'Sudrajat', 2571, '123', 2, 19, NULL, 4),
(74, 'Akbar Dzikrullah', 3365, '123', 2, 22, NULL, 4),
(75, 'Reafli Rizki Alfatoni', 3382, '123', 2, 22, NULL, 4),
(76, 'Muhammad Fikri A', 3451, '123', 2, 20, NULL, 4),
(77, 'Muhammad IRFAN', 3429, '123', 4, 25, NULL, 4),
(78, 'Muhammad Fikri A', 3451, '123', 2, 21, NULL, 4),
(79, 'Bayu Herlambang', 571, '123', 3, 25, NULL, 4),
(80, 'Herra Irawan ', 1974, '123', 3, 25, NULL, 4),
(81, 'Richi Ries Riyatna', 1817, '123', 3, 25, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `userprogress`
--

CREATE TABLE `userprogress` (
  `userprogress_id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userprogress`
--

INSERT INTO `userprogress` (`userprogress_id`, `id_user`, `document_id`, `completed`) VALUES
(1, 40, 32, 0),
(2, 40, 38, 0),
(3, 40, 39, 0),
(4, 40, 40, 0),
(5, 40, 41, 0),
(6, 40, 42, 0),
(7, 40, 43, 0),
(8, 40, 44, 0),
(9, 40, 45, 0),
(10, 40, 46, 0),
(11, 40, 33, 0),
(12, 40, 47, 0),
(13, 40, 48, 0),
(14, 40, 49, 0),
(15, 40, 50, 0),
(16, 40, 51, 0),
(17, 40, 52, 0),
(18, 40, 53, 0),
(19, 40, 54, 0),
(20, 40, 34, 0),
(21, 40, 55, 0),
(22, 40, 56, 0),
(23, 40, 35, 0),
(24, 40, 57, 0),
(25, 40, 58, 0),
(26, 40, 36, 0),
(27, 40, 59, 0),
(28, 40, 60, 0),
(29, 40, 37, 0),
(30, 40, 61, 0),
(31, 40, 62, 0),
(32, 40, 63, 0),
(33, 40, 64, 0),
(34, 40, 65, 0),
(35, 40, 66, 0),
(36, 40, 67, 0),
(37, 40, 68, 0),
(38, 40, 69, 0),
(39, 40, 70, 0),
(40, 40, 71, 0),
(41, 35, 1, 1),
(42, 35, 7, 0),
(43, 35, 8, 0),
(44, 35, 9, 0),
(45, 35, 10, 0),
(46, 35, 11, 0),
(47, 35, 2, 0),
(48, 35, 12, 0),
(49, 35, 13, 0),
(50, 35, 14, 0),
(51, 35, 15, 0),
(52, 35, 16, 0),
(53, 35, 17, 0),
(54, 35, 18, 0),
(55, 35, 4, 0),
(56, 35, 19, 0),
(57, 35, 20, 0),
(58, 35, 3, 0),
(59, 35, 21, 0),
(60, 35, 22, 0),
(61, 35, 23, 0),
(62, 35, 24, 0),
(63, 35, 5, 0),
(64, 35, 25, 0),
(65, 35, 26, 0),
(66, 35, 6, 0),
(67, 35, 27, 0),
(68, 35, 28, 0),
(69, 35, 29, 0),
(70, 35, 30, 0),
(71, 35, 31, 0),
(72, 43, 72, 0),
(73, 43, 77, 0),
(74, 43, 78, 0),
(75, 43, 79, 0),
(76, 43, 80, 0),
(77, 43, 81, 0),
(78, 43, 82, 0),
(79, 43, 83, 0),
(80, 43, 84, 0),
(81, 43, 73, 0),
(82, 43, 85, 0),
(83, 43, 86, 0),
(84, 43, 87, 0),
(85, 43, 88, 0),
(86, 43, 89, 0),
(87, 43, 90, 0),
(88, 43, 74, 0),
(89, 43, 91, 0),
(90, 43, 92, 0),
(91, 43, 93, 0),
(92, 43, 94, 0),
(93, 43, 75, 0),
(94, 43, 95, 0),
(95, 43, 76, 0),
(96, 43, 96, 0),
(97, 43, 97, 0),
(98, 43, 98, 0),
(99, 43, 99, 0),
(100, 43, 100, 0),
(101, 43, 101, 0),
(102, 43, 102, 0),
(103, 43, 103, 0),
(104, 43, 104, 0),
(105, 43, 105, 0),
(106, 43, 106, 0),
(107, 43, 107, 0),
(108, 43, 108, 0),
(109, 43, 109, 0),
(110, 7, 1, 1),
(111, 7, 7, 1),
(112, 7, 8, 1),
(113, 7, 9, 1),
(114, 7, 10, 1),
(115, 7, 11, 1),
(116, 7, 12, 1),
(117, 7, 2, 1),
(118, 7, 13, 1),
(119, 7, 14, 1),
(120, 7, 15, 1),
(121, 7, 16, 1),
(122, 7, 17, 1),
(123, 7, 18, 1),
(124, 7, 19, 1),
(125, 7, 20, 1),
(126, 7, 3, 1),
(127, 7, 21, 1),
(128, 7, 4, 1),
(129, 7, 22, 1),
(130, 7, 23, 1),
(131, 7, 5, 1),
(132, 7, 24, 1),
(133, 7, 6, 1),
(134, 7, 25, 1),
(135, 7, 26, 1),
(136, 7, 27, 1),
(137, 7, 28, 1),
(138, 7, 29, 1),
(139, 7, 30, 1),
(140, 7, 31, 1),
(141, 1, 111, 0),
(142, 1, 115, 0),
(143, 1, 114, 0),
(144, 1, 110, 0),
(145, 1, 112, 0),
(146, 1, 113, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userrole`
--

CREATE TABLE `userrole` (
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userrole`
--

INSERT INTO `userrole` (`role_id`, `name`, `keterangan`) VALUES
(1, 'Admin', 'MONITORING, CRUD'),
(2, 'User', 'LEARNING'),
(3, 'SPV', 'CRUD, Monitoring By Group'),
(4, 'MTC', 'Planner, Monitoring Part');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `videos_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `video_url` varchar(100) NOT NULL,
  `video_title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`videos_id`, `document_id`, `video_url`, `video_title`) VALUES
(1, 1, '-', 'CIP Alkali dan HWT'),
(2, 2, '-', 'Cleaning dan Sanitasi Area SGH'),
(3, 3, '-', 'Pengoperasian Cold Storage'),
(4, 4, '#', 'Operasional Crane Bag'),
(5, 5, 'https://youtu.be/D5aMRjkgAZ4', 'Pengoperasian Crane Portable'),
(6, 6, 'https://youtu.be/7H3c0-KfvL0', 'Pengoperasian Lifter Material'),
(7, 7, '#', 'Pembersihan Chamber Mineral dan Juice'),
(8, 8, 'https://youtu.be/ZTrP2y7iD_8', 'Pembersihan Filter Mesh'),
(9, 9, '#', 'Pembersihan Preparasi selama proses'),
(10, 10, '#', 'Pembuatan Larutan Gula dan Syrup'),
(11, 11, '#', 'Penerimaan Penempatan Bahan Baku dari Gudang'),
(12, 12, '#', 'Pengambilan Sample Gula & Syrup'),
(13, 13, '#', 'Penggunaan dan Penimbangan Material Clarified GF'),
(14, 14, '#', 'Pengoperasian Clean Steam Generator'),
(15, 15, '#', 'Pengoperasian Contiflow'),
(16, 16, '#', 'Cleaning Methode & Handling Chemical'),
(17, 17, '#', 'Cleaning Methode & Handling Material'),
(18, 18, '#', 'Integrited Test (Out Line) Water Intrusion Test AL4'),
(19, 19, '#', 'pengoperasian Press Filter'),
(20, 20, '#', 'Pengoperasian Vario Asept Unit'),
(21, 21, '#', 'Pengoperasian Hydraulic Drum Stacker'),
(22, 22, '#', 'Penimbangan Bahan Baku Preparasi Dalam'),
(23, 23, '#', 'Proses Make Up Cautic (NaOH) CIP'),
(24, 24, '#', 'Proses Penuangan Mineral Preparasi'),
(25, 25, '#', 'Proses Penuangan Gula AL4'),
(26, 26, '#', 'Cleaning Hopper & Screw AL4'),
(27, 27, '#', 'Penggantian Filter Catridge'),
(28, 28, '#', 'Pengoperasian Vario Store Unit'),
(29, 29, '#', 'SIP Filter Gula & Juice AL4'),
(30, 30, '#', 'SIP Filter Soft Water'),
(31, 31, '#', 'Pengoperasian Forklift & Cleaning Methode Forklift'),
(32, 32, '#', 'Sanitasi Area IBF AL4'),
(33, 33, '#', 'CSIOP Filler Capper dan Cap Sterilisasi'),
(34, 34, '#', 'Pengecekan Jalur Solution IBF'),
(35, 35, '#', 'Pencatatan Abnormalitas Proses Filler'),
(36, 36, '#', 'Rekapitulasi Area Filling'),
(37, 37, '#', 'Penggunaan Passbox'),
(38, 38, '#', 'Persiapan Awal Proses Machine Filler'),
(39, 39, '#', 'Operasional CSIOP Machine Filler'),
(40, 40, '#', 'Cleaning PET View & Cleaning Mold Mode Blow Machine'),
(41, 41, '#', 'Persiapan awal Proses Machine Injecton'),
(42, 42, '#', 'Machine Purging Injection'),
(43, 43, '#', 'Pengoperasian Precharge Machine Injection'),
(44, 44, '#', 'Pengoperasian Free Drop Machine Injection'),
(45, 45, '#', 'Pengoperasian Running Machine Injection'),
(46, 46, '#', 'Menghentikan Machine Injection Ditengah Proses Produksi'),
(47, 47, '#', 'Shuting Down Machine Injection'),
(48, 48, '#', 'Cleaning & Sanitasi Area Hoper Resin & Dryer Machine Injection'),
(49, 49, '#', 'Pengoperasian Manua Daikin'),
(50, 50, '#', 'Drain Resin Menggunakan Drain System Dryer Inejction'),
(51, 51, '#', 'Prosedur Memasukan Material'),
(52, 51, '#', 'Operasional Persiapan Mesin Daikin'),
(53, 53, '#', 'Operaional Persiapan Sistem HVAC'),
(54, 54, '#', 'Operasional Sterilisasi Ruangan H202'),
(55, 55, '#', 'Treatment After Strerilisasi Ruangan H202'),
(56, 56, '#', 'Persiapan Awal Proses Mesin Blow'),
(57, 57, 'https://youtu.be/MmpElxHiEqw', 'Cleaning Mold & Streching Rod Mesin Blow'),
(58, 58, 'https://youtu.be/p91BrzDZOko', 'Operasional Drain Preform Mesin Blow'),
(59, 59, '#', 'Intervensi Modul Strelisisasi Mesin Filler & Blow'),
(60, 60, '#', 'Intervensi Area Steril Mesin Filler & Blow'),
(61, 61, '#', 'Rekapitulasi Area Blow Moulder'),
(62, 62, '#', 'Prosedur End Prouction Pada Mesin filler & Blow'),
(63, 63, '#', 'Prosedur Pembuangan Waste Of Process'),
(64, 64, '#', 'Tata Cara Membuang Limbah B3 Area IBF'),
(65, 64, '#', 'Prosedur Masuk & Keluar Area IBF'),
(66, 66, '#', 'Rekapitulasi Area Injection'),
(67, 67, '#', 'Pencatatan Abnormalitasi Proses Blow'),
(68, 68, '#', 'Pemeriksaan Glassware Area IBF'),
(69, 69, '#', 'Prosedur Pengecekan Sterile Filter'),
(70, 70, '#', 'Pengecekan Awal LOT Area Blow IBF'),
(71, 71, '#', 'Cleanin Chamber Out Blow'),
(72, 72, '#', 'Pemeriksaan Area Packing AL4'),
(73, 73, 'https://youtu.be/WEpLRK_gpZw', 'Pengukuran Caping Angle'),
(74, 74, 'https://youtu.be/lU4pJSFbyKs', 'Pengambilan Sample Volume Filling'),
(75, 75, 'https://youtu.be/d4leeGFHYLA', 'Operasional Mesin Conveyor'),
(76, 76, 'https://youtu.be/PD3rPJV5np8', 'Pengoperasian Camera Inspection K731 DCV'),
(77, 77, 'https://youtu.be/saDLh4N0eyw', 'Operasional Mesin Multireel'),
(78, 78, 'https://youtu.be/bpH8k1PPtEM', 'Operasional Mesin Labeller'),
(79, 79, 'https://youtu.be/HoH-fcF0AyM', 'Pengoperasian camera Inspection K731 DCW'),
(80, 80, '#', 'Pengoperasian IJP Cap Domino A520i'),
(81, 81, 'https://youtu.be/sW_adMy65-I', 'Pengoperasian Lubrication (ECOLAB)'),
(82, 82, 'https://youtu.be/fanpO5pdW-M', 'Operasional IJP VideoJet Caser'),
(83, 83, 'https://youtu.be/d-dyraZvg_Q', 'Operasional Mesin Caser'),
(84, 84, 'https://youtu.be/sXlSWLdi2Xs', 'Pengoperasian Checkmat Caser'),
(85, 85, '#', 'Prosedur Memasukan Cap'),
(86, 86, 'https://youtu.be/ha7aLV8B7AA', 'Pengoperasian Weight Checker'),
(87, 87, 'https://youtu.be/hqmIDDZuwZo', 'Pengoperasian Palletizer'),
(88, 88, '#', 'Proses Memasukan Outer Box dan Hot Melt Glue dari Area Loading ke Caser'),
(89, 88, 'https://youtu.be/yVXuUGZbf9k', 'Operasional Panel GASNER Cap'),
(90, 90, '#', 'Catatan Rekapitulasi Pengemasan'),
(91, 91, '#', 'Change Over Mesin Caser'),
(92, 92, 'https://youtu.be/MkbfB-xLH9A', 'Pengoperasian Conveyor Caser'),
(93, 93, '#', 'Tata Cara Membuang Poroduk Reject'),
(94, 94, '#', 'Pengembalian Produk dari Palletizer'),
(95, 95, '#', 'Cleaning Area Packing'),
(96, 96, '#', 'Pengoperasian Bobin Shrink Film'),
(97, 97, '#', 'Pengambilan Sampel Hold dan Reject Loading'),
(98, 98, 'https://youtu.be/RlvHqKN1GVk', 'Pergantian Lot Seksi Packing'),
(99, 99, '#', 'Perhitungan dan Penempelan Label FG'),
(100, 100, 'https://youtu.be/zl-mWWp-T0U', 'Pengoperasian IJP Body Domino A520i'),
(101, 100, '#', 'Pemasukan Material Label, Glue Label dan Supplies ke Area Packing'),
(102, 101, '#', 'Pergantian Label Pada Mesin Multireel'),
(103, 103, '#', 'Tata Cara Masuk Area Packing & Caser'),
(104, 104, '#', 'Verifikasi Kamera Checkmat DCW'),
(105, 105, '#', 'Verifikasi Kamera Checkmat DCV'),
(106, 106, '#', 'Penghancuran Reject Material Di Line-4'),
(107, 107, '#', 'Verifikasi Camera Inspection Lot Box and Verifikasi Weight Checker'),
(108, 108, '#', 'Pengoperasian IJP Box Diagraph TJ1000'),
(109, 109, '#', 'Pengoperasian IJP Cap Link 8940'),
(110, 110, '#', 'Laundry Baju OC-3 & Aseptic Line 4'),
(111, 111, '#', 'Operasional Machine Oven untuk Pengeringan Sepatu/Baju Loundry'),
(112, 111, '#', 'Operasional Mesin Auto Clave Loundry'),
(113, 113, '#', 'Penanganan Chemcial yang Digunakan di Produksi'),
(114, 114, '#', 'Penanganan Abnormalitas Proses Produksi PS AL4'),
(115, 115, '#', 'Penanganan Abnormalitasi Proses Produksi AL4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question` (`question_id`);

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `Area ID` (`id_area`);

--
-- Indexes for table `line`
--
ALTER TABLE `line`
  ADD PRIMARY KEY (`id_line`);

--
-- Indexes for table `output_part`
--
ALTER TABLE `output_part`
  ADD PRIMARY KEY (`outputpart_id`),
  ADD KEY `userId` (`id_user`),
  ADD KEY `partId` (`part_id`),
  ADD KEY `id_category` (`id_category`);

--
-- Indexes for table `parts`
--
ALTER TABLE `parts`
  ADD PRIMARY KEY (`part_id`),
  ADD KEY `partToArea` (`id_area`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `idArea` (`id_area`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `idUser` (`id_user`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`score_id`);

--
-- Indexes for table `supply`
--
ALTER TABLE `supply`
  ADD PRIMARY KEY (`id_supply`),
  ADD KEY `id_area` (`id_area`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `teamToUser` (`id_user`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id_transaction`),
  ADD KEY `id_area` (`id_area`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_supply` (`id_supply`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `ROLE_ID` (`role_id`),
  ADD KEY `userToArea` (`id_area`),
  ADD KEY `userToTeam` (`group_id`);

--
-- Indexes for table `userprogress`
--
ALTER TABLE `userprogress`
  ADD PRIMARY KEY (`userprogress_id`),
  ADD KEY `progresToUser` (`id_user`),
  ADD KEY `progresToDocument` (`document_id`);

--
-- Indexes for table `userrole`
--
ALTER TABLE `userrole`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`videos_id`),
  ADD KEY `Document ID` (`document_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `line`
--
ALTER TABLE `line`
  MODIFY `id_line` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `output_part`
--
ALTER TABLE `output_part`
  MODIFY `outputpart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `parts`
--
ALTER TABLE `parts`
  MODIFY `part_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `score_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supply`
--
ALTER TABLE `supply`
  MODIFY `id_supply` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id_transaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `userprogress`
--
ALTER TABLE `userprogress`
  MODIFY `userprogress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `userrole`
--
ALTER TABLE `userrole`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `videos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `question` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `Area ID` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);

--
-- Constraints for table `output_part`
--
ALTER TABLE `output_part`
  ADD CONSTRAINT `id_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`),
  ADD CONSTRAINT `partId` FOREIGN KEY (`part_id`) REFERENCES `parts` (`part_id`),
  ADD CONSTRAINT `userId` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `parts`
--
ALTER TABLE `parts`
  ADD CONSTRAINT `partToArea` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `idArea` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `idUser` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `supply`
--
ALTER TABLE `supply`
  ADD CONSTRAINT `supply_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `teamToUser` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`),
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`),
  ADD CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`id_supply`) REFERENCES `supply` (`id_supply`),
  ADD CONSTRAINT `transaction_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `ROLE_ID` FOREIGN KEY (`role_id`) REFERENCES `userrole` (`role_id`),
  ADD CONSTRAINT `userToArea` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`),
  ADD CONSTRAINT `userToTeam` FOREIGN KEY (`group_id`) REFERENCES `team` (`group_id`);

--
-- Constraints for table `userprogress`
--
ALTER TABLE `userprogress`
  ADD CONSTRAINT `progresToDocument` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`),
  ADD CONSTRAINT `progresToUser` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `Document ID` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
