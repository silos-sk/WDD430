export interface Allocation {
    _id?: string;
    list?: 'OGD' | 'Colon' | 'EUS' | 'ERCP' | 'Bronchs';
    type?: string;
    doctor?: string;
    staff?: 'Nurse' | 'HCA';
    name?: string;

 }