export interface Allocation {
    _id?: string;
    theatreNum?: number;
    list?: 'OGD' | 'Colon' | 'EUS' | 'ERCP' | 'Bronchs';
    type?: 'Diagnostic' | 'Therapeutic';
    doctor?: string;
    staff1?: 'Nurse' | 'HCA';
    staff2?: 'Nurse' | 'HCA';
    name1?: string;
    name2?: string;
    // comments?: string;

 }