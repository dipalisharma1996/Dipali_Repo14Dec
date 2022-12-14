import { LightningElement,track} from 'lwc';
import getAccountList from '@salesforce/apex/customSearchSobjectLWC.getAccountList';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
 
export default class CustomAccSearchLWC extends LightningElement {
    
    @track accountsRecord;
    searchValue = '';
 
    searchKeyword(event) {
        this.searchValue = event.target.value;
        console.log('this.searchValue',this.searchValue);
    }
 
    handleSearchKeyword() {
        
        if (this.searchValue !== '') {
            console.log('this.searchValue---->',this.searchValue);
            getAccountList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    console.log('result',JSON.stringify(result));
                    this.accountsRecord = result;

                })
                .catch(error => {
                   
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    this.accountsRecord = null;
                });
        } else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}