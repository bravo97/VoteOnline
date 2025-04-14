import { animate, query, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../services/alert.service';
import { BallotService } from '../../services/ballot.service';
import { BallotdialogComponent } from '../dialog/ballotdialog/ballotdialog.component';
import { Subscription } from 'rxjs';

export interface BallotData {
  id: string;
  tenVD: string;
  mota: string;
  ngayBatDau: string;
  ngayKetThuc:string;
  dinhdang:string
}


@Component({
  selector: 'app-ballot',
  standalone: false,
  templateUrl: './ballot.component.html',
  styleUrl: './ballot.component.scss',
  animations: [
    trigger('animation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0)', opacity: 1 }),
            animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
          ],
          {
            optional: true
          }
        )
      ])
    ])
  ]
})

export class BallotComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'tenVD', 'mota', 'ngayBatDau', 'ngayKetThuc','dinhdang','action'];
  dataSource!: MatTableDataSource<BallotData>;
  lstVanDe:any;
  add: string = 'Add';
  edit: string = 'Edit';
  delete: string = 'Delete';
  subscription = new Subscription();
  tenNhom:string = '';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(public dialog: MatDialog,private service: BallotService,private alertService: AlertService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllReports();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // Fill data table
  public getAllReports(): void {
    let resp = this.service.GetVanDe("",1,20);
    resp.subscribe((report) => {
      this.lstVanDe = report;
      this.dataSource = new MatTableDataSource(report);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openAddDialog(){
    this.openpopup(0);
  }

  openEditDialog(obj: any): void {
    this.openpopup(obj);
  }

  openDeleteDialog(obj: any): void {
    const options = {
      title: 'Xóa dữ liệu?',
      message: `Xóa dữ liệu sẽ không thể khôi phục?`,
      cancelText: 'Hủy',
      confirmText: 'Tiếp tục'
    };

    // If user confirms, remove selected row from data table
    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        //this.deleteRow(obj);
      }
    });
  }

  openpopup(obj: any) {
    this.dialog.open(BallotdialogComponent, {
      width: '30%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: obj
    }).afterClosed().subscribe(o => {
      this.getAllReports();
    });
  }
}
