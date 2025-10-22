export interface Post {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    link: string;
    categories: number[];
    acf: {
        inicio_de_la_transmision: string;
        fin_de_la_transmision: string;
        enlace_transmision?: string;
        enlace_a_preoferta?: string;
        ubicacion?: string;
        tipo_de_remate?: string;
        modalidad?: string;
        cabana?: string;
        financiacion?: string;
        [key: string]: any;
    };
}