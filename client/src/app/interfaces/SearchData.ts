export class SearchData {
    constructor(
      public keyword: string,
      public radius: number,
      public category: string,
      public location: string,
      public autoDetectLocation: boolean
    ) {  }
}