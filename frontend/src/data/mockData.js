/**
 * AURUM Mock Data — mirrors PostgreSQL schema field names exactly.
 * Field names match DB columns for a seamless swap to real API.
 * Seed: 10 hospitals (Mumbai region), 3 ambulances, 2 active patients.
 */

// ─── HOSPITALS ──────────────────────────────────────────────────────────────
export const MOCK_HOSPITALS = [
  {
    "id": "PUN001",
    "name": "AADHAR HOSPITAL MULTISPECIALITY & ICU ( Managed by Haritatv Ayurved Pvt. Ltd.),Pune",
    "address": "Pune",
    "lat": 18.6253,
    "lng": 73.8065,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN002",
    "name": "ACCORD HOSPITAL",
    "address": "Pune",
    "lat": 18.5312,
    "lng": 73.8417,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 22,
    "avail_icu_beds": 2,
    "total_gen_beds": 150,
    "avail_gen_beds": 38,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN003",
    "name": "ADHAR SUPERSPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.4995,
    "lng": 73.931,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 6,
    "avail_icu_beds": 0,
    "total_gen_beds": 45,
    "avail_gen_beds": 11,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN004",
    "name": "AMRUT HOSPITAL AND RESEARCH CENTER",
    "address": "Pune",
    "lat": 18.5289,
    "lng": 73.8396,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN005",
    "name": "ANAND HOSPITAL",
    "address": "Pune",
    "lat": 18.6203,
    "lng": 73.798,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN006",
    "name": "ASG Eye Hospital",
    "address": "Pune",
    "lat": 18.5301,
    "lng": 73.8431,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 2,
    "avail_icu_beds": 0,
    "total_gen_beds": 14,
    "avail_gen_beds": 4,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 71,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN007",
    "name": "ATTHARVA ACCIDENT HOSPITAL",
    "address": "Pune",
    "lat": 18.5269,
    "lng": 73.8571,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 2,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN008",
    "name": "Aarogyam Multispeciality Hospital,Pvt,Khed,Pune",
    "address": "Pune",
    "lat": 18.48,
    "lng": 73.807,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 8,
    "avail_icu_beds": 1,
    "total_gen_beds": 55,
    "avail_gen_beds": 14,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN009",
    "name": "Aditya Birla Memorial Hospital,Chinchwad,Pune,PVT",
    "address": "Pune",
    "lat": 18.5217,
    "lng": 73.8578,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 75,
    "avail_icu_beds": 3,
    "total_gen_beds": 500,
    "avail_gen_beds": 125,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN010",
    "name": "Alephata Hospital,Junnar,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5288,
    "lng": 73.8423,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 11,
    "avail_icu_beds": 4,
    "total_gen_beds": 75,
    "avail_gen_beds": 19,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN011",
    "name": "Anandi Multispeciality Hospital,Purandar,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5953,
    "lng": 73.7307,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN012",
    "name": "Anushree Childrens And Multispeciality Hospital,Indapur,Pune,Pvt",
    "address": "Pune",
    "lat": 18.4665,
    "lng": 73.8745,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": true,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.459Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN013",
    "name": "Apex Hospital",
    "address": "Pune",
    "lat": 18.4934,
    "lng": 73.824,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 2,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN014",
    "name": "Apex Hospital,Pune City,Pvt",
    "address": "Pune",
    "lat": 18.6302,
    "lng": 73.8048,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 6,
    "avail_icu_beds": 0,
    "total_gen_beds": 45,
    "avail_gen_beds": 11,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN015",
    "name": "Aundh Institute of Medical Science , Aundh",
    "address": "Pune",
    "lat": 18.6225,
    "lng": 73.7955,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 1,
    "total_gen_beds": 101,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN016",
    "name": "BAPAT MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.4949,
    "lng": 73.8163,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 33,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN017",
    "name": "BHOSALE MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.6389,
    "lng": 73.8045,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN018",
    "name": "BHRATRATNA DR BABASAHEB AMBEDKAR CANTONMENT GENERAL HOSPITAL",
    "address": "Pune",
    "lat": 18.5979,
    "lng": 73.7379,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 4,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN019",
    "name": "Baramati hospitals Pvt Ltd",
    "address": "Pune",
    "lat": 18.5904,
    "lng": 73.7373,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 18,
    "avail_icu_beds": 4,
    "total_gen_beds": 120,
    "avail_gen_beds": 30,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN020",
    "name": "Bhandare Hospital",
    "address": "Pune",
    "lat": 18.499,
    "lng": 73.9175,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN021",
    "name": "Bharat Ratna Late Rajeev Gandhi Hospital",
    "address": "Pune",
    "lat": 18.5357,
    "lng": 73.8463,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN022",
    "name": "Bharati Ayurved Hospital",
    "address": "Pune",
    "lat": 18.5131,
    "lng": 73.8328,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 35,
    "avail_icu_beds": 9,
    "total_gen_beds": 236,
    "avail_gen_beds": 59,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN023",
    "name": "Bharati Hospital and Research Center",
    "address": "Pune",
    "lat": 18.5069,
    "lng": 73.8341,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 124,
    "avail_icu_beds": 17,
    "total_gen_beds": 831,
    "avail_gen_beds": 208,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN024",
    "name": "Bhigwan Medicare Hospital Pvt Ltd,Baramati,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5286,
    "lng": 73.8528,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN025",
    "name": "Bhimashakar hospital",
    "address": "Pune",
    "lat": 18.5144,
    "lng": 73.8605,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN026",
    "name": "Bliss Multispeciality Hospital,Haveli,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5982,
    "lng": 73.7337,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 2,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN027",
    "name": "Bobade Accident Hopital,Baramati,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5592,
    "lng": 73.7714,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 3,
    "avail_icu_beds": 0,
    "total_gen_beds": 25,
    "avail_gen_beds": 6,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN028",
    "name": "CHAKAN CRITICARE HOSPITAL PVT LTD",
    "address": "Pune",
    "lat": 18.5569,
    "lng": 73.7708,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 1,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN029",
    "name": "CHETNA HOSPITAL",
    "address": "Pune",
    "lat": 18.5517,
    "lng": 73.7895,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 48,
    "avail_gen_beds": 12,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN030",
    "name": "CHINTAMANI HOSPITAL RESEARCH CENTRE PVT LTD",
    "address": "Pune",
    "lat": 18.5165,
    "lng": 73.8465,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 2,
    "total_gen_beds": 49,
    "avail_gen_beds": 12,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN031",
    "name": "CHIRAYU CHILDERNS HOSPITAL",
    "address": "Pune",
    "lat": 18.5358,
    "lng": 73.8533,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": true,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN032",
    "name": "Care And Cure Multispeciality Hospital and Diagnostic Center",
    "address": "Pune",
    "lat": 18.5145,
    "lng": 73.8468,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 1,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN033",
    "name": "Care Multispec Iality Hospital",
    "address": "Pune",
    "lat": 18.639,
    "lng": 73.799,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 31,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN034",
    "name": "Care Multispecialty hospital",
    "address": "Pune",
    "lat": 18.5061,
    "lng": 73.9231,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN035",
    "name": "Chandumama Sonawane Maternity Home",
    "address": "Pune",
    "lat": 18.5684,
    "lng": 73.9238,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 12,
    "avail_icu_beds": 4,
    "total_gen_beds": 80,
    "avail_gen_beds": 20,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN036",
    "name": "DECCAN HARDIKAR HOSPITAL",
    "address": "Pune",
    "lat": 18.573,
    "lng": 73.9076,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 18,
    "avail_icu_beds": 5,
    "total_gen_beds": 120,
    "avail_gen_beds": 30,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN037",
    "name": "DEOYANI MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.5553,
    "lng": 73.7769,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 18,
    "avail_icu_beds": 1,
    "total_gen_beds": 120,
    "avail_gen_beds": 30,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN038",
    "name": "DHANWANTARI HOSPITAL AND CRITICARE CENTER,Purandhar,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5075,
    "lng": 73.8435,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN039",
    "name": "DR KARDILE ACCIDENT HOSPITAL, INDAPUR",
    "address": "Pune",
    "lat": 18.5648,
    "lng": 73.7737,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 2,
    "avail_icu_beds": 0,
    "total_gen_beds": 10,
    "avail_gen_beds": 3,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 70,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN040",
    "name": "DR.BHAGAT BALRUGNALAYA AND DIAGNOSTIC CENTER",
    "address": "Pune",
    "lat": 18.5287,
    "lng": 73.8648,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 3,
    "avail_icu_beds": 0,
    "total_gen_beds": 25,
    "avail_gen_beds": 6,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN041",
    "name": "DR.D.Y.PATIL COLLAGE OF AYURVED AND RESEARCH CENTRE,PUNE, CITY,PVT.",
    "address": "Pune",
    "lat": 18.5201,
    "lng": 73.866,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 4,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN042",
    "name": "DR.KHADE SUPERSPECIALITY HOSPITAL CHAKAN",
    "address": "Pune",
    "lat": 18.5279,
    "lng": 73.8639,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN043",
    "name": "Dalvi Hospital",
    "address": "Pune",
    "lat": 18.5219,
    "lng": 73.8363,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN044",
    "name": "Delight Hospital,ShirurPune,Pvt",
    "address": "Pune",
    "lat": 18.5654,
    "lng": 73.777,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 6,
    "avail_icu_beds": 0,
    "total_gen_beds": 45,
    "avail_gen_beds": 11,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN045",
    "name": "Dhakne Hospital,Pune",
    "address": "Pune",
    "lat": 18.4819,
    "lng": 73.8193,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN046",
    "name": "District Hospital Pune",
    "address": "Pune",
    "lat": 18.476,
    "lng": 73.82,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 45,
    "avail_icu_beds": 8,
    "total_gen_beds": 300,
    "avail_gen_beds": 75,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN047",
    "name": "Dr Bhausaheb Sardesai Talegaon Rural Hospital",
    "address": "Pune",
    "lat": 18.5672,
    "lng": 73.7785,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 85,
    "avail_icu_beds": 4,
    "total_gen_beds": 570,
    "avail_gen_beds": 143,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN048",
    "name": "Dr Manohar Dole Medical Foundations Galaxy Eye Hospital",
    "address": "Pune",
    "lat": 18.5814,
    "lng": 73.7398,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 3,
    "avail_icu_beds": 0,
    "total_gen_beds": 25,
    "avail_gen_beds": 6,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN049",
    "name": "Dr Todkar Hospital,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5225,
    "lng": 73.8482,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 1,
    "total_gen_beds": 34,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN050",
    "name": "Dr.Mate Hospital",
    "address": "Pune",
    "lat": 18.483,
    "lng": 73.8054,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN051",
    "name": "GUNJKAR MULTISPECIALITY",
    "address": "Pune",
    "lat": 18.5078,
    "lng": 73.8412,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 2,
    "total_gen_beds": 65,
    "avail_gen_beds": 16,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN052",
    "name": "Gawade Multispeciality Hospital,Khed,Pune,PVT",
    "address": "Pune",
    "lat": 18.5577,
    "lng": 73.7711,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 6,
    "avail_icu_beds": 0,
    "total_gen_beds": 44,
    "avail_gen_beds": 11,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN053",
    "name": "Get Well Multispeciality Hospital",
    "address": "Pune",
    "lat": 18.5158,
    "lng": 73.916,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 0,
    "total_gen_beds": 60,
    "avail_gen_beds": 15,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN054",
    "name": "Government Medical College and Hospital ,Baramati ,Pune, Govt",
    "address": "Pune",
    "lat": 18.4842,
    "lng": 73.8202,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 80,
    "avail_icu_beds": 23,
    "total_gen_beds": 536,
    "avail_gen_beds": 134,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN055",
    "name": "H.B.P. Prabhakar Malharrao Kute Memorial Hospital,Akurdi",
    "address": "Pune",
    "lat": 18.565,
    "lng": 73.7834,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 1,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN056",
    "name": "HARSH MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.5257,
    "lng": 73.8647,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN057",
    "name": "HRIDAYA MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.4613,
    "lng": 73.8693,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 2,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN058",
    "name": "HSHC LLPs OMKAR HOSPITAL",
    "address": "Pune",
    "lat": 18.5039,
    "lng": 73.9206,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN059",
    "name": "INDRESHWAR SUPER SPECIALITY HOSPITAL PVT.LTD",
    "address": "Pune",
    "lat": 18.5826,
    "lng": 73.7325,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 1,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN060",
    "name": "Indian Institute of Metabolic Sciences & Dr. Todkar Multispecialty Hospital (A Joint Venture of PMC and JT Foundation),Pune,PVT",
    "address": "Pune",
    "lat": 18.631,
    "lng": 73.8097,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 22,
    "avail_icu_beds": 5,
    "total_gen_beds": 150,
    "avail_gen_beds": 38,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN061",
    "name": "Indrayani Hospital & Cancer Institute",
    "address": "Pune",
    "lat": 18.5816,
    "lng": 73.7445,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 2,
    "avail_icu_beds": 0,
    "total_gen_beds": 0,
    "avail_gen_beds": 0,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 0,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN062",
    "name": "Integrated Cancer Treatment & Research Centre , Wagholi",
    "address": "Pune",
    "lat": 18.5689,
    "lng": 73.779,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN063",
    "name": "Isha Eye Care Pvt Ltd,Pune City,Pune,Pvt",
    "address": "Pune",
    "lat": 18.456,
    "lng": 73.8687,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 2,
    "avail_icu_beds": 0,
    "total_gen_beds": 10,
    "avail_gen_beds": 3,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 70,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN064",
    "name": "J S HOSPITAL",
    "address": "Pune",
    "lat": 18.5226,
    "lng": 73.8543,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 32,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN065",
    "name": "JIJAMATA HOSPITAL, PIMPRI",
    "address": "Pune",
    "lat": 18.4599,
    "lng": 73.8627,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 19,
    "avail_icu_beds": 7,
    "total_gen_beds": 130,
    "avail_gen_beds": 33,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN066",
    "name": "Jaihind Super Speciality Hospital",
    "address": "Pune",
    "lat": 18.5952,
    "lng": 73.7438,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 2,
    "total_gen_beds": 51,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN067",
    "name": "Janseva foundation govindrao dhapre rural hospital",
    "address": "Pune",
    "lat": 18.5184,
    "lng": 73.8583,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 6,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN068",
    "name": "Jeevanjyoti Hospital, Pune",
    "address": "Pune",
    "lat": 18.5777,
    "lng": 73.9071,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 16,
    "avail_icu_beds": 1,
    "total_gen_beds": 110,
    "avail_gen_beds": 28,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN069",
    "name": "Jivanrekha Multispeciality Hospital Pvt Ltd",
    "address": "Pune",
    "lat": 18.4577,
    "lng": 73.8619,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 2,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN070",
    "name": "Jupiter Lifeline Hospitals Ltd,Haveli,Pune,Pvt",
    "address": "Pune",
    "lat": 18.4772,
    "lng": 73.8068,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 60,
    "avail_icu_beds": 15,
    "total_gen_beds": 400,
    "avail_gen_beds": 100,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN071",
    "name": "Kamla Nehru Hospital Pune",
    "address": "Pune",
    "lat": 18.4484,
    "lng": 73.8629,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 52,
    "avail_icu_beds": 16,
    "total_gen_beds": 350,
    "avail_gen_beds": 88,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN072",
    "name": "Khavte Accident & Ortho Hospital,Daund,Pune,Pvt",
    "address": "Pune",
    "lat": 18.4636,
    "lng": 73.8675,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN073",
    "name": "Kohakade Superspeciality Hospital",
    "address": "Pune",
    "lat": 18.5183,
    "lng": 73.8407,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN074",
    "name": "Krantijyoti savitribai phule Talera hospital chinchwad,Haveli,Pune,Govt",
    "address": "Pune",
    "lat": 18.5083,
    "lng": 73.9165,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 12,
    "avail_icu_beds": 0,
    "total_gen_beds": 80,
    "avail_gen_beds": 20,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN075",
    "name": "Kulkarni Medical Foundation Pyramid Hospital",
    "address": "Pune",
    "lat": 18.5014,
    "lng": 73.9259,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 4,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN076",
    "name": "LIFECARE MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.4994,
    "lng": 73.9249,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 3,
    "avail_icu_beds": 1,
    "total_gen_beds": 20,
    "avail_gen_beds": 5,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN077",
    "name": "LIFEPOINT MULTISPECILAITY HOSPITAL,WAKAD,PUNE",
    "address": "Pune",
    "lat": 18.5047,
    "lng": 73.8344,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 0,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN078",
    "name": "Lifeline Multispeciality Hospital",
    "address": "Pune",
    "lat": 18.5612,
    "lng": 73.7828,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 6,
    "avail_icu_beds": 2,
    "total_gen_beds": 40,
    "avail_gen_beds": 10,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN079",
    "name": "Lokmanya Hospital Chinchwad",
    "address": "Pune",
    "lat": 18.4864,
    "lng": 73.8223,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 5,
    "total_gen_beds": 104,
    "avail_gen_beds": 26,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN080",
    "name": "MAHAVIR HOSPITAL",
    "address": "Pune",
    "lat": 18.4878,
    "lng": 73.8101,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 1,
    "total_gen_beds": 37,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN081",
    "name": "MAULINATH HOSPITAL",
    "address": "Pune",
    "lat": 18.4879,
    "lng": 73.8231,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN082",
    "name": "MAXCARE MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.5374,
    "lng": 73.8495,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN083",
    "name": "MH ESI Society Hospital",
    "address": "Pune",
    "lat": 18.5977,
    "lng": 73.7341,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 3,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN084",
    "name": "MMKR HEALTHCARE PVT.LTD KASTURBA SPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.5291,
    "lng": 73.8492,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 0,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN085",
    "name": "MORYA HOSPITAL",
    "address": "Pune",
    "lat": 18.4782,
    "lng": 73.809,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 3,
    "avail_icu_beds": 1,
    "total_gen_beds": 20,
    "avail_gen_beds": 5,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN086",
    "name": "Mahalaxmi Hospital",
    "address": "Pune",
    "lat": 18.5177,
    "lng": 73.8496,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 11,
    "avail_icu_beds": 4,
    "total_gen_beds": 75,
    "avail_gen_beds": 19,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN087",
    "name": "Manikchand Narayandas Dugad Hospital",
    "address": "Pune",
    "lat": 18.5579,
    "lng": 73.777,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 4,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN088",
    "name": "Matoshree Madanbai Dhariwal Hospital,Shirur,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5162,
    "lng": 73.8457,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN089",
    "name": "Mauli Hospitral,Shirur,Pune,Pvt",
    "address": "Pune",
    "lat": 18.467,
    "lng": 73.8608,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 0,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN090",
    "name": "Mehta Hospital,Baramati,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5591,
    "lng": 73.7699,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 1,
    "total_gen_beds": 60,
    "avail_gen_beds": 15,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN091",
    "name": "Morya Multispecialty Hospital",
    "address": "Pune",
    "lat": 18.5577,
    "lng": 73.7781,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN092",
    "name": "NEW LIFE AYURVEDIC HOSPITAL",
    "address": "Pune",
    "lat": 18.5105,
    "lng": 73.8625,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 5,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN093",
    "name": "NIRAMAYA SUPER SPECIALITY HOSPITAL AND CANCER CENTRE, PUNE",
    "address": "Pune",
    "lat": 18.6343,
    "lng": 73.8068,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 1,
    "total_gen_beds": 60,
    "avail_gen_beds": 15,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN094",
    "name": "Naidu Hospital",
    "address": "Pune",
    "lat": 18.5963,
    "lng": 73.7361,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 3,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN095",
    "name": "New Bhosari Hospital",
    "address": "Pune",
    "lat": 18.568,
    "lng": 73.7885,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 6,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN096",
    "name": "New Thergaon Hospital, Pune",
    "address": "Pune",
    "lat": 18.5626,
    "lng": 73.775,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 30,
    "avail_icu_beds": 6,
    "total_gen_beds": 200,
    "avail_gen_beds": 50,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN097",
    "name": "Niramaya Hospital Pvt. Ltd",
    "address": "Pune",
    "lat": 18.4804,
    "lng": 73.8065,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 16,
    "avail_icu_beds": 1,
    "total_gen_beds": 110,
    "avail_gen_beds": 28,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN098",
    "name": "Niramaya medical foundation and research centre pvt ltd",
    "address": "Pune",
    "lat": 18.5674,
    "lng": 73.7729,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN099",
    "name": "Nityaseva Multispeciality Hospital",
    "address": "Pune",
    "lat": 18.5582,
    "lng": 73.9073,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN100",
    "name": "OM ACCIDENT AND MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.465,
    "lng": 73.8765,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN101",
    "name": "OMKAR HOSPITAL",
    "address": "Pune",
    "lat": 18.4796,
    "lng": 73.8102,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN102",
    "name": "ONKAR MULTISPECAILITY HOSPITAL, PUNE",
    "address": "Pune",
    "lat": 18.639,
    "lng": 73.8046,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN103",
    "name": "OYSTER AND PEARL HOSPITALS",
    "address": "Pune",
    "lat": 18.4852,
    "lng": 73.8084,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 0,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN104",
    "name": "Om Chaitanya Hospital",
    "address": "Pune",
    "lat": 18.5931,
    "lng": 73.7427,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 0,
    "total_gen_beds": 60,
    "avail_gen_beds": 15,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN105",
    "name": "Om Hospital",
    "address": "Pune",
    "lat": 18.6316,
    "lng": 73.8004,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 12,
    "avail_icu_beds": 3,
    "total_gen_beds": 80,
    "avail_gen_beds": 20,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN106",
    "name": "Onco-Life Cancer Centre Pvt. Ltd.Mawal,Pune",
    "address": "Pune",
    "lat": 18.5753,
    "lng": 73.9183,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN107",
    "name": "PBMAs H V DESAI EYE HOSPITAL",
    "address": "Pune",
    "lat": 18.5858,
    "lng": 73.7487,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 0,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN108",
    "name": "PRIME MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.6236,
    "lng": 73.7994,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 1,
    "total_gen_beds": 39,
    "avail_gen_beds": 10,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN109",
    "name": "Padm. Dr. D. Y. Patil Medical College,Hospital & Research Centre, PImpri, Pune - 18.",
    "address": "Pune",
    "lat": 18.5111,
    "lng": 73.8502,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 195,
    "avail_icu_beds": 58,
    "total_gen_beds": 1300,
    "avail_gen_beds": 325,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN110",
    "name": "Pawana Hospital",
    "address": "Pune",
    "lat": 18.5096,
    "lng": 73.9307,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 2,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN111",
    "name": "Pawar Multispeciality Hospital & Diagnostic Centre Pvt. Ltd.",
    "address": "Pune",
    "lat": 18.5673,
    "lng": 73.909,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN112",
    "name": "Pioneer Hospital",
    "address": "Pune",
    "lat": 18.5615,
    "lng": 73.914,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN113",
    "name": "Pushpalata D Y Patil Hospital",
    "address": "Pune",
    "lat": 18.5893,
    "lng": 73.7363,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 97,
    "avail_icu_beds": 22,
    "total_gen_beds": 650,
    "avail_gen_beds": 163,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN114",
    "name": "RH Junner",
    "address": "Pune",
    "lat": 18.477,
    "lng": 73.816,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN115",
    "name": "RH Alandi",
    "address": "Pune",
    "lat": 18.622,
    "lng": 73.8087,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN116",
    "name": "RH Chandoli,Govt,Pune",
    "address": "Pune",
    "lat": 18.4997,
    "lng": 73.9217,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN117",
    "name": "RH Ghodegaon",
    "address": "Pune",
    "lat": 18.5355,
    "lng": 73.856,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN118",
    "name": "RH Narayangaon",
    "address": "Pune",
    "lat": 18.5843,
    "lng": 73.747,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 2,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN119",
    "name": "RH Nimgaon Ketki",
    "address": "Pune",
    "lat": 18.5625,
    "lng": 73.9182,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN120",
    "name": "RH Paud",
    "address": "Pune",
    "lat": 18.4489,
    "lng": 73.8741,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN121",
    "name": "RH Rui",
    "address": "Pune",
    "lat": 18.621,
    "lng": 73.8089,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN122",
    "name": "RH Saswad",
    "address": "Pune",
    "lat": 18.5121,
    "lng": 73.8506,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN123",
    "name": "RH Shikrapur,Shirur,Pune,Govt",
    "address": "Pune",
    "lat": 18.4549,
    "lng": 73.8653,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN124",
    "name": "RH Shirur",
    "address": "Pune",
    "lat": 18.4526,
    "lng": 73.876,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN125",
    "name": "RH Supa,Govt,Pune",
    "address": "Pune",
    "lat": 18.5705,
    "lng": 73.9236,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN126",
    "name": "RH Velhe",
    "address": "Pune",
    "lat": 18.5107,
    "lng": 73.9291,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN127",
    "name": "RH Yawat,Govt,Pune",
    "address": "Pune",
    "lat": 18.5739,
    "lng": 73.9235,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN128",
    "name": "Rajveer Health Services Pvt Ltd.Phoenix Hospital",
    "address": "Pune",
    "lat": 18.4766,
    "lng": 73.8116,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 48,
    "avail_gen_beds": 12,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN129",
    "name": "Regional Mental Hospital Pune",
    "address": "Pune",
    "lat": 18.5129,
    "lng": 73.859,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 381,
    "avail_icu_beds": 25,
    "total_gen_beds": 2540,
    "avail_gen_beds": 635,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN130",
    "name": "Rural Hospital Chakan",
    "address": "Pune",
    "lat": 18.5296,
    "lng": 73.8568,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN131",
    "name": "Rural Hospital Jejuri",
    "address": "Pune",
    "lat": 18.4593,
    "lng": 73.8602,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN132",
    "name": "Rural Hospital Kale Colony",
    "address": "Pune",
    "lat": 18.4891,
    "lng": 73.8116,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN133",
    "name": "Rural Hospital Nhavra",
    "address": "Pune",
    "lat": 18.4526,
    "lng": 73.8758,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN134",
    "name": "Rural Hospital Wadgaon Maval",
    "address": "Pune",
    "lat": 18.5572,
    "lng": 73.7809,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN135",
    "name": "SAARATHI MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.5891,
    "lng": 73.7336,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 3,
    "total_gen_beds": 60,
    "avail_gen_beds": 15,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN136",
    "name": "SAI MATERNITY AND GENERAL HOSPITAL, SHIKRAPUR",
    "address": "Pune",
    "lat": 18.4798,
    "lng": 73.8149,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 2,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN137",
    "name": "SAI SNEH HOSPITAL AND DIAGNOSTIC CENTRE PVT LTD",
    "address": "Pune",
    "lat": 18.4828,
    "lng": 73.8078,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN138",
    "name": "SANJEEVANI HOSPITAL ICU AND TRAUMA UNIT",
    "address": "Pune",
    "lat": 18.5124,
    "lng": 73.8473,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN139",
    "name": "SANJEEVANI MEDICAL FOUNDATION, LONAVALA",
    "address": "Pune",
    "lat": 18.5665,
    "lng": 73.7819,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN140",
    "name": "SDH 100 Baramati, Dist. Pune",
    "address": "Pune",
    "lat": 18.5027,
    "lng": 73.9164,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 5,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN141",
    "name": "SDH 50 Bhor",
    "address": "Pune",
    "lat": 18.5213,
    "lng": 73.8512,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 2,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN142",
    "name": "SDH 50 Daund",
    "address": "Pune",
    "lat": 18.5095,
    "lng": 73.9185,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN143",
    "name": "SDH 50 Indapur",
    "address": "Pune",
    "lat": 18.5096,
    "lng": 73.9341,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN144",
    "name": "SETH TARACHAND RAMNATH CHARITABLE AYURVEDIC HOSPITAL",
    "address": "Pune",
    "lat": 18.4633,
    "lng": 73.8697,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 33,
    "avail_icu_beds": 9,
    "total_gen_beds": 222,
    "avail_gen_beds": 56,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN145",
    "name": "SHANKARRAO MASULKAR URBAN HEALTH CENTER AND EYE HOSPITAL,PUNE CITY,GOVT",
    "address": "Pune",
    "lat": 18.5754,
    "lng": 73.9203,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 12,
    "avail_icu_beds": 3,
    "total_gen_beds": 80,
    "avail_gen_beds": 20,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN146",
    "name": "SHASWAT HOSPITAL KOTHRUD,PUNE CITY,PUNE",
    "address": "Pune",
    "lat": 18.5587,
    "lng": 73.7808,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 8,
    "avail_icu_beds": 2,
    "total_gen_beds": 56,
    "avail_gen_beds": 14,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN147",
    "name": "SHIVMANGAL HOSPITAL",
    "address": "Pune",
    "lat": 18.508,
    "lng": 73.9171,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN148",
    "name": "SHRADDHA HOSPITAL",
    "address": "Pune",
    "lat": 18.4551,
    "lng": 73.8774,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 1,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN149",
    "name": "SHREE MAYURESHWAR RURAL HOSPITAL",
    "address": "Pune",
    "lat": 18.5232,
    "lng": 73.8397,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN150",
    "name": "SHREE MINERVA HOSPITAL & REASEARCH CENTER",
    "address": "Pune",
    "lat": 18.5372,
    "lng": 73.8524,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 1,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN151",
    "name": "SHREE MULTISPECIALITY HOSPITAL & ICU",
    "address": "Pune",
    "lat": 18.6308,
    "lng": 73.7995,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN152",
    "name": "SHRI GANPATI HEALTH CARES VEDANTA CRITICARE MULTISPECIALITY HOSPITAL CARDIAC AND ADVANCE TRAUMA CARE CENTER",
    "address": "Pune",
    "lat": 18.5585,
    "lng": 73.783,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 6,
    "total_gen_beds": 102,
    "avail_gen_beds": 26,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN153",
    "name": "SIDDHIVINAYAK HOSPITAL AND RESEARCH CENTRE",
    "address": "Pune",
    "lat": 18.4672,
    "lng": 73.8712,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 0,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN154",
    "name": "SILVER BIRCH MULTISPECALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.5845,
    "lng": 73.7457,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 32,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN155",
    "name": "SITAI HOSPITAL",
    "address": "Pune",
    "lat": 18.4871,
    "lng": 73.8192,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN156",
    "name": "SPARSH HOSPITAL",
    "address": "Pune",
    "lat": 18.5047,
    "lng": 73.9262,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 0,
    "total_gen_beds": 105,
    "avail_gen_beds": 26,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN157",
    "name": "SUNRISE HOSPITAL ,PUNE",
    "address": "Pune",
    "lat": 18.4668,
    "lng": 73.8731,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN158",
    "name": "SUNSHINE MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.4651,
    "lng": 73.869,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN159",
    "name": "SWA. SUKHALALJI KHABIYA JAIN DHARMARTH HOSPITAL",
    "address": "Pune",
    "lat": 18.4509,
    "lng": 73.8636,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 6,
    "avail_icu_beds": 2,
    "total_gen_beds": 42,
    "avail_gen_beds": 11,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN160",
    "name": "Saiseva Multispeciality Hospital And Icu,Baramati,Pvt,Pune",
    "address": "Pune",
    "lat": 18.5623,
    "lng": 73.9049,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN161",
    "name": "Samarth Hospital And Research Centre",
    "address": "Pune",
    "lat": 18.4949,
    "lng": 73.8098,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 2,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN162",
    "name": "Sana Hospital,Pune City,Pvt",
    "address": "Pune",
    "lat": 18.594,
    "lng": 73.7292,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 3,
    "avail_icu_beds": 1,
    "total_gen_beds": 20,
    "avail_gen_beds": 5,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN163",
    "name": "Sanchit Hospital",
    "address": "Pune",
    "lat": 18.5026,
    "lng": 73.9219,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN164",
    "name": "Sardar Vallabhbhai Patel Cantonment General Hospital,Pune",
    "address": "Pune",
    "lat": 18.5702,
    "lng": 73.9126,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 5,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN165",
    "name": "Sassoon General Hospital Pune",
    "address": "Pune",
    "lat": 18.5327,
    "lng": 73.8405,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 194,
    "avail_icu_beds": 60,
    "total_gen_beds": 1296,
    "avail_gen_beds": 324,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN166",
    "name": "Shatayu Hospital and Ayurvedic Research Centre",
    "address": "Pune",
    "lat": 18.4752,
    "lng": 73.8148,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN167",
    "name": "Shinde Hospital,Shirur,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5742,
    "lng": 73.9064,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 2,
    "avail_icu_beds": 0,
    "total_gen_beds": 15,
    "avail_gen_beds": 4,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN168",
    "name": "Shingote Multispeciality Hospital Prasutigruah",
    "address": "Pune",
    "lat": 18.5217,
    "lng": 73.8439,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN169",
    "name": "Shlok Hospital",
    "address": "Pune",
    "lat": 18.5753,
    "lng": 73.915,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN170",
    "name": "Shree Multispeciality hospital",
    "address": "Pune",
    "lat": 18.4859,
    "lng": 73.8147,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN171",
    "name": "Shree Varad Vinayak Hospital,Daund,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5043,
    "lng": 73.9261,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 3,
    "total_gen_beds": 60,
    "avail_gen_beds": 15,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN172",
    "name": "Shree hospitals criticare and trauma center pvt ltd , Kharadi, Hadapsar by pass road, Pune",
    "address": "Pune",
    "lat": 18.4874,
    "lng": 73.8129,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 10,
    "avail_icu_beds": 1,
    "total_gen_beds": 72,
    "avail_gen_beds": 18,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN173",
    "name": "Shwas Multispeciality Hospital , Kharadi",
    "address": "Pune",
    "lat": 18.6368,
    "lng": 73.7923,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN174",
    "name": "Siddhivinayak General And Multispeciality Hospital",
    "address": "Pune",
    "lat": 18.6308,
    "lng": 73.7958,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 31,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN175",
    "name": "Silver Birch Multispeciality Hospital,Dhayari,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5822,
    "lng": 73.7334,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 2,
    "total_gen_beds": 48,
    "avail_gen_beds": 12,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN176",
    "name": "Smt. Kashibai Navale Medical College & General Hospital ,Narhe",
    "address": "Pune",
    "lat": 18.4842,
    "lng": 73.8213,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 120,
    "avail_icu_beds": 9,
    "total_gen_beds": 800,
    "avail_gen_beds": 200,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN177",
    "name": "Sub District Hospital,Manchar",
    "address": "Pune",
    "lat": 18.56,
    "lng": 73.7892,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 2,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN178",
    "name": "Surya Hospitals Pvt Ltd. Surya Sahyadri Hospital",
    "address": "Pune",
    "lat": 18.5166,
    "lng": 73.848,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 10,
    "avail_icu_beds": 1,
    "total_gen_beds": 71,
    "avail_gen_beds": 18,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN179",
    "name": "Sushrut Hospital",
    "address": "Pune",
    "lat": 18.5038,
    "lng": 73.8355,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 47,
    "avail_gen_beds": 12,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN180",
    "name": "Swami Samarth Hospital Jejuri,Purandhar,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5982,
    "lng": 73.7334,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 31,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN181",
    "name": "Symbiosis University Hospital & research Center",
    "address": "Pune",
    "lat": 18.6301,
    "lng": 73.8066,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 45,
    "avail_icu_beds": 6,
    "total_gen_beds": 300,
    "avail_gen_beds": 75,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN182",
    "name": "Synergy Multispeciality Hospital",
    "address": "Pune",
    "lat": 18.5338,
    "lng": 73.8395,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN183",
    "name": "Trust HealthCare Platinum MultiSpeciality Hospital,Pune City,Govt.Pune",
    "address": "Pune",
    "lat": 18.4553,
    "lng": 73.8673,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 6,
    "total_gen_beds": 102,
    "avail_gen_beds": 26,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN184",
    "name": "UNIQUE HOSPITAL",
    "address": "Pune",
    "lat": 18.4781,
    "lng": 73.823,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 1,
    "total_gen_beds": 100,
    "avail_gen_beds": 25,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN185",
    "name": "UNIVERSAL HOSPITAL",
    "address": "Pune",
    "lat": 18.5057,
    "lng": 73.9172,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 6,
    "avail_icu_beds": 0,
    "total_gen_beds": 40,
    "avail_gen_beds": 10,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN186",
    "name": "Urokul, Kulkami Uro Surgery Institute Pvt Ltd",
    "address": "Pune",
    "lat": 18.4596,
    "lng": 73.8738,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 2,
    "total_gen_beds": 105,
    "avail_gen_beds": 26,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN187",
    "name": "Ushakiran Hospital,Haveli,Pune,Pvt",
    "address": "Pune",
    "lat": 18.6316,
    "lng": 73.8078,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 1,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN188",
    "name": "VIGHNAHARTA SUPER SPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.4548,
    "lng": 73.8694,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 3,
    "avail_icu_beds": 1,
    "total_gen_beds": 20,
    "avail_gen_beds": 5,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN189",
    "name": "VIGHNHARTA HOSPITAL",
    "address": "Pune",
    "lat": 18.623,
    "lng": 73.7956,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 1,
    "total_gen_beds": 33,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN190",
    "name": "VISION NEXT Foundation Dattatray Walse Patil Eyecare Hospital",
    "address": "Pune",
    "lat": 18.458,
    "lng": 73.8578,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 2,
    "avail_icu_beds": 0,
    "total_gen_beds": 5,
    "avail_gen_beds": 1,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 80,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN191",
    "name": "Varadvinayak Multispeciality Hospital",
    "address": "Pune",
    "lat": 18.5346,
    "lng": 73.8507,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 51,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 4,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN192",
    "name": "Vighnahar Nursing Homes Minoo Mehta Memorial Hospital,Junnar,Pvt,Pune",
    "address": "Pune",
    "lat": 18.6354,
    "lng": 73.8096,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN193",
    "name": "Vighnaharta Hospital,Junner,Pune,Pvt",
    "address": "Pune",
    "lat": 18.5608,
    "lng": 73.9166,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 0,
    "total_gen_beds": 35,
    "avail_gen_beds": 9,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN194",
    "name": "Vighnaharta Hospital,Mawal,Pune,Pvt",
    "address": "Pune",
    "lat": 18.559,
    "lng": 73.9152,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 32,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN195",
    "name": "Vighnaharta Multispeciality Hospital,Junner,Pune,Pvt",
    "address": "Pune",
    "lat": 18.4663,
    "lng": 73.8775,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 4,
    "avail_icu_beds": 0,
    "total_gen_beds": 30,
    "avail_gen_beds": 8,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 73,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN196",
    "name": "Vishwaniranjan Eye Hospital",
    "address": "Pune",
    "lat": 18.5277,
    "lng": 73.8478,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 2,
    "avail_icu_beds": 0,
    "total_gen_beds": 6,
    "avail_gen_beds": 2,
    "has_ventilator": true,
    "avail_ventilators": 3,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 67,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN197",
    "name": "Wisdom Superspeciality Hospital Pvt Ltd",
    "address": "Pune",
    "lat": 18.4908,
    "lng": 73.8065,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 2,
    "total_gen_beds": 49,
    "avail_gen_beds": 12,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN198",
    "name": "Women Hospital, Baramati, Dist. Pune",
    "address": "Pune",
    "lat": 18.5218,
    "lng": 73.8477,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 1,
    "total_gen_beds": 60,
    "avail_gen_beds": 15,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN199",
    "name": "YASHWANTRAO CHAVAN MULTISPECIALITY HOSPITAL",
    "address": "Pune",
    "lat": 18.5201,
    "lng": 73.8597,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 12,
    "avail_icu_beds": 0,
    "total_gen_beds": 84,
    "avail_gen_beds": 21,
    "has_ventilator": true,
    "avail_ventilators": 5,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN200",
    "name": "Yash pediatric Hospital",
    "address": "Pune",
    "lat": 18.4602,
    "lng": 73.8704,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 9,
    "avail_icu_beds": 1,
    "total_gen_beds": 60,
    "avail_gen_beds": 15,
    "has_ventilator": true,
    "avail_ventilators": 2,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN201",
    "name": "Yashwantrao Chavan Memorial Hospital",
    "address": "Pune",
    "lat": 18.5267,
    "lng": 73.8652,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 112,
    "avail_icu_beds": 15,
    "total_gen_beds": 750,
    "avail_gen_beds": 188,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN202",
    "name": "Yogeshwari Hospital & ICU",
    "address": "Pune",
    "lat": 18.5113,
    "lng": 73.9349,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 7,
    "avail_icu_beds": 0,
    "total_gen_beds": 50,
    "avail_gen_beds": 13,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": false,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 74,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN203",
    "name": "ZEDPLUS AND KASTURI HOSPITAL",
    "address": "Pune",
    "lat": 18.5209,
    "lng": 73.852,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 5,
    "avail_icu_beds": 0,
    "total_gen_beds": 37,
    "avail_gen_beds": 9,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": false,
    "has_neurosurgery": true,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 76,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN204",
    "name": "giriraj Hospital",
    "address": "Pune",
    "lat": 18.4523,
    "lng": 73.8654,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 15,
    "avail_icu_beds": 4,
    "total_gen_beds": 102,
    "avail_gen_beds": 26,
    "has_ventilator": true,
    "avail_ventilators": 1,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": true,
    "has_cardiac_surgery": true,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  },
  {
    "id": "PUN205",
    "name": "Grand Total",
    "address": "",
    "lat": 18.5604,
    "lng": 73.7752,
    "phone": "+91-20-0000-0000",
    "total_icu_beds": 3240,
    "avail_icu_beds": 1039,
    "total_gen_beds": 21604,
    "avail_gen_beds": 5451,
    "has_ventilator": false,
    "avail_ventilators": 0,
    "has_trauma_centre": true,
    "has_cath_lab": true,
    "has_neurosurgery": false,
    "has_cardiac_surgery": false,
    "has_burn_unit": false,
    "has_paediatrics": false,
    "current_load_pct": 75,
    "is_active": true,
    "last_updated_at": "2026-04-03T21:50:12.460Z",
    "specialists_on_duty": [
      {
        "id": "s001",
        "specialist_type": "trauma_surgeon",
        "doctor_name": "Dr. A. Sharma",
        "on_duty": true,
        "shift_ends_at": "20:00"
      },
      {
        "id": "s002",
        "specialist_type": "neurosurgeon",
        "doctor_name": "Dr. B. Patil",
        "on_duty": true,
        "shift_ends_at": "22:00"
      }
    ]
  }
];

