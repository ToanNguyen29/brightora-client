export interface ICart {
   _id: string;
   owner: string;
   cart: ICourseInCart[];
}

export interface ICourseInCart {
   course: any;
   created_at: string;
}

export interface IGetCartResponse {
   status: string;
   quantity: number;
   data: ICart;
}

export interface IAddItemCartResponse {
   status: string;
   data: ICart;
}

export interface IDeleteItemCartResponse {
   status: string;
   data: ICart;
}
