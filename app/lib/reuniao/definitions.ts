export type ReuniaoState = {
    errors?: {
        d_ini?: string[];
        sala?: string[];
        id?: string[];
        predio?: string[];
        d_lim?: string[];
    };
    message?: string | null;
} 

export type OrdemState = {
    errors?: {
        // sequencia?: string[];
        assunto?: string[];      
        publicavel?: string[];
    };
    message?: string | null;
}