// ─── AMBULANCES ──────────────────────────────────────────────────────────────
export const MOCK_AMBULANCES = [
  {
    id: 'amb-001',
    call_sign: 'AMB-001',
    driver_name: 'Rakesh Patil',
    driver_phone: '+91-98765-43210',
    current_lat: 18.5204,
    current_lng: 73.8567,
    status: 'en_route_to_hospital',
    assigned_hospital_id: 'PUN001',
    active_patient_id: 'pat-001',
    last_location_update: new Date().toISOString(),
  },
  {
    id: 'amb-002',
    call_sign: 'AMB-002',
    driver_name: 'Sunil Sharma',
    driver_phone: '+91-98765-11111',
    current_lat: 18.5300,
    current_lng: 73.8400,
    status: 'on_scene',
    assigned_hospital_id: null,
    active_patient_id: 'pat-002',
    last_location_update: new Date().toISOString(),
  },
  {
    id: 'amb-003',
    call_sign: 'AMB-003',
    driver_name: 'Deepak Verma',
    driver_phone: '+91-98765-22222',
    current_lat: 18.5100,
    current_lng: 73.8600,
    status: 'idle',
    assigned_hospital_id: null,
    active_patient_id: null,
    last_location_update: new Date().toISOString(),
  },
];

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
export const MOCK_PATIENTS = [
  {
    id: 'pat-001',
    session_code: 'P-20241031-001',
    ambulance_id: 'amb-001',
    age: 42,
    sex: 'male',
    chief_complaint: 'Polytrauma — high-speed road traffic accident',
    mechanism_of_injury: 'Blunt-force trauma, ejection from vehicle at ~80 km/h',
    // Vitals
    heart_rate: 118,
    systolic_bp: 85,
    diastolic_bp: 60,
    spo2: 93.2,
    respiratory_rate: 24,
    temperature: 38.1,
    gcs_score: 10,
    // ML Outputs
    predicted_severity: 4,  // 1=Minor → 5=Immediate
    predicted_care_needs: { icu: true, ventilator: true, specialist: 'trauma_surgeon', burn_unit: false, cath_lab: false },
    survivability_score: 0.71,
    // Routing
    assigned_hospital_id: 'PUN001',
    routing_rationale: {
      primary_reason: 'Trauma surgeon on duty + Level 1 trauma centre',
      eta_advantage_min: 4,
      competing_hospital: 'Lilavati Hospital',
    },
    status: 'active',
    created_at: new Date(Date.now() - 8 * 60000).toISOString(),
    resolved_at: null,
  },
  {
    id: 'pat-002',
    session_code: 'P-20241031-002',
    ambulance_id: 'amb-002',
    age: 67,
    sex: 'female',
    chief_complaint: 'Acute chest pain, diaphoresis, jaw radiation — suspected STEMI',
    mechanism_of_injury: 'Non-traumatic cardiac event',
    heart_rate: 94,
    systolic_bp: 105,
    diastolic_bp: 70,
    spo2: 96.1,
    respiratory_rate: 18,
    temperature: 36.8,
    gcs_score: 14,
    predicted_severity: 3,
    predicted_care_needs: { icu: true, ventilator: false, specialist: 'interventional_cardiologist', burn_unit: false, cath_lab: true },
    survivability_score: 0.83,
    assigned_hospital_id: null,
    routing_rationale: null,
    status: 'active',
    created_at: new Date(Date.now() - 3 * 60000).toISOString(),
    resolved_at: null,
  },
];

