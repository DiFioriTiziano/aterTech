export interface interventi {
  message: string;
  status: boolean;
  InterventiAter:InterventiAter[]
}

  export interface InterventiAter {
      vpsinf_id_esterno: number;
      vpsinf_flag_valido: string;
      vpsinf_flag_convalida: any;
      vpsinf_id: number;
      vpsinf_matricola: string;
      vpsinf_info: string;
      vpsinf_indirizzo: any;
      vpsinf_dal: string;
      vpsinf_ora: string;
      vpsinf_al: string;
      vpsinf_utent_id_creazione: number;
      vpsinf_data_creazione: string;
      vpsinf_utent_id_aggiornamento: any;
      vpsinf_data_aggiornamento: any;
      vpsinf_cancellato: string;
      vps_id_appalto: any;
      vpsinf_tipvs_id: number;
      tipvps_id: number;
      tipvps_descrizione: string;
      tipvps_data_inizio: string;
      tipvps_data_fine: any;
      tipvps_template: any;
      utente_creazione: string;
      utente_aggiornamento: any;
  }

