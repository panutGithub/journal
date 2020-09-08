
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class Checktypepdf {

    articleidService : string
    fileName: any;
    profileForm: any;
    checkTypePDF: string;
    loading: boolean;

    constructor(){

    }

    uploadSingle(event) {
        if (event.target.files.length > 0) {
          this.fileName = event.target.files[0];
          if (this.fileName.type == "application/pdf") {
            console.log("This file type pdf")
            this.profileForm.get('profile').setValue(this.fileName);
            this.checkTypePDF = ''
            this.loading = false
            return true
          } else {
            this.fileName = ''
            this.checkTypePDF = "This file not PDF"
            this.loading = true
            console.log("This file not PDF")
            return false
          }
        }
      }

}

  