// ─── VITALS STREAM (time-series) ─────────────────────────────────────────────
export const MOCK_VITALS_HISTORY = Array.from({ length: 12 }, (_, i) => ({
  id: `vs-${i}`,
  patient_id: 'pat-001',
  source: 'monitor',
  heart_rate:       118 + Math.round((Math.random() - 0.5) * 10),
  systolic_bp:       85  + Math.round((Math.random() - 0.5) * 8),
  diastolic_bp:      60  + Math.round((Math.random() - 0.5) * 6),
  spo2:             parseFloat((93.2 + (Math.random() - 0.5) * 1.5).toFixed(1)),
  respiratory_rate:  24  + Math.round((Math.random() - 0.5) * 4),
  temperature:      parseFloat((38.1 + (Math.random() - 0.5) * 0.4).toFixed(1)),
  gcs_score:        10,
  recorded_at: new Date(Date.now() - (11 - i) * 15000).toISOString(),
}));

// ─── ROUTING EVENTS ───────────────────────────────────────────────────────────
export const MOCK_ROUTING_EVENTS = [
  {
    id: 're-001',
    patient_id: 'pat-001',
    hospital_id: 'PUN001',
    triggered_at: new Date(Date.now() - 6 * 60000).toISOString(),
    transit_time_min: 9,
    survivability_score: 0.71,
    shap_explanation: {
      gcs_score:           0.32,
      systolic_bp:         0.22,
      spo2:                0.18,
      heart_rate:          0.12,
      age:                 0.08,
      mechanism_of_injury: 0.05,
      respiratory_rate:    0.03,
    },
    all_hospitals_scored: [
      { hospital_id: 'PUN001', hospital_name: 'KEM Hospital',               score: 0.89, transit_min: 9,  survivability_score: 0.71, rank: 1, rejection_reason: null },
      { hospital_id: 'PUN002', hospital_name: 'Lilavati Hospital',          score: 0.74, transit_min: 14, survivability_score: 0.58, rank: 2, rejection_reason: null },
      { hospital_id: 'PUN003', hospital_name: 'Sion Hospital',              score: 0.61, transit_min: 7,  survivability_score: 0.52, rank: 3, rejection_reason: null },
      { hospital_id: 'hosp-004', hospital_name: 'P.D. Hinduja Hospital',      score: 0.44, transit_min: 11, survivability_score: 0.41, rank: 4, rejection_reason: 'No neurosurgery' },
      { hospital_id: 'hosp-009', hospital_name: 'Breach Candy Hospital',      score: 0.08, transit_min: 16, survivability_score: 0.12, rank: 5, rejection_reason: 'At capacity (94%)' },
      { hospital_id: 'hosp-010', hospital_name: 'Tata Memorial Centre',       score: 0.03, transit_min: 10, survivability_score: 0.08, rank: 6, rejection_reason: 'At capacity (97%)' },
    ],
    override_by_dispatcher: false,
    event_type: 'single',
  },
];

