import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DataSearchService} from "./data-search.service";
import {Data} from "./search.model";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'app-data-search',
    templateUrl: './data-search.component.html',
    styleUrls: ['./data-search.component.css']
})
export class DataSearchComponent implements OnInit {
    show_spinner = false;
    displayedColumns: string[] = [];
    dataSource: Array<any> = [];
    data: Data | undefined;
    searchForm!: FormGroup;
    errorMessage = '';
    sentences$!: Observable<string[]>;
    private searchText$ = new Subject<string>();
    constructor(private formBuilder: FormBuilder, private dataSearchService: DataSearchService) {
        this.searchForm = this.formBuilder.group({
            query: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.sentences$ = this.searchText$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(keyword =>
          this.dataSearchService.suggest(keyword))
      );
    }

    search() {
        this.show_spinner = true;
        this.dataSource = [];
        this.errorMessage = '';
        let query: string = this.searchForm.controls['query'].value;
        this.dataSearchService.search(query)
            .subscribe(
                (res) => {
                    if (res.error) {
                        this.errorMessage = res.error;
                    } else {
                        this.data = res;
                    this.displayedColumns = this.data.columns;
                    this.dataSource = this.data.rows;
                    }

                    this.show_spinner = false;
                }
            );
    }

    getValue(event: Event): string {
        return (event.target as HTMLInputElement).value;
    }

    suggest(keyword: string) {
        this.searchText$.next(keyword);
    }

    assignValueToInput(value: string) {
        this.searchForm.setValue({query: value});
        this.searchText$.next('');
    }

   downloadCSV() {
    // Convert the JSON data to CSV
       if (!this.data || !this.data.rows) {
           return;
       }
    const csvData = this.convertToCSV(this.data?.rows);

    // Create a Blob object with CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create an anchor element to trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';  // The name of the downloaded file
    link.click();  // Programmatically click the link to start download
  }

    convertToCSV(data: any[]): string {
        const headers = Object.keys(data[0]);
        const csvRows = [];

        // Add the header row
        csvRows.push(headers.join(','));

        // Add the data rows
        data.forEach(row => {
          csvRows.push(headers.map(header => row[header]).join(','));
        });

        return csvRows.join('\n');
  }

}
