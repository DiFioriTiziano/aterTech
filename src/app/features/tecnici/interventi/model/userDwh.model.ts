

export interface responseLoginDwh {
  status: boolean;
  message: string;
  user: utenteDwh;
}


export interface utenteDwh {
  UTENT_ID: any;
  UTENT_UTENTE_LOGIN: string;
  UTENT_EMAIL: string;
  UTENT_NOME: string;
  UTENT_COGNOME: string;
  UTENT_AUTORIZZAZIONE_ID: any;
}

