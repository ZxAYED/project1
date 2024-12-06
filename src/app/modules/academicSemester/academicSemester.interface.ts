export type IMonth =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type IName = 'Autumn' | 'Summer ' | 'Fall'
export type ICode = '01' | '02' | '03'



export interface IAcademicSemester {
    name: IName,
    code: ICode,
    year: Date,
    startMonth: IMonth;
    endMonth: IMonth

}