// ─── ANALYTICS DATA ──────────────────────────────────────────────────────────
export const MOCK_HOURLY_INCIDENTS = [
  { hour: '00:00', count: 8,  critical: 1 },
  { hour: '02:00', count: 5,  critical: 0 },
  { hour: '04:00', count: 4,  critical: 0 },
  { hour: '06:00', count: 9,  critical: 1 },
  { hour: '08:00', count: 18, critical: 2 },
  { hour: '10:00', count: 24, critical: 3 },
  { hour: '12:00', count: 31, critical: 4 },
  { hour: '14:00', count: 28, critical: 3 },
  { hour: '16:00', count: 35, critical: 5 },
  { hour: '18:00', count: 42, critical: 6 },
  { hour: '20:00', count: 38, critical: 5 },
  { hour: '22:00', count: 22, critical: 3 },
];

export const MOCK_SEVERITY_DIST = [
  { name: 'Minor',     value: 87,  color: '#10b981' },
  { name: 'Moderate',  value: 64,  color: '#3b82f6' },
  { name: 'High',      value: 38,  color: '#f59e0b' },
  { name: 'Critical',  value: 21,  color: '#e84545' },
  { name: 'Immediate', value: 6,   color: '#be123c' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export const SEVERITY_MAP = {
  1: { label: 'Minor',     colorClass: 'badge-low',      color: '#10b981', textColor: 'text-emerald-400' },
  2: { label: 'Moderate',  colorClass: 'badge-medium',   color: '#3b82f6', textColor: 'text-blue-400'    },
  3: { label: 'High',      colorClass: 'badge-high',     color: '#f59e0b', textColor: 'text-amber-400'   },
  4: { label: 'Critical',  colorClass: 'badge-critical',  color: '#e84545', textColor: 'text-red-400'     },
  5: { label: 'Immediate', colorClass: 'badge-critical',  color: '#be123c', textColor: 'text-red-300'     },
};

export const SPECIALIST_LABELS = {
  trauma_surgeon:               'Trauma Surgery',
  neurosurgeon:                 'Neurosurgery',
  interventional_cardiologist:  'Cath Lab / CardioInt',
  cardiac_surgeon:              'Cardiac Surgery',
  anaesthesiologist:            'Anaesthesiology',
  orthopaedic_surgeon:          'Orthopaedics',
  general_surgeon:              'General Surgery',
  intensivist:                  'Critical Care / ICU',
  oncologist:                   'Oncology',
};

export const API_BASE = 'http://localhost:3001/api';


